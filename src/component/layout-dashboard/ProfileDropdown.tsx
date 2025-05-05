import { useState, useRef, useEffect } from 'react';
import { User, ChevronDown, Settings, HelpCircle, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/redux/hooks/useAuth';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@/redux/store';
import { logout } from '@/redux/features/auth/authSlice';
import { colors } from '@/types';

export default function ProfileDropdown() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [theme, setTheme] = useState('light');
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const userName = user ? 
    (user.first_name && user.last_name) ? 
      `${user.first_name} ${user.last_name}` : 
      (user.name || 'Guest') : 
    'Guest';
  const userEmail = user?.email || '';
  const userImageUrl = user?.imageUrl || '';
  
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
    router.push('/login');
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        onClick={() => setShowProfileMenu(!showProfileMenu)}
        aria-expanded={showProfileMenu}
        aria-haspopup="true"
      >
        <div
          className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden"
          style={{ border: `2px solid ${colors.primary}` }}
        >
          {userImageUrl ? (
            <img 
              src={userImageUrl} 
              alt={userName} 
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
          {userName}
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
          backgroundColor: theme === 'dark' ? '#1F2937' : 'white',
          border: `1px solid ${theme === 'dark' ? '#374151' : '#E5E7EB'}`
        }}
      >
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium">
            Welcome, <span className="font-semibold">{userName}</span>
          </p>
          <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
            {userEmail}
          </p>
        </div>
        
        <div className="py-1">
          <Link
            href="/seller-dashboard/profile"
            className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-[var(--color-darkGreen)] transition-colors"
            style={{ color: theme === 'dark' ? '#E2E8F0' : '#4B5563' }}
          >
            <User size={16} className="mr-2" />
            My Profile
          </Link>
          <Link
            href="/seller-dashboard/settings"
            className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-[var(--color-darkGreen)] transition-colors"
            style={{ color: theme === 'dark' ? '#E2E8F0' : '#4B5563' }}
          >
            <Settings size={16} className="mr-2" />
            Settings
          </Link>
          <Link
            href="/help"
            className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-[var(--color-darkGreen)] transition-colors"
            style={{ color: theme === 'dark' ? '#E2E8F0' : '#4B5563' }}
          >
            <HelpCircle size={16} className="mr-2" />
            Help Center
          </Link>
        </div>
        
        <div className="py-1 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleSignOut}
            className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-[var(--color-darkGreen)] transition-colors"
          >
            <LogOut size={16} className="mr-2" />
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}