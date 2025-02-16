import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HomeIcon,
  PhoneIcon,
  UsersIcon,
  ArrowTrendingUpIcon,
  PhoneArrowUpRightIcon,
  CurrencyDollarIcon,
  Cog6ToothIcon,
  SunIcon,
  MoonIcon,
} from '@heroicons/react/24/outline';

// Interfaces
interface ThemeToggleProps {
  isDark: boolean;
  toggleTheme: () => void;
}

interface MetricCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  value: string;
  change: number;
  color: string;
}

interface LeadCardProps {
  name: string;
  phone: string;
  lastContact: string;
  status: 'new' | 'active';
  score: number;
}

// Components
const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
    >
      {isDark ? (
        <SunIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
      ) : (
        <MoonIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
      )}
    </button>
  );
};

const MetricCard: React.FC<MetricCardProps> = ({ icon: Icon, title, value, change, color }) => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center justify-between">
        <Icon className={`w-8 h-8 ${color}`} />
        <span className={`text-sm font-medium ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {change > 0 ? '+' : ''}{change}%
        </span>
      </div>
      <h3 className="mt-4 text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
    </motion.div>
  );
};

const LeadCard: React.FC<LeadCardProps> = ({ name, phone, lastContact, status, score }) => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">{name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{phone}</p>
        </div>
        <span className={`px-2 py-1 text-xs rounded-full ${
          status === 'new' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
          'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
        }`}>
          {status}
        </span>
      </div>
      <div className="mt-4">
        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>Last Contact</span>
          <span>{lastContact}</span>
        </div>
        <div className="mt-2">
          <div className="flex justify-between text-sm mb-1">
            <span>Score</span>
            <span>{score}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-primary-light dark:bg-primary-dark h-2 rounded-full"
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Main App Component
const App: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenuItem, setActiveMenuItem] = useState('dashboard');

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: HomeIcon },
    { id: 'calls', name: 'Calls', icon: PhoneIcon },
    { id: 'agents', name: 'Agents', icon: UsersIcon },
    { id: 'leads', name: 'Leads', icon: ArrowTrendingUpIcon },
    { id: 'numbers', name: 'Phone Numbers', icon: PhoneArrowUpRightIcon },
    { id: 'billing', name: 'Billing', icon: CurrencyDollarIcon },
    { id: 'settings', name: 'Settings', icon: Cog6ToothIcon },
  ];

  return (
    <>
      <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white overflow-hidden">
          {/* Sidebar */}
          <motion.div
            initial={false}
            animate={{ width: isSidebarOpen ? 'auto' : '0' }}
            className="bg-white dark:bg-gray-800 shadow-lg"
          >
            <div className="w-64 h-full flex flex-col">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h1 className="text-xl font-bold text-primary-light dark:text-primary-dark">Enterprise Dashboard</h1>
              </div>
              <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => setActiveMenuItem(item.id)}
                      className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                        activeMenuItem === item.id
                          ? 'bg-primary-light/10 text-primary-light dark:text-primary-dark'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      <span>{item.name}</span>
                    </motion.button>
                  );
                })}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between p-4">
                <button
                  onClick={() => setSidebarOpen(!isSidebarOpen)}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
                <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
              </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                  icon={PhoneIcon}
                  title="Calls Handled Today"
                  value="156"
                  change={12}
                  color="text-blue-500"
                />
                <MetricCard
                  icon={ArrowTrendingUpIcon}
                  title="Answer Rate"
                  value="92%"
                  change={3}
                  color="text-green-500"
                />
                <MetricCard
                  icon={PhoneArrowUpRightIcon}
                  title="Missed Calls"
                  value="8"
                  change={-15}
                  color="text-red-500"
                />
                <MetricCard
                  icon={UsersIcon}
                  title="Average Call Duration"
                  value="4m 32s"
                  change={8}
                  color="text-purple-500"
                />
              </div>

              <div className="mt-8">
                <h2 className="text-lg font-semibold mb-4">Recent Leads</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <LeadCard
                    name="John Smith"
                    phone="(555) 123-4567"
                    lastContact="2h ago"
                    status="new"
                    score={85}
                  />
                  <LeadCard
                    name="Sarah Johnson"
                    phone="(555) 234-5678"
                    lastContact="1d ago"
                    status="active"
                    score={92}
                  />
                  <LeadCard
                    name="Michael Brown"
                    phone="(555) 345-6789"
                    lastContact="3h ago"
                    status="new"
                    score={78}
                  />
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-lg font-semibold mb-4">Recent Calls</h2>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Agent
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Duration
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {/* Sample call data */}
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm">Alex Thompson</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm">John Smith</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm">10:30 AM</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm">5m 12s</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            Completed
                          </span>
                        </td>
                      </tr>
                      {/* Add more rows as needed */}
                    </tbody>
                  </table>
                </div>
              </div>
            </main>

            {/* Footer */}
            <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>© 2025 Enterprise Dashboard</span>
                <div className="flex items-center space-x-4">
                  <a href="#" className="hover:text-primary-light dark:hover:text-primary-dark">Privacy Policy</a>
                  <a href="#" className="hover:text-primary-light dark:hover:text-primary-dark">Terms of Service</a>
                  <a href="#" className="hover:text-primary-light dark:hover:text-primary-dark">Contact Support</a>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
