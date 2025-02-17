import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/outline';

interface CreateAgentCardProps {
  title: string;
  description: string;
  category: string;
  rating: number;
  onClick: () => void;
}

export default function CreateAgentCard({ title, description, category, rating, onClick }: CreateAgentCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 cursor-pointer border border-gray-200 
        dark:border-gray-700 hover:border-cyan-500 dark:hover:border-cyan-500 transition-colors"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
        </div>
        <span className="px-3 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 
          text-gray-600 dark:text-gray-400">
          {category}
        </span>
      </div>
      <div className="mt-4 flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            className={`w-4 h-4 ${
              i < rating
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
          {rating}/5
        </span>
      </div>
    </motion.div>
  );
}
