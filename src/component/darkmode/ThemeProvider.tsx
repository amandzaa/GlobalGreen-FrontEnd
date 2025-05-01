'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize state but don't apply it yet until we've checked if we're mounted
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  // First effect: Only runs once on mount to set up the initial theme state
  // without making any DOM changes yet
  useEffect(() => {
    // Get theme from localStorage or system preference
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    
    let initialTheme: Theme;
    if (storedTheme === 'dark' || storedTheme === 'light') {
      initialTheme = storedTheme;
    } else {
      // If no stored preference, use system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      initialTheme = prefersDark ? 'dark' : 'light';
    }
    
    // Update the state with the detected theme
    setTheme(initialTheme);
    
    // Mark as mounted so we can start making DOM changes
    setMounted(true);
  }, []);

  // Second effect: Applies theme changes to the DOM, but only after mounted
  useEffect(() => {
    if (!mounted) return;
    
    console.log('Theme changed to:', theme);
    localStorage.setItem('theme', theme);
    
    if (theme === 'dark') {
      console.log('Adding dark class to HTML element');
      document.documentElement.classList.add('dark');
    } else {
      console.log('Removing dark class from HTML element');
      document.documentElement.classList.remove('dark');
    }
    
    // Log the current state to verify
    console.log('Current HTML classes:', document.documentElement.className);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      console.log('Toggle theme from', prevTheme, 'to', newTheme);
      return newTheme;
    });
  };

  // Provide the context value, even when not mounted yet
  const contextValue = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}