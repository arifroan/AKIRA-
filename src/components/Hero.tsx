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
    <div className="relative w-full h-[60vh] md:h-[80vh] min-h-[500px] md:min-h-[600px] flex items-center overflow-hidden bg-akira-dark md:pl-12 md:pr-12">
      {/* Background & Illustration layout */}
      
      {/* Abstract Sun / Glow background on the right */}
      <div className="absolute right-[-20%] md:right-[5%] top-[20%] md:top-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-akira-primary/20 blur-[60px] md:blur-[100px] opacity-70 pointer-events-none" />
      <div className="absolute right-[0%] md:right-[10%] top-[10%] md:top-1/2 -translate-y-[45%] w-[250px] md:w-[450px] h-[250px] md:h-[450px] rounded-full bg-[#f64724] blur-[30px] md:blur-[40px] opacity-90 pointer-events-none" />
      
      <div className="absolute inset-0 md:right-0 md:left-auto md:w-[65%] z-10 pointer-events-none">
        
        {/* Cinematic Illustration */}
        <img 
          src={anime.bannerImage} 
          alt={title}
          className="w-full h-full object-cover object-top md:object-right mask-gradient-hero opacity-60 md:opacity-100"
          style={{ 
            maskImage: 'linear-gradient(to right, transparent 0%, black 30%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 30%, black 100%)' 
          }}
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-akira-dark via-akira-dark/80 to-transparent z-15" />

      {/* Main Content Area */}
      <div className="relative z-20 w-full flex flex-col justify-end md:justify-between items-start md:items-center mt-24 md:mt-16 h-full pb-10 md:pb-0">
        
        {/* Left Typography Column */}
        <div className="max-w-xl animate-fade-in md:pl-8 flex flex-col px-6 md:px-0 z-20">
          <div className="flex items-center gap-3 mb-2 md:mb-4">
            <span className="text-akira-primary text-xs font-semibold tracking-[0.2em] uppercase shadow-black drop-shadow-md">
              FEATURED
            </span>
          </div>
          
          {/* Multi-line styled Title */}
          <div className="flex flex-col mb-4 md:mb-6">
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.1] mb-1 md:mb-2 text-white">
              {secondPart ? firstPart : title}
            </h1>
            {secondPart && (
              <h2 className="font-display text-5xl md:text-7xl font-bold leading-[1.1] mb-4 md:mb-6 text-akira-primary drop-shadow-lg">
                {secondPart}
              </h2>
            )}
          </div>
          
          <p className="text-akira-text text-sm md:text-lg leading-relaxed mb-6 md:mb-8 max-w-[400px] font-sans drop-shadow-md line-clamp-3 md:line-clamp-none">
            {anime.description?.replace(/<[^>]*>?/gm, '') || "In a world where gods fell and rebellion rose, one flame refuses to be extinguished."}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 w-full sm:w-auto">
            <Link 
              to={`/player/${anime.id}`}
              className="w-full sm:w-auto group flex items-center justify-center gap-2 bg-akira-primary text-white border-2 border-akira-primary px-8 py-3 rounded-full font-medium shadow-lg"
            >
              <Play className="w-4 h-4 md:w-5 md:h-5 fill-current" />
              <span className="tracking-wide">Watch Now</span>
            </Link>
            
            <button className="w-full sm:w-auto flex items-center justify-center bg-akira-dark/50 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none text-white border border-white/20 px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-colors">
              <span className="tracking-wide">More Info</span>
            </button>
          </div>
        </div>

        {/* Right Nav Hints & Japanese Text */}
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
