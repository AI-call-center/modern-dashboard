import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';

interface AgentSearchFiltersProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  status: string;
  callVolume: string;
  successRate: string;
}

export default function AgentSearchFilters({ onSearch, onFilterChange }: AgentSearchFiltersProps) {
  const [isFiltersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    status: '',
    callVolume: '',
    successRate: ''
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
            placeholder="Search agents..."
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
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="maintenance">Maintenance</option>
              </select>

              <select
                className="w-full p-2 bg-white dark:bg-gray-800 border border-gray-200 
                         dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 
                         focus:ring-primary-light dark:focus:ring-primary-dark"
                value={filters.callVolume}
                onChange={(e) => handleFilterChange('callVolume', e.target.value)}
              >
                <option value="">All Call Volumes</option>
                <option value="high">High (&gt;200)</option>
                <option value="medium">Medium (50-200)</option>
                <option value="low">Low (&lt;50)</option>
              </select>

              <select
                className="w-full p-2 bg-white dark:bg-gray-800 border border-gray-200 
                         dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 
                         focus:ring-primary-light dark:focus:ring-primary-dark"
                value={filters.successRate}
                onChange={(e) => handleFilterChange('successRate', e.target.value)}
              >
                <option value="">All Success Rates</option>
                <option value="high">High (&gt;90%)</option>
                <option value="medium">Medium (70-90%)</option>
                <option value="low">Low (&lt;70%)</option>
              </select>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
