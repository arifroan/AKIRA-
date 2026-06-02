import React from 'react';
import { Hero } from '../components/Hero';
import { ContentRail } from '../components/ContentRail';
import { MOCK_ANIMES } from '../data';

export const Home = () => {
  return (
    <div className="flex flex-col bg-akira-dark min-h-screen">
      <Hero />
      <div className="flex flex-col gap-8 -mt-20 relative z-20 pb-20">
        <ContentRail title="Trending Now" animes={MOCK_ANIMES} />
        <ContentRail title="New Releases" animes={[...MOCK_ANIMES].reverse()} />
        <ContentRail title="Because you watched Neon Nights" animes={MOCK_ANIMES} />
      </div>
    </div>
  );
};
