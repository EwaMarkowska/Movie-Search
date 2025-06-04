import React, { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorBoundary from '../components/ErrorBoundary';

// Import components directly instead of using lazy loading for now
import HomePage from '../pages/HomePage';
import MovieDetailsPage from '../pages/MovieDetailsPage';

// Suspense wrapper
const withSuspense = (Component: React.ComponentType) => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Component />
    </Suspense>
  );
};

// Route validation
const validateMovieId = (id: string): boolean => {
  return /^\d+$/.test(id);
};

export const routes: RouteObject[] = [
  {
    path: '/',
    element: withSuspense(HomePage),
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/movie/:id',
    element: withSuspense(MovieDetailsPage),
    errorElement: <ErrorBoundary />,
    loader: async ({ params }) => {
      const { id } = params;
      if (!id || !validateMovieId(id)) {
        throw new Response('Invalid movie ID', { status: 400 });
      }
      return null;
    },
  },
  {
    path: '*',
    element: <ErrorBoundary />,
  },
]; 