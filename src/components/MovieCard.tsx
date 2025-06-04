import React from 'react';
import { Movie } from '../types/movie';
import { useFavorites } from '../hooks/useFavorites';
import toast from 'react-hot-toast';

interface MovieCardProps {
  movie: Movie;
  onClick: (id: number) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
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
    <div
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer relative"
      onClick={() => onClick(movie.id)}
    >
      <div
        className="absolute top-2 right-2 z-10 cursor-pointer p-2"
        onClick={handleFavoriteClick}
      >
        {isFavorite(movie.id) ? (
          <svg className="w-6 h-6 text-red-500 fill-current" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        )}
      </div>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-96 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-white">{movie.title}</h3>
        <p className="text-gray-400 mt-2">{movie.release_date?.split('-')[0]}</p>
        <div className="flex items-center mt-2">
          <span className="text-yellow-400">★</span>
          <span className="text-gray-300 ml-1">{movie.vote_average?.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard; 