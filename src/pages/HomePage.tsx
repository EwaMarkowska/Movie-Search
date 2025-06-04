import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetPopularMoviesQuery, useSearchMoviesQuery, useGetMovieDetailsQuery } from '../store/movieApi';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';
import TagList, { POPULAR_GENRES } from '../components/TagList';

const MAX_API_PAGE = 500; // TMDB API limit

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const navigate = useNavigate();

  const { 
    data: searchData, 
    isLoading: isSearchLoading 
  } = useSearchMoviesQuery(
    { query: searchTerm, page: Math.min(currentPage, MAX_API_PAGE) },
    { skip: !isSearching || !searchTerm || selectedMovieId !== null }
  );

  const { 
    data: movieData,
    isLoading: isMovieLoading
  } = useGetMovieDetailsQuery(
    selectedMovieId as number,
    { skip: selectedMovieId === null }
  );

  const { 
    data: popularData, 
    isLoading: isPopularLoading 
  } = useGetPopularMoviesQuery(
    { 
      page: Math.min(currentPage, MAX_API_PAGE),
      genreId: selectedGenre || undefined
    },
    { skip: isSearching }
  );

  const data = selectedMovieId && movieData 
    ? { results: [movieData], total_pages: 1, total_results: 1 } 
    : isSearching 
      ? searchData 
      : popularData;
  const isLoading = isMovieLoading || (isSearching ? isSearchLoading : isPopularLoading);

  // Reset to page 1 if total_pages changes or genre changes
  useEffect(() => {
    if (data?.total_pages && currentPage > data.total_pages) {
      setCurrentPage(1);
    }
  }, [data?.total_pages, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedGenre]);

  const handleMovieClick = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  const handleSearch = (term: string, movieId?: number) => {
    setSearchTerm(term);
    setIsSearching(true);
    setCurrentPage(1);
    setSelectedGenre(null);
    setSelectedMovieId(movieId || null);
  };

  const handleGenreSelect = (genreId: number | null) => {
    setSelectedGenre(genreId);
    setIsSearching(false);
    setSearchTerm('');
    setSelectedMovieId(null);
  };

  const handlePageChange = (page: number) => {
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

  const selectedGenreName = selectedGenre 
    ? POPULAR_GENRES.find(genre => genre.id === selectedGenre)?.name 
    : null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="w-full">
          <SearchBar onSearch={handleSearch} />
          <TagList selectedGenre={selectedGenre} onGenreSelect={handleGenreSelect} />
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {selectedMovieId
            ? 'Wybrany film'
            : isSearching 
              ? 'Wyniki wyszukiwania' 
              : selectedGenreName 
                ? `Popularne filmy - ${selectedGenreName}`
                : 'Popularne filmy'}
        </h2>
        {(isSearching || selectedGenre || selectedMovieId) && (
          <button
            onClick={() => {
              setIsSearching(false);
              setSearchTerm('');
              setSelectedGenre(null);
              setSelectedMovieId(null);
              setCurrentPage(1);
            }}
            className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800 focus:outline-none"
          >
            Powrót do wszystkich filmów
          </button>
        )}
      </div>

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