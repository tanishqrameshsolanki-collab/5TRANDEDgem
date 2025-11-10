
import React from 'react';
import YouTube from 'react-youtube';
import { useAppContext } from '../contexts/AppContext';

export const YouTubePlayerComponent: React.FC = () => {
  const { currentSong, onPlayerReady, onPlayerStateChange } = useAppContext();

  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 1,
      controls: 0,
    },
  };

  // We only render the player if there's a song to play.
  // The key forces a re-mount of the component when the song changes,
  // which is the easiest way to load a new video with react-youtube.
  if (!currentSong) {
    return null;
  }

  return (
    <div style={{ position: 'absolute', top: -9999, left: -9999 }} aria-hidden="true">
      <YouTube
        key={currentSong.youtubeId}
        videoId={currentSong.youtubeId}
        opts={opts}
        onReady={onPlayerReady}
        onStateChange={onPlayerStateChange}
        onError={(e) => console.error('YouTube Player Error', e)}
      />
    </div>
  );
};
