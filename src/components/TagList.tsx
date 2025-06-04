import React from 'react';

export interface Genre {
  id: number;
  name: string;
}

const POPULAR_GENRES: Genre[] = [
  { id: 28, name: 'Akcja' },
  { id: 12, name: 'Przygodowy' },
  { id: 16, name: 'Animacja' },
  { id: 35, name: 'Komedia' },
  { id: 80, name: 'Kryminał' },
  { id: 18, name: 'Dramat' },
  { id: 27, name: 'Horror' },
  { id: 10749, name: 'Romans' },
  { id: 878, name: 'Sci-Fi' },
  { id: 53, name: 'Thriller' }
];

interface TagListProps {
  selectedGenre: number | null;
  onGenreSelect: (genreId: number | null) => void;
}

const TagList: React.FC<TagListProps> = ({ selectedGenre, onGenreSelect }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-3 justify-start">
      {POPULAR_GENRES.map((genre) => (
        <button
          key={genre.id}
          onClick={() => onGenreSelect(selectedGenre === genre.id ? null : genre.id)}
          className={`
            px-4 py-1.5 
            rounded-full 
            text-sm 
            font-medium 
            transition-all 
            duration-200
            border
            ${
              selectedGenre === genre.id
                ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:border-blue-700'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
            }
          `}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
};

export default TagList;
export { POPULAR_GENRES }; 