
import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { useSettings } from '../contexts/SettingsContext';
import { VinylLogoIcon, SettingsIcon } from '../constants';

const SpotifyLoginButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="w-full max-w-sm flex items-center justify-center gap-4 bg-[#1DB954] hover:bg-[#1ED760] text-white font-bold py-3 px-4 rounded-lg transition-all duration-200"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2m4.634 14.012c-.24.355-.76.47-1.115.228-2.945-1.803-6.635-2.22-11.037-1.213-.456.103-.91-.19-.993-.645-.103-.456.19-.91.645-.993 4.852-1.115 8.982-.635 12.28 1.38.355.24.47.76.228 1.115m.84-2.648c-.298.434-.9.588-1.334.29-3.33-2.04-8.32-2.61-12.35-1.428-.546.147-1.115-.19-1.262-.735-.147-.546.19-1.115.735-1.262 4.558-1.334 9.987-.71 13.75 1.615.434.298.588.9.29 1.334M12 6.75c-5.14 0-9.25 4.11-9.25 9.25S6.86 25.25 12 25.25 21.25 21.14 21.25 16 17.14 6.75 12 6.75m5.885 6.413c-3.88-2.37-10.21-2.74-14.48-1.51-.63.19-.88.88-.69 1.51.19.63.88.88 1.51.69 3.75-1.11 9.45-.78 12.81 1.33.58.35.99.02.99-.62-.01-.64-.42-.97-1.14-1.4z"/>
    </svg>
    Login with Spotify
  </button>
);

export const Login: React.FC = () => {
  const { login } = useAppContext();
  const { openSettings, areKeysSet } = useSettings();

  return (
    <div className="w-screen h-screen bg-[#121212] flex flex-col justify-center items-center p-4">
      <div className="text-left absolute top-5 left-5 font-bold text-lg text-white">Stranded</div>
      <div className="flex flex-col items-center text-center gap-8">
        <VinylLogoIcon />
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-white">A Social Music Experience</h1>
          <h1 className="text-xl font-normal text-gray-400">Listen along with friends, in real-time.</h1>
        </div>
        <div className="flex flex-col items-center gap-4 w-full mt-4">
          <SpotifyLoginButton onClick={login} />
           {!areKeysSet && (
            <p className="text-xs text-yellow-400 text-center mt-2">
                Admin: API keys are not set. Please configure them in settings.
            </p>
           )}
        </div>
      </div>
      <div className="absolute bottom-5 right-5">
        <button onClick={openSettings} className="p-3 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors" aria-label="Settings">
            <SettingsIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
