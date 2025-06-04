export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  overview: string;
}

export interface MovieDetails extends Movie {
  genres: Genre[];
  runtime: number;
  tagline?: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieSearchResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
} 