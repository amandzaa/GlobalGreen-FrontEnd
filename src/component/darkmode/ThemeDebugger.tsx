'use client';
import { useTheme } from './ThemeProvider';
import { useEffect, useState } from 'react';

export default function ThemeDebugger() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [htmlClasses, setHtmlClasses] = useState('');
  const [localStorageTheme, setLocalStorageTheme] = useState('');

  useEffect(() => {
    setMounted(true);
    setHtmlClasses(document.documentElement.className);
    
    setLocalStorageTheme(localStorage.getItem('theme') || 'not set');
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setHtmlClasses(document.documentElement.className);
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  // Update when theme changes
  useEffect(() => {
    if (mounted) {
      setHtmlClasses(document.documentElement.className);
      setLocalStorageTheme(localStorage.getItem('theme') || 'not set');
    }
  }, [theme, mounted]);
  
  if (!mounted) return null;
  
  return (
    <div className="fixed bottom-4 right-4 z-50 p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg text-left max-w-xs">
      <h3 className="font-bold text-gray-900 dark:text-white mb-2">Theme Debug Info</h3>
      <ul className="space-y-1 text-sm">
        <li>
          <span className="font-medium">Current theme: </span>
          <span className="font-mono">{theme}</span>
        </li>
        <li>
          <span className="font-medium">HTML classes: </span>
          <span className="font-mono">{htmlClasses || 'none'}</span>
        </li>
        <li>
          <span className="font-medium">localStorage theme: </span>
          <span className="font-mono">{localStorageTheme}</span>
        </li>
        <li>
          <span className="font-medium">Dark mode active: </span>
          <span className="font-mono">{document.documentElement.classList.contains('dark') ? 'Yes' : 'No'}</span>
        </li>
      </ul>
    </div>
  );
}