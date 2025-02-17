import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  PlusIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon,
  Cog6ToothIcon,
  UserGroupIcon,
  PhoneIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import MetricCard from '../components/agents/MetricCard';
import SearchBar from '../components/agents/SearchBar';
import AgentTable from '../components/agents/AgentTable';
import AgentDetailsModal from '../components/agents/AgentDetailsModal';
import AgentSettingsModal from '../components/agents/AgentSettingsModal';

// Sample data
const agentsData = [
  {
    id: 'agent-1',
    name: 'Sales Assistant',
    type: 'Sales',
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
    id: 'agent-2',
    name: 'Support Agent',
    type: 'Support',
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
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<typeof agentsData[0] | null>(null);
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Calculate metrics
  const metrics = {
    totalAgents: agentsData.length,
    activeAgents: agentsData.filter(a => a.status === 'active').length,
    totalCalls: agentsData.reduce((sum, a) => sum + a.totalCalls, 0),
    avgSuccessRate: Math.round(
      agentsData.reduce((sum, a) => sum + a.successRate, 0) / agentsData.length
    ),
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
  };

  const filteredAgents = agentsData.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery) ||
      agent.id.toLowerCase().includes(searchQuery) ||
      agent.type.toLowerCase().includes(searchQuery);
    return matchesSearch;
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
          className="relative overflow-hidden backdrop-blur-2xl bg-white/20 dark:bg-gray-800/20
            p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300
            border border-gray-200/20 dark:border-gray-700/20
            hover:bg-white/30 dark:hover:bg-gray-800/30
            group"
          style={{
            background: 'linear-gradient(169.73deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
            boxShadow: '0 4px 24px -1px rgba(0, 0, 0, 0.1), 0 2px 8px -1px rgba(0, 0, 0, 0.06)'
          }}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-light/10 via-blue-500/5 to-transparent 
            dark:from-primary-dark/10 dark:via-blue-400/5 dark:to-transparent rounded-xl filter blur-2xl opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-tl from-white/5 via-primary-light/5 to-transparent 
            dark:from-gray-900/5 dark:via-primary-dark/5 dark:to-transparent rounded-xl" />
          
          {/* Content */}
          <div className="relative z-10">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Agents</h3>
            <p className="mt-2 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r 
              from-gray-900 to-gray-700 dark:from-white dark:to-gray-300
              group-hover:scale-105 transition-transform">{agentsData.length}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative overflow-hidden backdrop-blur-2xl bg-white/20 dark:bg-gray-800/20
            p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300
            border border-gray-200/20 dark:border-gray-700/20
            hover:bg-white/30 dark:hover:bg-gray-800/30
            group"
          style={{
            background: 'linear-gradient(169.73deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
            boxShadow: '0 4px 24px -1px rgba(0, 0, 0, 0.1), 0 2px 8px -1px rgba(0, 0, 0, 0.06)'
          }}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-light/10 via-blue-500/5 to-transparent 
            dark:from-primary-dark/10 dark:via-blue-400/5 dark:to-transparent rounded-xl filter blur-2xl opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-tl from-white/5 via-primary-light/5 to-transparent 
            dark:from-gray-900/5 dark:via-primary-dark/5 dark:to-transparent rounded-xl" />
          
          {/* Content */}
          <div className="relative z-10">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Now</h3>
            <p className="mt-2 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r 
              from-gray-900 to-gray-700 dark:from-white dark:to-gray-300
              group-hover:scale-105 transition-transform">
              {agentsData.filter(agent => agent.status === 'active').length}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative overflow-hidden backdrop-blur-2xl bg-white/20 dark:bg-gray-800/20
            p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300
            border border-gray-200/20 dark:border-gray-700/20
            hover:bg-white/30 dark:hover:bg-gray-800/30
            group"
          style={{
            background: 'linear-gradient(169.73deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
            boxShadow: '0 4px 24px -1px rgba(0, 0, 0, 0.1), 0 2px 8px -1px rgba(0, 0, 0, 0.06)'
          }}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-light/10 via-blue-500/5 to-transparent 
            dark:from-primary-dark/10 dark:via-blue-400/5 dark:to-transparent rounded-xl filter blur-2xl opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-tl from-white/5 via-primary-light/5 to-transparent 
            dark:from-gray-900/5 dark:via-primary-dark/5 dark:to-transparent rounded-xl" />
          
          {/* Content */}
          <div className="relative z-10">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Calls</h3>
            <p className="mt-2 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r 
              from-gray-900 to-gray-700 dark:from-white dark:to-gray-300
              group-hover:scale-105 transition-transform">
              {agentsData.reduce((sum, agent) => sum + agent.totalCalls, 0)}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative overflow-hidden backdrop-blur-2xl bg-white/20 dark:bg-gray-800/20
            p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300
            border border-gray-200/20 dark:border-gray-700/20
            hover:bg-white/30 dark:hover:bg-gray-800/30
            group"
          style={{
            background: 'linear-gradient(169.73deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
            boxShadow: '0 4px 24px -1px rgba(0, 0, 0, 0.1), 0 2px 8px -1px rgba(0, 0, 0, 0.06)'
          }}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-light/10 via-blue-500/5 to-transparent 
            dark:from-primary-dark/10 dark:via-blue-400/5 dark:to-transparent rounded-xl filter blur-2xl opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-tl from-white/5 via-primary-light/5 to-transparent 
            dark:from-gray-900/5 dark:via-primary-dark/5 dark:to-transparent rounded-xl" />
          
          {/* Content */}
          <div className="relative z-10">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg. Success Rate</h3>
            <p className="mt-2 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r 
              from-gray-900 to-gray-700 dark:from-white dark:to-gray-300
              group-hover:scale-105 transition-transform">
              {Math.round(agentsData.reduce((sum, agent) => sum + agent.successRate, 0) / agentsData.length)}%
            </p>
          </div>
        </motion.div>
      </div>

      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex-1">
            <SearchBar
              onSearch={handleSearch}
              onFilter={() => setFilterOpen(!isFilterOpen)}
              suggestions={["Search by name", "Search by ID", "Search by type"]}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setFilterOpen(!isFilterOpen)}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg
              hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors
              flex items-center space-x-2"
          >
            <AdjustmentsHorizontalIcon className="w-5 h-5" />
            <span>Filters</span>
          </motion.button>
        </div>

        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                {/* Add filter controls here */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AgentTable
        agents={filteredAgents}
        onViewDetails={(agentId) => {
          const agent = filteredAgents.find(a => a.id === agentId);
          if (agent) {
            setSelectedAgent(agent);
            setDetailsModalOpen(true);
          }
        }}
      />

      <AnimatePresence>
        {isDetailsModalOpen && selectedAgent && (
          <AgentDetailsModal
            agent={selectedAgent}
            onClose={() => setDetailsModalOpen(false)}
            onSettingsClick={() => {
              setDetailsModalOpen(false);
              setSettingsModalOpen(true);
            }}
          />
        )}

        {isSettingsModalOpen && selectedAgent && (
          <AgentSettingsModal
            agent={selectedAgent}
            onClose={() => setSettingsModalOpen(false)}
          />
        )}
      </AnimatePresence>


      {selectedAgent && (
        <>
          <AgentDetailsModal
            agent={selectedAgent}
            onClose={() => setDetailsModalOpen(false)}
            onSettingsClick={() => {
              setDetailsModalOpen(false);
              setSettingsModalOpen(true);
            }}
          />
          <AgentSettingsModal
            isOpen={isSettingsModalOpen}
            onClose={() => setSettingsModalOpen(false)}
            agent={{
              name: selectedAgent.name,
              description: selectedAgent.description || '',
              status: selectedAgent.status,
              workflows: selectedAgent.workflows || [],
              integrations: selectedAgent.integrations || []
            }}
          />
        </>
      )}


    </div>
  );
}
