import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  color: 'blue' | 'indigo' | 'green' | 'red';
}

const colorClasses = {
  blue: {
    bg: 'bg-blue-50/50 dark:bg-blue-900/20',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-200/50 dark:border-blue-700/50',
    shadow: 'shadow-blue-100/20 dark:shadow-blue-900/20',
    hoverShadow: 'hover:shadow-blue-100/30 dark:hover:shadow-blue-900/30',
    iconBg: 'bg-blue-100/80 dark:bg-blue-900/30',
  },
  indigo: {
    bg: 'bg-indigo-50/50 dark:bg-indigo-900/20',
    text: 'text-indigo-600 dark:text-indigo-400',
    border: 'border-indigo-200/50 dark:border-indigo-700/50',
    shadow: 'shadow-indigo-100/20 dark:shadow-indigo-900/20',
    hoverShadow: 'hover:shadow-indigo-100/30 dark:hover:shadow-indigo-900/30',
    iconBg: 'bg-indigo-100/80 dark:bg-indigo-900/30',
  },
  green: {
    bg: 'bg-green-50/50 dark:bg-green-900/20',
    text: 'text-green-600 dark:text-green-400',
    border: 'border-green-200/50 dark:border-green-700/50',
    shadow: 'shadow-green-100/20 dark:shadow-green-900/20',
    hoverShadow: 'hover:shadow-green-100/30 dark:hover:shadow-green-900/30',
    iconBg: 'bg-green-100/80 dark:bg-green-900/30',
  },
  red: {
    bg: 'bg-red-50/50 dark:bg-red-900/20',
    text: 'text-red-600 dark:text-red-400',
    border: 'border-red-200/50 dark:border-red-700/50',
    shadow: 'shadow-red-100/20 dark:shadow-red-900/20',
    hoverShadow: 'hover:shadow-red-100/30 dark:hover:shadow-red-900/30',
    iconBg: 'bg-red-100/80 dark:bg-red-900/30',
  },
};

export default function StatCard({ title, value, icon: Icon, color }: StatCardProps) {
  const classes = colorClasses[color];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`relative flex items-center p-6 rounded-xl backdrop-blur-md
        ${classes.bg} ${classes.border} border
        shadow-lg ${classes.shadow}
        hover:shadow-xl ${classes.hoverShadow}
        transition-all duration-200`}
    >
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {title}
        </p>
        <p className={`text-2xl font-semibold ${classes.text}`}>
          {value.toLocaleString()}
        </p>
      </div>
      
      <div className={`p-3 rounded-lg ${classes.iconBg} backdrop-blur-sm`}>
        <Icon className={`h-6 w-6 ${classes.text}`} />
      </div>
    </motion.div>
  );
}
