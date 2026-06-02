import { Anime } from './types';

export const MOCK_ANIMES: Anime[] = [
  {
    id: "1",
    title: { romaji: "Heavenly Embers", english: "Heavenly Embers" },
    coverImage: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx16498-73IhOXpJZiMF.jpg",
    bannerImage: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/101922-YqzOClnxIEQW.jpg",
    description: "In a world where gods fell and rebellion rose, one flame refuses to be extinguished.",
    episodes: 24,
    status: 'Ongoing',
    format: 'TV SERIES',
    seasonYear: 2024,
    rating: 9.8,
    genres: ['Action', 'Fantasy']
  },
  {
    id: "2",
    title: { romaji: "Neon Nights", english: "Neon Nights" },
    coverImage: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx113415-bbBWj4pEFseh.jpg",
    bannerImage: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/113415-jQBSkxWAAk83.jpg",
    description: "In year 2099, neon cities hide massive secrets.",
    episodes: 12,
    status: 'Completed',
    format: 'TV SERIES',
    seasonYear: 2023,
    rating: 8.5,
    genres: ['Sci-Fi', 'Action']
  },
  {
    id: "3",
    title: { romaji: "Silent Echo", english: "Silent Echo" },
    coverImage: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx11061-smpxu5F9iEaP.jpg",
    bannerImage: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/11061-c8hU0H0ELh4Q.jpg",
    description: "A touching drama about sound and feelings.",
    episodes: 12,
    status: 'Completed',
    format: 'TV SERIES',
    seasonYear: 2022,
    rating: 9.2,
    genres: ['Drama', 'Romance']
  },
  {
    id: "4",
    title: { romaji: "Demon Slayers", english: "Demon Slayers" },
    coverImage: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101922-PEn1CTc93blC.jpg",
    bannerImage: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/101922-YqzOClnxIEQW.jpg",
    description: "Slaying demons in era.",
    episodes: 26,
    status: 'Completed',
    format: 'TV SERIES',
    seasonYear: 2019,
    rating: 9.5,
    genres: ['Action', 'Fantasy']
  }
];
