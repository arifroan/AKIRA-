import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, Pause, Maximize, Volume2, SkipForward, Settings, MessageSquare } from 'lucide-react';
import { MOCK_ANIMES } from '../data';

export const Player = () => {
  const { id } = useParams<{ id: string }>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  
  const anime = MOCK_ANIMES.find(a => a.id === id) || MOCK_ANIMES[0];

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isPlaying && showControls) {
      timeout = setTimeout(() => setShowControls(false), 3000);
    }
    return () => clearTimeout(timeout);
  }, [isPlaying, showControls]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col font-sans">
      {/* Mock Video Area */}
      <div 
        className="relative flex-1 bg-black overflow-hidden flex items-center justify-center cursor-pointer group"
        onClick={() => setIsPlaying(!isPlaying)}
        onMouseMove={() => setShowControls(true)}
      >
        <img 
          src={anime.bannerImage}
          alt="Video stream"
          className="w-full h-full object-cover opacity-50 pointer-events-none"
          referrerPolicy="no-referrer"
        />
        
        {/* Controls Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent transition-opacity duration-300 pointer-events-none ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          
          {/* Top Bar */}
          <div className="absolute top-0 inset-x-0 p-8 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent pointer-events-auto">
            <div className="flex items-center gap-6">
              <Link to="/" className="p-3 bg-black/40 hover:bg-white/20 rounded-full backdrop-blur-md transition-colors border border-white/10" onClick={(e) => e.stopPropagation()}>
                <ArrowLeft className="w-6 h-6 text-white" />
              </Link>
              <div>
                <h2 className="font-display text-2xl text-white font-medium drop-shadow-md">{anime.title.english || anime.title.romaji}</h2>
                <p className="text-akira-muted uppercase tracking-widest text-[10px] font-bold mt-1">Episode 1 • The Awakening</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-3 hover:bg-white/20 rounded-full text-white transition-colors" onClick={(e) => e.stopPropagation()}>
                 <Settings className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Center Play Button (Large for emphasis) */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center shadow-lg backdrop-blur-md transform transition-transform group-hover:scale-105">
                <Play className="w-10 h-10 text-white fill-current ml-2" />
              </div>
            </div>
          )}

          {/* Bottom Bar */}
          <div className="absolute bottom-0 inset-x-0 p-8 pt-24 bg-gradient-to-t from-black to-transparent flex flex-col gap-6 pointer-events-auto" onClick={(e) => e.stopPropagation()}>
            
            {/* Progress Bar */}
            <div className="w-full flex items-center gap-4">
              <span className="text-sm font-medium tracking-wide text-white drop-shadow-md w-12 text-right">08:24</span>
              
              <div className="group/progress flex-1 h-1.5 bg-white/20 rounded-full cursor-pointer relative">
                <div className="absolute -inset-y-4 inset-x-0 bg-transparent" /> {/* Larger hit area */}
                <div className="h-full w-1/3 bg-akira-primary rounded-full relative shadow-[0_0_10px_rgba(242,61,70,0.6)]">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-lg opacity-0 group-hover/progress:opacity-100 transition-opacity" />
                </div>
              </div>
              
              <span className="text-sm font-medium tracking-wide text-white drop-shadow-md w-12">24:00</span>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-8">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="hover:text-akira-primary transition-colors"
                >
                  {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current" />}
                </button>
                
                <button className="hover:text-akira-primary transition-colors" title="Skip Intro">
                  <SkipForward className="w-6 h-6" />
                </button>
                
                <div className="flex items-center gap-3 hover:text-akira-primary transition-colors group/vol cursor-pointer">
                  <Volume2 className="w-6 h-6" />
                  <div className="w-24 h-1 bg-white/20 rounded-full overflow-hidden opacity-0 group-hover/vol:opacity-100 transition-opacity">
                    <div className="h-full w-2/3 bg-white" />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <button className="border border-white/20 hover:border-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm transition-colors opacity-80 hover:opacity-100">
                  Skip Intro
                </button>
                <button className="hover:text-akira-primary transition-colors" title="Subtitles & Audio">
                  <MessageSquare className="w-6 h-6" />
                </button>
                <button className="hover:text-akira-primary transition-colors">
                  <Maximize className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
