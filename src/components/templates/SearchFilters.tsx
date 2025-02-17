import { motion } from 'framer-motion';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';

interface SearchFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedRating: number | null;
  onRatingChange: (rating: number | null) => void;
}

const categories = ['All', 'Customer Service', 'Sales', 'Technical Support', 'Education'];

export default function SearchFilters({
  search,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedRating,
  onRatingChange,
}: SearchFiltersProps) {
  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search templates..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
            bg-white dark:bg-gray-800 text-gray-900 dark:text-white
            focus:ring-2 focus:ring-cyan-500 focus:border-transparent
            placeholder-gray-400 dark:placeholder-gray-500"
        />
      </div>

      {/* Filters Section */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <FunnelIcon className="w-5 h-5 text-gray-400" />
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Filters</h3>
        </div>

        {/* Categories */}
        <div className="space-y-2">
          <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400">Category</h4>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onCategoryChange(category)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedCategory === category
                    ? 'bg-cyan-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Rating Filter */}
        <div className="mt-4 space-y-2">
          <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400">Minimum Rating</h4>
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4, 5].map((rating) => (
              <motion.button
                key={rating}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onRatingChange(selectedRating === rating ? null : rating)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  selectedRating === rating
                    ? 'bg-yellow-400 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {rating}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
