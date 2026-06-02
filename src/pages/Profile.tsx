import React from 'react';
import { useAuthStore } from '../lib/authStore';
import { useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';

export const Profile = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-akira-dark flex flex-col items-center justify-center p-4">
        <h2 className="text-white text-xl font-display mb-4">Please log in to view this page.</h2>
        <button onClick={() => navigate('/auth')} className="bg-akira-primary text-white font-bold py-2 px-6 rounded-full hover:bg-akira-primary-hover transition-colors">Go to Login</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-akira-dark flex flex-col items-center pt-24 md:pt-32 p-4">
      <div className="w-full max-w-lg bg-akira-card border border-white/5 rounded-2xl p-8 flex flex-col items-center">
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-akira-primary bg-akira-primary/20 flex items-center justify-center text-4xl text-akira-primary font-bold mb-4 shadow-[0_0_20px_rgba(242,61,70,0.4)]">
           {user.email?.[0].toUpperCase() || <User size={40} />}
        </div>
        
        <h1 className="text-2xl font-display text-white mb-1">Profile</h1>
        <p className="text-akira-muted font-mono text-sm mb-8">{user.email}</p>
        
        <div className="w-full space-y-4">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-500 text-white font-bold tracking-widest uppercase text-sm py-4 rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5" /> Log Out
          </button>
        </div>
      </div>
    </div>
  );
};
