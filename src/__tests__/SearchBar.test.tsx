import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from '../components/SearchBar';

const mockOnSearch = jest.fn();

describe('SearchBar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders search input correctly', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const searchInput = screen.getByPlaceholderText('Wyszukaj film...');
    expect(searchInput).toBeInTheDocument();
  });

  it('calls onSearch when user types and waits', async () => {
    jest.useFakeTimers();
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const searchInput = screen.getByPlaceholderText('Wyszukaj film...');
    fireEvent.change(searchInput, { target: { value: 'test movie' } });
    
    jest.advanceTimersByTime(500); // Advance past debounce time
    
    expect(mockOnSearch).toHaveBeenCalledWith('test movie');
    jest.useRealTimers();
  });

  it('does not call onSearch for empty input', () => {
    jest.useFakeTimers();
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const searchInput = screen.getByPlaceholderText('Wyszukaj film...');
    fireEvent.change(searchInput, { target: { value: '' } });
    
    jest.advanceTimersByTime(500);
    
    expect(mockOnSearch).not.toHaveBeenCalled();
    jest.useRealTimers();
  });

  it('trims whitespace from search input', () => {
    jest.useFakeTimers();
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const searchInput = screen.getByPlaceholderText('Wyszukaj film...');
    fireEvent.change(searchInput, { target: { value: '  test movie  ' } });
    
    jest.advanceTimersByTime(500);
    
    // Verify that the trimmed value is passed to onSearch
    expect(mockOnSearch).toHaveBeenCalledWith('test movie');
    
    // Verify that the input value remains untrimmed
    expect(searchInput).toHaveValue('  test movie  ');
    
    jest.useRealTimers();
  });

  it('updates input value correctly', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const searchInput = screen.getByPlaceholderText('Wyszukaj film...') as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'test movie' } });
    
    expect(searchInput.value).toBe('test movie');
  });
}); 