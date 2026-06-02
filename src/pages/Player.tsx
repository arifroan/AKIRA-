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
    if (isPlaying) {
      timeout = setTimeout(() => setShowControls(false), 3000);
    }
    return () => clearTimeout(timeout);
  }, [isPlaying, showControls]);

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col font-sans">
      {/* Mock Video Area */}
      <div 
        className="relative flex-1 bg-black overflow-hidden flex items-center justify-center cursor-none group"
        onMouseMove={() => {
          setShowControls(true);
          if (isPlaying) {
            // Simple timeout mock to re-hide controls
          }
        }}
        onClick={() => setIsPlaying(!isPlaying)}
      >
        <img 
          src={anime.bannerImage}
          alt="Video stream"
          className="w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
        
        {/* Top Controls Gradient */}
        <div className={`absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/80 to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`} />
        
        {/* Back Button & Title */}
        <div className={`absolute top-0 left-0 p-8 flex items-center gap-6 transition-all duration-300 ${showControls ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <Link to="/" className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur transition-colors" onClick={(e) => e.stopPropagation()}>
            <ArrowLeft className="w-6 h-6 text-white" />
          </Link>
          <div>
            <h2 className="font-display text-2xl text-white font-medium">{anime.title.english || anime.title.romaji}</h2>
            <p className="text-akira-muted uppercase tracking-widest text-[10px] font-bold">Episode 1 • The Awakening</p>
          </div>
        </div>

        {/* Big Play Button Overlay (when paused) */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-24 h-24 rounded-full bg-akira-amber/90 flex items-center justify-center shadow-[0_0_50px_rgba(255,123,0,0.5)] transform scale-110 animate-fade-in">
              <Play className="w-10 h-10 text-akira-dark fill-current ml-2" />
            </div>
          </div>
        )}

        {/* Bottom Controls Gradient */}
        <div className={`absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent transition-opacity duration-300 flex flex-col justify-end px-8 pb-8 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          
          {/* Progress Bar */}
          <div className="group/progress w-full h-1.5 bg-white/20 rounded-full mb-6 cursor-pointer relative" onClick={(e) => e.stopPropagation()}>
            <div className="h-full w-1/3 bg-akira-amber rounded-full relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-lg opacity-0 group-hover/progress:opacity-100 transition-opacity" />
            </div>
            {/* Markers for Intro/Outro skip */}
            <div className="absolute top-0 h-full w-0.5 bg-white/50 left-[5%]" />
            <div className="absolute top-0 h-full w-0.5 bg-white/50 left-[8%]" />
          </div>

          <div className="flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-6 text-white">
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
              
              <span className="text-sm font-medium tracking-wide">08:24 <span className="text-white/40">/ 24:00</span></span>
            </div>

            <div className="flex items-center gap-6 text-white">
              <button className="border border-white/20 hover:border-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm transition-colors">
                Skip Intro
              </button>
              <button className="hover:text-akira-gold transition-colors" title="Subtitles & Audio">
                <MessageSquare className="w-6 h-6" />
              </button>
              <button className="hover:text-akira-gold transition-colors">
                <Settings className="w-6 h-6" />
              </button>
              <button className="hover:text-akira-gold transition-colors">
                <Maximize className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
