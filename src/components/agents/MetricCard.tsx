import { motion } from 'framer-motion';
import { IconType } from 'react-icons';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: IconType;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export default function MetricCard({ title, value, icon: Icon, trend }: MetricCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      className="relative overflow-hidden rounded-2xl bg-white/20 dark:bg-gray-800/20
        backdrop-blur-2xl border border-gray-200/20 dark:border-gray-700/20
        p-6 shadow-lg hover:shadow-xl transition-all duration-300
        hover:border-primary-light/30 dark:hover:border-primary-dark/30
        hover:bg-white/30 dark:hover:bg-gray-800/30"
      style={{
        background: 'linear-gradient(169.73deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
        boxShadow: '0 4px 24px -1px rgba(0, 0, 0, 0.1), 0 2px 8px -1px rgba(0, 0, 0, 0.06)',
      }}
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-light/10 via-blue-500/5 to-transparent 
        dark:from-primary-dark/10 dark:via-blue-400/5 dark:to-transparent rounded-2xl filter blur-2xl opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-tl from-white/5 via-primary-light/5 to-transparent 
        dark:from-gray-900/5 dark:via-primary-dark/5 dark:to-transparent rounded-2xl" />

      <div className="relative">
        {/* Icon with glow */}
        <div className="mb-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl
            bg-gradient-to-br from-primary-light/20 to-blue-500/20 dark:from-primary-dark/20 dark:to-blue-400/20
            backdrop-blur-md border border-white/10 dark:border-gray-700/10
            text-primary-light dark:text-primary-dark shadow-lg">
            <Icon className="w-6 h-6" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
          {title}
        </h3>

        {/* Value with hover glow effect */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700
            dark:from-white dark:to-gray-300 relative inline-block"
        >
          <span className="relative z-10">{value}</span>
          <div className="absolute inset-0 bg-primary-light/20 dark:bg-primary-dark/20 
            filter blur-lg opacity-0 hover:opacity-100 transition-opacity duration-300" />
        </motion.div>

        {/* Trend indicator */}
        {trend && (
          <div className={`mt-2 text-sm ${
            trend.isPositive ? 'text-green-500' : 'text-red-500'
          }`}>
            <span className="inline-block mr-1">
              {trend.isPositive ? '↑' : '↓'}
            </span>
            {trend.value}%
          </div>
        )}
      </div>
    </motion.div>
  );
}
