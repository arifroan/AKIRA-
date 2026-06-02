import React from 'react';
import { Play, Star } from 'lucide-react';
import { Anime } from '../types';
import { Link } from 'react-router-dom';

interface AnimeCardProps {
  anime: Anime;
  variant?: 'standard' | 'progress'; 
}

export const AnimeCard: React.FC<AnimeCardProps> = ({ anime, variant = 'standard' }) => {
  
  if (variant === 'progress') {
    // Continue Your Journey Card Style
    return (
      <Link to={`/player/${anime.id}`} className="group relative flex flex-col flex-none w-[240px] md:w-[320px] snap-center bg-akira-card rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.4)] border border-white/5 transition-transform hover:-translate-y-1">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-akira-dark">
          <img 
            src={anime.coverImage} 
            alt={anime.title.english || anime.title.romaji}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="flex flex-col p-5">
          <h3 className="font-heading font-medium text-white text-[15px] leading-tight line-clamp-1 mb-1">
            {anime.title.english || anime.title.romaji}
          </h3>
          <div className="flex items-center justify-between text-[11px] text-akira-muted font-sans mb-3">
             <span>S2 · Episode 17</span>
             <span>75%</span>
          </div>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
             <div className="h-full bg-akira-primary w-[75%]" />
          </div>
        </div>
      </Link>
    );
  }

  // Standard/Hot/New Card Style
  return (
    <Link to={`/player/${anime.id}`} className="group relative flex flex-col flex-none w-[140px] md:w-[220px] snap-center">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-akira-card mb-3 shadow-[0_4px_16px_rgba(0,0,0,0.4)] border border-white/5">
        <div className="absolute inset-0 bg-gradient-to-t from-akira-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
        
        <img 
          src={anime.coverImage} 
          alt={anime.title.english || anime.title.romaji}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
          referrerPolicy="no-referrer"
        />

        <div className="absolute top-3 left-3 z-20">
            <div className="bg-akira-primary/95 text-white text-[10px] font-bold px-2 py-1 rounded-[4px] tracking-wide shadow-md">
              {anime.status === 'Ongoing' ? 'NEW' : 'HOT'}
            </div>
        </div>

        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300 ease-out">
            <Play className="w-5 h-5 text-white fill-current ml-1" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-0.5 px-1">
        <h3 className="font-heading font-medium text-white text-[15px] leading-tight line-clamp-1">
          {anime.title.english || anime.title.romaji}
        </h3>
        <div className="flex items-center justify-between text-xs font-sans mt-0.5">
           <span className="text-akira-muted">Episode 6</span>
           {anime.rating && (
              <div className="flex items-center gap-1 text-akira-text font-medium text-[11px]">
                <Star className="w-3 h-3 text-akira-primary fill-akira-primary" />
                {anime.rating.toFixed(1)}
              </div>
           )}
        </div>
      </div>
    </Link>
  );
};
