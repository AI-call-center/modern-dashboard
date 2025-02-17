import { motion } from 'framer-motion';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { Campaign, CampaignFilters } from '../../types/campaign';
import { useNavigate } from 'react-router-dom';

interface CampaignTableProps {
  campaigns: Campaign[];
  filters: CampaignFilters;
  onFiltersChange: (filters: CampaignFilters) => void;
}

export default function CampaignTable({ campaigns, filters, onFiltersChange }: CampaignTableProps) {
  const navigate = useNavigate();
  const getStatusColor = (status: Campaign['status']) => {
    switch (status) {
      case 'running':
        return 'text-green-500 dark:text-green-400 bg-green-500/10 border border-green-500/20 dark:border-green-400/20 backdrop-blur-sm';
      case 'paused':
        return 'text-gray-500 dark:text-gray-400 bg-gray-500/10 border border-gray-500/20 dark:border-gray-400/20 backdrop-blur-sm';
      case 'completed':
        return 'text-blue-500 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20 dark:border-blue-400/20 backdrop-blur-sm';
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
    <div className="relative overflow-hidden backdrop-blur-2xl bg-white/20 dark:bg-gray-800/20
      rounded-xl shadow-lg border border-gray-200/20 dark:border-gray-700/20
      hover:shadow-xl transition-all duration-300"
      style={{
        background: 'linear-gradient(169.73deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
        boxShadow: '0 4px 24px -1px rgba(0, 0, 0, 0.1), 0 2px 8px -1px rgba(0, 0, 0, 0.06)'
      }}>
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-light/10 via-blue-500/5 to-transparent 
        dark:from-primary-dark/10 dark:via-blue-400/5 dark:to-transparent rounded-xl filter blur-2xl opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-tl from-white/5 via-primary-light/5 to-transparent 
        dark:from-gray-900/5 dark:via-primary-dark/5 dark:to-transparent rounded-xl" />
      <div className="overflow-x-auto relative z-10">
        <table className="min-w-full divide-y divide-gray-200/50 dark:divide-gray-700/50">
          <thead className="bg-gray-50/50 dark:bg-gray-900/30 backdrop-blur-md">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                Progress
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                Performance
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                Total Leads
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                Calls Made
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                Updated
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                Created
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
            {campaigns.map((campaign) => (
              <motion.tr
                key={campaign.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ backgroundColor: 'rgba(var(--primary-light-rgb), 0.02)' }}
                onClick={() => navigate(`/campaigns/${campaign.id}`)}
                className="group cursor-pointer transition-all duration-200 hover:bg-white/50 dark:hover:bg-gray-800/30 hover:backdrop-blur-lg hover:shadow-md dark:hover:shadow-gray-800/20"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {campaign.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${getStatusColor(campaign.status)}`}>
                    {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-full h-2.5 bg-gray-200/30 dark:bg-gray-700/30 rounded-full overflow-hidden backdrop-blur-sm border border-gray-200/20 dark:border-gray-700/20">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${campaign.progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-primary-light to-blue-500 dark:from-primary-dark dark:to-blue-400"
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
                        <div className="absolute left-0 mt-2 w-64 px-4 py-2 backdrop-blur-xl
                          bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-lg
                          border border-gray-200/20 dark:border-gray-700/20
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
      <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200/50 dark:border-gray-700/50 relative z-10 backdrop-blur-sm">
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
