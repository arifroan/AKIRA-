export type AnimeFormat = 'TV' | 'Movie' | 'OVA' | 'Special';
export type AnimeStatus = 'Ongoing' | 'Completed' | 'Upcoming';

export interface AnimeTitle {
  english?: string;
  romaji: string;
  native?: string;
}

export interface Anime {
  id: string;
  title: AnimeTitle;
  synopsis: string;
  coverImage: string;
  bannerImage?: string;
  genres: string[];
  format: AnimeFormat;
  status: AnimeStatus;
  episodes?: number;
  year: number;
  studio: string;
  rating?: number;
  contentWarnings?: string[];
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  animes: Anime[];
}
