
import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { useSettings } from '../contexts/SettingsContext';
import { HomeIcon, BrowseIcon, LibraryIcon, SearchIcon, PlusIcon, SettingsIcon } from '../constants';
import { MOCK_PLAYLISTS } from '../constants';

const NavItem = ({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) => (
  <li
    onClick={onClick}
    className={`flex items-center space-x-4 px-4 py-2 rounded-md cursor-pointer transition-colors duration-200 ${
      active ? 'text-white bg-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'
    }`}
  >
    {icon}
    <span className="font-semibold">{label}</span>
  </li>
);

export const Sidebar: React.FC = () => {
  const { activeView, setActiveView, setActivePlaylistId, playPlaylist } = useAppContext();
  const { openSettings } = useSettings();

  const handlePlaylistClick = (playlistId: string) => {
    const playlist = MOCK_PLAYLISTS.find(p => p.id === playlistId);
    if (playlist) {
        setActiveView('playlist');
        setActivePlaylistId(playlistId);
        playPlaylist(playlist);
    }
  };

  return (
    <div className="w-64 h-full flex-shrink-0 glass-pane rounded-lg p-2 flex flex-col space-y-4">
      <div className="px-4 pt-2">
        <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
      </div>
      <nav className="px-2">
        <ul className="space-y-1">
          <NavItem icon={<HomeIcon className="w-6 h-6" />} label="Listen Now" active={activeView === 'home'} onClick={() => setActiveView('home')} />
          <NavItem icon={<BrowseIcon className="w-6 h-6" />} label="Browse" active={activeView === 'browse'} onClick={() => setActiveView('browse')} />
          <NavItem icon={<LibraryIcon className="w-6 h-6" />} label="Library" active={activeView === 'library'} onClick={() => setActiveView('library')} />
          <NavItem icon={<SearchIcon className="w-6 h-6" />} label="Search" active={activeView === 'search'} onClick={() => setActiveView('search')} />
        </ul>
      </nav>
      <div className="px-4 flex-grow overflow-y-auto">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Playlists</h2>
        <ul className="space-y-1">
          {MOCK_PLAYLISTS.map(playlist => (
            <li 
              key={playlist.id} 
              onClick={() => handlePlaylistClick(playlist.id)}
              className="text-gray-400 hover:text-white text-sm font-medium truncate cursor-pointer py-1.5 px-2 rounded-md transition-colors duration-200 hover:bg-white/5"
            >
              {playlist.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="p-2 border-t border-white/10 flex items-center gap-2">
        <button className="flex-grow flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200">
          <PlusIcon className="w-5 h-5" />
          <span className="font-semibold text-sm">New Playlist</span>
        </button>
        <button onClick={openSettings} className="flex-shrink-0 px-3 py-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors duration-200" aria-label="Settings">
            <SettingsIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
