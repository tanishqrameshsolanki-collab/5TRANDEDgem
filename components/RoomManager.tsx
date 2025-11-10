
import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { UsersIcon } from '../constants';

export const RoomManager: React.FC = () => {
  const { room, currentSong, createRoom, joinRoom, leaveRoom } = useAppContext();
  const [joinId, setJoinId] = useState('');
  const [showJoinInput, setShowJoinInput] = useState(false);

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (joinId.trim()) {
      joinRoom(joinId.trim().toUpperCase());
      setJoinId('');
      setShowJoinInput(false);
    }
  };

  if (room) {
    return (
      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="text-xs text-gray-400">ROOM ID</div>
          <div className="font-mono font-bold text-white tracking-widest">{room.id}</div>
        </div>
        <button
          onClick={leaveRoom}
          className="bg-red-500/80 hover:bg-red-500 text-white font-bold px-4 py-2 rounded-full text-sm transition-colors"
        >
          Leave
        </button>
      </div>
    );
  }

  if (showJoinInput) {
    return (
      <form onSubmit={handleJoinSubmit} className="flex items-center gap-2">
        <input
          type="text"
          value={joinId}
          onChange={(e) => setJoinId(e.target.value)}
          placeholder="Enter Room ID"
          className="bg-black/20 border border-white/20 rounded-full px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 w-32"
          autoFocus
        />
        <button type="submit" className="bg-green-500 text-black font-bold px-4 py-2 rounded-full text-sm hover:bg-green-400">
          Join
        </button>
        <button onClick={() => setShowJoinInput(false)} className="text-gray-400 hover:text-white text-sm px-2">
          Cancel
        </button>
      </form>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setShowJoinInput(true)}
        className="text-gray-300 hover:text-white font-bold px-4 py-2 rounded-full text-sm hover:bg-white/10 transition-colors"
      >
        Join Room
      </button>
      <button
        onClick={createRoom}
        disabled={!currentSong}
        className="flex items-center gap-2 bg-green-500 text-black font-bold px-4 py-2 rounded-full text-sm hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
      >
        <UsersIcon className="w-5 h-5" />
        <span>Start Room</span>
      </button>
    </div>
  );
};
