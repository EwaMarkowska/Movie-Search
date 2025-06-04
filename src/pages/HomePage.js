import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetPopularMoviesQuery, useSearchMoviesQuery } from '../store/movieApi';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const { data: popularMovies, isLoading: isLoadingPopular } = useGetPopularMoviesQuery();
  const { data: searchResults, isLoading: isLoadingSearch } = useSearchMoviesQuery(searchTerm, {
    skip: !searchTerm,
  });

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  const movies = searchTerm ? searchResults : popularMovies;
  const isLoading = searchTerm ? isLoadingSearch : isLoadingPopular;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies?.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={handleMovieClick}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage; 