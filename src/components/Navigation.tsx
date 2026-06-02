import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, User } from 'lucide-react';
import { useAuthStore } from '../lib/authStore';

export const Navigation = () => {
  const { user, logout } = useAuthStore();

  return (
    <nav className="fixed top-0 left-0 right-0 h-20 z-50 flex items-center justify-between px-8 bg-akira-dark/80 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center gap-12">
        <Link to="/" className="font-display text-4xl text-white tracking-widest leading-none">
          AKIRA
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-semibold tracking-widest uppercase text-white hover:text-akira-primary transition-colors">Home</Link>
          <Link to="#" className="text-sm font-semibold tracking-widest uppercase text-akira-muted hover:text-white transition-colors">Trending</Link>
          <Link to="#" className="text-sm font-semibold tracking-widest uppercase text-akira-muted hover:text-white transition-colors">Collections</Link>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="text-akira-muted hover:text-white transition-colors">
          <Search className="w-5 h-5" />
        </button>
        <button className="text-akira-muted hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
        </button>

        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-akira-muted">{user.email}</span>
            <button 
              onClick={logout}
              className="text-sm font-bold tracking-widest uppercase text-white bg-akira-card hover:bg-white/10 px-4 py-2 rounded-full transition-colors border border-white/10"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <Link to="/auth" className="text-sm font-bold tracking-widest uppercase text-white bg-akira-primary hover:bg-akira-primary-hover px-6 py-2 rounded-full transition-colors shadow-lg">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};
