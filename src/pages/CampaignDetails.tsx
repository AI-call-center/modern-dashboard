import { useState, useEffect } from 'react';
import TemplatesModal from '../components/campaigns/TemplatesModal';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  PauseIcon,
  ArrowLeftIcon, 
  PhoneIcon, 
  ClockIcon, 
  CalendarIcon,
  UserIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  XCircleIcon,
  ChevronDownIcon,
  PlusIcon,
  ArrowUpTrayIcon
} from '@heroicons/react/24/outline';
import StatCard from '../components/campaigns/StatCard';
import LeadsTable from '../components/campaigns/LeadsTable';
import TimeRangePicker from '../components/campaigns/TimeRangePicker';
import DaySelector from '../components/campaigns/DaySelector';

export default function CampaignDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNewCampaign = !id;

  // Load campaign data if editing existing campaign
  useEffect(() => {
    if (id) {
      // TODO: Replace with actual API call
      const campaign = mockCampaigns.find(c => c.id === id);
      if (campaign) {
        setCampaignName(campaign.name);
        setIsRunning(campaign.status === 'running');
      } else {
        navigate('/campaigns');
      }
    }
  }, [id]);

  // Mock campaigns data - replace with context or API call
  const mockCampaigns = [
    {
      id: '1',
      name: 'Summer Sales Outreach',
      status: 'running' as const,
    },
    {
      id: '2',
      name: 'Product Launch Campaign',
      status: 'paused' as const,
    }
  ];
  const [campaignName, setCampaignName] = useState('Summer Outreach Campaign');
  const [isRunning, setIsRunning] = useState(true);
  const [timezone, setTimezone] = useState('UTC+4');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [maxRetries, setMaxRetries] = useState(3);
  const [retryInterval, setRetryInterval] = useState(30);
  const [markCompleteNoLeads, setMarkCompleteNoLeads] = useState(true);
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState(false);
  const [firstMessage, setFirstMessage] = useState('');

  const stats = [
    { 
      title: 'Pending Calls', 
      value: 450, 
      icon: PhoneIcon,
      color: 'blue'
    },
    { 
      title: 'Triggered Calls', 
      value: 850, 
      icon: ArrowPathIcon,
      color: 'indigo'
    },
    { 
      title: 'Completed Calls', 
      value: 720, 
      icon: CheckCircleIcon,
      color: 'green'
    },
    { 
      title: 'Failed Calls', 
      value: 130, 
      icon: XCircleIcon,
      color: 'red'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex justify-between items-start relative">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/campaigns')}
            className="absolute -left-2 -top-2 p-2 rounded-lg
              text-gray-500 dark:text-gray-400
              hover:text-gray-700 dark:hover:text-gray-200
              transition-colors duration-200"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </motion.button>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-1 ml-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {isNewCampaign ? 'New Campaign' : campaignName}
            </h1>
            <div className="flex items-center space-x-2">
              {!isNewCampaign && (
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm
                  ${isRunning ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 
                               'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'}
                  backdrop-blur-sm border border-current border-opacity-20`}>
                {isRunning ? 'Running' : 'Paused'}
              </span>
              )}
            </div>
          </motion.div>

          {!isNewCampaign && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsRunning(!isRunning)}
              className="px-4 py-2 rounded-lg
                bg-yellow-100/90 dark:bg-yellow-900/30
                text-yellow-800 dark:text-yellow-400
                backdrop-blur-sm border border-yellow-200/50 dark:border-yellow-700/50
                shadow-lg shadow-yellow-100/20 dark:shadow-yellow-900/20
                hover:shadow-xl hover:shadow-yellow-100/30 dark:hover:shadow-yellow-900/30
                transition-all duration-200"
            >
              <div className="flex items-center space-x-2">
                <PauseIcon className="h-5 w-5" />
                <span>Pause Campaign</span>
              </div>
            </motion.button>
          )}
        </div>

        {/* Stats Grid */}
        {!isNewCampaign && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {stats.map((stat) => (
              <StatCard key={stat.title} {...stat} />
            ))}
          </motion.div>
        )}

        {/* Campaign Details Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 dark:bg-navy-800/90 backdrop-blur-md rounded-xl p-6
            shadow-lg shadow-gray-200/20 dark:shadow-navy-900/30
            border border-gray-200/50 dark:border-gray-700/50"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Campaign Details
          </h2>
          
          <div className="space-y-6">
            {/* Campaign Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Campaign Name
              </label>
              <input
                type="text"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg
                  bg-white/80 dark:bg-navy-700/80
                  text-gray-900 dark:text-white
                  border border-gray-200/50 dark:border-gray-700/50
                  focus:ring-2 focus:ring-primary-light/50 dark:focus:ring-primary-dark/50
                  focus:border-transparent backdrop-blur-sm"
              />
            </div>

            {/* Campaign Type */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Campaign Type
              </label>
              <div className="relative">
                <select
                  className="w-full px-4 py-2 rounded-lg appearance-none
                    bg-white/80 dark:bg-navy-700/80
                    text-gray-900 dark:text-white
                    border border-gray-200/50 dark:border-gray-700/50
                    focus:ring-2 focus:ring-primary-light/50 dark:focus:ring-primary-dark/50
                    focus:border-transparent backdrop-blur-sm"
                >
                  <option value="outbound">Outbound</option>
                  <option value="inbound">Inbound</option>
                </select>
                <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* First Message */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  First Message
                </label>
                <motion.button
                  onClick={() => setIsTemplatesModalOpen(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 rounded-lg
                    bg-[rgb(0,191,255,0.9)] dark:bg-[rgb(0,191,255,0.9)]
                    text-white
                    border border-[rgb(0,191,255,0.5)] dark:border-[rgb(0,191,255,0.5)]
                    shadow-lg shadow-[rgb(0,191,255,0.2)] dark:shadow-[rgb(0,191,255,0.2)]
                    hover:shadow-xl hover:shadow-[rgb(0,191,255,0.3)] dark:hover:shadow-[rgb(0,191,255,0.3)]
                    transition-all duration-200 ease-in-out
                    text-sm font-medium"
                >
                  Browse Templates
                </motion.button>
              </div>
              <textarea
                rows={4}
                value={firstMessage}
                onChange={(e) => setFirstMessage(e.target.value)}
                placeholder="Enter your first message here..."
                className="w-full px-4 py-2 rounded-lg
                  bg-white/80 dark:bg-navy-700/80
                  text-gray-900 dark:text-white
                  border border-gray-200/50 dark:border-gray-700/50
                  focus:ring-2 focus:ring-primary-light/50 dark:focus:ring-primary-dark/50
                  focus:border-transparent backdrop-blur-sm"
              />
            </div>
          </div>
        </motion.div>

        {/* Timezone & Scheduling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 dark:bg-navy-800/90 backdrop-blur-md rounded-xl p-6
            shadow-lg shadow-gray-200/20 dark:shadow-navy-900/30
            border border-gray-200/50 dark:border-gray-700/50"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Timezone & Scheduling
          </h2>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Timezone */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Timezone
                </label>
                <div className="relative">
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg appearance-none
                      bg-white/80 dark:bg-navy-700/80
                      text-gray-900 dark:text-white
                      border border-gray-200/50 dark:border-gray-700/50
                      focus:ring-2 focus:ring-primary-light/50 dark:focus:ring-primary-dark/50
                      focus:border-transparent backdrop-blur-sm"
                  >
                    <option value="UTC+4">UTC+4</option>
                    <option value="UTC+3">UTC+3</option>
                    <option value="UTC+5">UTC+5</option>
                  </select>
                  <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>

              {/* Time Range */}
              <TimeRangePicker
                startTime={startTime}
                endTime={endTime}
                onStartTimeChange={setStartTime}
                onEndTimeChange={setEndTime}
              />
            </div>

            {/* Day Selector */}
            <DaySelector />
          </div>
        </motion.div>

        {/* Agent & Phone Number */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 dark:bg-navy-800/90 backdrop-blur-md rounded-xl p-6
            shadow-lg shadow-gray-200/20 dark:shadow-navy-900/30
            border border-gray-200/50 dark:border-gray-700/50"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Agent & Phone Number
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Agent Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Select Agent
              </label>
              <div className="relative">
                <select
                  className="w-full px-4 py-2 rounded-lg appearance-none
                    bg-white/80 dark:bg-navy-700/80
                    text-gray-900 dark:text-white
                    border border-gray-200/50 dark:border-gray-700/50
                    focus:ring-2 focus:ring-primary-light/50 dark:focus:ring-primary-dark/50
                    focus:border-transparent backdrop-blur-sm"
                >
                  <option value="john">John Doe</option>
                  <option value="jane">Jane Smith</option>
                </select>
                <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Phone Number
              </label>
              <div className="relative">
                <select
                  className="w-full px-4 py-2 rounded-lg appearance-none
                    bg-white/80 dark:bg-navy-700/80
                    text-gray-900 dark:text-white
                    border border-gray-200/50 dark:border-gray-700/50
                    focus:ring-2 focus:ring-primary-light/50 dark:focus:ring-primary-dark/50
                    focus:border-transparent backdrop-blur-sm"
                >
                  <option value="+1234567890">+1 (234) 567-890</option>
                  <option value="+1987654321">+1 (987) 654-321</option>
                </select>
                <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Retry Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 dark:bg-navy-800/90 backdrop-blur-md rounded-xl p-6
            shadow-lg shadow-gray-200/20 dark:shadow-navy-900/30
            border border-gray-200/50 dark:border-gray-700/50"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Retry Settings
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Max Retries */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Max Retries
              </label>
              <input
                type="number"
                value={maxRetries}
                onChange={(e) => setMaxRetries(parseInt(e.target.value))}
                min={0}
                max={10}
                className="w-full px-4 py-2 rounded-lg
                  bg-white/80 dark:bg-navy-700/80
                  text-gray-900 dark:text-white
                  border border-gray-200/50 dark:border-gray-700/50
                  focus:ring-2 focus:ring-primary-light/50 dark:focus:ring-primary-dark/50
                  focus:border-transparent backdrop-blur-sm"
              />
            </div>

            {/* Retry Interval */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Retry Interval (Minutes)
              </label>
              <input
                type="number"
                value={retryInterval}
                onChange={(e) => setRetryInterval(parseInt(e.target.value))}
                min={5}
                max={120}
                step={5}
                className="w-full px-4 py-2 rounded-lg
                  bg-white/80 dark:bg-navy-700/80
                  text-gray-900 dark:text-white
                  border border-gray-200/50 dark:border-gray-700/50
                  focus:ring-2 focus:ring-primary-light/50 dark:focus:ring-primary-dark/50
                  focus:border-transparent backdrop-blur-sm"
              />
            </div>
          </div>
        </motion.div>

        {/* Consent Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 dark:bg-navy-800/90 backdrop-blur-md rounded-xl p-6
            shadow-lg shadow-gray-200/20 dark:shadow-navy-900/30
            border border-gray-200/50 dark:border-gray-700/50"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Consent Settings
          </h2>
          
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="markComplete"
              checked={markCompleteNoLeads}
              onChange={(e) => setMarkCompleteNoLeads(e.target.checked)}
              className="h-4 w-4 rounded
                text-primary-light dark:text-primary-dark
                border-gray-300 dark:border-gray-600
                focus:ring-primary-light/50 dark:focus:ring-primary-dark/50"
            />
            <label
              htmlFor="markComplete"
              className="text-sm text-gray-700 dark:text-gray-300"
            >
              Mark Complete on No Leads
            </label>
          </div>
        </motion.div>

        {/* Leads Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Leads Management
            </h2>
            <div className="flex space-x-4">
              <button
                className="px-4 py-2 rounded-lg
                  bg-primary-light/90 dark:bg-primary-dark/90
                  text-white backdrop-blur-sm
                  border border-primary-light/50 dark:border-primary-dark/50
                  shadow-lg shadow-primary-light/20 dark:shadow-primary-dark/20
                  hover:shadow-xl hover:shadow-primary-light/30 dark:hover:shadow-primary-dark/30
                  transition-all duration-200"
              >
                <div className="flex items-center space-x-2">
                  <PlusIcon className="h-5 w-5" />
                  <span>New Lead</span>
                </div>
              </button>
              <button
                className="px-4 py-2 rounded-lg
                  bg-gray-100/90 dark:bg-navy-700/90
                  text-gray-900 dark:text-white
                  backdrop-blur-sm
                  border border-gray-200/50 dark:border-gray-700/50
                  shadow-lg shadow-gray-200/20 dark:shadow-navy-900/30
                  hover:shadow-xl hover:shadow-gray-200/30 dark:hover:shadow-navy-900/40
                  transition-all duration-200"
              >
                <div className="flex items-center space-x-2">
                  <ArrowUpTrayIcon className="h-5 w-5" />
                  <span>Upload CSV</span>
                </div>
              </button>
            </div>
          </div>

          <LeadsTable />
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-end">
        {isNewCampaign && (
          <motion.button
            onClick={() => {
              // TODO: Handle campaign creation
              console.log('Creating campaign...');
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 rounded-lg
              bg-[rgb(0,191,255,0.9)] dark:bg-[rgb(0,191,255,0.9)]
              text-white font-medium
              border border-[rgb(0,191,255,0.5)] dark:border-[rgb(0,191,255,0.5)]
              shadow-lg shadow-[rgb(0,191,255,0.2)] dark:shadow-[rgb(0,191,255,0.2)]
              hover:shadow-xl hover:shadow-[rgb(0,191,255,0.3)] dark:hover:shadow-[rgb(0,191,255,0.3)]
              transition-all duration-200 ease-in-out
              flex items-center space-x-2"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Create Campaign</span>
          </motion.button>
        )}
      </div>

      {/* Templates Modal */}
      <TemplatesModal
        isOpen={isTemplatesModalOpen}
        onClose={() => setIsTemplatesModalOpen(false)}
        onSelectTemplate={(template) => {
          setFirstMessage(template.content);
          setIsTemplatesModalOpen(false);
        }}
      />
    </div>
  );
}
