
import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
             (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus-ring transition-all duration-200 ease-in-out transform hover:scale-105 min-h-[44px] min-w-[44px] flex items-center justify-center"
      aria-label="Toggle dark mode"
    >
      <div className="relative">
        <Sun className={`h-5 w-5 transition-all duration-300 ${isDarkMode ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`} />
        <Moon className={`h-5 w-5 absolute inset-0 transition-all duration-300 ${isDarkMode ? 'rotate-0 scale-100' : '-rotate-90 scale-0'}`} />
      </div>
    </button>
  );
};

export default ThemeToggle;
