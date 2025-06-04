import React from 'react';
import PropTypes from 'prop-types';

const MovieCard = ({ movie, onClick }) => {
  return (
    <div
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer"
      onClick={() => onClick(movie.id)}
    >
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

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string,
    release_date: PropTypes.string,
    vote_average: PropTypes.number,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MovieCard; 