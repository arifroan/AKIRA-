import { Anime, Collection } from './types';

// High-quality placeholder images (falling back to unsplash for cinematic feel)
const getCinematicImage = (id: string, type: 'banner' | 'cover') => {
  const seed = id + type;
  const width = type === 'banner' ? 1920 : 600;
  const height = type === 'banner' ? 1080 : 800;
  // Use specific Unsplash keywords for cinematic anime vibe
  return `https://picsum.photos/seed/${seed}/${width}/${height}?blur=1`;
};

// Explicit high quality urls for demonstration
const covers = [
  'https://images.unsplash.com/photo-1542456382-74431d16ab03?q=80&w=600&h=800&fit=crop', // Tokyo alley
  'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=600&h=800&fit=crop', // Anime style rain
  'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=600&h=800&fit=crop', // Neon cyberpunk
  'https://images.unsplash.com/photo-1550100136-e092101726f4?q=80&w=600&h=800&fit=crop', // Sword
  'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=600&h=800&fit=crop', // Epic landscape
  'https://images.unsplash.com/photo-1604542289659-67995163bcff?q=80&w=600&h=800&fit=crop', // Synthwave
];

const banners = [
  'https://images.unsplash.com/photo-1546755452-965bfd598505?q=80&w=1920&h=1080&fit=crop', // Cyberpunk city
  'https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=1920&h=1080&fit=crop', // Tokyo cityscape sunset
  'https://images.unsplash.com/photo-1498036882173-b41c28af5cb9?q=80&w=1920&h=1080&fit=crop', // Epic nature
];


export const MOCK_ANIMES: Anime[] = [
  {
    id: 'a1',
    title: { romaji: 'Neon Genesis: Resurgence', english: 'Cyber Spirit' },
    synopsis: 'In a sprawling metropolis where humanity has merged with machines, a lone detective uncovers a conspiracy that threatens the fragile boundary between soul and silicon.',
    coverImage: covers[0],
    bannerImage: banners[0],
    genres: ['Sci-Fi', 'Action', 'Psychological'],
    format: 'TV',
    status: 'Ongoing',
    episodes: 24,
    year: 2024,
    studio: 'A-1 Productions',
    rating: 9.8,
  },
  {
    id: 'a2',
    title: { romaji: 'Kage no Ken', english: 'Blade of Shadows' },
    synopsis: 'A disgraced samurai roams a war-torn land, seeking redemption for a past failure. When he discovers an orphaned child with immense power, he vows to protect them at all costs.',
    coverImage: covers[1],
    bannerImage: banners[1],
    genres: ['Action', 'Historical', 'Drama'],
    format: 'Movie',
    status: 'Completed',
    year: 2023,
    studio: 'Bones',
    rating: 9.5,
  },
  {
    id: 'a3',
    title: { romaji: 'Hoshi no Kiseki', english: 'Stellar Trails' },
    synopsis: 'Humanity has taken to the stars, but the vastness of space hides ancient terrors. A crew of misfits on a scavenging vessel stumble upon an artifact that could rewrite history.',
    coverImage: covers[2],
    bannerImage: banners[2],
    genres: ['Sci-Fi', 'Adventure', 'Space'],
    format: 'TV',
    status: 'Ongoing',
    episodes: 12,
    year: 2025,
    studio: 'Trigger',
    rating: 8.9,
  },
  {
    id: 'a4',
    title: { romaji: 'Mahou no Machi', english: 'City of Illusions' },
    synopsis: 'Every sunset, the city changes its labyrinthine streets. Only the "Mappers", individuals with a unique affinity for magic, can navigate the shifting reality to find lost souls.',
    coverImage: covers[3],
    bannerImage: banners[0],
    genres: ['Fantasy', 'Mystery', 'Supernatural'],
    format: 'TV',
    status: 'Completed',
    episodes: 12,
    year: 2022,
    studio: 'Kyoto Animation',
    rating: 9.1,
  },
  {
    id: 'a5',
    title: { romaji: 'Shinrin no Nushi', english: 'Lord of the Forest' },
    synopsis: 'Deep within an ancient, forbidden forest, a spirit wakes from a thousand-year slumber. A young botanist forms an unlikely bond with the creature, discovering secrets about the world\'s origin.',
    coverImage: covers[4],
    bannerImage: banners[1],
    genres: ['Fantasy', 'Slice of Life', 'Adventure'],
    format: 'Movie',
    status: 'Completed',
    year: 2021,
    studio: 'Ghibli',
    rating: 9.9,
  },
  {
    id: 'a6',
    title: { romaji: 'Re:Cyber', english: 'Re:Cyber' },
    synopsis: 'Trapped in a virtual reality death game, a group of hackers must use their coding skills to bend the rules of the simulation and defeat the rogue AI warden.',
    coverImage: covers[5],
    bannerImage: banners[2],
    genres: ['Action', 'Thriller', 'Sci-Fi'],
    format: 'TV',
    status: 'Upcoming',
    year: 2026,
    studio: 'MAPPA',
    rating: 8.5,
  }
];

export const MOCK_COLLECTIONS: Collection[] = [
  {
    id: 'trending',
    title: 'Trending Worlds',
    description: 'The most active chronicles across the universe right now.',
    animes: [MOCK_ANIMES[0], MOCK_ANIMES[2], MOCK_ANIMES[3], MOCK_ANIMES[1], MOCK_ANIMES[4]]
  },
  {
    id: 'new',
    title: 'New Chronicles',
    description: 'Fresh tales just added to the archive.',
    animes: [MOCK_ANIMES[5], MOCK_ANIMES[2], MOCK_ANIMES[0]]
  },
  {
    id: 'hidden',
    title: 'Hidden Gems',
    description: 'Rare artifacts waiting to be discovered.',
    animes: [MOCK_ANIMES[4], MOCK_ANIMES[3], MOCK_ANIMES[1]]
  }
];
