
import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../contexts/AppContext';

export const SocialPanel: React.FC = () => {
  const { room, sendMessage, currentUser } = useAppContext();
  const [message, setMessage] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [room?.messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message.trim());
      setMessage('');
    }
  };

  if (!room) {
    return null;
  }

  return (
    <div className="w-80 h-full flex-shrink-0 glass-pane rounded-lg p-4 flex flex-col animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-white text-lg">Listening Room</h2>
        <span className="text-xs font-mono bg-green-500/20 text-green-300 px-2 py-1 rounded">ID: {room.id}</span>
      </div>

      {/* Participants */}
      <div className="mb-4">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Participants ({room.users.length})</h3>
        <div className="space-y-2">
          {room.users.map(user => {
            const roleColor = user.role === 'host' ? 'text-green-400' : user.role === 'dj' ? 'text-blue-400' : 'text-gray-400';
            return (
              <div key={user.id} className="flex items-center space-x-3">
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                <div>
                  <p className="font-semibold text-white text-sm">{user.name} {user.id === currentUser?.id && '(You)'}</p>
                  <p className={`text-xs font-medium capitalize ${roleColor}`}>{user.role}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chat */}
      <div className="flex-grow flex flex-col min-h-0">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Group Chat</h3>
        <div className="flex-grow bg-black/20 rounded-md p-3 overflow-y-auto space-y-4">
          {room.messages.map(msg => {
            const isMe = msg.user.id === currentUser?.id;
            return (
              <div key={msg.id} className={`flex items-start gap-2.5 ${isMe ? 'justify-end' : ''}`}>
                {!isMe && <img className="w-8 h-8 rounded-full" src={msg.user.avatar} alt={msg.user.name} />}
                <div className={`flex flex-col w-full max-w-[320px] leading-1.5 p-3 border-gray-200 rounded-xl ${isMe ? 'bg-green-600 rounded-br-none' : 'bg-gray-700 rounded-bl-none'}`}>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <span className="text-sm font-semibold text-white">{msg.user.name}</span>
                  </div>
                  <p className="text-sm font-normal py-1 text-white">{msg.message}</p>
                </div>
                {isMe && <img className="w-8 h-8 rounded-full" src={msg.user.avatar} alt={msg.user.name} />}
              </div>
            );
          })}
          <div ref={chatEndRef} />
        </div>
        <form onSubmit={handleSend} className="mt-4 flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Send a message..."
            className="flex-grow bg-black/20 border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button type="submit" className="bg-green-500 text-black font-bold px-4 py-2 rounded-full text-sm hover:bg-green-400 transition-colors">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};
