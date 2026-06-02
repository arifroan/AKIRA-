import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Pause, ArrowLeft, Settings, Maximize, SkipForward, Volume2, MessageSquare } from 'lucide-react';
import { MOCK_ANIMES } from '../data';

export const Player = () => {
  const { id } = useParams<{ id: string }>();
  const [isPlaying, setIsPlaying] = useState(false);
  const anime = MOCK_ANIMES.find(a => a.id === id) || MOCK_ANIMES[0];

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col font-sans">
      <div 
        className="relative flex-1 bg-black overflow-hidden flex items-center justify-center cursor-pointer group"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        <img 
          src={anime.bannerImage}
          alt={anime.title.english || anime.title.romaji}
          className="w-full h-full object-cover opacity-50"
        />
        
        {/* Controls Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          
          <div className="absolute top-0 inset-x-0 p-8 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
            <div className="flex items-center gap-6">
              <Link to="/" className="p-3 bg-black/40 hover:bg-white/20 rounded-full backdrop-blur-md transition-colors border border-white/10" onClick={(e) => e.stopPropagation()}>
                <ArrowLeft className="w-6 h-6 text-white" />
              </Link>
              <div>
                <h2 className="font-display text-2xl text-white font-medium drop-shadow-md">{anime.title.english || anime.title.romaji}</h2>
                <p className="text-akira-muted uppercase tracking-widest text-[10px] font-bold mt-1">Episode 1</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-3 hover:bg-white/20 rounded-full text-white transition-colors" onClick={(e) => e.stopPropagation()}>
                 <Settings className="w-6 h-6" />
              </button>
            </div>
          </div>

          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center shadow-lg backdrop-blur-md">
                <Play className="w-10 h-10 text-white fill-current ml-2" />
              </div>
            </div>
          )}

          <div className="absolute bottom-0 inset-x-0 p-8 pt-24 bg-gradient-to-t from-black to-transparent flex flex-col gap-6" onClick={(e) => e.stopPropagation()}>
            <div className="w-full flex items-center gap-4">
              <span className="text-sm font-medium tracking-wide text-white drop-shadow-md w-12 text-right">00:00</span>
              <div className="flex-1 h-1.5 bg-white/20 rounded-full cursor-pointer relative">
                <div className="h-full w-1/3 bg-akira-primary rounded-full relative" />
              </div>
              <span className="text-sm font-medium tracking-wide text-white drop-shadow-md w-12">24:00</span>
            </div>

            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-8">
                <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-akira-primary transition-colors">
                  {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current" />}
                </button>
                <button className="hover:text-akira-primary transition-colors">
                  <SkipForward className="w-6 h-6" />
                </button>
                <div className="flex items-center gap-3 hover:text-akira-primary transition-colors cursor-pointer">
                  <Volume2 className="w-6 h-6" />
                </div>
              </div>

              <div className="flex items-center gap-8">
                <button className="border border-white/20 hover:border-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm transition-colors opacity-80 hover:opacity-100">
                  Skip Intro
                </button>
                <button className="hover:text-akira-primary transition-colors">
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
