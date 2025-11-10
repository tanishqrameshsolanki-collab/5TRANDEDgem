
import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';

interface ApiKeys {
  geminiApiKey: string;
  spotifyClientId: string;
  spotifyClientSecret: string;
  spotifyRedirectUri: string;
}

interface SettingsContextType {
  keys: ApiKeys;
  saveKeys: (newKeys: ApiKeys) => void;
  isSettingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
  areKeysSet: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const getInitialKeys = (): ApiKeys => {
  try {
    const storedKeys = localStorage.getItem('stranded_api_keys');
    if (storedKeys) {
      const parsed = JSON.parse(storedKeys);
      // Ensure spotifyRedirectUri has a default if it's missing from old storage
      if (!parsed.spotifyRedirectUri) {
        parsed.spotifyRedirectUri = 'http://localhost:3000/callback';
      }
      return parsed;
    }
  } catch (error) {
    console.error("Failed to parse API keys from localStorage", error);
  }
  return {
    geminiApiKey: '',
    spotifyClientId: '',
    spotifyClientSecret: '',
    spotifyRedirectUri: 'http://localhost:3000/callback',
  };
};

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [keys, setKeys] = useState<ApiKeys>(getInitialKeys);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('stranded_api_keys', JSON.stringify(keys));
    } catch (error) {
      console.error("Failed to save API keys to localStorage", error);
    }
  }, [keys]);

  const saveKeys = (newKeys: ApiKeys) => {
    setKeys(newKeys);
  };

  const openSettings = () => setIsSettingsOpen(true);
  const closeSettings = () => setIsSettingsOpen(false);

  const areKeysSet = useMemo(() => {
    return !!(keys.geminiApiKey && keys.spotifyClientId && keys.spotifyClientSecret && keys.spotifyRedirectUri);
  }, [keys]);

  const value = {
    keys,
    saveKeys,
    isSettingsOpen,
    openSettings,
    closeSettings,
    areKeysSet,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
