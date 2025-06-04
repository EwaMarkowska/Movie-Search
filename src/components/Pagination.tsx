import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalResults: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, totalResults, onPageChange }) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      // Pokazuj pierwsze 3 strony + "..."
      for (let i = 1; i <= 3; i++) {
        pages.push(i);
      }
      pages.push('...');
      return pages;
    }

    if (currentPage >= totalPages - 2) {
      // Pokazuj ostatnie 3 strony
      pages.push(1);
      pages.push('...');
      for (let i = totalPages - 2; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // W środku - pokazuj bieżącą stronę i po jednej stronie z każdej strony
    pages.push(1);
    pages.push('...');
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      pages.push(i);
    }
    pages.push('...');
    pages.push(totalPages);
    return pages;
  };

  const getButtonWidth = (page: number) => {
    const numLength = String(page).length;
    if (numLength <= 2) return 'w-8';
    if (numLength === 3) return 'w-10';
    if (numLength === 4) return 'w-12';
    return 'w-14';
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center justify-center min-w-[360px] gap-2">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Pierwsza strona"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Poprzednia strona"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) => (
            typeof page === 'number' ? (
              <button
                key={index}
                onClick={() => onPageChange(page)}
                className={`${getButtonWidth(page)} h-8 rounded-lg flex items-center justify-center text-sm ${
                  currentPage === page
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {page.toLocaleString()}
              </button>
            ) : (
              <span key={index} className="w-4 text-center">
                {page}
              </span>
            )
          ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Następna strona"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Ostatnia strona"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7m-8-14l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div className="text-sm text-gray-600 min-w-[360px] text-center px-4">
        Strona {currentPage.toLocaleString()} z {totalPages.toLocaleString()} (znaleziono {totalResults.toLocaleString()} wyników)
      </div>
    </div>
  );
};

export default Pagination; 