import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, Pause, Maximize, Volume2, SkipForward, Settings, MessageSquare } from 'lucide-react';
import { MOCK_ANIMES } from '../data';

export const Player = () => {
  const { id } = useParams<{ id: string }>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showSkipOverlay, setShowSkipOverlay] = useState<'forward' | 'backward' | null>(null);
  
  const anime = MOCK_ANIMES.find(a => a.id === id) || MOCK_ANIMES[0];

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isPlaying && showControls) {
      timeout = setTimeout(() => setShowControls(false), 3000);
    }
    return () => clearTimeout(timeout);
  }, [isPlaying, showControls]);

  // Handle double tap seek simulation
  const handleSeek = (direction: 'forward' | 'backward') => {
    setShowSkipOverlay(direction);
    setTimeout(() => setShowSkipOverlay(null), 500);
  };

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col font-sans h-screen w-full touch-none select-none">
      {/* Mock Video Area */}
      <div 
        className="relative flex-1 bg-black overflow-hidden flex items-center justify-center cursor-none group"
      >
        <img 
          src={anime.bannerImage}
          alt="Video stream"
          className="w-full h-full object-cover opacity-60 pointer-events-none"
          referrerPolicy="no-referrer"
        />
        
        {/* Gesture Area Overlays */}
        <div className="absolute inset-0 flex z-10">
          <div 
            className="flex-1 opacity-0"
            onClick={() => setShowControls(true)}
            onDoubleClick={() => handleSeek('backward')}
          />
          <div 
            className="flex-1 opacity-0"
            onClick={() => setIsPlaying(!isPlaying)}
          />
          <div 
            className="flex-1 opacity-0"
            onClick={() => setShowControls(true)}
            onDoubleClick={() => handleSeek('forward')}
          />
        </div>
        
        {/* Skip Indication Overlays */}
        {showSkipOverlay === 'backward' && (
           <div className="absolute left-10 md:left-32 top-1/2 -translate-y-1/2 w-24 h-24 bg-white/20 rounded-full flex flex-col items-center justify-center backdrop-blur-sm animate-fade-in z-20 pointer-events-none">
             <div className="text-white font-bold text-center">
               <div>-10</div>
               <div className="text-[10px]">SEC</div>
             </div>
           </div>
        )}
        {showSkipOverlay === 'forward' && (
           <div className="absolute right-10 md:right-32 top-1/2 -translate-y-1/2 w-24 h-24 bg-white/20 rounded-full flex flex-col items-center justify-center backdrop-blur-sm animate-fade-in z-20 pointer-events-none">
             <div className="text-white font-bold text-center">
               <div>+10</div>
               <div className="text-[10px]">SEC</div>
             </div>
           </div>
        )}

        {/* Top Controls Gradient */}
        <div className={`absolute top-0 inset-x-0 h-32 md:h-48 bg-gradient-to-b from-black/90 to-transparent transition-opacity duration-300 pointer-events-none ${showControls ? 'opacity-100' : 'opacity-0'} z-20`} />
        
        {/* Back Button & Title */}
        <div className={`absolute top-0 left-0 pt-safe-top p-4 md:p-8 flex items-center gap-4 md:gap-6 transition-all duration-300 w-full z-30 ${showControls ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <Link to="/" className="p-2 md:p-3 bg-black/40 hover:bg-white/20 rounded-full backdrop-blur-md transition-colors border border-white/10" onClick={(e) => e.stopPropagation()}>
            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </Link>
          <div className="flex-1 overflow-hidden">
            <h2 className="font-display text-lg md:text-2xl text-white font-medium truncate drop-shadow-md">{anime.title.english || anime.title.romaji}</h2>
            <p className="text-akira-muted uppercase tracking-widest text-[9px] md:text-[10px] font-bold truncate">Episode 1 • The Awakening</p>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 hover:bg-white/20 rounded-full text-white transition-colors">
               <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Center Play Button (Mobile & Desktop) */}
        {!isPlaying && showControls && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-akira-amber/90 md:bg-white/10 flex items-center justify-center md:shadow-lg shadow-[0_0_40px_rgba(255,123,0,0.4)] backdrop-blur-md transform animate-fade-in transition-transform">
              <Play className="w-10 h-10 text-black md:text-white fill-current ml-2" />
            </div>
          </div>
        )}

        {/* Bottom Controls Gradient */}
        <div className={`absolute bottom-0 inset-x-0 h-48 md:h-64 bg-gradient-to-t from-black via-black/80 to-transparent transition-opacity duration-300 flex flex-col justify-end px-4 md:px-8 pb-safe-bottom z-30 pointer-events-none ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          
          <div className="pointer-events-auto pb-4 md:pb-8 flex flex-col gap-4 md:gap-6 mt-auto">
            {/* Progress Bar */}
            <div className="w-full flex items-center gap-3">
              <span className="text-[10px] md:text-sm font-medium tracking-wide text-white drop-shadow-md hidden md:block">08:24</span>
              
              <div className="group/progress flex-1 h-3 md:h-1.5 bg-white/20 md:rounded-full cursor-pointer relative" onClick={(e) => e.stopPropagation()}>
                <div className="absolute -inset-y-4 inset-x-0 bg-transparent" /> {/* Larger hit area */}
                <div className="h-full w-1/3 bg-akira-amber md:rounded-full relative shadow-[0_0_10px_rgba(255,123,0,0.6)]">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-lg md:opacity-0 group-hover/progress:opacity-100 transition-opacity" />
                </div>
              </div>
              
              <span className="text-[10px] md:text-sm font-medium tracking-wide text-white drop-shadow-md">
                 <span className="md:hidden">08:24 / </span>24:00
              </span>
            </div>

            <div className="flex items-center justify-between">
              {/* Mobile primary controls */}
              <div className="flex md:hidden items-center justify-between w-full">
                <button className="text-white hover:text-akira-gold p-2">
                  <MessageSquare className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-6">
                  <button onClick={() => handleSeek('backward')} className="text-white hover:text-akira-gold p-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 17l-5-5 5-5"/><path d="M18 17l-5-5 5-5"/></svg>
                  </button>
                  <button onClick={() => setIsPlaying(!isPlaying)} className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center p-2 hover:scale-105 transition-transform duration-200">
                    {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
                  </button>
                  <button onClick={() => handleSeek('forward')} className="text-white hover:text-akira-gold p-2">
                    <SkipForward className="w-6 h-6" />
                  </button>
                </div>
                <button className="border border-white/20 text-white text-[9px] font-bold uppercase tracking-widest px-2 py-1.5 rounded transition-colors bg-black/40">
                  Intro
                </button>
              </div>

              {/* Desktop controls */}
              <div className="hidden md:flex items-center gap-6 text-white w-full justify-between">
                <div className="flex items-center gap-6">
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="hover:text-akira-gold transition-colors"
                  >
                    {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current" />}
                  </button>
                  
                  <button className="hover:text-akira-gold transition-colors" title="Skip Intro">
                    <SkipForward className="w-6 h-6" />
                  </button>
                  
                  <div className="flex items-center gap-3 hover:text-akira-gold transition-colors group/vol cursor-pointer">
                    <Volume2 className="w-6 h-6" />
                    <div className="w-24 h-1 bg-white/20 rounded-full overflow-hidden opacity-0 group-hover/vol:opacity-100 transition-opacity">
                      <div className="h-full w-2/3 bg-white" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <button className="border border-white/20 hover:border-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm transition-colors">
                    Skip Intro
                  </button>
                  <button className="hover:text-akira-gold transition-colors" title="Subtitles & Audio">
                    <MessageSquare className="w-6 h-6" />
                  </button>
                  <button className="hover:text-akira-gold transition-colors">
                    <Maximize className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
