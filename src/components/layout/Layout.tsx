import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import ThemeToggle from './ThemeToggle';

export default function Layout() {
  const [isDark, setIsDark] = useState(() => {
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
      return true;
    }
    return false;
  });

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

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header with theme toggle */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex justify-end">
            <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
          </div>
        </div>
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
