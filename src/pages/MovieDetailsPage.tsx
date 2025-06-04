import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetMovieDetailsQuery } from '../store/movieApi';
import LoadingSpinner from '../components/LoadingSpinner';
import { useFavorites } from '../hooks/useFavorites';
import toast from 'react-hot-toast';

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const movieId = parseInt(id || '0', 10);
  const { data: movie, isLoading, error } = useGetMovieDetailsQuery(movieId);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  if (isLoading) return <LoadingSpinner />;
  if (error || !movie) return <div>Error loading movie details.</div>;

  const handleFavoriteClick = () => {
    const isFav = isFavorite(movie.id);
    if (isFav) {
      removeFavorite(movie.id);
      toast.success(`Film "${movie.title}" został usunięty z ulubionych`);
    } else {
      addFavorite(movie);
      toast.success(`Film "${movie.title}" został dodany do ulubionych`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-96">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
          <div className="absolute bottom-0 left-0 p-8">
            <h1 className="text-4xl font-bold text-white mb-2">{movie.title}</h1>
            <p className="text-gray-300">{movie.release_date?.split('-')[0]}</p>
          </div>
          <button
            onClick={handleFavoriteClick}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
          >
            {isFavorite(movie.id) ? (
              <svg className="w-8 h-8 text-red-500 fill-current" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ) : (
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            )}
          </button>
        </div>
        <div className="p-8">
          <div className="flex items-center mb-4">
            <span className="text-yellow-400 text-2xl">★</span>
            <span className="ml-2 text-xl">{movie.vote_average?.toFixed(1)}</span>
            <span className="ml-2 text-gray-600">({movie.vote_count} głosów)</span>
          </div>
          <p className="text-gray-700 text-lg mb-6">{movie.overview}</p>
          {movie.genres && (
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-gray-200 rounded-full text-sm text-gray-700"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage; 