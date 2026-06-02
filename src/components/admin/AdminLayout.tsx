import React from 'react';
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../lib/authStore';
import { Shield, LayoutDashboard, Film, Users, Settings, Database, Server, LogOut, ArrowLeft } from 'lucide-react';

export const AdminLayout = () => {
  const { user } = useAuthStore();
  const location = useLocation();

  // Strict Protection
  if (!user || user.role !== 'super_admin' || user.email !== 'ottus2023@gmail.com') {
    return <Navigate to="/" replace />;
  }

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Content', path: '/admin/content', icon: <Film className="w-5 h-5" /> },
    { name: 'Sources', path: '/admin/sources', icon: <Server className="w-5 h-5" /> },
    { name: 'Media', path: '/admin/media', icon: <Database className="w-5 h-5" /> },
    { name: 'Users', path: '/admin/users', icon: <Users className="w-5 h-5" /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-black flex text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-akira-card/50 flex flex-col fixed inset-y-0 left-0 z-40">
        <div className="p-6 pb-2 border-b border-white/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded bg-akira-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-display text-xl tracking-wider leading-none">AKIRA</h1>
              <span className="text-[9px] uppercase tracking-widest text-akira-primary font-bold">Super Admin</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-2 overflow-y-auto override-scrollbar">
          {navItems.map(item => {
            const isActive = location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== '/admin');
            return (
              <Link 
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium text-sm ${
                  isActive ? 'bg-akira-primary/10 text-akira-primary border border-akira-primary/20' : 'text-akira-muted hover:text-white hover:bg-white/5'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-white/5 flex flex-col gap-2">
          <Link to="/profile" className="flex items-center gap-3 px-4 py-3 rounded-lg text-akira-muted hover:text-white hover:bg-white/5 transition-colors font-medium text-sm">
            <ArrowLeft className="w-5 h-5" />
            Exit Admin
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 relative min-h-screen bg-gradient-to-br from-black to-akira-dark override-scrollbar overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
