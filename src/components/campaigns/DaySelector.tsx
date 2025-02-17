import { useState } from 'react';
import { motion } from 'framer-motion';

const days = [
  { id: 'mon', label: 'Mon' },
  { id: 'tue', label: 'Tue' },
  { id: 'wed', label: 'Wed' },
  { id: 'thu', label: 'Thu' },
  { id: 'fri', label: 'Fri' },
  { id: 'sat', label: 'Sat' },
  { id: 'sun', label: 'Sun' },
];

export default function DaySelector() {
  const [selectedDays, setSelectedDays] = useState<string[]>(['mon', 'tue', 'wed', 'thu', 'fri']);

  const toggleDay = (dayId: string) => {
    setSelectedDays(prev =>
      prev.includes(dayId)
        ? prev.filter(id => id !== dayId)
        : [...prev, dayId]
    );
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Active Days
      </label>
      <div className="flex flex-wrap gap-2">
        {days.map((day) => {
          const isSelected = selectedDays.includes(day.id);
          return (
            <motion.button
              key={day.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleDay(day.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium
                transition-all duration-200 backdrop-blur-sm
                ${isSelected
                  ? 'bg-primary-light/90 dark:bg-primary-dark/90 text-white shadow-lg shadow-primary-light/20 dark:shadow-primary-dark/20'
                  : 'bg-gray-100/80 dark:bg-navy-700/80 text-gray-600 dark:text-gray-400 shadow-lg shadow-gray-200/20 dark:shadow-navy-900/30'
                }
                border ${isSelected
                  ? 'border-primary-light/50 dark:border-primary-dark/50'
                  : 'border-gray-200/50 dark:border-gray-700/50'
                }
                hover:shadow-xl ${isSelected
                  ? 'hover:shadow-primary-light/30 dark:hover:shadow-primary-dark/30'
                  : 'hover:shadow-gray-200/30 dark:hover:shadow-navy-900/40'
                }`}
            >
              {day.label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
