import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MovieCard from '../components/MovieCard';
import { Movie } from '../types/movie';

// Mock react-hot-toast
jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
}));

const mockMovie: Movie = {
  id: 1,
  title: 'Test Movie',
  overview: 'Test Overview',
  poster_path: '/test.jpg',
  release_date: '2023-01-01',
  vote_average: 8.5,
  vote_count: 100,
  backdrop_path: null,
  popularity: 100,
  original_language: 'en'
};

const mockOnClick = jest.fn();

describe('MovieCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders movie information correctly', () => {
    render(<MovieCard movie={mockMovie} onClick={mockOnClick} />);

    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('2023')).toBeInTheDocument();
    expect(screen.getByText('8.5')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    render(<MovieCard movie={mockMovie} onClick={mockOnClick} />);

    const card = screen.getByTestId('movie-card');
    fireEvent.click(card);

    expect(mockOnClick).toHaveBeenCalledWith(mockMovie.id);
  });

  it('displays correct poster image', () => {
    render(<MovieCard movie={mockMovie} onClick={mockOnClick} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute(
      'src',
      `https://image.tmdb.org/t/p/w500${mockMovie.poster_path}`
    );
    expect(image).toHaveAttribute('alt', mockMovie.title);
  });

  it('handles missing poster path', () => {
    const movieWithoutPoster = { ...mockMovie, poster_path: null };
    render(<MovieCard movie={movieWithoutPoster} onClick={mockOnClick} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://via.placeholder.com/500x750');
  });
}); 