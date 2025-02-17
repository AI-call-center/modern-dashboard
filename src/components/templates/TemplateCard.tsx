import { motion } from 'framer-motion';
import { PlusIcon, HeartIcon, ShoppingBagIcon, AcademicCapIcon, BuildingOfficeIcon, BriefcaseIcon, BeakerIcon } from '@heroicons/react/24/outline';

interface TemplateCardProps {
  type: 'custom' | 'health-care' | 'retail' | 'education' | 'real-estate' | 'corporate' | 'laboratory';
  title: string;
  description: string;
  onClick: () => void;
}

const icons = {
  custom: PlusIcon,
  'health-care': HeartIcon,
  retail: ShoppingBagIcon,
  education: AcademicCapIcon,
  'real-estate': BuildingOfficeIcon,
  corporate: BriefcaseIcon,
  laboratory: BeakerIcon,
};

export default function TemplateCard({ type, title, description, onClick }: TemplateCardProps) {
  const Icon = icons[type];
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group relative flex flex-col h-full
        bg-white/90 dark:bg-navy-800/90 backdrop-blur-md
        rounded-xl p-6 cursor-pointer
        shadow-lg shadow-gray-200/20 dark:shadow-navy-900/30
        border border-gray-200/50 dark:border-gray-700/50
        transition-all duration-200
        hover:shadow-xl hover:shadow-gray-200/30 dark:hover:shadow-navy-900/40
        hover:border-gray-300/50 dark:hover:border-gray-600/50
        hover:bg-white/95 dark:hover:bg-navy-800/95"
    >
      {type === 'custom' ? (
        <div className="flex items-center justify-center h-12 w-12 mb-4">
          <Icon className="h-8 w-8 text-primary-light" />
        </div>
      ) : (
        <div className="absolute top-4 right-4 px-3 py-1 text-xs rounded-full
          bg-gray-100/80 dark:bg-navy-700/80 backdrop-blur-sm
          text-gray-600 dark:text-gray-400
          border border-gray-200/30 dark:border-gray-700/30">
          {type.replace('-', ' ')}
        </div>
      )}
      
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      
      <p className="text-sm text-gray-600 dark:text-gray-400 flex-grow">
        {description}
      </p>
      
      {type === 'custom' ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-6 w-full py-2.5 rounded-lg text-center
            bg-gradient-to-r from-primary-light to-blue-500
            dark:from-primary-dark dark:to-blue-400
            text-white font-medium
            shadow-lg shadow-primary-light/20 dark:shadow-primary-dark/20
            hover:shadow-xl hover:shadow-primary-light/30 dark:hover:shadow-primary-dark/30
            transition-all duration-200"
        >
          Get Started
        </motion.button>
      ) : (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-6 w-full py-2.5 rounded-lg text-center
            bg-gray-100/90 dark:bg-navy-700/90 backdrop-blur-sm
            text-gray-900 dark:text-white font-medium
            border border-gray-200/50 dark:border-gray-700/50
            shadow-lg shadow-gray-200/20 dark:shadow-navy-900/30
            hover:shadow-xl hover:shadow-gray-200/30 dark:hover:shadow-navy-900/40
            hover:bg-gray-100/95 dark:hover:bg-navy-700/95
            transition-all duration-200"
        >
          Use this Template
        </motion.button>
      )}
    </motion.div>
  );
}
