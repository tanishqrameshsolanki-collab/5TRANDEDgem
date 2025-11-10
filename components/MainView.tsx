
import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { useSettings } from '../contexts/SettingsContext';
import { MOCK_SONGS, MOCK_PLAYLISTS, PlayIcon, SearchIcon, SpinnerIcon, DEFAULT_ARTWORK, SettingsIcon } from '../constants';
import { Song, Playlist } from '../types';

const MusicCard = ({ item, onPlay }: { item: Song | Playlist, onPlay: () => void }) => {
  const isSong = 'artist' in item;
  const artwork = isSong ? item.artwork : MOCK_SONGS.find(s => item.songIds.includes(s.id))?.artwork;
  
  return (
    <div className="group relative p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300 cursor-pointer" onClick={onPlay}>
      <div className="aspect-square w-full bg-gray-800 rounded-md mb-4 overflow-hidden">
        <img src={artwork || DEFAULT_ARTWORK} alt={item.name || (item as Song).title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
          <button onClick={(e) => { e.stopPropagation(); onPlay(); }} className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transform group-hover:scale-100 scale-90 transition-all duration-300 shadow-lg hover:scale-105">
            <PlayIcon className="w-8 h-8" />
          </button>
        </div>
      </div>
      <h3 className="font-bold text-white truncate">{item.name || (item as Song).title}</h3>
      <p className="text-sm text-gray-400 truncate">{isSong ? (item as Song).artist : `Playlist • ${item.songIds.length} songs`}</p>
    </div>
  );
};

const Section: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
  <section className="mb-12">
    <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
      {children}
    </div>
  </section>
);

const HomeView = () => {
  const { playSong, playPlaylist } = useAppContext();
  return (
    <>
      <Section title="For You">
        {MOCK_SONGS.slice(0, 6).map(song => <MusicCard key={song.id} item={song} onPlay={() => playSong(song, MOCK_SONGS)} />)}
      </Section>
      <Section title="Your Playlists">
        {MOCK_PLAYLISTS.slice(0, 6).map(pl => <MusicCard key={pl.id} item={pl} onPlay={() => playPlaylist(pl)} />)}
      </Section>
    </>
  );
};

const BrowseView = () => {
    const { playSong } = useAppContext();
    return (
        <Section title="New Releases">
            {MOCK_SONGS.slice().reverse().map(song => <MusicCard key={song.id} item={song} onPlay={() => playSong(song, MOCK_SONGS)} />)}
        </Section>
    );
};

const LibraryView = () => {
    const { playPlaylist } = useAppContext();
    return (
        <Section title="All Playlists">
            {MOCK_PLAYLISTS.map(pl => <MusicCard key={pl.id} item={pl} onPlay={() => playPlaylist(pl)} />)}
        </Section>
    );
};

const PlaylistView = () => {
    const { activePlaylistId, playSong } = useAppContext();
    const playlist = MOCK_PLAYLISTS.find(p => p.id === activePlaylistId);
    const songs = MOCK_SONGS.filter(s => playlist?.songIds.includes(s.id));

    if (!playlist) return <div className="text-center p-8">Playlist not found.</div>;
    
    const artwork = songs[0]?.artwork || DEFAULT_ARTWORK;

    return (
        <div>
            <div className="flex items-end gap-6 mb-8">
                <div className="w-48 h-48 bg-white/10 rounded-lg shadow-lg flex-shrink-0">
                    <img src={artwork} className="w-full h-full object-cover rounded-lg" alt={playlist.name} />
                </div>
                <div>
                    <h3 className="text-xs font-bold uppercase text-gray-400">Playlist</h3>
                    <h1 className="text-5xl lg:text-7xl font-black text-white">{playlist.name}</h1>
                    <p className="text-gray-300 mt-2">{playlist.owner} • {songs.length} songs</p>
                </div>
            </div>
            <ul>
                {songs.map((song, index) => (
                    <li key={song.id} onClick={() => playSong(song, songs)} className="group flex items-center p-2 rounded-md hover:bg-white/10 cursor-pointer">
                        <div className="w-8 text-center text-gray-400 font-mono">{index + 1}</div>
                        <img src={song.artwork || DEFAULT_ARTWORK} alt={song.title} className="w-10 h-10 rounded-md ml-4 mr-4" />
                        <div className="flex-grow">
                            <p className="text-white font-semibold">{song.title}</p>
                            <p className="text-gray-400 text-sm">{song.artist}</p>
                        </div>
                        <div className="text-gray-400 text-sm">{Math.floor(song.duration / 60)}:{String(song.duration % 60).padStart(2, '0')}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const SearchView = () => {
  const { search, searchResults, isSearching, searchError, playSong } = useAppContext();
  const { openSettings, areKeysSet } = useSettings();
  const [query, setQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      search(query);
      setHasSearched(true);
    }
  };

  const renderContent = () => {
    if (isSearching) {
      return (
        <div className="flex justify-center items-center p-16" role="status">
          <SpinnerIcon className="w-12 h-12 animate-spin text-green-500" />
        </div>
      );
    }

    if (searchError) {
      const isApiError = searchError.includes("API keys");
      return (
        <div className="text-center p-8 text-yellow-400 bg-yellow-500/10 rounded-lg" role="alert">
          <p className="font-semibold">{searchError}</p>
          {isApiError && (
            <button onClick={openSettings} className="mt-4 flex items-center gap-2 mx-auto bg-green-500 text-black font-bold px-4 py-2 rounded-full text-sm hover:scale-105 transition-transform">
              <SettingsIcon className="w-5 h-5" />
              Configure API Keys
            </button>
          )}
        </div>
      );
    }

    if (searchResults.length > 0) {
      return (
        <ul>
          {searchResults.map((song, index) => (
            <li 
              key={song.id} 
              onClick={() => playSong(song, searchResults)} 
              className="group flex items-center p-3 rounded-md hover:bg-white/10 cursor-pointer transition-colors"
            >
              <div className="w-8 text-center text-gray-400 font-mono flex-shrink-0">{index + 1}</div>
              <img src={song.artwork || DEFAULT_ARTWORK} alt={song.title} className="w-12 h-12 rounded-md ml-4 mr-4 object-cover flex-shrink-0" />
              <div className="flex-grow min-w-0">
                <p className="text-white font-semibold truncate">{song.title}</p>
                <p className="text-gray-400 text-sm truncate">{song.artist}</p>
              </div>
              <div className="text-gray-400 text-sm ml-4 flex-shrink-0">{song.duration ? `${Math.floor(song.duration / 60)}:${String(song.duration % 60).padStart(2, '0')}` : '-:--'}</div>
            </li>
          ))}
        </ul>
      );
    }

    if (hasSearched) {
      return <div className="text-center p-8 text-gray-400">No results found for "{query}".</div>;
    }

    return (
      <div className="text-center p-16 text-gray-500">
        <h3 className="text-xl font-bold">Find your favorite music</h3>
        <p>Search for any song and play it instantly.</p>
        {!areKeysSet && 
            <p className="mt-4 text-yellow-500 text-sm">API Keys are not configured. Please set them in Settings to enable search.</p>
        }
      </div>
    );
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="relative mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for songs, artists, albums..."
          className="w-full bg-white/10 border border-transparent focus:border-green-500 focus:ring-green-500 rounded-full px-6 py-4 text-lg text-white placeholder-gray-400 focus:outline-none transition-colors"
          aria-label="Search for music"
        />
        <button type="submit" className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white" aria-label="Submit search">
          <SearchIcon className="w-6 h-6" />
        </button>
      </form>
      {renderContent()}
    </div>
  );
};

export const MainView: React.FC = () => {
  const { activeView } = useAppContext();

  const renderView = () => {
    switch (activeView) {
      case 'home': return <HomeView />;
      case 'browse': return <BrowseView />;
      case 'library': return <LibraryView />;
      case 'playlist': return <PlaylistView />;
      case 'search': return <SearchView />;
      default: return <HomeView />;
    }
  };

  return (
    <div className="flex-grow h-full overflow-y-auto p-8">
      {renderView()}
    </div>
  );
};
