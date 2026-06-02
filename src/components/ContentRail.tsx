import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimeCard } from './AnimeCard';
import { Collection } from '../types';

interface ContentRailProps {
  collection: Collection;
  variant?: 'hero' | 'continue' | 'mood' | 'new' | 'universe';
}

export const ContentRail: React.FC<ContentRailProps> = ({ collection, variant = 'new' }) => {
  return (
    <section className="w-full py-6 md:py-8 relative animate-fade-in pl-6 pr-6 md:pl-10 md:pr-10">
      <div className="relative">
        <div className="mb-4 md:mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
             <div className="w-[3px] h-4 md:h-5 bg-akira-primary rounded-full"></div>
             <h2 className="font-sans text-[18px] md:text-[20px] text-white">
               {collection.title}
             </h2>
          </div>
          
          {variant !== 'universe' && variant !== 'mood' ? (
            <div className="hidden md:flex items-center gap-2">
              <button className="w-8 h-8 rounded-full border border-akira-border flex items-center justify-center text-akira-muted hover:text-white hover:bg-white/5 transition-colors">
                 <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors bg-white/5">
                 <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button className="text-[13px] font-medium text-akira-primary hover:text-white transition-colors duration-300 flex items-center gap-1 group">
              {variant === 'universe' ? 'Manage' : 'View all'} <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </button>
          )}
        </div>

        {/* Dynamic Rail Layout Based on Variant */}
        <div className="flex gap-4 md:gap-5 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-4">
          
          {variant === 'continue' && collection.animes.map((anime, index) => (
            <AnimeCard key={`${collection.id}-${anime.id}-${index}`} anime={anime} variant="progress" />
          ))}

          {variant === 'new' && collection.animes.map((anime, index) => (
            <AnimeCard key={`${collection.id}-${anime.id}-${index}`} anime={anime} variant="standard" />
          ))}

          {variant === 'mood' && collection.animes.map((anime, index) => (
            <div key={`mood-${index}`} className="flex-none w-[130px] md:w-[160px] h-[160px] md:h-[190px] bg-akira-card rounded-md overflow-hidden relative group cursor-pointer skew-card shadow-[0_4px_16px_rgba(0,0,0,0.4)] mx-1 md:mx-[10px]">
               <img src={anime.coverImage} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 opacity-60 mix-blend-overlay" />
               <div className="absolute inset-0 bg-gradient-to-t from-akira-dark via-akira-dark/40 to-transparent flex flex-col items-center justify-end pb-4 md:pb-5 gap-1 md:gap-2">
                  <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-akira-primary">
                    <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                  </div>
                  <span className="font-heading font-bold uppercase text-[10px] md:text-[11px] tracking-widest text-akira-primary opacity-90">{['EPIC', 'DARK', 'INSPIRING', 'FUN', 'EMOTIONAL', 'MYSTERY'][index % 6]}</span>
               </div>
            </div>
          ))}

          {variant === 'universe' && [
            { t: 'Watchlist', n: '23', m: 'Titles', i: collection.animes[0].coverImage },
            { t: 'Favorites', n: '47', m: 'Titles', i: collection.animes[1].coverImage },
            { t: 'Watched', n: '128', m: 'Episodes', i: collection.animes[2].coverImage },
            { t: 'Plan to Watch', n: '16', m: 'Titles', i: collection.animes[3].coverImage },
          ].map((stat, i) => (
            <div key={`stat-${i}`} className="flex-none w-[220px] md:w-[280px] h-[120px] md:h-[140px] bg-akira-panel rounded-2xl p-4 md:p-5 flex flex-col justify-between relative overflow-hidden group cursor-pointer border border-white/5 shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
               <img src={stat.i} className="absolute inset-0 w-full h-full object-cover opacity-20 transform group-hover:scale-105 transition-transform duration-700" />
               <div className="absolute inset-0 bg-gradient-to-r from-akira-dark to-transparent opacity-80" />
               
               <div className="relative z-10 text-white font-sans text-sm">{stat.t}</div>
               <div className="relative z-10 flex items-baseline gap-2">
                 <span className="font-heading text-4xl font-medium text-white">{stat.n}</span>
                 <span className="text-xs text-akira-muted font-sans">{stat.m}</span>
               </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};
