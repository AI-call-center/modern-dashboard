import { motion } from 'framer-motion';
import { XMarkIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { Agent } from '../../types/agent';

interface AgentDetailsModalProps {
  agent: Agent;
  onClose: () => void;
  onSettingsClick: () => void;
}

export default function AgentDetailsModal({ agent, onClose, onSettingsClick }: AgentDetailsModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 flex justify-between items-start border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {agent.name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              ID: {agent.id}
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={onSettingsClick}
              className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <Cog6ToothIcon className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Status
              </h3>
              <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                {agent.status}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Type
              </h3>
              <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                {agent.type}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Calls
              </h3>
              <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                {agent.totalCalls}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Success Rate
              </h3>
              <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                {agent.successRate}%
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Recent Activity
            </h3>
            <div className="space-y-2">
              {agent.recentActivity?.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {activity.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
