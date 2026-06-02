import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../lib/authStore';

export const Auth = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();
  const [email, setEmail] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      await login(email);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-akira-dark flex items-center justify-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-akira-primary/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-md relative z-10 px-8">
        <div className="bg-akira-card/80 backdrop-blur-xl rounded-2xl border border-white/10 p-10 shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="font-display text-4xl text-white tracking-widest leading-none mb-2">AKIRA</h1>
            <p className="text-akira-muted font-heading tracking-wide uppercase text-xs">Enter the Universe</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-akira-muted mb-2">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="pilot@akira.io"
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-akira-primary transition-colors font-mono text-sm"
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-akira-primary hover:bg-akira-primary-hover text-white font-bold uppercase tracking-widest py-4 rounded-lg transition-all shadow-[0_0_20px_rgba(242,61,70,0.3)] hover:shadow-[0_0_30px_rgba(242,61,70,0.5)] disabled:opacity-50 mt-2"
            >
              {isLoading ? 'Authenticating...' : 'Initialize Link'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
