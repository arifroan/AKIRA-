import React from 'react';
import { Hero } from '../components/Hero';
import { ContentRail } from '../components/ContentRail';
import { MOCK_ANIMES, MOCK_COLLECTIONS } from '../data';

export const Home = () => {
  const featuredAnime = MOCK_ANIMES[0];

  return (
    <div className="bg-akira-dark flex flex-col min-h-screen">
      <Hero anime={featuredAnime} />
      
      <div className="relative z-20 pb-24 md:mt-4 space-y-4 md:space-y-2">
        <ContentRail 
          collection={{ id: 'continue', title: 'Continue Your Journey', description: '', animes: MOCK_ANIMES.slice(0,4) }} 
          variant="continue" 
        />
        
        <ContentRail 
          collection={{ id: 'mood', title: 'Explore by Mood', description: '', animes: [...MOCK_ANIMES, ...MOCK_ANIMES].slice(0,6) }} 
          variant="mood" 
        />

        <ContentRail 
          collection={{ id: 'new', title: 'New & Hot', description: '', animes: [...MOCK_ANIMES, ...MOCK_ANIMES].slice(0,6) }} 
          variant="new" 
        />

        <ContentRail 
          collection={{ id: 'universe', title: 'My Universe', description: '', animes: MOCK_ANIMES }} 
          variant="universe" 
        />
      </div>
    </div>
  );
};
