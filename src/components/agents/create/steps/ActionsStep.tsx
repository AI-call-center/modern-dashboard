import { motion } from 'framer-motion';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

interface ActionsStepProps {
  data: {
    selectedActions: string[];
  };
  onChange: (data: Partial<ActionsStepProps['data']>) => void;
}

export default function ActionsStep({ data, onChange }: ActionsStepProps) {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold bg-clip-text text-transparent 
          bg-gradient-to-r from-primary-light to-blue-600 dark:from-primary-dark dark:to-blue-400
          [text-shadow:_0_0_30px_rgb(var(--primary-light-rgb)_/_0.3)]"
        >
          Actions
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Configure the actions your agent can perform
        </p>
      </motion.div>

      <div className="flex flex-col items-center justify-center py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-4"
        >
          <div className="inline-block p-4 rounded-full bg-primary-light/10 dark:bg-primary-dark/10">
            <PlusCircleIcon className="h-12 w-12 text-primary-light dark:text-primary-dark" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            No Actions Created Yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-sm">
            You do not have any actions yet. Create one to enable your agent to perform specific tasks.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center px-6 py-3 bg-primary-light dark:bg-primary-dark 
              text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden"
          >
            <span className="relative z-10">Create Action</span>
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ scale: 0, opacity: 0 }}
              whileTap={{ scale: 2, opacity: 0.4 }}
              transition={{ duration: 0.5 }}
            />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
