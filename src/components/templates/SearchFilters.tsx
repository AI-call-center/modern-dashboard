import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';

interface SearchFiltersProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  industry: string;
  useCase: string;
  complexity: string;
}

export default function SearchFilters({ onSearch, onFilterChange }: SearchFiltersProps) {
  const [isFiltersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    industry: '',
    useCase: '',
    complexity: ''
  });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search templates..."
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 
                     dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 
                     focus:ring-primary-light dark:focus:ring-primary-dark"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                   rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
          onClick={() => setFiltersOpen(!isFiltersOpen)}
        >
          <FunnelIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </motion.button>
      </div>

      <AnimatePresence>
        {isFiltersOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 space-y-4 overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                className="w-full p-2 bg-white dark:bg-gray-800 border border-gray-200 
                         dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 
                         focus:ring-primary-light dark:focus:ring-primary-dark"
                value={filters.industry}
                onChange={(e) => handleFilterChange('industry', e.target.value)}
              >
                <option value="">All Industries</option>
                <option value="restaurant">Restaurant</option>
                <option value="healthcare">Healthcare</option>
                <option value="homecare">Home Care</option>
                <option value="hotel">Hotel</option>
                <option value="ecommerce">E-commerce</option>
                <option value="support">Customer Support</option>
              </select>

              <select
                className="w-full p-2 bg-white dark:bg-gray-800 border border-gray-200 
                         dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 
                         focus:ring-primary-light dark:focus:ring-primary-dark"
                value={filters.useCase}
                onChange={(e) => handleFilterChange('useCase', e.target.value)}
              >
                <option value="">All Use Cases</option>
                <option value="inbound">Inbound Calls</option>
                <option value="outbound">Outbound Calls</option>
                <option value="both">Both</option>
              </select>

              <select
                className="w-full p-2 bg-white dark:bg-gray-800 border border-gray-200 
                         dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 
                         focus:ring-primary-light dark:focus:ring-primary-dark"
                value={filters.complexity}
                onChange={(e) => handleFilterChange('complexity', e.target.value)}
              >
                <option value="">All Complexity Levels</option>
                <option value="basic">Basic</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
