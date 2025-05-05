'use client';
import { useTheme } from './ThemeProvider';
import { useEffect, useState } from 'react';
import { SunIcon, MoonIcon, Sun, Moon } from 'lucide-react'; 
import { colors } from '@/types';

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
      onClick={toggleTheme}
      className="p-2 rounded-full transition-colors flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <SunIcon size={20} className="text-yellow-400" />
      ) : (
        <MoonIcon size={20} style={{ color: colors.darkGreen }} />
      )}
    </button>
  );
}