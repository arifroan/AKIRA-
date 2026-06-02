import React from 'react';
import { Play } from 'lucide-react';
import { Anime } from '../types';
import { Link } from 'react-router-dom';

export const AnimeCard: React.FC<{ anime: Anime }> = ({ anime }) => {
  return (
    <Link to={`/player/${anime.id}`} className="group relative flex flex-col flex-none w-[240px]">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-akira-card mb-4 shadow-lg border border-white/5 group-hover:border-white/20 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-t from-akira-dark/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
        
        <img 
          src={anime.coverImage} 
          alt={anime.title.english || anime.title.romaji}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
        />

        <div className="absolute top-3 left-3 z-20">
          <div className="bg-akira-primary/95 text-white text-[10px] font-bold px-2 py-1 rounded tracking-wide shadow-md">
            {anime.status === 'Ongoing' ? 'NEW' : 'HOT'}
          </div>
        </div>
        
        <div className="absolute inset-0 z-20 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex">
          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300 ease-out border border-white/10">
            <Play className="w-6 h-6 text-white fill-current ml-1" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1 px-1">
        <h3 className="font-heading font-medium text-white text-base leading-tight line-clamp-1 group-hover:text-akira-primary transition-colors">
          {anime.title.english || anime.title.romaji}
        </h3>
        <div className="flex items-center gap-2 text-xs text-akira-muted font-sans mt-1">
          <span>{anime.seasonYear}</span>
          <span className="w-1 h-1 rounded-full bg-akira-muted/50" />
          <span>{anime.episodes} Episodes</span>
        </div>
      </div>
    </Link>
  );
};
