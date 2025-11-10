
export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  artwork: string;
  youtubeId: string;
}

export interface Playlist {
  id: string;
  name: string;
  songIds: string[];
  owner: string;
}

export interface User {
  id: string;
  name:string;
  avatar: string;
  role: 'host' | 'dj' | 'guest';
}

export interface ChatMessage {
  id:string;
  user: User;
  message: string;
  timestamp: number;
}

export type View = 'home' | 'browse' | 'library' | 'search' | 'playlist';

export type RepeatMode = 'off' | 'one' | 'all';

export interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  progress: number;
  timestamp: number;
  playlist: Song[];
}

export interface Room {
  id: string;
  users: User[];
  messages: ChatMessage[];
  playerState: PlayerState;
}
