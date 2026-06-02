import React, { useEffect, useState } from 'react';
import { Hero } from '../components/Hero';
import { ContentRail } from '../components/ContentRail';
import { db } from '../lib/firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

export const Home = () => {
  const [featuredAnime, setFeaturedAnime] = useState<any>(null);
  const [trending, setTrending] = useState<any[]>([]);
  const [latest, setLatest] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const animeRef = collection(db, 'anime');
        const qRecent = query(animeRef, orderBy('createdAt', 'desc'), limit(15));
        const recentSnap = await getDocs(qRecent);
        const recentAnimes = recentSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        if (recentAnimes.length > 0) {
           setFeaturedAnime(recentAnimes[0]);
           setLatest(recentAnimes);
           setTrending([...recentAnimes].sort(() => 0.5 - Math.random()));
        }
      } catch (error) {
        console.error("Failed to fetch home data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  if (loading) return <div className="min-h-screen bg-akira-dark flex items-center justify-center text-white">Loading Akira Universe...</div>;

  return (
    <div className="flex flex-col bg-akira-dark min-h-screen">
      {featuredAnime && <Hero featured={featuredAnime} />}
      <div className="flex flex-col gap-8 -mt-20 relative z-20 pb-20">
        <ContentRail title="Trending Now" animes={trending} />
        <ContentRail title="New Releases" animes={latest} />
      </div>
    </div>
  );
};
