
import React from 'react';
import { useAppContext } from './contexts/AppContext';
import { Sidebar } from './components/Sidebar';
import { MainView } from './components/MainView';
import { PlayerBar } from './components/PlayerBar';
import { SocialPanel } from './components/SocialPanel';
import { NowPlayingOverlay } from './components/NowPlayingOverlay';
import { YouTubePlayerComponent } from './components/YouTubePlayer';
import { Login } from './components/Login';
import { SettingsModal } from './components/SettingsModal';
import { Callback } from './components/Callback';

const MainApp: React.FC = () => {
  const { room } = useAppContext();
  return (
    <div 
      className="h-screen w-screen bg-gradient-to-br from-[#121212] via-black to-[#121212] p-2 flex flex-col"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?q=80&w=3000&auto=format&fit=crop')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="fixed inset-0 bg-black/60 z-0"></div>
      <div className="relative flex-grow flex gap-2 min-h-0 z-10">
        <Sidebar />
        <div className="flex-grow glass-pane rounded-lg overflow-hidden">
          <MainView />
        </div>
        {room && <SocialPanel />}
      </div>
      <div className="relative flex-shrink-0 mt-2 z-10">
        <PlayerBar />
      </div>
      
      <NowPlayingOverlay />
      <YouTubePlayerComponent />
      <SettingsModal />
    </div>
  );
}

export default function App() {
  const { currentUser } = useAppContext();

  const path = window.location.pathname;

  if (path === '/callback') {
    return <Callback />;
  }

  if (!currentUser) {
    return <Login />;
  }

  return <MainApp />;
}
