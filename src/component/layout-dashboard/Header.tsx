"use client";
import { useState, useRef, useEffect } from "react";
import {
  Bell,
  MessageCircle,
  Menu,
  X,
  Search,
  User,
  Settings,
  LogOut,
  HelpCircle,
  Sun,
  Moon,
  ShoppingBag,
  Package,
  Tag,
  DollarSign,
  Store,
  LayoutDashboard
} from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";
import ProfileDropdown from "./ProfileDropdown";
import NotificationsPanel from "./NotificationsPanel";
import { useTheme } from "../darkmode/ThemeProvider";
import ThemeToggle from "../darkmode/ThemeToggle";

interface HeaderProps {
  notificationCount: number;
  messageCount?: number;
  userName?: string;
  onSearch?: (query: string) => void;
  toggleSidebar?: () => void;
}

export default function Header({
  notificationCount,
  messageCount = 0,
  userName = "Jane Smith",
  onSearch,
  toggleSidebar
}: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const notificationsPanelRef = useRef<HTMLDivElement | null>(null);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);
  const messagesPanelRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [userImageLoaded, setUserImageLoaded] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Close panels when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        notificationsPanelRef.current &&
        !notificationsPanelRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
      
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
      
      if (
        messagesPanelRef.current &&
        !messagesPanelRef.current.contains(event.target as Node)
      ) {
        setShowMessages(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Focus search input when mobile search is opened
  useEffect(() => {
    if (showMobileSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showMobileSearch]);

  // Close menus when ESC key is pressed
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowMobileMenu(false);
        setShowNotifications(false);
        setShowProfileMenu(false);
        setShowMessages(false);
        setShowMobileSearch(false);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showMobileMenu]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery);
      setShowMobileSearch(false);
    }
  };
  
  // Constants for styling
  const colors = {
    darkGreen: '#20603D',
    mediumGreen: '#2E8B57', 
    lightBlue: '#87CEEB',
  };

  // Preload the user image
  useEffect(() => {
    const img = new Image();
    img.src = '/path/to/user-image.jpg';
    img.onload = () => setUserImageLoaded(true);
    img.onerror = () => setUserImageLoaded(true); // Still set to true on error to show placeholder
  }, []);

  // Default placeholder image as a fallback
  const placeholderImage = 'https://via.placeholder.com/48';

  return (
    <header 
      className="sticky top-0 z-50 shadow-md transition-colors duration-200"
      style={{ 
        backgroundColor: theme === 'dark' ? '#1A1E2A' : '#FFFFFF',
        borderBottom: `1px solid ${theme === 'dark' ? '#2D3748' : '#E2E8F0'}`
      }}
    >
      <div className="max-w-[2000px] mx-auto flex items-center justify-between h-16 px-2 sm:px-4">
        {/* Left section: Menu toggle, Logo and nav */}
        <div className="flex items-center">
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 mr-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            aria-label={showMobileMenu ? "Close menu" : "Open menu"}
            aria-expanded={showMobileMenu}
            style={{ color: colors.darkGreen }}
          >
            {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          {/* Logo - smaller on mobile */}
          <div className="flex items-center">
            <Logo />
          </div>
        </div>

        
        {/* Right section: Actions */}
        <div className="flex items-center space-x-1">
          {/* Theme toggle - hidden when mobile menu is open */}
          {!showMobileMenu && (
            <div className="lg:block">
              <ThemeToggle />
            </div>
          )}

          {/* Notifications */}
          <div className="relative">
            <button
              className="p-2 rounded-full relative transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowMessages(false);
                setShowProfileMenu(false);
              }}
              aria-label={`Notifications${
                notificationCount > 0 ? ` (${notificationCount} unread)` : ""
              }`}
              aria-expanded={showNotifications}
              aria-haspopup="true"
              style={{ color: colors.darkGreen }}
            >
              <Bell size={20} />
              {notificationCount > 0 && (
                <span
                  className="absolute top-0 right-0 w-4 h-4 rounded-full text-white text-xs flex items-center justify-center animate-pulse"
                  style={{ backgroundColor: colors.mediumGreen }}
                  aria-hidden="true"
                >
                  {notificationCount > 9 ? "9+" : notificationCount}
                </span>
              )}
            </button>
            {showNotifications && (
              <div
                className="absolute right-0 mt-2 z-50 w-72 sm:w-80 rounded-lg shadow-2xl"
                ref={notificationsPanelRef}
                role="menu"
                style={{ 
                  backgroundColor: theme === 'dark' ? '#1F2937' : 'white',
                  border: `1px solid ${theme === 'dark' ? '#374151' : '#E5E7EB'}`
                }}
              >
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <h3 className="font-semibold" style={{ color: colors.darkGreen }}>Notifications</h3>
                  <button 
                    className="text-sm hover:underline"
                    style={{ color: colors.mediumGreen }}
                  >
                    Mark all as read
                  </button>
                </div>
                <NotificationsPanel />
              </div>
            )}
          </div>

          {/* Messages - Hidden on smallest screens */}
          <div className="relative hidden sm:block">
            <button
              className="p-2 rounded-full relative transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => {
                setShowMessages(!showMessages);
                setShowNotifications(false);
                setShowProfileMenu(false);
              }}
              aria-label={`Messages${
                messageCount > 0 ? ` (${messageCount} unread)` : ""
              }`}
              style={{ color: colors.darkGreen }}
            >
              <MessageCircle size={20} />
              {messageCount > 0 && (
                <span
                  className="absolute top-0 right-0 w-4 h-4 rounded-full text-white text-xs flex items-center justify-center animate-pulse"
                  style={{ backgroundColor: colors.mediumGreen }}
                  aria-hidden="true"
                >
                  {messageCount > 9 ? "9+" : messageCount}
                </span>
              )}
            </button>
            {showMessages && (
              <div
                className="absolute right-0 mt-2 z-50 w-72 sm:w-80 rounded-lg shadow-2xl"
                ref={messagesPanelRef}
                role="menu"
                style={{ 
                  backgroundColor: theme === 'dark' ? '#1F2937' : 'white',
                  border: `1px solid ${theme === 'dark' ? '#374151' : '#E5E7EB'}`
                }}
              >
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <h3 className="font-semibold" style={{ color: colors.darkGreen }}>Messages</h3>
                  <Link href="/messages" className="text-sm hover:underline" style={{ color: colors.mediumGreen }}>
                    View all
                  </Link>
                </div>
                <div className="max-h-96 overflow-y-auto p-2">
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No new messages
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile dropdown */}
          <ProfileDropdown/>
        </div>  
      </div>

      {/* Mobile Search Overlay */}
      {showMobileSearch && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white dark:bg-gray-900 bg-opacity-95 dark:bg-opacity-95 flex items-start pt-16 px-4">
          <div className="w-full pt-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 transition-all"
                style={{ 
                  borderColor: theme === 'dark' ? '#4A5568' : '#E2E8F0',
                  color: theme === 'dark' ? '#E2E8F0' : '#4B5563'
                }}
                aria-label="Search"
              />
              <button
                type="button"
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
                style={{ color: colors.mediumGreen }}
                aria-label="Search"
              >
                <Search size={18} />
              </button>
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowMobileSearch(false)}
                style={{ color: colors.darkGreen }}
                aria-label="Close search"
              >
                <X size={18} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay - Made more compact */}
      {showMobileMenu && (
        <div className="lg:hidden fixed inset-0 z-50 pt-16" style={{ backgroundColor: theme === 'dark' ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.95)' }}>
          {/* Mobile menu close button - Fixed position for better accessibility */}
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 z-50"
            onClick={() => setShowMobileMenu(false)}
            aria-label="Close menu"
            style={{ color: colors.darkGreen }}
          >
            <X size={24} />
          </button>

          <div className="p-4 space-y-4 overflow-y-auto h-full pb-20">
            {/* User info at top for mobile */}
            <div className="flex items-center space-x-3 mb-4 p-2 rounded-lg" style={{ backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }}>
              <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                {userImageLoaded ? (
                  <img 
                    src="/path/to/user-image.jpg" 
                    alt="User" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = placeholderImage;
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-300 dark:bg-gray-700">
                    <User size={20} className="text-gray-500 dark:text-gray-400" />
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-medium text-sm">{userName}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{userName.toLowerCase().replace(' ', '.')}@globalgreen.com</p>
              </div>
            </div>

            {/* Mobile Search - More compact */}
            <form onSubmit={handleSearch} className="relative mb-2">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-gray-800 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all"
                style={{ 
                  borderColor: theme === 'dark' ? '#4A5568' : '#E2E8F0',
                  color: theme === 'dark' ? '#E2E8F0' : '#4B5563'
                }}
                aria-label="Search"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                style={{ color: colors.mediumGreen }}
                aria-label="Submit search"
              >
                <Search size={16} />
              </button>
            </form>

            {/* Mobile navigation - More compact with accordion style */}
            <nav className="space-y-1 text-sm">
              {/* Dashboard */}
              <Link 
                href="/seller-dashboard" 
                className="flex items-center px-3 py-2 rounded-md font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                style={{ color: colors.darkGreen }}
                onClick={() => setShowMobileMenu(false)}
              >
                <LayoutDashboard size={16} className="mr-2" />
                Dashboard
              </Link>

              {/* Orders */}
              <div className="space-y-1">
                <div className="flex items-center justify-between px-3 py-2 rounded-md font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                  style={{ color: colors.darkGreen }}>
                  <div className="flex items-center">
                    <Package size={16} className="mr-2" />
                    Orders
                  </div>
                </div>
                <div className="pl-6 space-y-1">
                  <Link 
                    href="/seller-dashboard/my-order" 
                    className="flex items-center px-3 py-1 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                    style={{ color: colors.darkGreen }}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    My Orders
                  </Link>
                  <Link 
                    href="/seller-dashboard/refund-cancellation" 
                    className="flex items-center px-3 py-1 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                    style={{ color: colors.darkGreen }}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Refund/Cancellation
                  </Link>
                  <Link 
                    href="/seller-dashboard/shipping-settings" 
                    className="flex items-center px-3 py-1 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                    style={{ color: colors.darkGreen }}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Shipping Settings
                  </Link>
                </div>
              </div>

              {/* Products */}
              <div className="space-y-1">
                <div className="flex items-center justify-between px-3 py-2 rounded-md font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                  style={{ color: colors.darkGreen }}>
                  <div className="flex items-center">
                    <ShoppingBag size={16} className="mr-2" />
                    Products
                  </div>
                </div>
                <div className="pl-6 space-y-1">
                  <Link 
                    href="/seller-dashboard/my-products" 
                    className="flex items-center px-3 py-1 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                    style={{ color: colors.darkGreen }}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    My Products
                  </Link>
                  <Link 
                    href="/seller-dashboard/add-product" 
                    className="flex items-center px-3 py-1 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                    style={{ color: colors.darkGreen }}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Add New Product
                  </Link>
                </div>
              </div>

              {/* Vouchers */}
              <div className="space-y-1">
                <div className="flex items-center justify-between px-3 py-2 rounded-md font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                  style={{ color: colors.darkGreen }}>
                  <div className="flex items-center">
                    <Tag size={16} className="mr-2" />
                    Vouchers
                  </div>
                </div>
                <div className="pl-6 space-y-1">
                  <Link 
                    href="/seller-dashboard/my-vouchers" 
                    className="flex items-center px-3 py-1 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                    style={{ color: colors.darkGreen }}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    My Vouchers
                  </Link>
                  <Link 
                    href="/seller-dashboard/add-voucher" 
                    className="flex items-center px-3 py-1 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                    style={{ color: colors.darkGreen }}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Add New Voucher
                  </Link>
                </div>
              </div>

              {/* Finance */}
              <Link 
                href="/seller-dashboard/my-income" 
                className="flex items-center px-3 py-2 rounded-md font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                style={{ color: colors.darkGreen }}
                onClick={() => setShowMobileMenu(false)}
              >
                <DollarSign size={16} className="mr-2" />
                Finance
              </Link>

              {/* Store */}
              <Link 
                href="/seller-dashboard/store-settings" 
                className="flex items-center px-3 py-2 rounded-md font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                style={{ color: colors.darkGreen }}
                onClick={() => setShowMobileMenu(false)}
              >
                <Store size={16} className="mr-2" />
                Store Settings
              </Link>
            </nav>

            {/* Theme toggle in mobile menu */}
            <div className="py-2 border-t border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <span style={{ color: colors.darkGreen }}>Theme</span>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full transition-colors"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? (
                  <Sun size={20} className="text-yellow-400" />
                ) : (
                  <Moon size={20} style={{ color: colors.darkGreen }} />
                )}
              </button>
            </div>

            {/* User actions */}
            <div className="space-y-1 pt-2">
              <Link 
                href="/seller-dashboard/profile" 
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                style={{ color: colors.darkGreen }}
                onClick={() => setShowMobileMenu(false)}
              >
                <User size={16} className="mr-2" />
                My Profile
              </Link>
              <Link 
                href="/seller-dashboard/settings" 
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                style={{ color: colors.darkGreen }}
                onClick={() => setShowMobileMenu(false)}
              >
                <Settings size={16} className="mr-2" />
                Settings
              </Link>
              <Link 
                href="/help" 
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                style={{ color: colors.darkGreen }}
                onClick={() => setShowMobileMenu(false)}
              >
                <HelpCircle size={16} className="mr-2" />
                Help Center
              </Link>
              <button 
                className="flex items-center w-full text-left px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 text-red-600 dark:text-red-400"
              >
                <LogOut size={16} className="mr-2" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}