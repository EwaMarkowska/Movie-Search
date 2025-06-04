import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Movie } from '../types/movie';

const TMDB_API_KEY = 'fdb766ad89c2e1a549cc29d67273229f';
const BASE_URL = 'https://api.themoviedb.org/3';

export interface MovieResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
  page: number;
}

interface PaginationParams {
  page: number;
}

interface SearchParams extends PaginationParams {
  query: string;
}

interface DiscoverParams extends PaginationParams {
  genreId?: number;
}

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: BASE_URL
  }),
  tagTypes: ['Movies'],
  endpoints: (builder) => ({
    searchMovies: builder.query<MovieResponse, SearchParams>({
      query: ({ query, page }) => ({
        url: '/search/movie',
        params: {
          api_key: TMDB_API_KEY,
          query,
          page,
          language: 'pl-PL',
          include_adult: false
        }
      }),
      providesTags: (result) => 
        result
          ? [
              ...result.results.map(({ id }) => ({ type: 'Movies' as const, id })),
              { type: 'Movies', id: 'SEARCH' }
            ]
          : [{ type: 'Movies', id: 'SEARCH' }]
    }),
    getMovieDetails: builder.query<Movie, number>({
      query: (movieId) => ({
        url: `/movie/${movieId}`,
        params: {
          api_key: TMDB_API_KEY,
          language: 'pl-PL'
        }
      }),
      providesTags: (_result, _error, id) => [{ type: 'Movies', id }]
    }),
    getPopularMovies: builder.query<MovieResponse, DiscoverParams>({
      query: ({ page, genreId }) => ({
        url: '/discover/movie',
        params: {
          api_key: TMDB_API_KEY,
          page,
          with_genres: genreId,
          language: 'pl-PL',
          sort_by: 'popularity.desc',
          include_adult: false,
          include_video: false
        }
      }),
      providesTags: (result) => 
        result
          ? [
              ...result.results.map(({ id }) => ({ type: 'Movies' as const, id })),
              { type: 'Movies', id: 'POPULAR' }
            ]
          : [{ type: 'Movies', id: 'POPULAR' }],
      // Cache każdej strony przez 5 minut
      keepUnusedDataFor: 300,
    }),
  }),
});

export const {
  useSearchMoviesQuery,
  useGetMovieDetailsQuery,
  useGetPopularMoviesQuery,
} = movieApi; 