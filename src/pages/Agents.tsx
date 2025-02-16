import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/24/outline';
import { CogIcon } from '@heroicons/react/24/outline';
import AgentSearchFilters from '../components/agents/AgentSearchFilters';
import AgentModal from '../components/agents/AgentModal';
import AgentSettingsModal from '../components/agents/AgentSettingsModal';
import CreateAgentForm from '../components/agents/create/CreateAgentForm';

// Sample data
const agentsData = [
  {
    id: 1,
    name: 'Sales Assistant',
    status: 'active',
    totalCalls: 245,
    avgDuration: '3:45',
    successRate: 92,
    description: 'AI agent specialized in sales and lead qualification',
    workflows: [
      { id: 1, name: 'Lead Qualification', enabled: true },
      { id: 2, name: 'Meeting Scheduling', enabled: true },
      { id: 3, name: 'Follow-up Emails', enabled: false },
    ],
    integrations: [
      { id: 1, name: 'CRM Integration', enabled: true },
      { id: 2, name: 'Calendar', enabled: true },
      { id: 3, name: 'Email Service', enabled: false },
    ],
    recentActivity: [
      { id: 1, phone: '(555) 123-4567', duration: '4:23', status: 'Completed', timestamp: '2h ago' },
      { id: 2, phone: '(555) 234-5678', duration: '3:12', status: 'Completed', timestamp: '3h ago' },
      { id: 3, phone: '(555) 345-6789', duration: '5:45', status: 'In Progress', timestamp: '4h ago' },
    ],
    performanceData: [
      { date: 'Mon', successRate: 88, callVolume: 45 },
      { date: 'Tue', successRate: 92, callVolume: 52 },
      { date: 'Wed', successRate: 90, callVolume: 48 },
      { date: 'Thu', successRate: 94, callVolume: 60 },
      { date: 'Fri', successRate: 91, callVolume: 55 },
    ],
  },
  {
    id: 2,
    name: 'Support Agent',
    status: 'active',
    totalCalls: 189,
    avgDuration: '4:15',
    successRate: 88,
    description: 'AI agent specialized in customer support and issue resolution',
    workflows: [
      { id: 1, name: 'Ticket Creation', enabled: true },
      { id: 2, name: 'Issue Resolution', enabled: true },
      { id: 3, name: 'Feedback Collection', enabled: true },
    ],
    integrations: [
      { id: 1, name: 'Help Desk', enabled: true },
      { id: 2, name: 'Knowledge Base', enabled: true },
      { id: 3, name: 'Chat Platform', enabled: true },
    ],
    recentActivity: [
      { id: 1, phone: '(555) 987-6543', duration: '3:45', status: 'Completed', timestamp: '1h ago' },
      { id: 2, phone: '(555) 876-5432', duration: '5:18', status: 'Completed', timestamp: '2h ago' },
      { id: 3, phone: '(555) 765-4321', duration: '2:30', status: 'In Progress', timestamp: '3h ago' },
    ],
    performanceData: [
      { date: 'Mon', successRate: 85, callVolume: 35 },
      { date: 'Tue', successRate: 88, callVolume: 42 },
      { date: 'Wed', successRate: 87, callVolume: 38 },
      { date: 'Thu', successRate: 90, callVolume: 45 },
      { date: 'Fri', successRate: 89, callVolume: 40 },
    ],
  },
];

export default function Agents() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    callVolume: '',
    successRate: '',
  });
  const [selectedAgent, setSelectedAgent] = useState<typeof agentsData[0] | null>(null);
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);
  const navigate = useNavigate();

  const filteredAgents = agentsData.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !filters.status || agent.status === filters.status;
    const matchesCallVolume = !filters.callVolume || (
      filters.callVolume === 'high' ? agent.totalCalls > 200 :
      filters.callVolume === 'medium' ? agent.totalCalls >= 50 && agent.totalCalls <= 200 :
      agent.totalCalls < 50
    );
    const matchesSuccessRate = !filters.successRate || (
      filters.successRate === 'high' ? agent.successRate > 90 :
      filters.successRate === 'medium' ? agent.successRate >= 70 && agent.successRate <= 90 :
      agent.successRate < 70
    );

    return matchesSearch && matchesStatus && matchesCallVolume && matchesSuccessRate;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex justify-between items-start"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            AI Agents
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage and monitor your AI agents' performance and settings
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/agents/create')}
          className="px-6 py-3 bg-primary-light dark:bg-primary-dark text-white 
            rounded-lg shadow-lg hover:shadow-xl transition-shadow flex items-center
            space-x-2 relative overflow-hidden group"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Create Agent</span>
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 2, opacity: 0.1 }}
            transition={{ duration: 0.5 }}
          />
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
        >
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Agents</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{agentsData.length}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
        >
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Now</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            {agentsData.filter(agent => agent.status === 'active').length}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
        >
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Calls</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            {agentsData.reduce((sum, agent) => sum + agent.totalCalls, 0)}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
        >
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg. Success Rate</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            {Math.round(agentsData.reduce((sum, agent) => sum + agent.successRate, 0) / agentsData.length)}%
          </p>
        </motion.div>
      </div>

      <div className="mb-8">
        <AgentSearchFilters
          onSearch={setSearchQuery}
          onFilterChange={setFilters}
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Agent Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Total Calls
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Avg. Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Success Rate
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredAgents.map((agent) => (
              <tr key={agent.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{agent.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      agent.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-gray-500'
                    }`} />
                    <span className="text-sm text-gray-900 dark:text-white capitalize">{agent.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">{agent.totalCalls}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">{agent.avgDuration}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-16 h-16 relative">
                      <svg className="w-16 h-16 transform -rotate-90">
                        <circle
                          className="text-gray-200 dark:text-gray-700"
                          strokeWidth="4"
                          stroke="currentColor"
                          fill="transparent"
                          r="30"
                          cx="32"
                          cy="32"
                        />
                        <circle
                          className="text-primary-light dark:text-primary-dark"
                          strokeWidth="4"
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="transparent"
                          r="30"
                          cx="32"
                          cy="32"
                          strokeDasharray={`${agent.successRate * 1.88} 188.4`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {agent.successRate}%
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  <div className="flex space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        setSelectedAgent(agent);
                        setDetailsModalOpen(true);
                      }}
                      className="text-primary-light dark:text-primary-dark hover:text-opacity-80"
                    >
                      View Details
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        setSelectedAgent(agent);
                        setSettingsModalOpen(true);
                      }}
                      className="text-gray-600 dark:text-gray-400 hover:text-opacity-80"
                    >
                      <CogIcon className="w-5 h-5" />
                    </motion.button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedAgent && (
        <>
          <AgentModal
            isOpen={isDetailsModalOpen}
            onClose={() => setDetailsModalOpen(false)}
            agent={selectedAgent}
          />
          <AgentSettingsModal
            isOpen={isSettingsModalOpen}
            onClose={() => setSettingsModalOpen(false)}
            agent={selectedAgent}
          />
        </>
      )}


    </div>
  );
}
