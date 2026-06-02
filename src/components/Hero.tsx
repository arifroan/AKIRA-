import React from 'react';
import { Play, Info } from 'lucide-react';
import { MOCK_ANIMES } from '../data';
import { Link } from 'react-router-dom';

export const Hero = () => {
  const featured = MOCK_ANIMES[0];

  return (
    <div className="relative w-full h-[85vh] overflow-hidden bg-akira-dark flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 mask-gradient-hero">
        <img 
          src={featured.bannerImage} 
          alt={featured.title.english || featured.title.romaji}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-akira-dark via-akira-dark/80 to-transparent" />
      </div>

      <div className="relative z-10 px-8 max-w-7xl mx-auto w-full pt-16">
        <div className="max-w-2xl animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-akira-primary/20 text-akira-primary text-xs font-bold uppercase tracking-widest px-3 py-1 rounded">Feature</span>
            <span className="text-white/60 text-sm font-medium tracking-wide">2024 • Action</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-medium text-white leading-tight mb-6 drop-shadow-lg">
            {featured.title.english || featured.title.romaji}
          </h1>
          
          <p className="text-lg text-white/80 line-clamp-3 mb-10 max-w-xl leading-relaxed drop-shadow">
            {featured.description}
          </p>

          <div className="flex items-center gap-4">
            <Link to={`/player/${featured.id}`} className="flex items-center justify-center gap-3 bg-white text-black hover:bg-white/90 px-8 py-4 rounded-full font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95 text-sm">
              <Play className="w-5 h-5 fill-current" />
              Watch Now
            </Link>
            <button className="flex items-center justify-center gap-3 bg-akira-card/80 border border-white/10 text-white hover:bg-white/10 px-8 py-4 rounded-full font-bold uppercase tracking-widest transition-colors backdrop-blur-md text-sm">
              <Info className="w-5 h-5" />
              More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
