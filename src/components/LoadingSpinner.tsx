import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500">
        <div className="sr-only">Loading...</div>
      </div>
    </div>
  );
};

export default LoadingSpinner; 