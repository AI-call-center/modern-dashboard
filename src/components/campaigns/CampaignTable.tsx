import { motion } from 'framer-motion';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { Campaign, CampaignFilters } from '../../types/campaign';

interface CampaignTableProps {
  campaigns: Campaign[];
  filters: CampaignFilters;
  onFiltersChange: (filters: CampaignFilters) => void;
}

export default function CampaignTable({ campaigns, filters, onFiltersChange }: CampaignTableProps) {
  const getStatusColor = (status: Campaign['status']) => {
    switch (status) {
      case 'running':
        return 'text-green-500 dark:text-green-400 bg-green-500/10';
      case 'paused':
        return 'text-gray-500 dark:text-gray-400 bg-gray-500/10';
      case 'completed':
        return 'text-blue-500 dark:text-blue-400 bg-blue-500/10';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Progress
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Performance
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Total Leads
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Calls Made
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Updated
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Created
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {campaigns.map((campaign) => (
              <motion.tr
                key={campaign.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ backgroundColor: 'rgba(var(--primary-light-rgb), 0.02)' }}
                className="group cursor-pointer"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {campaign.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                    {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${campaign.progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-primary-light dark:bg-primary-dark"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-900 dark:text-white">
                      {campaign.successRate}%
                    </span>
                    {campaign.aiInsights && campaign.aiInsights.length > 0 && (
                      <div className="relative group ml-2">
                        <InformationCircleIcon className="h-5 w-5 text-primary-light dark:text-primary-dark" />
                        <div className="absolute left-0 mt-2 w-64 px-4 py-2 bg-white dark:bg-gray-800 
                          rounded-lg shadow-lg border border-gray-200 dark:border-gray-700
                          opacity-0 group-hover:opacity-100 transition-opacity z-10
                          text-sm text-gray-600 dark:text-gray-300">
                          {campaign.aiInsights.map((insight, index) => (
                            <p key={index} className="mb-1">{insight}</p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {campaign.totalLeads.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {campaign.callsMade.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(campaign.updatedAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(campaign.createdAt)}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            onClick={() => onFiltersChange({ ...filters, page: filters.page - 1 })}
            disabled={filters.page === 1}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600
              text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800
              hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => onFiltersChange({ ...filters, page: filters.page + 1 })}
            disabled={filters.page * filters.rowsPerPage >= campaigns.length}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600
              text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800
              hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Showing{' '}
              <span className="font-medium">{(filters.page - 1) * filters.rowsPerPage + 1}</span>
              {' '}to{' '}
              <span className="font-medium">
                {Math.min(filters.page * filters.rowsPerPage, campaigns.length)}
              </span>
              {' '}of{' '}
              <span className="font-medium">{campaigns.length}</span>
              {' '}results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button
                onClick={() => onFiltersChange({ ...filters, page: filters.page - 1 })}
                disabled={filters.page === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600
                  bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400
                  hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => onFiltersChange({ ...filters, page: filters.page + 1 })}
                disabled={filters.page * filters.rowsPerPage >= campaigns.length}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600
                  bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400
                  hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
