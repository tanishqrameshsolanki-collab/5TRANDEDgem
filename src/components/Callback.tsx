
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { SpinnerIcon } from '../constants';

export const Callback: React.FC = () => {
  const { handleSpotifyCallback } = useAppContext();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const storedState = localStorage.getItem('spotify_auth_state');

    if (state === null || state !== storedState) {
      setError("State mismatch. Please try logging in again.");
    } else if (code) {
      localStorage.removeItem('spotify_auth_state');
      handleSpotifyCallback(code)
        .then(() => {
          window.location.href = '/';
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to authenticate with Spotify. Please try again.");
        });
    } else {
        setError("No authorization code found. Please try logging in again.");
    }
  }, [handleSpotifyCallback]);

  return (
    <div className="w-screen h-screen bg-[#121212] flex flex-col justify-center items-center text-white gap-4">
      {error ? (
        <>
            <p className="text-red-500">{error}</p>
            <a href="/" className="underline">Go back home</a>
        </>
      ) : (
        <>
          <SpinnerIcon className="w-12 h-12 animate-spin text-green-500" />
          <p>Authenticating with Spotify...</p>
        </>
      )}
    </div>
  );
};
