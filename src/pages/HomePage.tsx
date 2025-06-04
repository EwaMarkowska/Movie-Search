import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetPopularMoviesQuery, useSearchMoviesQuery } from '../store/movieApi';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';

const MAX_API_PAGE = 500; // TMDB API limit

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const { 
    data: searchData, 
    isLoading: isSearchLoading 
  } = useSearchMoviesQuery(
    { query: searchTerm, page: Math.min(currentPage, MAX_API_PAGE) },
    { skip: !searchTerm }
  );

  const { 
    data: popularData, 
    isLoading: isPopularLoading 
  } = useGetPopularMoviesQuery(
    { page: Math.min(currentPage, MAX_API_PAGE) },
    { skip: !!searchTerm }
  );

  const data = searchTerm ? searchData : popularData;
  const isLoading = searchTerm ? isSearchLoading : isPopularLoading;

  // Reset to page 1 if total_pages changes
  useEffect(() => {
    if (data?.total_pages && currentPage > data.total_pages) {
      setCurrentPage(1);
    }
  }, [data?.total_pages, currentPage]);

  const handleMovieClick = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    // Ensure we don't exceed the API's page limit or total pages
    const maxPage = data?.total_pages ? Math.min(data.total_pages, MAX_API_PAGE) : MAX_API_PAGE;
    const validPage = Math.min(Math.max(1, page), maxPage);
    setCurrentPage(validPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const movies = data?.results || [];
  // Ensure total_pages doesn't exceed API limit
  const totalPages = data?.total_pages ? Math.min(data.total_pages, MAX_API_PAGE) : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex-1 max-w-2xl">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {searchTerm ? 'Wyniki wyszukiwania' : 'Popularne filmy'}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={handleMovieClick}
          />
        ))}
      </div>

      {totalPages > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalResults={data?.total_results || 0}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default HomePage; 