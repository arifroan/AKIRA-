import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, BookOpen, Calendar, Users, Globe, Search, Bell, MessageSquare, ChevronDown } from 'lucide-react';
import { useAuthStore } from '../lib/authStore';

export const Navigation = () => {
  const location = useLocation();
  const { user, isAdmin } = useAuthStore();

  const navLinks = [
    { name: 'EXPLORE', path: '/', icon: <Compass className="w-5 h-5" /> },
    { name: 'JOURNEY', path: '/journey', icon: <Compass className="w-5 h-5 rotate-45" /> },
    { name: 'COLLECTION', path: '/collection', icon: <BookOpen className="w-5 h-5" /> },
    { name: 'SCHEDULE', path: '/schedule', icon: <Calendar className="w-5 h-5" /> },
    { name: 'SOCIAL', path: '/social', icon: <Users className="w-5 h-5" /> },
    { name: 'WORLDS', path: '/worlds', icon: <Globe className="w-5 h-5" /> },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 h-20 z-50 flex items-center justify-between px-8 bg-akira-dark border-b border-white/5">
      <div className="flex items-center gap-12">
        <div className="flex flex-col gap-0.5 mt-1">
          <Link to="/" className="font-display text-4xl text-white tracking-widest leading-none">
            AKIRA
          </Link>
          <span className="text-[10px] text-akira-muted font-sans tracking-wide">
            Your anime universe, reimagined.
          </span>
        </div>
        
        <nav className="flex items-center gap-6 mt-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            
            return (
              <Link 
                key={link.name}
                to={link.path}
                className={`text-[11px] uppercase tracking-widest font-semibold transition-colors duration-300 ${
                  isActive ? 'text-akira-primary drop-shadow-[0_0_8px_rgba(242,61,70,0.5)]' : 'text-akira-muted hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Search & Actions */}
      <div className="flex items-center gap-6">
        <div className="group relative flex items-center">
          <input 
            type="text" 
            placeholder="Search anime, movies, genres..."
            className="w-72 bg-akira-card border border-white/10 rounded-full py-2.5 pl-6 pr-12 text-sm text-white placeholder-akira-muted focus:outline-none focus:border-akira-primary/50 transition-colors"
          />
          <Search className="w-4 h-4 text-akira-muted absolute right-5 group-hover:text-akira-primary transition-colors" />
        </div>

        <button className="flex w-10 h-10 rounded-full bg-akira-card border border-white/10 items-center justify-center text-akira-muted hover:text-white transition-colors">
          <Bell className="w-4 h-4" />
        </button>
        
        <button className="flex w-10 h-10 rounded-full bg-akira-card border border-white/10 items-center justify-center text-akira-muted hover:text-white transition-colors">
          <MessageSquare className="w-4 h-4" />
        </button>

        {user ? (
          <Link to={isAdmin ? "/admin" : "/profile"} className="flex items-center gap-2 cursor-pointer group">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 group-hover:border-akira-primary transition-colors bg-akira-primary/20 flex items-center justify-center text-akira-primary font-bold">
               {user.email?.[0].toUpperCase()}
            </div>
            <ChevronDown className="w-4 h-4 text-akira-muted group-hover:text-white transition-colors" />
          </Link>
        ) : (
          <Link to="/auth" className="text-sm font-bold tracking-widest uppercase text-white bg-akira-primary hover:bg-akira-primary-hover px-6 py-2 rounded-full transition-colors shadow-lg">
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
};

