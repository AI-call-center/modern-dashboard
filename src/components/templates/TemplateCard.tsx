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
      className="group relative flex flex-col h-full bg-navy-800 rounded-xl p-6 cursor-pointer"
    >
      {type === 'custom' ? (
        <div className="flex items-center justify-center h-12 w-12 mb-4">
          <Icon className="h-8 w-8 text-primary-light" />
        </div>
      ) : (
        <div className="absolute top-4 right-4 px-3 py-1 text-xs rounded-full bg-navy-700 text-gray-400">
          {type.replace('-', ' ')}
        </div>
      )}
      
      <h3 className="text-xl font-semibold text-white mb-2">
        {title}
      </h3>
      
      <p className="text-sm text-gray-400 flex-grow">
        {description}
      </p>
      
      {type === 'custom' ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-6 w-full py-2 bg-primary-light text-white rounded-lg text-center"
        >
          Get Started
        </motion.button>
      ) : (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-6 w-full py-2 bg-navy-700 text-white rounded-lg text-center"
        >
          Use this Template
        </motion.button>
      )}
    </motion.div>
  );
}
