import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { Player } from './pages/Player';
import { Auth } from './pages/Auth';

const AppContent = () => {
  const location = useLocation();
  const isPlayer = location.pathname.startsWith('/player');
  const isAuth = location.pathname === '/auth';

  return (
    <div className="flex flex-col relative min-h-screen bg-akira-dark">
      {!isPlayer && !isAuth && <Navigation />}
      
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/player/:id" element={<Player />} />
          <Route path="/auth" element={<Auth />} />
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
