/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { Player } from './pages/Player';
import { Auth } from './pages/Auth';
import { Profile } from './pages/Profile';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminContent } from './pages/admin/AdminContent';
import { AdminSources, AdminMedia, AdminUsers, AdminAnalytics, AdminSettings } from './pages/admin/Placeholders';

const AppContent = () => {
  const location = useLocation();
  const isPlayer = location.pathname.startsWith('/player');
  const isAdmin = location.pathname.startsWith('/admin');
  const isAuth = location.pathname === '/auth';

  return (
    <div className={`flex relative min-h-screen ${isAdmin || isAuth ? 'bg-black' : 'bg-akira-dark'}`}>
      {!isPlayer && !isAdmin && !isAuth && <Navigation />}
      
      <main className={`flex-1 ${!isPlayer && !isAdmin && !isAuth ? 'pt-20' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/player/:id" element={<Player />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          
          {/* Admin Routes wrapped in AdminLayout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="content" element={<AdminContent />} />
            <Route path="sources" element={<AdminSources />} />
            <Route path="media" element={<AdminMedia />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="settings" element={<AdminSettings />} />
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
