'use client';
import { useTheme } from './ThemeProvider';
import { useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from 'lucide-react'; // Assuming you're using lucide-react

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only run once on mount
  useEffect(() => {
    setMounted(true);
    console.log('ThemeToggle mounted, current theme:', theme);
  }, []);

  // Handle the toggle click
  const handleToggle = () => {
    console.log('ThemeToggle button clicked, current theme before toggle:', theme);
    toggleTheme();
  };
  
  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return <div className="w-10 h-10"></div>; // Empty placeholder with same dimensions
  }
  
  return (
    <button
      onClick={handleToggle}
      className="w-10 h-10 p-2 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center transition-colors"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <MoonIcon className="h-5 w-5 text-gray-800" />
      ) : (
        <SunIcon className="h-5 w-5 text-yellow-300" />
      )}
    </button>
  );
}