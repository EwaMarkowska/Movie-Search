const API_KEY = 'fdb766ad89c2e1a549cc29d67273229f';
const BASE_URL = 'https://api.themoviedb.org/3';

export const movieService = {
  async getPopularMovies() {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      );
      const data = await response.json();
      return data.results.slice(0, 10); // Get only first 10 movies
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      return [];
    }
  },

  async getMovieDetails(movieId) {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
      );
      return await response.json();
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  }
}; 