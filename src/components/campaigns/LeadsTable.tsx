import { useState } from 'react';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface Lead {
  id: string;
  phone: string;
  name: string;
  email: string;
  createdAt: string;
  status: 'pending' | 'completed' | 'failed';
  lastCallTime: string;
}

const mockLeads: Lead[] = [
  {
    id: '1',
    phone: '+1 (234) 567-890',
    name: 'John Smith',
    email: 'john.smith@example.com',
    createdAt: '2025-02-15',
    status: 'completed',
    lastCallTime: '10:30 AM',
  },
  {
    id: '2',
    phone: '+1 (345) 678-901',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    createdAt: '2025-02-16',
    status: 'pending',
    lastCallTime: 'N/A',
  },
  {
    id: '3',
    phone: '+1 (456) 789-012',
    name: 'Mike Johnson',
    email: 'mike.j@example.com',
    createdAt: '2025-02-16',
    status: 'failed',
    lastCallTime: '2:15 PM',
  },
];

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  completed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  failed: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
};

export default function LeadsTable() {
  const [searchQuery, setSearchQuery] = useState('');
  const [leads] = useState<Lead[]>(mockLeads);

  const filteredLeads = leads.filter(lead =>
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.phone.includes(searchQuery)
  );

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search leads..."
          className="w-full pl-10 pr-4 py-2 rounded-lg
            bg-white/80 dark:bg-navy-700/80
            text-gray-900 dark:text-white
            border border-gray-200/50 dark:border-gray-700/50
            focus:ring-2 focus:ring-primary-light/50 dark:focus:ring-primary-dark/50
            focus:border-transparent backdrop-blur-sm"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/90 dark:bg-navy-800/90 backdrop-blur-md rounded-xl
        shadow-lg shadow-gray-200/20 dark:shadow-navy-900/30
        border border-gray-200/50 dark:border-gray-700/50
        overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200/50 dark:divide-gray-700/50">
            <thead className="bg-gray-50/50 dark:bg-gray-900/30">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Phone Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Lead Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Created Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Last Call Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/50 bg-transparent">
              {filteredLeads.map((lead) => (
                <motion.tr
                  key={lead.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="group cursor-pointer transition-all duration-200
                    hover:bg-white/50 dark:hover:bg-gray-800/30
                    hover:backdrop-blur-lg"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {lead.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {lead.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {lead.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {lead.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium backdrop-blur-sm
                      ${statusColors[lead.status]}`}>
                      {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {lead.lastCallTime}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
