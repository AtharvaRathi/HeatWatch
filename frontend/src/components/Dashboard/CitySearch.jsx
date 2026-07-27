import { useState } from 'react';
import { Search } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CitySearch({ onSearch }) {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError('Please enter a city name.');
      return;
    }
    setError('');
    onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="w-full relative">
      <div className="relative flex items-center">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (error) setError('');
          }}
          className="input-field pl-11 py-3 text-lg bg-[#1F2937]/80 backdrop-blur-sm border-gray-600 focus:border-[#F97316] rounded-full shadow-lg"
          placeholder="Search for a city (e.g., Mumbai)..."
        />
        <button
          type="submit"
          className="absolute inset-y-1 right-1 btn-primary rounded-full px-6 flex items-center"
        >
          Search
        </button>
      </div>
      {error && (
        <div className="absolute top-full left-0 right-0 mt-2 text-red-500 text-sm font-medium">
          {error}
        </div>
      )}
    </form>
  );
}
