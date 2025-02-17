import { motion } from 'framer-motion';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function NewCampaignButton() {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-8 right-8 p-4 rounded-full 
        bg-gradient-to-r from-primary-light to-blue-600 
        dark:from-primary-dark dark:to-blue-400
        text-white shadow-lg shadow-primary-light/20 dark:shadow-primary-dark/20
        hover:shadow-xl hover:shadow-primary-light/30 dark:hover:shadow-primary-dark/30
        transition-shadow"
      style={{
        animation: 'pulse 2s infinite'
      }}
    >
      <PlusIcon className="h-6 w-6" />
      <style jsx>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(var(--primary-light-rgb), 0.4);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(var(--primary-light-rgb), 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(var(--primary-light-rgb), 0);
          }
        }
      `}</style>
    </motion.button>
  );
}
