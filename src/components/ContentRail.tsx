import React from 'react';
import { AnimeCard } from './AnimeCard';
import { Anime } from '../types';
import { ChevronRight } from 'lucide-react';

interface ContentRailProps {
  title: string;
  animes: Anime[];
}

export const ContentRail: React.FC<ContentRailProps> = ({ title, animes }) => {
  return (
    <section className="w-full py-8 relative pl-8 pr-8 max-w-[1600px] mx-auto animate-fade-in">
      <div className="mb-6 flex items-center justify-between group cursor-pointer">
        <div className="flex items-center gap-3">
          <div className="w-[3px] h-6 bg-akira-primary rounded-full"></div>
          <h2 className="font-sans text-2xl font-medium text-white group-hover:text-akira-primary transition-colors">
            {title}
          </h2>
          <ChevronRight className="w-6 h-6 text-akira-muted opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
        </div>
      </div>

      <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-4 -mx-8 px-8">
        {animes.map((anime, index) => (
          <AnimeCard key={`${title}-${anime.id}-${index}`} anime={anime} />
        ))}
      </div>
    </section>
  );
};
