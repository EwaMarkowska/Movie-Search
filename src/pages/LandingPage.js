import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { movieService } from '../services/movieService';

function LandingPage() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await movieService.getPopularMovies();
        setMovies(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl">Loading movies...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-6 text-white">
          🎬 Movie Search
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Discover your next favorite movie with our simple search tool
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer"
            onClick={() => handleMovieClick(movie.id)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-96 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-white">{movie.title}</h3>
              <p className="text-gray-400 mt-2">{movie.release_date.split('-')[0]}</p>
              <div className="flex items-center mt-2">
                <span className="text-yellow-400">★</span>
                <span className="text-gray-300 ml-1">{movie.vote_average.toFixed(1)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LandingPage; 