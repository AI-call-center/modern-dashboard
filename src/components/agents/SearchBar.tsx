import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilter: () => void;
  suggestions?: string[];
}

export default function SearchBar({ onSearch, onFilter, suggestions = [] }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="relative w-full max-w-2xl">
      {/* Search input with glow effect */}
      <div className="relative">
        <motion.div
          animate={{
            boxShadow: isFocused
              ? '0 0 0 2px rgba(var(--primary-light-rgb), 0.2), 0 0 20px rgba(var(--primary-light-rgb), 0.1)'
              : '0 0 0 1px rgba(var(--primary-light-rgb), 0.1)',
          }}
          className="relative rounded-xl overflow-hidden
            bg-white/10 dark:bg-gray-800/50 backdrop-blur-lg
            border border-gray-200/20 dark:border-gray-700/50"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search agents..."
            className="w-full pl-12 pr-4 py-3 bg-transparent
              text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
              focus:outline-none"
          />
          <MagnifyingGlassIcon className="absolute left-4 top-3.5 h-5 w-5 
            text-gray-500 dark:text-gray-400" />
        </motion.div>

        {/* Filter button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onFilter}
          className="absolute right-3 top-2.5 p-1.5 rounded-lg
            bg-gray-100 dark:bg-gray-700
            hover:bg-gray-200 dark:hover:bg-gray-600
            text-gray-600 dark:text-gray-300
            transition-colors duration-200"
        >
          <FunnelIcon className="h-5 w-5" />
        </motion.button>
      </div>

      {/* Search suggestions */}
      <AnimatePresence>
        {isFocused && query && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 w-full mt-2 py-2
              bg-white dark:bg-gray-800
              rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
          >
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSearch(suggestion)}
                className="w-full px-4 py-2 text-left
                  text-gray-900 dark:text-white
                  hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {suggestion}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
