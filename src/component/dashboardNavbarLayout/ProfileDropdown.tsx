// components/ProfileDropdown.tsx
'use client'; // Add this for Next.js 13+ client components

import { useState, useRef, useEffect } from 'react';
import { Store, Settings, Globe, LogOut } from 'lucide-react';
import Link from 'next/link';

interface ProfileDropdownProps {
  userName?: string;
  isMobile?: boolean;
}

export default function ProfileDropdown({ userName = 'althea_craft', isMobile = false }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // If in mobile menu, adjust the layout
  if (isMobile) {
    return (
      <div className="space-y-2">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-[#87CEEB] flex items-center justify-center">
            <img 
              src="/assets/mirrored_cat_image.png" 
              alt="Profile" 
              className="w-full h-full rounded-full"
            />
          </div>
          <div>
            <h3 className="text-lg font-medium text-[#20603D] dark:text-[#E6F4EA]">{userName}</h3>
            <Link href="/profile" className="text-[#3B75B4] dark:text-[#87CEEB] text-sm">
              View Profile
            </Link>
          </div>
        </div>

        {/* Menu items for mobile */}
        <div className="space-y-1">
          <Link href="/store-profile" className="flex items-center px-3 py-3 hover:bg-[#E6F4EA] dark:hover:bg-[#20603D] rounded-lg transition-colors">
            <Store className="w-5 h-5 text-[#2E8B57] dark:text-[#87CEEB] mr-3" />
            <span className="text-[#20603D] dark:text-[#E6F4EA]">Store Profile</span>
          </Link>
          <Link href="/store-settings" className="flex items-center px-3 py-3 hover:bg-[#E6F4EA] dark:hover:bg-[#20603D] rounded-lg transition-colors">
            <Settings className="w-5 h-5 text-[#2E8B57] dark:text-[#87CEEB] mr-3" />
            <span className="text-[#20603D] dark:text-[#E6F4EA]">Store Settings</span>
          </Link>
          <Link href="/language" className="flex items-center px-3 py-3 hover:bg-[#E6F4EA] dark:hover:bg-[#20603D] rounded-lg transition-colors justify-between">
            <div className="flex items-center">
              <Globe className="w-5 h-5 text-[#2E8B57] dark:text-[#87CEEB] mr-3" />
              <span className="text-[#20603D] dark:text-[#E6F4EA]">English (Indonesian)</span>
            </div>
            <svg 
              className="w-4 h-4 text-[#2E8B57] dark:text-[#87CEEB]" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <Link href="/logout" className="flex items-center px-3 py-3 hover:bg-[#E6F4EA] dark:hover:bg-[#20603D] rounded-lg transition-colors">
            <LogOut className="w-5 h-5 text-[#2E8B57] dark:text-[#87CEEB] mr-3" />
            <span className="text-[#20603D] dark:text-[#E6F4EA]">Logout</span>
          </Link>
        </div>
      </div>
    );
  }

  // Desktop dropdown
  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile trigger button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#3B75B4] rounded-md p-1"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="w-8 h-8 rounded-full bg-[#87CEEB] flex items-center justify-center">
          <img 
            src="/assets/mirrored_cat_image.png" 
            alt="Profile" 
            className="w-full h-full rounded-full"
          />
        </div>
        <span className="text-[#20603D] dark:text-[#E6F4EA] text-sm">{userName}</span>
        <svg 
          className={`w-4 h-4 text-[#2E8B57] dark:text-[#87CEEB] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown menu with animation */}
      <div 
        className={`absolute right-0 mt-2 w-64 bg-[#E6F4EA] dark:bg-[#20603D] rounded-lg shadow-lg border border-[#2E8B57] dark:border-[#87CEEB] z-50 transform transition-all duration-300 origin-top-right ${
          isOpen 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-95 pointer-events-none'
        }`}
        role="menu"
      >
        {/* Profile header */}
        <div className="p-4 border-b border-[#2E8B57] dark:border-[#87CEEB] flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-[#87CEEB] mb-2 flex items-center justify-center">
            <img 
              src="/assets/mirrored_cat_image.png" 
              alt="Profile" 
              className="w-full h-full rounded-full"
            />
          </div>
          <h3 className="text-lg font-medium text-[#20603D] dark:text-[#E6F4EA]">{userName}</h3>
        </div>

        {/* Menu items */}
        <div className="py-1">
          <Link 
            href="/store-profile" 
            className="flex items-center px-4 py-3 hover:bg-[#2E8B57]/10 dark:hover:bg-[#2E8B57]/20 transition-colors"
            role="menuitem"
          >
            <Store className="w-5 h-5 text-[#2E8B57] dark:text-[#87CEEB] mr-3" />
            <span className="text-[#20603D] dark:text-[#E6F4EA]">Store Profile</span>
          </Link>
          <Link 
            href="/store-settings" 
            className="flex items-center px-4 py-3 hover:bg-[#2E8B57]/10 dark:hover:bg-[#2E8B57]/20 transition-colors"
            role="menuitem"
          >
            <Settings className="w-5 h-5 text-[#2E8B57] dark:text-[#87CEEB] mr-3" />
            <span className="text-[#20603D] dark:text-[#E6F4EA]">Store Settings</span>
          </Link>
          <Link 
            href="/language" 
            className="flex items-center px-4 py-3 hover:bg-[#2E8B57]/10 dark:hover:bg-[#2E8B57]/20 justify-between transition-colors"
            role="menuitem"
          >
            <div className="flex items-center">
              <Globe className="w-5 h-5 text-[#2E8B57] dark:text-[#87CEEB] mr-3" />
              <span className="text-[#20603D] dark:text-[#E6F4EA]">English (Indonesian)</span>
            </div>
            <svg 
              className="w-4 h-4 text-[#2E8B57] dark:text-[#87CEEB]" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <Link 
            href="/logout" 
            className="flex items-center px-4 py-3 hover:bg-[#2E8B57]/10 dark:hover:bg-[#2E8B57]/20 transition-colors"
            role="menuitem"
          >
            <LogOut className="w-5 h-5 text-[#2E8B57] dark:text-[#87CEEB] mr-3" />
            <span className="text-[#20603D] dark:text-[#E6F4EA]">Logout</span>
          </Link>
        </div>
      </div>
    </div>
  );
}