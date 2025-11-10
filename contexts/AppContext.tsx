
import React, { createContext, useState, useContext, useRef, useEffect, useCallback, useMemo } from 'react';
import { Song, View, RepeatMode, User, ChatMessage, Playlist, Room, PlayerState } from '../types';
import { MOCK_SONGS, MOCK_PLAYLISTS } from '../constants';
import { useGeminiSearch, GeminiSearchResult } from '../hooks/useGeminiSearch';
import { socketService } from '../services/socketService';
import { SpotifyService } from '../services/spotifyService';
import { useSettings } from './SettingsContext';

interface YTPlayer {
    playVideo: () => void;
    pauseVideo: () => void;
    seekTo: (seconds: number, allowSeekAhead: boolean) => void;
    getDuration: () => number;
    getCurrentTime: () => number;
    setVolume: (volume: number) => void;
    mute: () => void;
    unMute: () => void;
    getPlayerState: () => number;
}

interface SpotifyAuthState {
    accessToken: string | null;
    refreshToken: string | null;
    expiresAt: number | null;
}

interface AppContextType {
  currentUser: User | null;
  login: () => void;
  handleSpotifyCallback: (code: string) => Promise<void>;
  activeView: View;
  setActiveView: (view: View) => void;
  activePlaylistId: string | null;
  setActivePlaylistId: (id: string | null) => void;
  songs: Song[];
  currentSong: Song | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
  isShuffle: boolean;
  repeatMode: RepeatMode;
  isMuted: boolean;
  playPlaylist: (playlist: Playlist) => void;
  playSong: (song: Song, playlist: Song[]) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrev: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  toggleShuffle: () => void;
  cycleRepeatMode: () => void;
  isNowPlayingOpen: boolean;
  openNowPlaying: () => void;
  closeNowPlaying: () => void;
  room: Room | null;
  createRoom: () => void;
  joinRoom: (roomId: string) => void;
  leaveRoom: () => void;
  sendMessage: (message: string) => void;
  searchResults: Song[];
  isSearching: boolean;
  searchError: string | null;
  search: (query: string) => Promise<void>;
  onPlayerReady: (event: { target: YTPlayer }) => void;
  onPlayerStateChange: (event: { data: number; target: YTPlayer }) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { keys, areKeysSet } = useSettings();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [spotifyAuth, setSpotifyAuth] = useState<SpotifyAuthState>({ accessToken: null, refreshToken: null, expiresAt: null });
  
  const [activeView, setActiveView] = useState<View>('home');
  const [activePlaylistId, setActivePlaylistId] = useState<string | null>(null);
  const [songs, setSongs] = useState<Song[]>(MOCK_SONGS);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.75);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>('off');
  const [isNowPlayingOpen, setIsNowPlayingOpen] = useState(false);
  const [room, setRoom] = useState<Room | null>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const progressIntervalRef = useRef<number | null>(null);
  const lastSyncTimeRef = useRef(0);
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const { findSongIds, isSearching, error: geminiError } = useGeminiSearch(keys.geminiApiKey);
  const [apiError, setApiError] = useState<string|null>(null);
  const searchError = geminiError || apiError;
  const spotifyServiceRef = useRef(new SpotifyService(keys.spotifyClientId, keys.spotifyClientSecret));

  useEffect(() => {
    spotifyServiceRef.current = new SpotifyService(keys.spotifyClientId, keys.spotifyClientSecret);
  }, [keys]);

  const login = () => {
    if (!areKeysSet) {
        alert("Please set API keys in Settings first.");
        return;
    }
    const state = Math.random().toString(36).substring(2);
    localStorage.setItem('spotify_auth_state', state);
    const scopes = 'user-read-private user-read-email';
    const authUrl = 'https://accounts.spotify.com/authorize?' +
      new URLSearchParams({
        response_type: 'code',
        client_id: keys.spotifyClientId,
        scope: scopes,
        redirect_uri: keys.spotifyRedirectUri,
        state: state
      }).toString();
    window.location.href = authUrl;
  };

  const handleSpotifyCallback = async (code: string) => {
    try {
        const { access_token, refresh_token, expires_in } = await spotifyServiceRef.current.exchangeCodeForToken(code, keys.spotifyRedirectUri);
        const expiresAt = Date.now() + expires_in * 1000;
        setSpotifyAuth({ accessToken: access_token, refreshToken: refresh_token, expiresAt });
        
        // Fetch user profile
        const profile = await spotifyServiceRef.current.getUserProfile(access_token);
        const user: User = {
            id: profile.id,
            name: profile.display_name,
            avatar: profile.images?.[0]?.url || `https://i.pravatar.cc/150?u=${profile.id}`,
            role: 'guest'
        };
        setCurrentUser(user);
    } catch (error) {
        console.error("Spotify callback error:", error);
    }
  };

  useEffect(() => {
    if (!currentUser) return;
    socketService.connect(currentUser);
    const onRoomUpdated = (newRoom: Room | null) => {
        setRoom(newRoom);
        if (newRoom) {
            setCurrentUser(u => u ? { ...u, role: newRoom.users.find(ru => ru.id === u.id)?.role || 'guest' } : null);
            if (newRoom.users.find(u => u.id === currentUser?.id)?.role === 'guest') handlePlayerStateSync(newRoom.playerState);
        } else {
            setCurrentUser(u => u ? { ...u, role: 'guest' } : null);
        }
    };
    const onNewMessage = (message: ChatMessage) => setRoom(r => r ? { ...r, messages: [...r.messages, message] } : null);
    const onUserJoined = (user: User) => setRoom(r => r ? { ...r, users: [...r.users, user] } : null);
    const onUserLeft = (userId: string) => setRoom(r => r ? { ...r, users: r.users.filter(u => u.id !== userId) } : null);
    const onPlayerStateChanged = (playerState: PlayerState) => { if (currentUser?.role === 'guest') handlePlayerStateSync(playerState); };
    const unsubscribers = [
        socketService.on('room-updated', onRoomUpdated),
        socketService.on('new-message', onNewMessage),
        socketService.on('user-joined', onUserJoined),
        socketService.on('user-left', onUserLeft),
        socketService.on('player-state-changed', onPlayerStateChanged)
    ];
    return () => { unsubscribers.forEach(unsub => unsub()); socketService.disconnect(); };
  }, [currentUser?.id]);

  const handlePlayerStateSync = (state: PlayerState) => {
    setSongs(state.playlist);
    setCurrentSong(state.currentSong);
    setIsPlaying(state.isPlaying);
    const timeDiff = (Date.now() - state.timestamp) / 1000;
    const newProgress = state.progress + timeDiff;
    if (playerRef.current) {
        if (playerRef.current.getPlayerState() !== 1 && state.isPlaying) playerRef.current.playVideo();
        else if (playerRef.current.getPlayerState() === 1 && !state.isPlaying) playerRef.current.pauseVideo();
        if (Math.abs(playerRef.current.getCurrentTime() - newProgress) > 2) playerRef.current.seekTo(newProgress, true);
    }
    setProgress(newProgress);
  };

  useEffect(() => {
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    if (isPlaying && playerRef.current) {
      progressIntervalRef.current = window.setInterval(() => {
        const newProgress = playerRef.current?.getCurrentTime() || 0;
        setProgress(newProgress);
        if (currentUser?.role === 'host' && room && Date.now() - lastSyncTimeRef.current > 2000) {
            socketService.syncPlayerState({ currentSong, isPlaying, progress: newProgress, timestamp: Date.now(), playlist: songs });
            lastSyncTimeRef.current = Date.now();
        }
      }, 250);
    }
    return () => { if (progressIntervalRef.current) clearInterval(progressIntervalRef.current); };
  }, [isPlaying, currentUser?.role, room, currentSong, songs]);

  const syncPlayerStateNow = (state: Partial<PlayerState>) => {
    if (currentUser?.role !== 'host' || !room) return;
    const fullState: PlayerState = {
        currentSong: state.currentSong !== undefined ? state.currentSong : currentSong,
        isPlaying: state.isPlaying !== undefined ? state.isPlaying : isPlaying,
        progress: state.progress !== undefined ? state.progress : progress,
        playlist: state.playlist !== undefined ? state.playlist : songs,
        timestamp: Date.now(),
    };
    socketService.syncPlayerState(fullState);
  };

  const playSong = useCallback((songToPlay: Song, playlist: Song[]) => {
    if (currentUser?.role === 'guest' && room) return;
    const isNewContext = songs.map(s => s.id).join() !== playlist.map(s => s.id).join();
    if (currentSong?.id === songToPlay.id && !isNewContext) {
        togglePlay();
    } else {
        setSongs(playlist);
        setCurrentSong(songToPlay);
        setIsPlaying(true);
        setProgress(0);
        syncPlayerStateNow({ currentSong: songToPlay, isPlaying: true, progress: 0, playlist });
    }
  }, [songs, currentSong, currentUser?.role, room, togglePlay]);

  const playPlaylist = useCallback((playlist: Playlist) => {
    const playlistSongs = MOCK_SONGS.filter(s => playlist.songIds.includes(s.id));
    if (playlistSongs.length > 0) playSong(playlistSongs[0], playlistSongs);
  }, [playSong]);

  const togglePlay = useCallback(() => {
    if (currentUser?.role === 'guest' && room) return;
    const player = playerRef.current;
    if (!player) return;
    const playerState = player.getPlayerState();
    const newIsPlaying = playerState !== 1;
    if (newIsPlaying) player.playVideo(); else player.pauseVideo();
    setIsPlaying(newIsPlaying);
    syncPlayerStateNow({ isPlaying: newIsPlaying, progress: player.getCurrentTime() });
  }, [currentUser?.role, room]);

  const playNext = useCallback(() => {
    if (currentUser?.role === 'guest' && room) return;
    if (songs.length === 0) return;
    const currentIndex = songs.findIndex(s => s.id === currentSong?.id);
    let nextIndex = currentIndex + 1;
    if (nextIndex >= songs.length) nextIndex = 0;
    playSong(songs[nextIndex], songs);
  }, [currentUser?.role, room, songs, currentSong, playSong]);

  const playPrev = useCallback(() => {
    if (currentUser?.role === 'guest' && room) return;
    if (songs.length === 0) return;
    if ((playerRef.current?.getCurrentTime() || 0) > 3) { seek(0); return; }
    const currentIndex = songs.findIndex(s => s.id === currentSong?.id);
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) prevIndex = songs.length - 1;
    playSong(songs[prevIndex], songs);
  }, [currentUser?.role, room, songs, currentSong, playSong, seek]);

  const seek = useCallback((time: number) => {
    if (currentUser?.role === 'guest' && room) return;
    playerRef.current?.seekTo(time, true);
    setProgress(time);
    syncPlayerStateNow({ progress: time });
  }, [currentUser?.role, room]);

  const onPlayerReady = (event: { target: YTPlayer }) => {
    playerRef.current = event.target;
    event.target.setVolume(volume * 100);
    if (isMuted) event.target.mute();
    if (isPlaying) event.target.playVideo();
  };

  const onPlayerStateChange = (event: { data: number; target: YTPlayer }) => {
    switch(event.data) {
        case 0: isPlaying && playNext(); break;
        case 1: setIsPlaying(true); setDuration(event.target.getDuration()); break;
        case 2: setIsPlaying(false); break;
        default: break;
    }
  };

  const search = async (query: string) => {
    if (!areKeysSet) { setApiError("API keys are not set. Please configure them in Settings."); return; }
    if (!query.trim()) { setSearchResults([]); return; }
    setApiError(null);
    const geminiResults = await findSongIds(query);
    if (geminiResults.length === 0) { setSearchResults([]); return; }
    try {
        const spotifyIds = geminiResults.map(r => r.spotifyId).filter(id => id);
        if (spotifyIds.length === 0) { setApiError("Could not find Spotify IDs for the search results."); setSearchResults([]); return; }
        const spotifyTracks = await spotifyServiceRef.current.getMultipleTrackDetails(spotifyIds, spotifyAuth.accessToken!);
        const finalResults = geminiResults.map(geminiTrack => {
            const spotifyData = spotifyTracks.find(st => st.id === geminiTrack.spotifyId);
            return { ...geminiTrack, id: spotifyData?.id || geminiTrack.spotifyId, album: spotifyData?.album || 'Unknown Album', duration: spotifyData?.duration || 0, artwork: spotifyData?.artwork || '' } as Song;
        });
        setSearchResults(finalResults);
    } catch (e) {
        console.error("Error fetching from Spotify:", e);
        setApiError("Could not fetch metadata from Spotify. Check your credentials.");
        setSearchResults([]);
    }
  };

  const setVolumeHandler = (newVolume: number) => { setVolume(newVolume); playerRef.current?.setVolume(newVolume * 100); };
  const toggleMute = () => { setIsMuted(m => { const nm = !m; if(nm) playerRef.current?.mute(); else playerRef.current?.unMute(); return nm; }); };
  const toggleShuffle = () => setIsShuffle(s => !s);
  const cycleRepeatMode = () => setRepeatMode(m => { const modes: RepeatMode[] = ['off', 'all', 'one']; return modes[(modes.indexOf(m) + 1) % modes.length]; });
  const openNowPlaying = () => setIsNowPlayingOpen(true);
  const closeNowPlaying = () => setIsNowPlayingOpen(false);
  const createRoom = () => { if (!currentSong) return; const initialState: PlayerState = { currentSong, isPlaying, progress, timestamp: Date.now(), playlist: songs }; socketService.createRoom(initialState); };
  const joinRoom = (roomId: string) => socketService.joinRoom(roomId);
  const leaveRoom = () => socketService.leaveRoom();
  const sendMessage = (message: string) => socketService.sendMessage(message);

  const value = useMemo(() => ({
    currentUser, login, handleSpotifyCallback,
    activeView, setActiveView, activePlaylistId, setActivePlaylistId,
    songs, currentSong, isPlaying, progress, duration, volume, isShuffle, repeatMode, isMuted,
    playPlaylist, playSong, togglePlay, playNext, playPrev, seek, setVolume: setVolumeHandler, toggleMute, toggleShuffle, cycleRepeatMode,
    isNowPlayingOpen, openNowPlaying, closeNowPlaying,
    room, createRoom, joinRoom, leaveRoom, sendMessage,
    searchResults, isSearching, searchError, search,
    onPlayerReady, onPlayerStateChange,
  }), [
    currentUser, activeView, activePlaylistId, songs, currentSong, isPlaying, progress, duration, volume, isShuffle, repeatMode, isMuted,
    isNowPlayingOpen, room, searchResults, isSearching, searchError, playPlaylist, playSong, togglePlay, playNext, playPrev, seek
  ]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) throw new Error('useAppContext must be used within an AppProvider');
  return context;
};
