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
        className="relative overflow-hidden bg-gradient-to-br from-primary-light/10 to-blue-500/5 
          dark:from-primary-dark/20 dark:to-blue-400/10
          rounded-xl p-6 border border-primary-light/10 dark:border-primary-dark/20
          shadow-lg shadow-primary-light/5 dark:shadow-primary-dark/5"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Running Campaigns
            </p>
            <h3 className="mt-2 text-3xl font-bold bg-clip-text text-transparent 
              bg-gradient-to-r from-primary-light to-blue-600 
              dark:from-primary-dark dark:to-blue-400
              [text-shadow:_0_0_30px_rgb(var(--primary-light-rgb)_/_0.3)]">
              {stats.running}
            </h3>
          </div>
          <div className="p-3 rounded-lg bg-primary-light/10 dark:bg-primary-dark/20">
            <PlayIcon className="h-6 w-6 text-primary-light dark:text-primary-dark" />
          </div>
        </div>
        <div className="absolute -right-6 -bottom-6 w-32 h-32 
          bg-primary-light/5 dark:bg-primary-dark/10 rounded-full blur-2xl" />
      </motion.div>

      {/* Total Campaigns Card */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 
          dark:from-gray-800/50 dark:to-gray-900/50
          rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50
          shadow-lg shadow-gray-200/20 dark:shadow-gray-900/20"
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
