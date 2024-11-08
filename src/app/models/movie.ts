export interface MovieResponse {
  page?: number;
  results?: Movie[];
  total_pages?: number;
  total_results?: number;
}

export interface Movie {
  adult?: boolean;
  backdrop_path?: string;
  genre_ids?: number[];
  genres?: string[];
  id?: number;
  original_language?: OriginalLanguage;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  release_date?: Date;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
  isFavorite?: boolean;
}

export enum OriginalLanguage {
  En = 'en',
  Es = 'es',
  Fr = 'fr',
  Ko = 'ko',
  Tl = 'tl',
}
