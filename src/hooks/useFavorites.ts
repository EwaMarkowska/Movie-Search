import { useState, useEffect, useCallback } from 'react';
import { Movie } from '../types/movie';

const FAVORITES_KEY = 'movieFavorites';

// Tworzymy globalny event do powiadamiania o zmianach
const favoritesChangeEvent = new Event('favoritesChanged');

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    const saved = localStorage.getItem(FAVORITES_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const handleFavoritesChange = () => {
      const saved = localStorage.getItem(FAVORITES_KEY);
      setFavorites(saved ? JSON.parse(saved) : []);
    };

    window.addEventListener('favoritesChanged', handleFavoritesChange);
    return () => window.removeEventListener('favoritesChanged', handleFavoritesChange);
  }, []);

  const addFavorite = useCallback((movie: Movie) => {
    const newFavorites = [...favorites, movie];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    setFavorites(newFavorites);
    window.dispatchEvent(favoritesChangeEvent);
  }, [favorites]);

  const removeFavorite = useCallback((movieId: number) => {
    const newFavorites = favorites.filter(movie => movie.id !== movieId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    setFavorites(newFavorites);
    window.dispatchEvent(favoritesChangeEvent);
  }, [favorites]);

  const isFavorite = useCallback((movieId: number) => {
    return favorites.some((movie) => movie.id === movieId);
  }, [favorites]);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
}; 