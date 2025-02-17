import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface ThemeToggleProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export default function ThemeToggle({ isDark, toggleTheme }: ThemeToggleProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 
        hover:bg-gray-200 dark:hover:bg-gray-600
        transition-colors duration-200"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <SunIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
      ) : (
        <MoonIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
      )}
    </motion.button>
  );
}
