import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetMovieDetailsQuery } from '../store/movieApi';
import { Genre } from '../types/movie';

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: movie, isLoading } = useGetMovieDetailsQuery(id ?? '');

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">Movie not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        ← Back
      </button>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        
        <div className="md:w-2/3">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{movie.title}</h1>
          <div className="flex items-center mb-4">
            <span className="text-yellow-400 text-xl">★</span>
            <span className="ml-2 text-gray-700">{movie.vote_average.toFixed(1)}/10</span>
            <span className="ml-4 text-gray-500">({movie.vote_count} votes)</span>
          </div>
          
          <p className="text-gray-600 mb-4">{movie.release_date}</p>
          <p className="text-gray-800 text-lg mb-6">{movie.overview}</p>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre: Genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-gray-200 rounded-full text-gray-700"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Runtime</h3>
              <p className="text-gray-700">{movie.runtime} minutes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage; 