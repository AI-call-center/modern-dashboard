import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import CreateAgentForm from '../components/agents/create/CreateAgentForm';

export default function CreateAgent() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="absolute top-4 right-4 z-10">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/agents')}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 
              dark:hover:text-gray-200 transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </motion.button>
        </div>
        <CreateAgentForm />
      </div>
    </div>
  );
}
