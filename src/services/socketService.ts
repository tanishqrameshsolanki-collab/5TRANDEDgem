
import { EventEmitter } from './eventEmitter';
import { Room, User, PlayerState, Song, ChatMessage } from '../types';

// --- MOCK DATA & HELPERS ---
const MOCK_OTHER_USERS: Omit<User, 'role'>[] = [
    { id: 'user-2', name: 'Maria', avatar: 'https://i.pravatar.cc/150?u=maria' },
    { id: 'user-3', name: 'Chris', avatar: 'https://i.pravatar.cc/150?u=chris' },
    { id: 'user-4', name: 'Satoshi', avatar: 'https://i.pravatar.cc/150?u=satoshi' },
];

const createRoomId = () => Math.random().toString(36).substring(2, 8).toUpperCase();

class MockSocketService extends EventEmitter {
  private connected = false;
  private room: Room | null = null;
  private currentUser: User | null = null;
  private mockRooms: Map<string, Room> = new Map();

  connect(user: Omit<User, 'role'>) {
    if (this.connected) return;
    this.currentUser = { ...user, role: 'guest' };
    this.connected = true;
    console.log('Mock Socket: Connected');
    // Simulate some rooms already existing
    const roomId = createRoomId();
    this.mockRooms.set(roomId, {
        id: roomId,
        users: [{ id: 'user-5', name: 'HostBot', avatar: 'https://i.pravatar.cc/150?u=bot', role: 'host' }],
        messages: [],
        playerState: { currentSong: null, isPlaying: false, progress: 0, timestamp: Date.now(), playlist: [] }
    });
  }

  disconnect() {
    if (!this.connected) return;
    this.leaveRoom();
    this.connected = false;
    this.currentUser = null;
    console.log('Mock Socket: Disconnected');
  }

  createRoom(initialPlayerState: PlayerState): string | null {
    if (!this.connected || !this.currentUser) return null;
    
    const roomId = createRoomId();
    this.currentUser.role = 'host';
    
    this.room = {
      id: roomId,
      users: [this.currentUser],
      messages: [],
      playerState: initialPlayerState,
    };
    this.mockRooms.set(roomId, this.room);
    this.emit('room-updated', this.room);
    console.log(`Mock Socket: Room ${roomId} created.`, this.room);
    return roomId;
  }

  joinRoom(roomId: string) {
    if (!this.connected || !this.currentUser) return;
    const roomToJoin = this.mockRooms.get(roomId);
    if (!roomToJoin) {
        this.emit('error', 'Room not found');
        return;
    }
    
    this.currentUser.role = 'guest';
    this.room = roomToJoin;
    this.room.users.push(this.currentUser);

    this.emit('room-updated', this.room);
    console.log(`Mock Socket: Joined room ${roomId}.`, this.room);

    // Simulate another user joining after a delay
    setTimeout(() => {
        if (this.room && this.room.id === roomId) {
            const newUser = { ...MOCK_OTHER_USERS[Math.floor(Math.random() * MOCK_OTHER_USERS.length)], role: 'guest' } as User;
            if (!this.room.users.find(u => u.id === newUser.id)) {
                this.room.users.push(newUser);
                this.emit('user-joined', newUser);
                this.emit('new-message', { id: `msg-${Date.now()}`, user: newUser, message: 'Hey everyone!', timestamp: Date.now() });
            }
        }
    }, 3000);
  }

  leaveRoom() {
    if (!this.room || !this.currentUser) return;
    this.room.users = this.room.users.filter(u => u.id !== this.currentUser!.id);
    if (this.currentUser.role === 'host' && this.room.users.length > 0) {
        // Promote next user to host
        this.room.users[0].role = 'host';
        this.emit('new-host', this.room.users[0].id);
    }
    
    const leftUser = this.currentUser;
    this.emit('user-left', leftUser.id);
    
    this.room = null;
    if (this.currentUser) {
        this.currentUser.role = 'guest';
    }
    console.log('Mock Socket: Left room.');
    this.emit('room-updated', null);
  }

  sendMessage(message: string) {
    if (!this.room || !this.currentUser) return;
    const chatMessage: ChatMessage = {
        id: `msg-${Date.now()}`,
        user: this.currentUser,
        message,
        timestamp: Date.now()
    };
    this.room.messages.push(chatMessage);
    this.emit('new-message', chatMessage);
    console.log('Mock Socket: Sent message', chatMessage);
  }

  syncPlayerState(playerState: PlayerState) {
    if (!this.room || this.currentUser?.role !== 'host') return;
    this.room.playerState = playerState;
    this.emit('player-state-changed', playerState);
    console.log('Mock Socket: Host synced player state', playerState);
  }
}

export const socketService = new MockSocketService();
