import { useState, useRef, useEffect } from 'react';
import { User, ChevronDown, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/redux/hooks/useAuth';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@/redux/store';
import { logout } from '@/redux/features/auth/authSlice';
import { colors } from '@/types';

export default function ProfileDropdown() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  // Use useEffect for client-side theme detection to avoid hydration mismatch
  const [theme, setTheme] = useState('light'); // Default to light for both server and client
  
  useEffect(() => {
    // Only run in browser after hydration is complete
    const darkModePreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(darkModePreference ? 'dark' : 'light');
  }, []);
  
  // Use useEffect to ensure user state is only accessed after hydration
  const [displayName, setDisplayName] = useState('Guest'); // Default to Guest for both server and client
  const [userEmail, setUserEmail] = useState('');
  const [userImageUrl, setUserImageUrl] = useState('');
  
  useEffect(() => {
    if (user) {
      const name = (user.first_name && user.last_name) ? 
        `${user.first_name} ${user.last_name}` : 
        (user.name || 'Guest');
        
      setDisplayName(name);
      setUserEmail(user.email || '');
      setUserImageUrl(user.image_url || '');
    }
  }, [user]);
  
  // Create refs for both the dropdown menu and the toggle button with proper typing
  const profileMenuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  
  // Handle clicks to close the dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      const target = event.target as Node;
      
      // If clicking the button, let the button's onClick handle the toggle
      if (buttonRef.current && buttonRef.current.contains(target)) {
        return;
      }
      
      // If clicking outside the menu, close it
      if (profileMenuRef.current && !profileMenuRef.current.contains(target)) {
        setShowProfileMenu(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle sign out
  const handleSignOut = () => {
    // Dispatch logout action directly
    dispatch(logout());
    setShowProfileMenu(false);
    router.push('/seller-homepage');
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-green-500 transition-colors"
        onClick={() => setShowProfileMenu(!showProfileMenu)}
        aria-expanded={showProfileMenu}
        aria-haspopup="true"
      >
        <div
          className="w-9 h-9 rounded-full bg-gray-200 dark:bg-[var(--color-primary)]] flex items-center justify-center overflow-hidden"
          style={{ border: `2px solid ${colors.primary}` }}
        >
          {userImageUrl ? (
            <img 
              src={userImageUrl} 
              alt={displayName} 
              className="w-full h-full object-cover"
            />
          ) : (
            <User
              size={20}
              className="text-gray-600 dark:text-gray-300"
            />
          )}
        </div>
        
        {/* Username display */}
        <span className="text-sm font-medium hidden md:block">
          {displayName}
        </span>
        
        <ChevronDown
          size={16}
          className={`transform transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''}`}
          style={{ color: colors.darkGreen }}
        />
      </button>
      
      <div 
        className={`absolute right-0 mt-2 z-50 w-56 rounded-lg shadow-2xl origin-top-right transition-all duration-200 ease-in-out ${
          showProfileMenu 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
        }`}
        ref={profileMenuRef}
        role="menu"
        style={{
          backgroundColor: theme === 'dark' ? '#20603D' : 'white',
          border: `1px solid ${theme === 'dark' ? '#2E8B57' : '#E5E7EB'}`
        }}
      >
        <div className="px-4 py-3 border-b border-gray-200 dark:border-[var(--color-darkGreen)]">
          <p className="text-sm font-medium text-green-50">
            Welcome, <span className="font-semibold">{displayName}</span>
          </p>
          <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
            {userEmail}
          </p>
        </div>
        
        <div className="py-1">
          <Link
            href="/seller-dashboard/profile"
            className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-green-700 transition-colors"
            style={{ color: theme === 'dark' ? '#E2E8F0' : '#2E8B57' }}
          >
            <User size={16} className="mr-2" />
            My Profile
          </Link>
          <Link
            href="/seller-dashboard/store-settings"
            className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-green-700 transition-colors"
            style={{ color: theme === 'dark' ? '#E2E8F0' : '#2E8B57' }}
          >
            <Settings size={16} className="mr-2" />
            Settings
          </Link>
        </div>
        
        <div className="py-1 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleSignOut}
            className="flex items-center w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-100 dark:hover:bg-green-700 transition-colors"
          >
            <LogOut size={16} className="mr-2" />
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}