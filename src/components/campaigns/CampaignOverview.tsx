import { motion } from 'framer-motion';
import { PlayIcon, PhoneIcon } from '@heroicons/react/24/outline';

interface CampaignOverviewProps {
  stats: {
    running: number;
    total: number;
  };
}

export default function CampaignOverview({ stats }: CampaignOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Running Campaigns Card */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="relative overflow-hidden backdrop-blur-2xl bg-white/20 dark:bg-gray-800/20
          rounded-xl p-6 border border-gray-200/20 dark:border-gray-700/20
          shadow-lg hover:shadow-xl transition-all duration-300
          hover:bg-white/30 dark:hover:bg-gray-800/30 group"
        style={{
          background: 'linear-gradient(169.73deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
          boxShadow: '0 4px 24px -1px rgba(0, 0, 0, 0.1), 0 2px 8px -1px rgba(0, 0, 0, 0.06)'
        }}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Running Campaigns
            </p>
            <h3 className="mt-2 text-3xl font-bold bg-clip-text text-transparent 
              bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300
              group-hover:scale-105 transition-transform">
              {stats.running}
            </h3>
          </div>
          <div className="p-3 rounded-lg bg-gradient-to-br from-primary-light/20 to-blue-500/20 
            dark:from-primary-dark/20 dark:to-blue-400/20 backdrop-blur-md 
            border border-white/10 dark:border-gray-700/10 shadow-lg">
            <PlayIcon className="h-6 w-6 text-primary-light dark:text-primary-dark" />
          </div>
        </div>
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-light/10 via-blue-500/5 to-transparent 
          dark:from-primary-dark/10 dark:via-blue-400/5 dark:to-transparent rounded-xl filter blur-2xl opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-tl from-white/5 via-primary-light/5 to-transparent 
          dark:from-gray-900/5 dark:via-primary-dark/5 dark:to-transparent rounded-xl" />
      </motion.div>

      {/* Total Campaigns Card */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="relative overflow-hidden backdrop-blur-2xl bg-white/20 dark:bg-gray-800/20
          rounded-xl p-6 border border-gray-200/20 dark:border-gray-700/20
          shadow-lg hover:shadow-xl transition-all duration-300
          hover:bg-white/30 dark:hover:bg-gray-800/30 group"
        style={{
          background: 'linear-gradient(169.73deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
          boxShadow: '0 4px 24px -1px rgba(0, 0, 0, 0.1), 0 2px 8px -1px rgba(0, 0, 0, 0.06)'
        }}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Campaigns
            </p>
            <h3 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
              {stats.total}
            </h3>
          </div>
          <div className="p-3 rounded-lg bg-gray-200/50 dark:bg-gray-700/50">
            <PhoneIcon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </div>
        </div>
        <div className="absolute -right-6 -bottom-6 w-32 h-32 
          bg-gray-200/50 dark:bg-gray-700/50 rounded-full blur-2xl" />
      </motion.div>
    </div>
  );
}
