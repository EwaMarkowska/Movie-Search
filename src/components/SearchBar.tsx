import React, { useState, useCallback, useRef, useEffect } from 'react';
import debounce from 'lodash/debounce';
import { useSearchMoviesQuery } from '../store/movieApi';

interface SearchBarProps {
  onSearch: (query: string, movieId?: number) => void;
}

const MIN_SEARCH_LENGTH = 3;
const DEBOUNCE_TIME = 800;

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Query for suggestions only
  const { data: searchResults, isFetching } = useSearchMoviesQuery(
    { query: searchTerm, page: 1 },
    { 
      skip: searchTerm.length < MIN_SEARCH_LENGTH,
      pollingInterval: 0
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.length >= MIN_SEARCH_LENGTH) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (title: string, movieId: number) => {
    setSearchTerm(title);
    setShowSuggestions(false);
    onSearch(title, movieId);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.length >= MIN_SEARCH_LENGTH) {
      setShowSuggestions(false);
      onSearch(searchTerm);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={suggestionsRef}>
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => searchTerm.length >= MIN_SEARCH_LENGTH && setShowSuggestions(true)}
          placeholder="Wyszukaj film... (min. 3 znaki, Enter aby wyszukać)"
          className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {isFetching ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900" />
          ) : (
            <button
              onClick={() => {
                if (searchTerm.length >= MIN_SEARCH_LENGTH) {
                  setShowSuggestions(false);
                  onSearch(searchTerm);
                }
              }}
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && searchTerm.length >= MIN_SEARCH_LENGTH && searchResults?.results && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {searchResults.results.length > 0 ? (
            searchResults.results.map((movie) => (
              <div
                key={movie.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-3"
                onClick={() => handleSuggestionClick(movie.title, movie.id)}
              >
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                    alt={movie.title}
                    className="w-10 h-14 object-cover rounded"
                  />
                ) : (
                  <div className="w-10 h-14 bg-gray-200 rounded flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{movie.title}</div>
                  <div className="text-sm text-gray-500">
                    {movie.release_date ? `Rok: ${movie.release_date.split('-')[0]}` : 'Data premiery nieznana'}
                  </div>
                  {movie.overview && (
                    <div className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {movie.overview}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-600">Brak wyników</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar; 