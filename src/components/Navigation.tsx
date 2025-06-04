import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Movie Search</Link>
        <div className="flex space-x-4">
          <Link
            to="/"
            className={`px-4 py-2 rounded-lg transition-colors ${
              isActive('/') ? 'bg-gray-700' : 'hover:bg-gray-700'
            }`}
          >
            Strona główna
          </Link>
          <Link
            to="/favorites"
            className={`px-4 py-2 rounded-lg transition-colors ${
              isActive('/favorites') ? 'bg-gray-700' : 'hover:bg-gray-700'
            }`}
          >
            Ulubione
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 