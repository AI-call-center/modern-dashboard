import { motion } from 'framer-motion';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

export default function NewCampaignButton() {
  const navigate = useNavigate();
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate('/campaigns/new')}
      className="inline-flex items-center px-4 py-2 rounded-lg
        bg-primary-light/90 dark:bg-primary-dark/90
        text-white backdrop-blur-sm
        border border-primary-light/50 dark:border-primary-dark/50
        shadow-lg shadow-primary-light/20 dark:shadow-primary-dark/20
        hover:shadow-xl hover:shadow-primary-light/30 dark:hover:shadow-primary-dark/30
        transition-all duration-200
        space-x-2"
    >
      <PlusIcon className="h-5 w-5" />
      <span>Create campaign</span>
    </motion.button>
  );
}
