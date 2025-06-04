import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { movieService } from '../services/movieService';

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await movieService.getMovieDetails(id);
        setMovie(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading || !movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl">Loading movie details...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <button
        onClick={() => navigate('/')}
        className="mb-8 text-gray-300 hover:text-white flex items-center"
      >
        ← Back to Movies
      </button>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="rounded-lg overflow-hidden shadow-2xl">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-auto"
          />
        </div>
        
        <div className="text-white">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <div className="space-y-4">
            <p className="text-gray-300">{movie.overview}</p>
            <div className="border-t border-gray-700 pt-4 mt-4 space-y-2">
              <p><span className="text-gray-400">Release Date:</span> {movie.release_date}</p>
              <p><span className="text-gray-400">Rating:</span> {movie.vote_average.toFixed(1)}/10</p>
              <p><span className="text-gray-400">Runtime:</span> {movie.runtime} minutes</p>
              <p>
                <span className="text-gray-400">Genres:</span>{' '}
                {movie.genres.map(genre => genre.name).join(', ')}
              </p>
              {movie.tagline && (
                <p className="italic text-gray-400 mt-4">"{movie.tagline}"</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails; 