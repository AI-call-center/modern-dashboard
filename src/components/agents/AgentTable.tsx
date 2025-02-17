import { motion } from 'framer-motion';
import { EllipsisHorizontalIcon, ClockIcon } from '@heroicons/react/24/outline';
import { RobotIcon } from '../icons/RobotIcon';

interface Agent {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  totalCalls: number;
  avgDuration: string;
  successRate: number;
}

interface AgentTableProps {
  agents: Agent[];
  onViewDetails: (agentId: string) => void;
}

export default function AgentTable({ agents, onViewDetails }: AgentTableProps) {
  return (
    <div className="backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-lg overflow-hidden border border-gray-200/50 dark:border-gray-700/50 relative">
      {/* Glassmorphism gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-light/5 to-blue-500/5 dark:from-primary-dark/5 dark:to-blue-400/5 rounded-xl pointer-events-none" />
      <div className="overflow-x-auto">
      {/* Table header */}
      <table className="min-w-full divide-y divide-gray-200/50 dark:divide-gray-700/50 relative z-10">
        <thead className="bg-gray-50/50 dark:bg-gray-900/30 backdrop-blur-md sticky top-0 z-10">
          <tr>
            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
              Agent Name
            </th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
              Status
            </th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
              Total Calls
            </th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
              Avg. Duration
            </th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
              Success Rate
            </th>
            <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
              Actions
            </th>
          </tr>
        </thead>

        {/* Table body */}
        <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/50 bg-transparent">
          {agents.map((agent) => (
            <motion.tr
              key={agent.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ backgroundColor: 'rgba(var(--primary-light-rgb), 0.02)' }}
              className="group cursor-pointer transition-all duration-200 hover:bg-white/50 dark:hover:bg-gray-800/30 hover:backdrop-blur-lg hover:shadow-md dark:hover:shadow-gray-800/20"
            >
              {/* Agent Name */}
              <td className="px-6 py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary-light/10 to-blue-500/10 dark:from-primary-dark/10 dark:to-blue-400/10 backdrop-blur-sm rounded-lg border border-gray-200/20 dark:border-gray-700/20">
                    <RobotIcon className="h-6 w-6 text-primary-light dark:text-primary-dark" />
                  </div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {agent.name}
                  </div>
                </div>
              </td>

              {/* Status */}
              <td className="px-6 py-4">
                <div className="flex items-center">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border ${agent.status === 'active' ? 'text-green-500 dark:text-green-400 bg-green-500/10 border-green-500/20 dark:border-green-400/20' : 'text-gray-500 dark:text-gray-400 bg-gray-500/10 border-gray-500/20 dark:border-gray-400/20'}`}>
                  <span className={`w-1.5 h-1.5 mr-1.5 rounded-full ${agent.status === 'active' ? 'bg-green-500 dark:bg-green-400 animate-pulse' : 'bg-gray-500 dark:bg-gray-400'}`} />
                  {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                </span>
                </div>
              </td>

              {/* Total Calls */}
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900 dark:text-white">
                {agent.totalCalls.toLocaleString()}
                </div>
              </td>

              {/* Average Duration */}
              <td className="px-6 py-4">
                <div className="flex items-center text-sm text-gray-900 dark:text-white">
                <ClockIcon className="w-4 h-4 mr-1.5 text-gray-400 dark:text-gray-500 opacity-75" />
                {agent.avgDuration}
                </div>
              </td>

              {/* Success Rate */}
              <td className="px-6 py-4">
                <div className="flex items-center space-x-2">
                  <div className="w-full max-w-[100px] h-2.5 bg-gray-200/30 dark:bg-gray-700/30 rounded-full overflow-hidden backdrop-blur-sm border border-gray-200/20 dark:border-gray-700/20">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${agent.successRate}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-primary-light to-blue-500 dark:from-primary-dark dark:to-blue-400"
                    />
                  </div>
                  <span className="text-sm text-gray-900 dark:text-white">
                    {agent.successRate}%
                  </span>
                </div>
              </td>

              {/* Actions */}
              <td className="px-6 py-4 text-right">
                <div className="flex items-center space-x-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onViewDetails(agent.id)}
                  className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-lg
                    text-primary-light dark:text-primary-dark
                    hover:bg-primary-light/10 dark:hover:bg-primary-dark/10
                    transition-all duration-200 group-hover:shadow-sm
                    backdrop-blur-sm border border-primary-light/20 dark:border-primary-dark/20"
                >
                  View Details
                  <EllipsisHorizontalIcon className="ml-1.5 h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
                </motion.button>
              </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}
