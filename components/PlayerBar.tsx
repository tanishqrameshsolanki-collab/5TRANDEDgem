
import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import {
  PlayIcon, PauseIcon, SkipNextIcon, SkipPreviousIcon, VolumeUpIcon, VolumeOffIcon,
  ShuffleIcon, RepeatIcon, RepeatOneIcon, DEFAULT_ARTWORK
} from '../constants';
import { RoomManager } from './RoomManager';

const formatTime = (seconds: number) => {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};

export const PlayerBar: React.FC = () => {
  const {
    currentSong, isPlaying, togglePlay, playNext, playPrev,
    progress, duration, seek,
    volume, setVolume, isMuted, toggleMute,
    isShuffle, toggleShuffle, repeatMode, cycleRepeatMode,
    openNowPlaying, currentUser, room
  } = useAppContext();

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    seek(Number(e.target.value));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  const isGuest = currentUser?.role === 'guest' && room;

  return (
    <div className="h-24 w-full flex-shrink-0 glass-pane px-4 flex items-center justify-between">
      {/* Left: Track Info */}
      <div className="w-1/4 flex items-center space-x-4 min-w-0">
        {currentSong && (
          <>
            <img
              src={currentSong.artwork || DEFAULT_ARTWORK}
              alt={currentSong.title}
              className="w-14 h-14 rounded-md cursor-pointer flex-shrink-0"
              onClick={openNowPlaying}
            />
            <div className="min-w-0">
              <p className="font-semibold text-white truncate cursor-pointer" onClick={openNowPlaying}>{currentSong.title}</p>
              <p className="text-sm text-gray-400 truncate">{currentSong.artist}</p>
            </div>
          </>
        )}
      </div>

      {/* Center: Player Controls */}
      <div className="w-1/2 flex flex-col items-center justify-center">
        <div className="flex items-center space-x-6">
          <button onClick={toggleShuffle} className={isShuffle ? 'text-green-500' : 'text-gray-400 hover:text-white'} disabled={isGuest}>
            <ShuffleIcon className="w-5 h-5" />
          </button>
          <button onClick={playPrev} className="text-gray-300 hover:text-white" disabled={isGuest}>
            <SkipPreviousIcon className="w-7 h-7" />
          </button>
          <button onClick={togglePlay} className="w-10 h-10 flex items-center justify-center bg-white text-black rounded-full hover:scale-105 transition-transform disabled:opacity-50" disabled={!currentSong || isGuest}>
            {isPlaying ? <PauseIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6" />}
          </button>
          <button onClick={playNext} className="text-gray-300 hover:text-white" disabled={isGuest}>
            <SkipNextIcon className="w-7 h-7" />
          </button>
          <button onClick={cycleRepeatMode} className={repeatMode !== 'off' ? 'text-green-500' : 'text-gray-400 hover:text-white'} disabled={isGuest}>
            {repeatMode === 'one' ? <RepeatOneIcon className="w-5 h-5" /> : <RepeatIcon className="w-5 h-5" />}
          </button>
        </div>
        <div className="w-full max-w-xl flex items-center space-x-2 mt-2">
          <span className="text-xs text-gray-400 w-10 text-right">{formatTime(progress)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={progress}
            onChange={handleProgressChange}
            className="w-full h-1 bg-gray-700 rounded-full appearance-none cursor-pointer accent-green-500 disabled:accent-gray-600"
            disabled={!currentSong || isGuest}
          />
          <span className="text-xs text-gray-400 w-10">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Right: Volume & Social */}
      <div className="w-1/4 flex items-center justify-end space-x-4">
        <RoomManager />
        <div className="flex items-center space-x-2 w-32">
          <button onClick={toggleMute} className="text-gray-400 hover:text-white">
            {isMuted || volume === 0 ? <VolumeOffIcon className="w-6 h-6" /> : <VolumeUpIcon className="w-6 h-6" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-full h-1 bg-gray-700 rounded-full appearance-none cursor-pointer accent-white"
          />
        </div>
      </div>
    </div>
  );
};
