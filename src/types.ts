export interface Anime {
  id: string;
  title: {
    romaji: string;
    english?: string;
  };
  coverImage: string;
  bannerImage: string;
  description: string;
  episodes: number;
  status: 'Ongoing' | 'Completed' | 'Upcoming';
  format: 'TV SERIES' | 'MOVIE' | 'OVA';
  seasonYear: number;
  rating: number;
  genres: string[];
}
