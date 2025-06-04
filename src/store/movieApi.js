import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = 'fdb766ad89c2e1a549cc29d67273229f';
const BASE_URL = 'https://api.themoviedb.org/3';

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getPopularMovies: builder.query({
      query: () => `/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
      transformResponse: (response) => response.results.slice(0, 10),
    }),
    getMovieDetails: builder.query({
      query: (movieId) => `/movie/${movieId}?api_key=${API_KEY}&language=en-US`,
    }),
    searchMovies: builder.query({
      query: (searchTerm) => 
        `/search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=1`,
      transformResponse: (response) => response.results,
    }),
  }),
});

export const {
  useGetPopularMoviesQuery,
  useGetMovieDetailsQuery,
  useSearchMoviesQuery,
} = movieApi; 