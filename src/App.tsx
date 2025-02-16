import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Templates from './pages/Templates';
import Agents from './pages/Agents';
import CreateAgent from './pages/CreateAgent';
import Dashboard from './pages/Dashboard';
import {
  HomeIcon,
  PhoneIcon,
  UsersIcon,
  ArrowTrendingUpIcon,
  DocumentIcon,
  BoltIcon,
  Square3Stack3DIcon,
  BuildingOfficeIcon,
  PhoneArrowUpRightIcon,
  CurrencyDollarIcon,
  SunIcon,
  MoonIcon,
} from '@heroicons/react/24/outline';

interface ThemeToggleProps {
  isDark: boolean;
  toggleTheme: () => void;
}

function ThemeToggle({ isDark, toggleTheme }: ThemeToggleProps) {
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
}

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const getActiveMenuItem = (path: string) => {
    if (path === '/') return 'home';
    if (path.startsWith('/agents')) return 'agents';
    if (path === '/templates') return 'templates';
    return 'home';
  };

  const [isDark, setIsDark] = useState(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenuItem, setActiveMenuItem] = useState(getActiveMenuItem(location.pathname));

  const handleMenuItemClick = (menuItem: string) => {
    switch (menuItem) {
      case 'home':
        navigate('/');
        break;
      case 'agents':
        navigate('/agents');
        break;
      case 'templates':
        navigate('/templates');
        break;
    }
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    setActiveMenuItem(getActiveMenuItem(location.pathname));
  }, [location]);

  const menuItems = [
    { id: 'home', name: 'Home', icon: HomeIcon },
    { id: 'automation', name: 'Automation', icon: BoltIcon },
    { id: 'templates', name: 'Templates', icon: DocumentIcon },
    { id: 'agents', name: 'Agents', icon: UsersIcon },
    { id: 'campaigns', name: 'Campaigns', icon: Square3Stack3DIcon },
    { id: 'actions', name: 'Actions', icon: BuildingOfficeIcon },
    { id: 'calls', name: 'Calls', icon: PhoneIcon },
    { id: 'leads', name: 'Leads', icon: ArrowTrendingUpIcon },
    { id: 'divider1', type: 'divider' },
    { id: 'phone-numbers', name: 'Phone Numbers', type: 'header' },
    { id: 'buy-number', name: 'Buy Number', icon: CurrencyDollarIcon, indent: true },
    { id: 'manage', name: 'Manage', icon: PhoneArrowUpRightIcon, indent: true },
    { id: 'divider2', type: 'divider' },
    { id: 'storage', type: 'storage', value: '78' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <motion.div
          initial={false}
          animate={{ width: isSidebarOpen ? 'auto' : '0' }}
          className="bg-white dark:bg-gray-800 shadow-lg"
        >
          <div className="w-64 h-full flex flex-col relative">
            <div className="sticky top-0 z-20 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
              <h1 className="text-xl font-bold text-primary-light dark:text-primary-dark">
                Enterprise Dashboard
              </h1>
            </div>
            <div className="flex-1 overflow-y-auto" style={{ scrollbarGutter: 'stable' }}>
              <nav className="p-4 space-y-2">
                {menuItems.map((item) => {
                  if (item.type === 'divider') {
                    return <div key={item.id} className="h-px bg-gray-200 dark:bg-gray-700 my-4" />;
                  }
                  
                  if (item.type === 'header') {
                    return (
                      <div key={item.id} className="text-sm font-semibold text-gray-500 dark:text-gray-400 px-3 py-2">
                        {item.name}
                      </div>
                    );
                  }

                  if (item.type === 'storage') {
                    return (
                      <div key={item.id} className="px-3 py-2">
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Used ({item.value}%)</div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-primary-light dark:bg-primary-dark h-2 rounded-full"
                            style={{ width: `${item.value}%` }}
                          />
                        </div>
                      </div>
                    );
                  }

                  const Icon = item.icon;
                  if (!Icon) return null;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleMenuItemClick(item.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors
                        ${item.indent ? 'ml-4' : ''}
                        ${activeMenuItem === item.id
                          ? 'text-primary-light dark:text-primary-dark bg-primary-light/10 dark:bg-primary-dark/10'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="bg-white dark:bg-gray-800 shadow-sm z-10 p-4">
            <div className="flex justify-end space-x-4">
              <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
            </div>
          </div>
          <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/agents" element={<Agents />} />
              <Route path="/agents/create" element={<CreateAgent />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}
