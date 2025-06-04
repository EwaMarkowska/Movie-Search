import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Movie } from '../types/movie';

const TMDB_API_KEY = 'fdb766ad89c2e1a549cc29d67273229f';
const BASE_URL = 'https://api.themoviedb.org/3';

interface MovieResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    searchMovies: builder.query<MovieResponse, string>({
      query: (searchTerm) => `/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(searchTerm)}&language=pl-PL`,
    }),
    getMovieDetails: builder.query<Movie, number>({
      query: (movieId) => `/movie/${movieId}?api_key=${TMDB_API_KEY}&language=pl-PL`,
    }),
    getPopularMovies: builder.query<MovieResponse, void>({
      query: () => `/movie/popular?api_key=${TMDB_API_KEY}&language=pl-PL`,
    }),
  }),
});

export const {
  useSearchMoviesQuery,
  useGetMovieDetailsQuery,
  useGetPopularMoviesQuery,
} = movieApi; 