import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetPopularMoviesQuery, useSearchMoviesQuery } from '../store/movieApi';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const { data: searchData, isLoading: isSearchLoading } = useSearchMoviesQuery(searchTerm, {
    skip: !searchTerm,
  });

  const { data: popularData, isLoading: isPopularLoading } = useGetPopularMoviesQuery();

  const handleMovieClick = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  if (isSearchLoading || isPopularLoading) {
    return <LoadingSpinner />;
  }

  const moviesToDisplay = searchTerm ? searchData?.results : popularData?.results;

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchBar onSearch={handleSearch} />
      <h2 className="text-2xl font-bold text-gray-900 my-6">
        {searchTerm ? 'Wyniki wyszukiwania' : 'Popularne filmy'}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {moviesToDisplay?.map((movie) => (
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