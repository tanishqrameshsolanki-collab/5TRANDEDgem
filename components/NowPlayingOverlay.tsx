
import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import {
  ChevronDownIcon, PlayIcon, PauseIcon, SkipNextIcon, SkipPreviousIcon,
  ShuffleIcon, RepeatIcon, RepeatOneIcon, VolumeUpIcon, VolumeOffIcon, DEFAULT_ARTWORK
} from '../constants';

const formatTime = (seconds: number) => {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};

export const NowPlayingOverlay: React.FC = () => {
  const {
    isNowPlayingOpen, closeNowPlaying, currentSong, isPlaying, togglePlay,
    playNext, playPrev, progress, duration, seek, volume, setVolume,
    isMuted, toggleMute, isShuffle, toggleShuffle, repeatMode, cycleRepeatMode
  } = useAppContext();

  if (!isNowPlayingOpen || !currentSong) return null;

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    seek(Number(e.target.value));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-3xl z-50 flex flex-col items-center justify-center p-8 animate-fade-in">
      <div className="absolute top-8 left-8">
        <button onClick={closeNowPlaying} className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-full hover:bg-white/20 transition-colors">
          <ChevronDownIcon className="w-8 h-8 text-white" />
        </button>
      </div>

      <div className="flex flex-col items-center w-full max-w-md">
        <img src={currentSong.artwork || DEFAULT_ARTWORK} alt={currentSong.title} className="w-full aspect-square rounded-lg shadow-2xl mb-8" />
        
        <div className="w-full text-center mb-8">
          <h2 className="text-3xl font-bold text-white">{currentSong.title}</h2>
          <p className="text-lg text-gray-400">{currentSong.artist}</p>
        </div>

        <div className="w-full">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={progress}
            onChange={handleProgressChange}
            className="w-full h-1.5 bg-gray-700 rounded-full appearance-none cursor-pointer accent-green-500"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{formatTime(progress)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-8 my-8">
          <button onClick={toggleShuffle} className={isShuffle ? 'text-green-500' : 'text-gray-400 hover:text-white'}>
            <ShuffleIcon className="w-6 h-6" />
          </button>
          <button onClick={playPrev} className="text-gray-300 hover:text-white">
            <SkipPreviousIcon className="w-10 h-10" />
          </button>
          <button onClick={togglePlay} className="w-20 h-20 flex items-center justify-center bg-white text-black rounded-full hover:scale-105 transition-transform shadow-lg">
            {isPlaying ? <PauseIcon className="w-10 h-10" /> : <PlayIcon className="w-10 h-10" />}
          </button>
          <button onClick={playNext} className="text-gray-300 hover:text-white">
            <SkipNextIcon className="w-10 h-10" />
          </button>
          <button onClick={cycleRepeatMode} className={repeatMode !== 'off' ? 'text-green-500' : 'text-gray-400 hover:text-white'}>
            {repeatMode === 'one' ? <RepeatOneIcon className="w-6 h-6" /> : <RepeatIcon className="w-6 h-6" />}
          </button>
        </div>

        <div className="flex items-center space-x-3 w-full max-w-xs">
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
