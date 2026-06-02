import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Bell, Menu, X } from 'lucide-react';
import { useAuthStore } from '../lib/authStore';

export const Navigation = () => {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Library', path: '/library' },
    { name: 'Selected', path: '/selected' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 h-20 z-50 flex items-center justify-between px-6 lg:px-12 bg-akira-dark/80 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center gap-12">
        <Link to="/" className="font-display text-4xl text-white tracking-widest leading-none">
          AKIRA
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`text-sm font-semibold tracking-widest uppercase transition-colors ${
                location.pathname === link.path ? 'text-akira-primary drop-shadow-[0_0_8px_rgba(242,61,70,0.5)]' : 'text-akira-muted hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 lg:gap-6">
        <button className="text-akira-muted hover:text-white transition-colors">
          <Search className="w-5 h-5" />
        </button>

        {user ? (
          <div className="hidden md:flex items-center gap-6">
            <button className="text-akira-muted hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-4">
              <Link to="/profile" className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20 group-hover:border-akira-primary transition-colors flex items-center justify-center bg-akira-primary/20 text-akira-primary font-bold uppercase">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName} className="w-full h-full object-cover" />
                  ) : (
                    user.email[0]
                  )}
                </div>
                <span className="text-sm font-medium text-akira-muted group-hover:text-white transition-colors hidden lg:block">{user.displayName || user.email}</span>
              </Link>
              <button 
                onClick={logout}
                className="text-xs font-bold tracking-widest uppercase text-white bg-akira-card hover:bg-white/10 px-4 py-2 rounded-full transition-colors border border-white/10"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <Link to="/auth" className="hidden md:flex text-sm font-bold tracking-widest uppercase text-white bg-akira-primary hover:bg-akira-primary-hover px-6 py-2 rounded-full transition-colors shadow-[0_0_15px_rgba(242,61,70,0.3)]">
            Sign In
          </Link>
        )}

        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-20 left-0 right-0 bg-akira-dark border-b border-white/10 p-6 flex flex-col gap-6 md:hidden shadow-2xl z-40">
           {links.map(link => (
             <Link 
               key={link.name} 
               to={link.path} 
               onClick={() => setIsMobileMenuOpen(false)}
               className={`text-lg font-semibold tracking-widest uppercase ${
                 location.pathname === link.path ? 'text-akira-primary' : 'text-akira-muted'
               }`}
             >
               {link.name}
             </Link>
           ))}
           <div className="h-px bg-white/10 my-2"></div>
           {user ? (
             <>
               <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 text-white">
                 <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-akira-primary/20 text-akira-primary font-bold uppercase">
                   {user.photoURL ? <img src={user.photoURL} alt={user.displayName} className="w-full h-full object-cover rounded-full" /> : user.email[0]}
                 </div>
                 <div>
                   <div className="font-bold">{user.displayName || user.email}</div>
                   <div className="text-xs text-akira-muted uppercase tracking-widest mt-1">Profile View</div>
                 </div>
               </Link>
               <button 
                  onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                  className="w-full text-center text-sm font-bold tracking-widest uppercase text-white bg-akira-card px-6 py-3 rounded-lg border border-white/10 mt-2"
                >
                  Sign Out
                </button>
             </>
           ) : (
             <Link 
              to="/auth" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center text-sm font-bold tracking-widest uppercase text-white bg-akira-primary px-6 py-3 rounded-lg"
             >
               Sign In
             </Link>
           )}
        </div>
      )}
    </nav>
  );
};
