
import React, { useState, useEffect } from 'react';
import { useSettings } from '../contexts/SettingsContext';

export const SettingsModal: React.FC = () => {
  const { isSettingsOpen, closeSettings, saveKeys, keys: initialKeys } = useSettings();
  const [keys, setKeys] = useState(initialKeys);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setKeys(initialKeys);
  }, [initialKeys, isSettingsOpen]);

  if (!isSettingsOpen) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeys({ ...keys, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    saveKeys(keys);
    closeSettings();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(keys.spotifyRedirectUri);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={closeSettings}
    >
      <div 
        className="bg-[#181818] rounded-xl shadow-2xl p-8 w-full max-w-lg border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-white mb-6">API Key Settings</h2>
        <p className="text-gray-400 mb-6 text-sm">
          Enter your API keys to enable search and metadata fetching. These keys are stored securely in your browser's local storage and are never sent to our servers.
        </p>
        <div className="space-y-4">
          <div>
            <label htmlFor="geminiApiKey" className="block text-sm font-medium text-gray-300 mb-1">
              Gemini API Key
            </label>
            <input
              type="password"
              id="geminiApiKey"
              name="geminiApiKey"
              value={keys.geminiApiKey}
              onChange={handleChange}
              className="w-full bg-black/30 border border-white/20 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label htmlFor="spotifyClientId" className="block text-sm font-medium text-gray-300 mb-1">
              Spotify Client ID
            </label>
            <input
              type="password"
              id="spotifyClientId"
              name="spotifyClientId"
              value={keys.spotifyClientId}
              onChange={handleChange}
              className="w-full bg-black/30 border border-white/20 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label htmlFor="spotifyClientSecret" className="block text-sm font-medium text-gray-300 mb-1">
              Spotify Client Secret
            </label>
            <input
              type="password"
              id="spotifyClientSecret"
              name="spotifyClientSecret"
              value={keys.spotifyClientSecret}
              onChange={handleChange}
              className="w-full bg-black/30 border border-white/20 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label htmlFor="spotifyRedirectUri" className="block text-sm font-medium text-gray-300 mb-1">
              Spotify Redirect URI
            </label>
            <div className="flex gap-2">
                <input
                  type="text"
                  id="spotifyRedirectUri"
                  name="spotifyRedirectUri"
                  value={keys.spotifyRedirectUri}
                  onChange={handleChange}
                  className="w-full bg-black/30 border border-white/20 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button 
                    onClick={handleCopy}
                    className="px-4 py-2 text-sm rounded-md bg-white/10 text-gray-300 hover:bg-white/20 transition-colors"
                >
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
                Paste this URL into your Spotify Developer Dashboard's settings.
            </p>
          </div>
        </div>
        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={closeSettings}
            className="px-4 py-2 rounded-md text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-md bg-green-500 text-black font-bold hover:bg-green-400 transition-colors"
          >
            Save Keys
          </button>
        </div>
      </div>
    </div>
  );
};
