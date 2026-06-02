import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, BookOpen, Calendar, Users, Globe, LayoutGrid, Search, Bell, MessageSquare, ChevronDown } from 'lucide-react';
import { useAuthStore } from '../lib/authStore';

export const Navigation = () => {
  const location = useLocation();
  const { user, isAdmin, login } = useAuthStore();

  const navLinks = [
    { name: 'EXPLORE', path: '/', icon: <Compass className="w-5 h-5" /> },
    { name: 'JOURNEY', path: '/journey', icon: <Compass className="w-5 h-5 rotate-45" /> }, // Approximation
    { name: 'COLLECTION', path: '/collection', icon: <BookOpen className="w-5 h-5" /> },
    { name: 'SCHEDULE', path: '/schedule', icon: <Calendar className="w-5 h-5" /> },
    { name: 'SOCIAL', path: '/social', icon: <Users className="w-5 h-5" /> },
    { name: 'WORLDS', path: '/worlds', icon: <Globe className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Top Bar Workspace */}
      <div className="fixed top-0 left-0 md:left-24 right-0 h-16 md:h-24 z-40 flex items-center justify-between px-6 md:px-8 bg-gradient-to-b from-akira-dark via-akira-dark/80 to-transparent pointer-events-none">
        
        {/* Logo Area */}
        <div className="flex flex-col gap-0.5 pointer-events-auto mt-2 md:mt-0">
          <Link to="/" className="font-display text-2xl md:text-4xl text-white tracking-widest leading-none">
            AKIRA
          </Link>
          <span className="hidden md:block text-[10px] text-akira-muted font-sans tracking-wide">
            Your anime universe, reimagined.
          </span>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-4 md:gap-6 pointer-events-auto pl-8">
          <div className="group relative hidden md:flex items-center">
            <input 
              type="text" 
              placeholder="Search anime, movies, genres..."
              className="w-80 bg-akira-card border border-white/10 rounded-full py-2.5 pl-6 pr-12 text-sm text-white placeholder-akira-muted focus:outline-none focus:border-akira-primary/50 transition-colors"
            />
            <Search className="w-4 h-4 text-akira-muted absolute right-5 group-hover:text-akira-primary transition-colors" />
          </div>

          <button className="md:hidden w-8 h-8 rounded-full bg-akira-card border border-white/10 flex items-center justify-center text-akira-muted hover:text-white transition-colors">
            <Search className="w-4 h-4" />
          </button>

          <button className="hidden md:flex w-10 h-10 rounded-full bg-akira-card border border-white/10 items-center justify-center text-akira-muted hover:text-white transition-colors">
            <Bell className="w-4 h-4" />
          </button>
          
          <button className="hidden md:flex w-10 h-10 rounded-full bg-akira-card border border-white/10 items-center justify-center text-akira-muted hover:text-white transition-colors">
            <MessageSquare className="w-4 h-4" />
          </button>

          {user ? (
            <Link to={isAdmin ? "/admin" : "/"} className="flex items-center gap-2 cursor-pointer group">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border border-white/10 group-hover:border-akira-primary transition-colors bg-akira-primary/20 flex items-center justify-center text-akira-primary font-bold">
                 {user.email?.[0].toUpperCase()}
              </div>
              <ChevronDown className="hidden md:block w-4 h-4 text-akira-muted group-hover:text-white transition-colors" />
            </Link>
          ) : (
            <button onClick={login} className="text-sm font-bold tracking-widest uppercase text-white bg-akira-primary hover:bg-akira-primary-hover px-6 py-2 rounded-full transition-colors shadow-lg">
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* Sidebar / Bottom Navigation */}
      <nav className="fixed md:left-0 bottom-0 md:top-0 w-full md:w-24 h-16 md:h-auto bg-akira-card/95 md:bg-akira-card/50 backdrop-blur-xl border-t md:border-t-0 md:border-r border-white/5 z-50 flex flex-row md:flex-col md:pt-32 pb-safe md:pb-8 items-center justify-around md:justify-start hide-scrollbar overflow-x-auto md:overflow-y-auto">
        <div className="flex flex-row md:flex-col gap-2 md:gap-8 w-full md:w-auto relative px-2 md:px-0 items-center justify-around md:justify-start h-full">
          
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            
            return (
              <Link 
                key={link.name}
                to={link.path}
                className={`relative flex flex-col items-center gap-1 md:gap-2 w-auto md:w-full group transition-colors duration-300 ${
                  isActive ? 'text-akira-primary' : 'text-akira-muted hover:text-white'
                }`}
              >
                {/* Active Indicator */}
                {isActive && (
                  <>
                    <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-12 h-20 bg-akira-primary/10 rounded-r-full border-r-2 border-akira-primary -z-10" />
                    <div className="block md:hidden absolute left-1/2 top-0 -translate-x-1/2 w-8 h-[2px] bg-akira-primary rounded-b-full shadow-[0_0_10px_rgba(242,61,70,0.8)]" />
                  </>
                )}
                
                <div className={`p-1.5 md:p-2 rounded-full transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                   {React.cloneElement(link.icon, { className: 'w-5 h-5 md:w-5 md:h-5' })}
                </div>
                <span className="hidden md:block text-[9px] uppercase tracking-widest font-semibold">
                  {link.name}
                </span>
              </Link>
            )
          })}

        </div>

        {/* Bottom Profile / Admin Icon (Desktop) */}
        <div className="hidden md:flex mt-auto pt-8">
           {user && (
             <Link to={isAdmin ? "/admin" : "/"} className="flex flex-col items-center gap-2 group">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-transparent group-hover:border-akira-primary transition-all bg-akira-primary/20 flex items-center justify-center text-akira-primary font-bold">
                  {user.email?.[0].toUpperCase()}
                </div>
                <span className="text-[9px] text-akira-muted uppercase tracking-widest font-semibold group-hover:text-white transition-colors">
                  {isAdmin ? 'SYSTEM' : 'PROFILE'}
                </span>
             </Link>
           )}
        </div>
      </nav>
    </>
  );
};
