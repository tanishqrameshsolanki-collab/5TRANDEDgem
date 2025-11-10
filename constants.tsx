
import React from 'react';
import { Song, Playlist, User } from './types';

// --- ICONS ---
export const PlayIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M8 5v14l11-7z" /></svg>
);
export const PauseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
);
export const SkipNextIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" /></svg>
);
export const SkipPreviousIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M6 6h2v12H6V6zm3.5 6l8.5 6V6l-8.5 6z" /></svg>
);
export const VolumeUpIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" /></svg>
);
export const VolumeOffIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" /></svg>
);
export const ShuffleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z" /></svg>
);
export const RepeatIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" /></svg>
);
export const RepeatOneIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4zm-4-2V9h-1l-2 1v1h1.5v3H13z" /></svg>
);
export const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg>
);
export const BrowseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" /></svg>
);
export const LibraryIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H8v-2h4V8h2v4h4v2z" /></svg>
);
export const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /></svg>
);
export const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></svg>
);
export const UsersIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" /></svg>
);
export const ChevronDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" /></svg>
);
export const MessageIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" /></svg>
);
export const SpinnerIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
);
export const RadioIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M3.24 6.15C2.51 6.43 2 7.17 2 8v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2H8.3l8.26-3.34L15.28 1 3.24 6.15zM7 20c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm13-8h-2v-2h2v2z" /></svg>
);
export const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        <path d="M1 1h22v22H1z" fill="none" />
    </svg>
);
export const AppleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M20.435 15.026c-.448 1.445-1.532 2.62-2.936 3.442-1.427.834-3.03.99-4.521.97-1.588-.03-3.262-.78-4.418-2.125-1.142-1.328-2.06-3.228-1.8-5.133.243-1.813 1.4-3.442 2.87-4.327 1.447-.87 3.113-1.033 4.65-.977.732.017 1.482.163 2.233.438.713.263 1.36.613 1.943 1.032-.1-.017-.217-.034-.333-.05-.117-.017-.242-.017-.375-.017-1.717 0-3.292.71-4.417 1.84-1.158 1.14-1.842 2.71-1.842 4.358 0 1.587.617 3.083 1.708 4.192 1.084 1.1 2.567 1.758 4.15 1.758.2 0 .4-.017.6-.034.2-.017.4-.05.584-.083.016-.017.033-.017.05-.034.133-.05.267-.1.4-.15.1-.05.2-.1.3-.167.033-.033.067-.05.1-.083.067-.05.133-.117.2-.184.066-.083.133-.166.183-.266.05-.1.1-.217.15-.334.033-.116.067-.233.083-.35.017-.116.034-.241.034-.366 0-.117-.017-.233-.017-.35-.017-.117-.05-.233-.084-.35-.033-.1-.066-.2-.1-.283-.05-.083-.1-.167-.166-.25-.067-.067-.133-.133-.217-.2-.083-.067-.166-.117-.25-.167-.1-.05-.2-.083-.317-.116-.116-.034-.233-.067-.35-.084-.117-.033-.233-.05-.366-.066a.303.303 0 0 1-.1-.017c-.067 0-.116-.017-.167-.017-.1 0-.2 0-.283.017-.084.017-.167.017-.25.034l-.283.083c-.084.034-.167.067-.25.1-.1.034-.183.067-.283.117-.084.05-.167.1-.25.15-.083.067-.167.133-.233.217-.067.083-.134.166-.184.266-.1.2-.183.4-.25.617-.067.217-.1.433-.1.667.016.216.05.425.1.633.05.208.117.408.2.6.083.183.183.358.3.525.117.167.242.317.383.45.15.15.317.284.484.392.166.116.34.216.525.3.183.084.375.15.575.2.2.05.4.083.6.116.217.034.425.05.642.05.1 0 .2 0 .283-.016.1-.017.183-.017.283-.034.1-.017.2-.05.283-.066.1-.034.2-.067.283-.1.1-.05.2-.1.284-.15.083-.067.166-.133.233-.2.15-.133.283-.3.4-.483.117-.184.217-.384.3-.6.083-.217.15-.442.183-.675.034-.233.05-.475.05-.717-.017-1.25-.3-2.35-1.05-3.325zM15.85 2.344a6.25 6.25 0 0 0-4.383 1.758c-.4.4-.75.834-1.05 1.3-.3.467-.517.975-.65 1.525-.133.55-.167 1.117-.1 2.017.316.017.633.017.95 0 .25-.017.5-.05.75-.1.25-.05.5-.116.733-.2.234-.083.45-.183.667-.3.217-.116.417-.25.6-.4.183-.15.35-.317.5-.5.15-.183.283-.383.4-.6.117-.216.217-.45.3-.7.083-.25.15-.516.183-.791.034-.275.05-.55.05-.834a2.35 2.35 0 0 0-.05-.5c-.017-.15-.033-.283-.067-.416-.033-.133-.083-.267-.133-.384a1.92 1.92 0 0 0-.2-.35c-.084-.116-.167-.216-.267-.316-.1-.1-.2-.184-.317-.267-.116-.083-.233-.15-.366-.217-.134-.066-.267-.116-.417-.166-.15-.05-.3-.084-.45-.117-.15-.033-.3-.05-.466-.066-.167-.017-.334-.017-.5-.017z" />
    </svg>
);
export const VinylLogoIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <div className="w-24 h-24 rounded-3xl bg-gray-800/50 p-2 shadow-lg border border-white/10">
        <div className="w-full h-full rounded-2xl bg-gray-900 flex items-center justify-center relative overflow-hidden">
            <svg width="100" height="100" viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                <defs>
                    <linearGradient id="vinylGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor: '#ff00c1', stopOpacity: 1}} />
                        <stop offset="100%" style={{stopColor: '#9933ff', stopOpacity: 1}} />
                    </linearGradient>
                    <filter id="blur">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
                    </filter>
                </defs>
                <rect width="100" height="100" fill="url(#vinylGradient)" filter="url(#blur)" />
            </svg>
            <div className="w-5 h-5 bg-gray-900 rounded-full z-10 border-2 border-gray-700"></div>
        </div>
    </div>
);
export const SettingsIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
        <circle cx="12" cy="12" r="3"/>
    </svg>
);


// --- CONSTANTS ---
export const DEFAULT_ARTWORK = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzRBNUE1MyIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjEwIj48L2NpcmNsZT48cGF0aCBkPSJNMTYgOHY4bS00LTZoMnY2bS00LTJIODYiLz48L3N2Zz4=';


// --- MOCK DATA ---

export const MOCK_USERS: User[] = [
    { id: 'user-1', name: 'Alex', avatar: 'https://i.pravatar.cc/150?u=alex', role: 'host' },
    { id: 'user-2', name: 'Maria', avatar: 'https://i.pravatar.cc/150?u=maria', role: 'dj' },
    { id: 'user-3', name: 'Chris', avatar: 'https://i.pravatar.cc/150?u=chris', role: 'guest' },
];

export const MOCK_SONGS: Song[] = [
  { id: 'song-1', title: 'Mirage', artist: 'Else', album: 'Mirage', duration: 263, artwork: 'https://i.scdn.co/image/ab67616d0000b273f0a905346987434693a05294', youtubeId: '_p9Iq2iA8sU' },
  { id: 'song-2', title: 'Genesis', artist: 'Grimes', album: 'Visions', duration: 255, artwork: 'https://i.scdn.co/image/ab67616d0000b273e7aff22632028c3364b72280', youtubeId: '1FH-q0I1fJY' },
  { id: 'song-3', title: 'Midnight City', artist: 'M83', album: 'Hurry Up, We\'re Dreaming', duration: 243, artwork: 'https://i.scdn.co/image/ab67616d0000b273468bf18cb433947479546453', youtubeId: 'dX3k_QDnzHE' },
  { id: 'song-4', title: 'A Sky Full of Stars', artist: 'Coldplay', album: 'Ghost Stories', duration: 268, artwork: 'https://i.scdn.co/image/ab67616d0000b2730913c575732a85a851520a08', youtubeId: 'VPRjCeoBqrI' },
  { id: 'song-5', title: 'Reflektor', artist: 'Arcade Fire', album: 'Reflektor', duration: 453, artwork: 'https://i.scdn.co/image/ab67616d0000b273433f955833ad776599a329d3', youtubeId: '7E0fVfectDo' },
  { id: 'song-6', title: 'The Less I Know The Better', artist: 'Tame Impala', album: 'Currents', duration: 218, artwork: 'https://i.scdn.co/image/ab67616d0000b2739e1cfc756886ac782e363d79', youtubeId: 'sBzrzS1Ag_g' },
  { id: 'song-7', title: 'Shelter', artist: 'Porter Robinson & Madeon', album: 'Shelter', duration: 219, artwork: 'https://i.scdn.co/image/ab67616d0000b273a3992555a852de68b73e3833', youtubeId: 'fzQ6gRAEoy0' },
  { id: 'song-8', title: 'After Dark', artist: 'Mr.Kitty', album: 'Time', duration: 257, artwork: 'https://i.scdn.co/image/ab67616d0000b2733f4b1b3d3b1f3b3b3b1f3b3b', youtubeId: 'sVx1mJDeUjY' },
];

export const MOCK_PLAYLISTS: Playlist[] = [
  { id: 'pl-1', name: 'Chill Vibes', songIds: ['song-1', 'song-7', 'song-2'], owner: 'Alex' },
  { id: 'pl-2', name: 'Late Night Drive', songIds: ['song-3', 'song-8', 'song-6'], owner: 'Alex' },
  { id: 'pl-3', name: 'Indie Dance Party', songIds: ['song-2', 'song-3', 'song-5', 'song-6'], owner: 'Alex' },
  { id: 'pl-4', name: 'Recently Added', songIds: ['song-4', 'song-5'], owner: 'Alex' },
];
