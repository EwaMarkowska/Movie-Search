import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import MovieCard from '../components/MovieCard';

const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  const handleMovieClick = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Ulubione Filmy</h1>
      {favorites.length === 0 ? (
        <div className="text-center text-gray-600">
          <p className="text-xl">Nie masz jeszcze żadnych ulubionych filmów</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Przeglądaj filmy
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((movie) => (
            <MovieCard
              key={`${movie.id}-${Date.now()}`}
              movie={movie}
              onClick={handleMovieClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage; 