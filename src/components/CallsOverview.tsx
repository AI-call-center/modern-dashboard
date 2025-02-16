import { useState } from 'react';
import { format, subDays } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CalendarIcon } from '@heroicons/react/24/outline';

// Generate sample data for the last 7 days
const generateData = () => {
  return Array.from({ length: 8 }, (_, i) => {
    const date = subDays(new Date(), 7 - i);
    return {
      date: format(date, 'MM/dd/yyyy'),
      calls: Math.floor(Math.random() * 9) + 3, // Random number between 3 and 12
    };
  });
};

const data = generateData();

export default function CallsOverview() {
  const [dateRange, setDateRange] = useState('Last 7 days');

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Calls Overview</h2>
        <div className="flex items-center space-x-4">
          <button
            className="inline-flex items-center px-4 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <CalendarIcon className="w-5 h-5 mr-2" />
            <span>Select Date Range</span>
          </button>
          <button
            className="px-4 py-2 bg-primary-light dark:bg-primary-dark text-white rounded-lg text-sm hover:bg-opacity-90 transition-colors"
          >
            Download Report
          </button>
        </div>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
            <XAxis 
              dataKey="date" 
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              ticks={[0, 3, 6, 9, 12]}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937',
                border: 'none',
                borderRadius: '0.5rem',
                padding: '1rem'
              }}
              labelStyle={{ color: '#9CA3AF' }}
              itemStyle={{ color: '#60A5FA' }}
            />
            <Line 
              type="monotone" 
              dataKey="calls" 
              stroke="#60A5FA"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: '#60A5FA' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
