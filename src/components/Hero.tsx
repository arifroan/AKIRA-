import React from 'react';
import { Play } from 'lucide-react';
import { Anime } from '../types';
import { Link } from 'react-router-dom';

interface HeroProps {
  anime: Anime;
}

export const Hero: React.FC<HeroProps> = ({ anime }) => {
  const title = anime.title.english || anime.title.romaji;
  
  // Split title if it contains spaces to recreate the multi-line effect
  const titleParts = title.split(' ');
  const firstPart = titleParts.slice(0, Math.ceil(titleParts.length / 2)).join(' ');
  const secondPart = titleParts.slice(Math.ceil(titleParts.length / 2)).join(' ');

  return (
    <div className="relative w-full h-[85vh] md:h-[85vh] min-h-[600px] flex items-center overflow-hidden bg-akira-dark md:pl-12 md:pr-12">
      {/* Background & Illustration layout */}
      
      {/* Abstract Sun / Glow background on the right (hidden on mobile to reduce clutter) */}
      <div className="hidden md:block absolute right-[5%] top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-akira-primary/20 blur-[100px] opacity-70 pointer-events-none" />
      <div className="hidden md:block absolute right-[10%] top-1/2 -translate-y-[45%] w-[450px] h-[450px] rounded-full bg-[#f64724] blur-[40px] opacity-90 pointer-events-none" />
      
      <div className="absolute inset-0 md:right-0 md:left-auto md:w-[65%] z-10 pointer-events-none">
        
        {/* Cinematic Illustration */}
        <img 
          src={anime.bannerImage} 
          alt={title}
          className="w-full h-full object-cover object-[center_20%] md:object-right md:mask-gradient-hero opacity-70 md:opacity-100"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-akira-dark via-akira-dark/90 md:via-akira-dark/80 to-akira-dark/10 md:to-transparent z-15" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 md:opacity-0 z-15" />

      {/* Main Content Area */}
      <div className="relative z-20 w-full flex flex-col justify-end md:justify-between items-start md:items-center h-full pb-16 md:pb-0 pt-24 md:pt-16">
        
        {/* Left Typography Column */}
        <div className="w-full max-w-xl animate-fade-in flex flex-col px-6 md:pl-8 md:px-0 z-20">
          <div className="flex items-center gap-3 mb-2 md:mb-4">
            <span className="text-akira-primary text-xs font-semibold tracking-[0.2em] uppercase shadow-black font-sans drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
              FEATURED
            </span>
            <div className="hidden md:flex gap-2 text-[10px] font-mono tracking-widest text-akira-muted uppercase">
              <span className="border border-white/20 px-2 py-0.5 rounded">{anime.format || 'TV SERIES'}</span>
            </div>
          </div>
          
          {/* Multi-line styled Title */}
          <div className="flex flex-col mb-4 md:mb-6">
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.0] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {secondPart ? firstPart : title}
            </h1>
            {secondPart && (
              <h2 className="font-display text-5xl md:text-7xl font-bold leading-[1.0] text-akira-primary drop-shadow-[0_2px_8px_rgba(242,61,70,0.6)]">
                {secondPart}
              </h2>
            )}
          </div>
          
          <div className="flex gap-2 text-[10px] md:hidden font-mono tracking-widest text-[#9ca3af] uppercase mb-4 opacity-90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
             <span className="border border-white/20 px-2 py-0.5 rounded bg-black/40 backdrop-blur-sm">{anime.format || 'TV SERIES'}</span>
             <span className="border border-white/20 px-2 py-0.5 rounded bg-black/40 backdrop-blur-sm">{anime.seasonYear || '2024'}</span>
          </div>
          
          <p className="text-[#d1d5db] text-sm md:text-lg leading-relaxed mb-6 md:mb-8 max-w-[400px] font-sans drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] line-clamp-3 md:line-clamp-none">
            {anime.description?.replace(/<[^>]*>?/gm, '') || "In a world where gods fell and rebellion rose, one flame refuses to be extinguished."}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 w-full sm:w-auto">
            <Link 
              to={`/player/${anime.id}`}
              className="w-full sm:w-auto group flex items-center justify-center gap-2 bg-akira-primary text-white border-2 border-akira-primary px-8 py-3.5 md:py-3 rounded-full font-medium shadow-[0_4px_16px_rgba(242,61,70,0.4)] hover:bg-akira-primary-hover transition-colors"
            >
              <Play className="w-5 h-5 fill-current" />
              <span className="tracking-wide">Watch Now</span>
            </Link>
            
            <button className="w-full sm:w-auto flex items-center justify-center bg-black/40 backdrop-blur-md md:bg-transparent md:backdrop-blur-none text-white border border-white/20 px-8 py-3.5 md:py-3 rounded-full font-medium hover:bg-white/10 transition-colors shadow-lg md:shadow-none">
              <span className="tracking-wide">More Info</span>
            </button>
          </div>
        </div>

        {/* Right Nav Hints & Japanese Text (Desktop Only) */}
        <div className="hidden md:flex flex-col items-end pr-8 gap-36 z-30 pointer-events-none">
          <div className="writing-vertical-rl text-akira-primary text-xl tracking-[0.4em] font-medium font-sans">
            天は燃え、運命は始まる
          </div>
          <div className="flex items-center gap-4 text-akira-text text-sm font-mono tracking-widest">
            <span>01</span>
            <span className="w-4 h-[1px] bg-white"></span>
            <span className="text-akira-muted">05</span>
          </div>
        </div>
      </div>
    </div>
  );
};
