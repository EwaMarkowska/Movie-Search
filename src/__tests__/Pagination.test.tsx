import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from '../components/Pagination';

const mockOnPageChange = jest.fn();

describe('Pagination', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders pagination with correct page numbers', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={10}
        totalResults={100}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('...')).toBeInTheDocument();
    
    // Check if the last page number is in the document
    const pageInfo = screen.getByText(/z 10/);
    expect(pageInfo).toBeInTheDocument();
  });

  it('disables previous/first page buttons on first page', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={10}
        totalResults={100}
        onPageChange={mockOnPageChange}
      />
    );

    const firstPageButton = screen.getByLabelText('Pierwsza strona');
    const prevPageButton = screen.getByLabelText('Poprzednia strona');

    expect(firstPageButton).toBeDisabled();
    expect(prevPageButton).toBeDisabled();
  });

  it('disables next/last page buttons on last page', () => {
    render(
      <Pagination
        currentPage={10}
        totalPages={10}
        totalResults={100}
        onPageChange={mockOnPageChange}
      />
    );

    const nextPageButton = screen.getByLabelText('Następna strona');
    const lastPageButton = screen.getByLabelText('Ostatnia strona');

    expect(nextPageButton).toBeDisabled();
    expect(lastPageButton).toBeDisabled();
  });

  it('calls onPageChange with correct page number when clicking page buttons', () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={10}
        totalResults={100}
        onPageChange={mockOnPageChange}
      />
    );

    const nextPageButton = screen.getByLabelText('Następna strona');
    fireEvent.click(nextPageButton);
    expect(mockOnPageChange).toHaveBeenCalledWith(6);

    const prevPageButton = screen.getByLabelText('Poprzednia strona');
    fireEvent.click(prevPageButton);
    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });

  it('displays correct total results information', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={10}
        totalResults={100}
        onPageChange={mockOnPageChange}
      />
    );

    const pageInfo = screen.getByText(/Strona/);
    expect(pageInfo).toHaveTextContent('Strona 1 z 10 (znaleziono 100 wyników)');
  });

  it('handles large numbers correctly', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={1000}
        totalResults={10000}
        onPageChange={mockOnPageChange}
      />
    );

    const pageInfo = screen.getByText(/Strona/);
    const expectedText = 'Strona 1 z 1000 (znaleziono 10 000 wyników)';
    expect(pageInfo).toHaveTextContent(expectedText);
  });
}); 