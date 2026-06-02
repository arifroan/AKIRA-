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
      <Link to={`/player/${anime.id}`} className="group relative flex flex-col flex-none w-[280px] md:w-[320px] snap-center bg-akira-card rounded-[20px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.4)] border border-white/5 md:hover:-translate-y-1 transition-all">
        <div className="relative aspect-[16/10] md:aspect-[4/3] w-full overflow-hidden bg-akira-dark">
          <img 
            src={anime.coverImage} 
            alt={anime.title.english || anime.title.romaji}
            className="w-full h-full object-cover transform md:group-hover:scale-105 transition-transform duration-700 ease-out"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-akira-card to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4 z-20">
             <div className="flex items-center justify-between text-xs text-white/80 font-sans mb-2 font-medium">
                <span>S2 · Episode 17</span>
                <span className="text-akira-primary font-bold">75%</span>
             </div>
             <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-akira-primary w-[75%] rounded-full shadow-[0_0_10px_rgb(242,61,70,0.8)]" />
             </div>
          </div>
          
          <div className="md:hidden absolute inset-0 flex items-center justify-center opacity-100 z-10 pointer-events-none">
            <div className="w-12 h-12 rounded-full bg-akira-primary/90 backdrop-blur shadow-lg flex items-center justify-center">
              <Play className="w-5 h-5 text-white fill-current ml-1" />
            </div>
          </div>
        </div>

        <div className="flex flex-col p-4 md:p-5 pt-2">
          <h3 className="font-heading font-medium text-white text-[16px] md:text-[15px] leading-tight line-clamp-1">
            {anime.title.english || anime.title.romaji}
          </h3>
        </div>
      </Link>
    );
  }

  // Standard/Hot/New Card Style
  return (
    <Link to={`/player/${anime.id}`} className="group relative flex flex-col flex-none w-[150px] md:w-[220px] snap-center">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[16px] md:rounded-2xl bg-akira-card mb-3 md:mb-4 shadow-[0_8px_20px_rgba(0,0,0,0.6)] border border-white/5 md:hover:border-white/10 transition-colors">
        <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-akira-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
        
        <img 
          src={anime.coverImage} 
          alt={anime.title.english || anime.title.romaji}
          className="w-full h-full object-cover transform md:group-hover:scale-110 transition-transform duration-700 ease-out"
          referrerPolicy="no-referrer"
        />

        <div className="absolute top-2 md:top-3 left-2 md:left-3 z-20">
            <div className="bg-akira-primary/95 backdrop-blur-sm text-white text-[9px] md:text-[10px] font-bold px-2 py-1 rounded-[6px] tracking-wide shadow-md">
              {anime.status === 'Ongoing' ? 'NEW' : 'HOT'}
            </div>
        </div>

        <div className="hidden md:flex absolute inset-0 z-20 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300 ease-out">
            <Play className="w-5 h-5 text-white fill-current ml-1" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1 px-1 mt-1">
        <h3 className="font-heading font-medium text-white text-[14px] md:text-[15px] leading-tight line-clamp-2 md:line-clamp-1 h-[2.5rem] md:h-auto">
          {anime.title.english || anime.title.romaji}
        </h3>
        <div className="flex items-center justify-between text-[11px] md:text-xs font-sans mt-0.5 md:mt-1">
           <span className="text-akira-muted font-medium">Ep. 6</span>
           {anime.rating && (
              <div className="flex items-center gap-1 text-white/90 font-medium bg-white/10 px-1.5 py-0.5 rounded">
                <Star className="w-2.5 h-2.5 text-akira-primary fill-akira-primary" />
                {anime.rating.toFixed(1)}
              </div>
           )}
        </div>
      </div>
    </Link>
  );
};
