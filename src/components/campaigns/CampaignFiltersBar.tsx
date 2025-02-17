import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlassIcon, FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { CampaignFilters, CampaignStatus } from '../../types/campaign';

interface CampaignFiltersBarProps {
  filters: CampaignFilters;
  onFiltersChange: (filters: CampaignFilters) => void;
}

export default function CampaignFiltersBar({ filters, onFiltersChange }: CampaignFiltersBarProps) {
  const [showFilters, setShowFilters] = useState(false);

  const statusOptions: { value: CampaignStatus; label: string; }[] = [
    { value: 'running', label: 'Running' },
    { value: 'paused', label: 'Paused' },
    { value: 'completed', label: 'Completed' }
  ];

  const rowsPerPageOptions = [5, 10, 25, 50];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="flex-1 relative">
          <input
            type="text"
            value={filters.searchQuery || ''}
            onChange={(e) => onFiltersChange({ ...filters, searchQuery: e.target.value })}
            placeholder="Search campaigns..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-gray-800 
              text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700
              focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent
              placeholder-gray-500 dark:placeholder-gray-400"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        {/* Filter Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 
            text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700
            hover:bg-gray-50 dark:hover:bg-gray-700
            focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark"
        >
          <FunnelIcon className="h-5 w-5" />
        </motion.button>

        {/* Rows per Page */}
        <select
          value={filters.rowsPerPage}
          onChange={(e) => onFiltersChange({ ...filters, rowsPerPage: Number(e.target.value) })}
          className="px-3 py-2 rounded-lg bg-white dark:bg-gray-800 
            text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700
            focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent"
        >
          {rowsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option} per page
            </option>
          ))}
        </select>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status
                </label>
                <select
                  value={filters.status || ''}
                  onChange={(e) => onFiltersChange({ 
                    ...filters, 
                    status: e.target.value as CampaignStatus || undefined 
                  })}
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-800 
                    text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700
                    focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent"
                >
                  <option value="">All Statuses</option>
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={filters.dateRange?.start.toISOString().split('T')[0] || ''}
                  onChange={(e) => onFiltersChange({
                    ...filters,
                    dateRange: {
                      ...filters.dateRange,
                      start: new Date(e.target.value)
                    }
                  })}
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-800 
                    text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700
                    focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={filters.dateRange?.end.toISOString().split('T')[0] || ''}
                  onChange={(e) => onFiltersChange({
                    ...filters,
                    dateRange: {
                      ...filters.dateRange,
                      end: new Date(e.target.value)
                    }
                  })}
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-800 
                    text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700
                    focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
