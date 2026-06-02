import React from 'react';
import { useAuthStore } from '../lib/authStore';
import { ShieldAlert, User, History, Heart, Bookmark, Settings, LogOut, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const Profile = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  if (!user) {
    return (
        <div className="min-h-screen bg-akira-dark pt-32 px-8 flex items-center justify-center">
             <div className="text-center">
                 <h2 className="text-2xl text-white font-medium mb-4">You need to sign in to view this page.</h2>
                 <Link to="/auth" className="bg-akira-primary text-white font-bold uppercase tracking-widest px-8 py-4 rounded-full">Sign In</Link>
             </div>
        </div>
    );
  }

  const handleLogout = () => {
      logout();
      navigate('/');
  }

  return (
    <div className="min-h-screen bg-akira-dark pt-32 pb-20 px-6 lg:px-12 max-w-7xl mx-auto font-sans animate-fade-in relative">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* Left Column: User Info & Nav */}
            <div className="md:col-span-4 lg:col-span-3 flex flex-col gap-6">
                <div className="bg-akira-card rounded-2xl p-6 border border-white/5 flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full mb-4 border-2 border-white/10 overflow-hidden bg-akira-primary/20 flex items-center justify-center text-akira-primary font-bold text-3xl uppercase">
                        {user.photoURL ? <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" /> : user.email[0]}
                    </div>
                    <h2 className="text-xl font-bold text-white font-display tracking-wider mb-1">{user.displayName || 'Pilot'}</h2>
                    <p className="text-sm text-akira-muted mb-4">{user.email}</p>
                    <div className="w-full h-px bg-white/5 my-2"></div>
                    <div className="w-full flex items-center justify-between py-2 text-sm">
                        <span className="text-akira-muted font-mono tracking-widest uppercase text-[10px]">Status</span>
                        <span className="text-white font-bold uppercase tracking-widest text-[10px] bg-akira-primary/20 text-akira-primary px-2 py-0.5 rounded">{user.role}</span>
                    </div>
                </div>

                <div className="bg-akira-card rounded-2xl border border-white/5 overflow-hidden flex flex-col">
                    <button className="flex items-center justify-between p-4 bg-white/5 border-l-2 border-akira-primary text-white transition-colors">
                        <div className="flex items-center gap-3">
                            <History className="w-4 h-4 text-akira-primary" />
                            <span className="text-sm font-bold uppercase tracking-widest">Watch History</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-akira-muted" />
                    </button>
                    <button className="flex items-center justify-between p-4 hover:bg-white/5 text-akira-muted hover:text-white transition-colors">
                        <div className="flex items-center gap-3">
                            <Heart className="w-4 h-4" />
                            <span className="text-sm font-bold uppercase tracking-widest">Favorites</span>
                        </div>
                    </button>
                    <button className="flex items-center justify-between p-4 hover:bg-white/5 text-akira-muted hover:text-white transition-colors">
                        <div className="flex items-center gap-3">
                            <Bookmark className="w-4 h-4" />
                            <span className="text-sm font-bold uppercase tracking-widest">Watchlist</span>
                        </div>
                    </button>
                    <button className="flex items-center justify-between p-4 hover:bg-white/5 text-akira-muted hover:text-white transition-colors border-t border-white/5">
                        <div className="flex items-center gap-3">
                            <Settings className="w-4 h-4" />
                            <span className="text-sm font-bold uppercase tracking-widest">Settings</span>
                        </div>
                    </button>
                </div>

                {user.role === 'super_admin' && (
                    <Link to="/admin" className="bg-gradient-to-r from-akira-primary to-orange-500 rounded-2xl p-6 text-left hover:brightness-110 transition-all border border-orange-500/50 shadow-[0_0_20px_rgba(242,61,70,0.2)] group cursor-pointer flex flex-col items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                            <ShieldAlert className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white uppercase tracking-widest mb-1 group-hover:translate-x-1 transition-transform">Admin Panel</h3>
                            <p className="text-white/80 text-xs line-clamp-2">Manage content, users, and platform settings. Strictly restricted.</p>
                        </div>
                    </Link>
                )}

                <button onClick={handleLogout} className="flex items-center justify-center gap-3 w-full p-4 rounded-xl border border-white/10 text-akira-muted hover:text-white hover:bg-white/5 transition-colors mt-auto">
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-bold uppercase tracking-widest">Sign Out</span>
                </button>
            </div>

            {/* Right Column: Content Area */}
            <div className="md:col-span-8 lg:col-span-9">
                 <div className="mb-8">
                     <h2 className="text-3xl font-display text-white mb-2">Watch History</h2>
                     <p className="text-sm text-akira-muted">Pick up right where you left off.</p>
                 </div>

                 <div className="bg-akira-card rounded-2xl p-12 border border-white/5 flex flex-col items-center justify-center text-center text-akira-muted min-h-[400px]">
                     <History className="w-12 h-12 mb-4 opacity-50" />
                     <p className="text-lg font-medium text-white mb-2">No history yet</p>
                     <p className="text-sm">Start watching some anime to populate your history.</p>
                     <Link to="/" className="mt-8 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-bold uppercase tracking-widest text-xs transition-colors">Explore Library</Link>
                 </div>
            </div>
        </div>
    </div>
  );
};
