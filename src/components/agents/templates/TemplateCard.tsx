import { motion } from 'framer-motion';
import { PhoneArrowDownLeftIcon as PhoneIncomingIcon, PhoneArrowUpRightIcon as PhoneOutgoingIcon } from '@heroicons/react/24/outline';

interface TemplateCardProps {
  title: string;
  description: string;
  inboundUseCase: string;
  outboundUseCase: string;
  onSelect: () => void;
}

export default function TemplateCard({ 
  title, 
  description, 
  inboundUseCase, 
  outboundUseCase, 
  onSelect 
}: TemplateCardProps) {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
      whileHover={{ y: -4, boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }}
      transition={{ duration: 0.2 }}
    >
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {description}
        </p>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-start space-x-3">
            <PhoneIncomingIcon className="w-5 h-5 text-primary-light dark:text-primary-dark flex-shrink-0 mt-1" />
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {inboundUseCase}
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <PhoneOutgoingIcon className="w-5 h-5 text-primary-light dark:text-primary-dark flex-shrink-0 mt-1" />
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {outboundUseCase}
            </p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-2 px-4 bg-primary-light dark:bg-primary-dark text-white rounded-lg 
                   font-medium transition-colors hover:bg-opacity-90 focus:outline-none focus:ring-2 
                   focus:ring-primary-light dark:focus:ring-primary-dark focus:ring-opacity-50"
          onClick={onSelect}
        >
          Use this Template
        </motion.button>
      </div>
    </motion.div>
  );
}
