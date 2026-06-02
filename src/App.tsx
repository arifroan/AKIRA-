import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { Player } from './pages/Player';
import { Auth } from './pages/Auth';
import { Profile } from './pages/Profile';
import { Library } from './pages/Library';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminContent } from './pages/admin/AdminContent';
import { AdminSources } from './pages/admin/AdminSources';
import { useAuthStore } from './lib/authStore';

const AppContent = () => {
  const location = useLocation();
  const isPlayer = location.pathname.startsWith('/player');
  const isAuth = location.pathname === '/auth';
  const isAdmin = location.pathname.startsWith('/admin');
  
  const { initAuth } = useAuthStore();
  
  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return (
    <div className="flex flex-col relative min-h-screen bg-akira-dark">
      {!isPlayer && !isAuth && !isAdmin && <Navigation />}
      
      <main className={`flex-1 ${!isPlayer && !isAuth && !isAdmin ? 'pt-20' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/player/:id" element={<Player />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/library" element={<Library />} />
          <Route path="/selected" element={<Library />} />
          
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="content" element={<AdminContent />} />
            <Route path="sources" element={<AdminSources />} />
            <Route path="*" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
