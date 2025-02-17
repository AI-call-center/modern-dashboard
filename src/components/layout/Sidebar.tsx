import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HomeIcon,
  PhoneIcon,
  UserGroupIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  BoltIcon,
  DocumentIcon,
  Square3Stack3DIcon,
  BuildingOfficeIcon,
  ArrowTrendingUpIcon,
  CurrencyDollarIcon,
  PhoneArrowUpRightIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { id: 'home', name: 'Dashboard', href: '/', icon: HomeIcon },
  { id: 'automation', name: 'Automation', href: '/automation', icon: BoltIcon },
  { id: 'templates', name: 'Templates', href: '/templates', icon: DocumentIcon },
  { id: 'agents', name: 'Agents', href: '/agents', icon: UserGroupIcon },
  { id: 'campaigns', name: 'Campaigns', href: '/campaigns', icon: Square3Stack3DIcon },
  { id: 'actions', name: 'Actions', href: '/actions', icon: BuildingOfficeIcon },
  { id: 'calls', name: 'Calls', href: '/calls', icon: PhoneIcon },
  { id: 'leads', name: 'Leads', href: '/leads', icon: ArrowTrendingUpIcon },
  { id: 'divider1', type: 'divider' },
  { id: 'phone-numbers', name: 'Phone Numbers', type: 'header' },
  { id: 'buy-number', name: 'Buy Number', href: '/buy-number', icon: CurrencyDollarIcon, indent: true },
  { id: 'manage-numbers', name: 'Manage', href: '/manage-numbers', icon: PhoneArrowUpRightIcon, indent: true },
  { id: 'divider2', type: 'divider' },
  { id: 'analytics', name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
  { id: 'settings', name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex h-full w-64 flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
      {/* Logo */}
      <div className="flex h-16 items-center px-4">
        <img
          className="h-8 w-auto"
          src="/logo.svg"
          alt="AI Call Center"
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
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

          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.id}
              to={item.href}
              className={`relative group flex items-center px-2 py-2 text-sm font-medium rounded-lg
                ${item.indent ? 'ml-4' : ''}
                ${isActive
                  ? 'text-primary-light dark:text-primary-dark bg-primary-light/10 dark:bg-primary-dark/10'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
            >
              <item.icon
                className={`mr-3 h-6 w-6 flex-shrink-0 ${
                  isActive
                    ? 'text-primary-light dark:text-primary-dark'
                    : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400'
                }`}
              />
              {item.name}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute inset-y-0 left-0 w-1 bg-primary-light dark:bg-primary-dark rounded-r-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Storage Usage */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Storage Used (78%)</div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '78%' }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="bg-primary-light dark:bg-primary-dark h-2 rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
