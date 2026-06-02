import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../lib/authStore';
import { LogIn, UserPlus } from 'lucide-react';

export const Auth = () => {
  const navigate = useNavigate();
  const { loginWithGoogle, loginWithTwitter, loginWithEmail, signupWithEmail, isLoading } = useAuthStore();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      if (isLogin) {
        await loginWithEmail(email, password);
      } else {
        await signupWithEmail(email, password);
      }
      navigate('/');
    } catch (error: any) {
      setErrorMsg(error.message || "An error occurred");
    }
  };

  const handleProviderLogin = async (provider: 'google' | 'twitter') => {
    setErrorMsg('');
    try {
      if (provider === 'google') await loginWithGoogle();
      if (provider === 'twitter') await loginWithTwitter();
      navigate('/');
    } catch (error: any) {
      setErrorMsg("Provider login failed. Please ensure it is enabled in Firebase Console.");
    }
  }

  return (
    <div className="min-h-screen bg-akira-dark flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-akira-primary/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-md relative z-10 px-8 py-10">
        <div className="bg-akira-card/80 backdrop-blur-xl rounded-2xl border border-white/10 p-10 shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="font-display text-4xl text-white tracking-widest leading-none mb-2">AKIRA</h1>
            <p className="text-akira-muted font-heading tracking-wide uppercase text-xs">Enter the Universe</p>
          </div>

          {errorMsg && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-xs p-3 rounded mb-6 text-center">
              {errorMsg}
            </div>
          )}

          <div className="flex flex-col gap-4 mb-6">
            <button
              onClick={() => handleProviderLogin('google')}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 bg-white text-black hover:bg-gray-100 font-bold uppercase tracking-widest py-3 rounded-lg transition-all disabled:opacity-50 text-xs"
            >
              Sign in with Google
            </button>
            <button
              onClick={() => handleProviderLogin('twitter')}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 bg-[#1DA1F2] text-white hover:bg-[#1DA1F2]/90 font-bold uppercase tracking-widest py-3 rounded-lg transition-all disabled:opacity-50 text-xs"
            >
              Sign in with X
            </button>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="h-px bg-white/10 flex-1"></div>
            <span className="text-akira-muted text-xs font-bold uppercase tracking-widest">Or Email</span>
            <div className="h-px bg-white/10 flex-1"></div>
          </div>

          <form onSubmit={handleEmailAuth} className="flex flex-col gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-akira-muted mb-2">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-akira-primary transition-colors font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-akira-muted mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-akira-primary transition-colors font-mono text-sm"
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 bg-akira-primary hover:bg-akira-primary-hover text-white font-bold uppercase tracking-widest py-4 rounded-lg transition-all shadow-[0_0_20px_rgba(242,61,70,0.3)] disabled:opacity-50 mt-2 text-sm"
            >
              {isLogin ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
              {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-akira-muted">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setIsLogin(!isLogin)} className="text-white hover:text-akira-primary font-bold uppercase tracking-widest transition-colors">
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
