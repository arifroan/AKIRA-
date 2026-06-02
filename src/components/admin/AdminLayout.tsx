import React from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../lib/authStore';
import { LayoutDashboard, Film, FileVideo, Image as ImageIcon, Users, BarChart3, Settings, LogOut, ShieldAlert } from 'lucide-react';

const adminNav = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { name: 'Content', path: '/admin/content', icon: <Film className="w-5 h-5" /> },
  { name: 'Sources', path: '/admin/sources', icon: <FileVideo className="w-5 h-5" /> },
  { name: 'Media', path: '/admin/media', icon: <ImageIcon className="w-5 h-5" /> },
  { name: 'Users', path: '/admin/users', icon: <Users className="w-5 h-5" /> },
  { name: 'Analytics', path: '/admin/analytics', icon: <BarChart3 className="w-5 h-5" /> },
  { name: 'Settings', path: '/admin/settings', icon: <Settings className="w-5 h-5" /> },
];

export const AdminLayout: React.FC = () => {
  const { user, isAdmin, isLoading, logout, login } = useAuthStore();
  const location = useLocation();

  if (isLoading) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-akira-primary">Loading SYSTEM...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-akira-dark via-black to-black">
        <ShieldAlert className="w-16 h-16 text-akira-primary mb-6" />
        <h1 className="text-3xl font-display tracking-widest mb-2">RESTRICTED AREA</h1>
        <p className="text-akira-muted mb-8 font-mono">Authentication Required</p>
        <button 
          onClick={login}
          className="bg-akira-primary hover:bg-akira-primary-hover px-8 py-3 rounded text-sm tracking-widest font-bold uppercase transition-colors"
        >
          System Identify
        </button>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white font-sans">
      {/* Admin Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-[#050505] flex flex-col">
        <div className="h-20 flex items-center px-8 border-b border-white/5">
          <Link to="/" className="font-display text-2xl tracking-widest text-akira-primary group flex items-center gap-2">
            AKIRA
            <span className="text-[10px] font-mono text-akira-muted tracking-widest uppercase border border-white/10 px-1.5 py-0.5 rounded group-hover:border-akira-primary/50 transition-colors">Admin</span>
          </Link>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 flex flex-col gap-1 px-4">
          <div className="text-[10px] font-mono text-akira-muted uppercase tracking-widest px-4 mb-2 mt-4 first:mt-0">Management</div>
          {adminNav.map((nav) => (
            <Link
              key={nav.name}
              to={nav.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname.startsWith(nav.path) 
                  ? 'bg-akira-primary/10 text-akira-primary' 
                  : 'text-akira-muted hover:text-white hover:bg-white/5'
              }`}
            >
              {nav.icon}
              <span className="text-sm font-medium tracking-wide">{nav.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-8 h-8 rounded-full bg-akira-primary/20 flex items-center justify-center text-akira-primary font-bold">
              {user.email?.[0].toUpperCase()}
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="text-xs truncate font-medium text-white">{user.email}</div>
              <div className="text-[10px] text-akira-primary font-mono truncate uppercase">Super Admin</div>
            </div>
          </div>
          <button 
            onClick={logout}
            className="w-full mt-2 flex items-center gap-3 px-4 py-2.5 rounded-lg text-akira-muted hover:text-white hover:bg-white/5 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Log out</span>
          </button>
        </div>
      </aside>

      {/* Admin Content Area */}
      <main className="flex-1 overflow-y-auto bg-[#0a0a0a]">
        <header className="h-20 flex items-center px-8 border-b border-white/5 justify-between">
          <h2 className="font-display text-xl tracking-widest text-white uppercase hidden md:block">
            {adminNav.find(n => location.pathname.startsWith(n.path))?.name || 'Workspace'}
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs font-mono text-akira-muted tracking-widest uppercase">System Online</span>
            </div>
          </div>
        </header>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
