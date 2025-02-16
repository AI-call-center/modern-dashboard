import { motion } from 'framer-motion';
import { PhoneIcon, ClockIcon, UserGroupIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import CallsOverview from '../components/CallsOverview';

const MetricCard = ({ icon: Icon, title, value, trend, trendValue }: {
  icon: any;
  title: string;
  value: string;
  trend: 'up' | 'down';
  trendValue: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
  >
    <div className="flex items-center justify-between">
      <div className="p-3 bg-primary-light/10 dark:bg-primary-dark/10 rounded-lg">
        <Icon className="w-6 h-6 text-primary-light dark:text-primary-dark" />
      </div>
      <span className={`text-sm font-medium ${
        trend === 'up' ? 'text-green-500' : 'text-red-500'
      }`}>
        {trend === 'up' ? '↑' : '↓'} {trendValue}
      </span>
    </div>
    <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
      {value}
    </h3>
    <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
  </motion.div>
);

export default function Dashboard() {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <MetricCard
          icon={PhoneIcon}
          title="Calls Handled Today"
          value="2,405"
          trend="up"
          trendValue="12%"
        />
        <MetricCard
          icon={ClockIcon}
          title="Avg. Response Time"
          value="1.2s"
          trend="down"
          trendValue="8%"
        />
        <MetricCard
          icon={UserGroupIcon}
          title="Active Users"
          value="12,345"
          trend="up"
          trendValue="24%"
        />
        <MetricCard
          icon={ChartBarIcon}
          title="Success Rate"
          value="98.5%"
          trend="up"
          trendValue="2%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Call Volume Overview
          </h2>
          <CallsOverview />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Activity
            </h2>
            <button className="text-sm text-primary-light dark:text-primary-dark hover:underline">
              View All
            </button>
          </div>

          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 dark:text-gray-400">
                <th className="pb-3">Time</th>
                <th className="pb-3">Action</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-t border-gray-100 dark:border-gray-700">
                <td className="py-3">10:24 AM</td>
                <td className="py-3">Call with John Doe</td>
                <td className="py-3">
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-xs">
                    Completed
                  </span>
                </td>
              </tr>
              <tr className="border-t border-gray-100 dark:border-gray-700">
                <td className="py-3">09:45 AM</td>
                <td className="py-3">Support Request #1234</td>
                <td className="py-3">
                  <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded-full text-xs">
                    In Progress
                  </span>
                </td>
              </tr>
              <tr className="border-t border-gray-100 dark:border-gray-700">
                <td className="py-3">09:12 AM</td>
                <td className="py-3">System Update</td>
                <td className="py-3">
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs">
                    Scheduled
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
}
