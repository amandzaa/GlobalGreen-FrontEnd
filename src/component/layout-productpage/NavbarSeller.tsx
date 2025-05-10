import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from "next/image";
import { Search, ShoppingCart, ChevronDown, Menu, X, Bell } from 'lucide-react';
import ProfileDropdown from '../layout-dashboard/ProfileDropdown';
import { useAuth } from '@/redux/hooks/useAuth';
import AuthModals from "@/component/modal/AuthModal";
import { useDispatch } from 'react-redux';
import { setFilters } from '@/redux/features/product/productSlice';
import { useRouter } from 'next/router';
import NotificationsPanel from '../layout-dashboard/NotificationsPanel';
import { colors } from '@/types';
import { useTheme } from '../darkmode/ThemeProvider';
import { logout } from '@/redux/features/auth/authSlice';

interface NavbarGlobalGreenProps {
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
}

const NavbarGlobalGreen: React.FC<NavbarGlobalGreenProps> = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All products");
  const { user } = useAuth();
  const dispatch = useDispatch();
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationCount = 5;
  const notificationsPanelRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();
  
  const isLoggedIn = !!user;

  // Categories for dropdown
  const categories = [
    "All products",
    "Fruits",
    "Vegetables",
    "Exotic",
    "Organic"
  ];
  
  // Fix hydration mismatch with isMounted pattern
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Note: browserInfo is removed as it's not used anywhere

  // Close search results when clicking outside - only run on client side
  useEffect(() => {
    if (!isMounted) return;
    
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMounted]);

  // Close notifications panel when clicking outside - only run on client side
  useEffect(() => {
    if (!isMounted) return;
    
    function handleClickOutside(event: MouseEvent): void {
      if (
        notificationsPanelRef.current &&
        !notificationsPanelRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMounted]);

  // Handle search form submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Map UI categories to appropriate filter values
    const categoryMapping: Record<string, string[]> = {
      "All products": [],
      "Fruits": ["fruits"],
      "Vegetables": ["vegetables"],
      "Exotic": ["exotic"],
      "Organic": ["organic"]
    };
    
    // Get the category filter value
    const categoryFilters = categoryMapping[selectedCategory] || [];
    
    // Set filters and navigate to products page
    dispatch(setFilters({
      search: searchQuery,
      categories: categoryFilters
    }));
    
    router.push('/consumer-productpage');
    setIsSearchFocused(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Modal handlers
  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsRegisterModalOpen(false);
    setIsMenuOpen(false);
  };

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
    setIsLoginModalOpen(false);
    setIsMenuOpen(false);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  // Handle escape key for notifications - only run on client side
  useEffect(() => {
    if (!isMounted) return;
    
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowNotifications(false);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isMounted]);

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    toggleMenu();
  };

  return (
    <div className="flex flex-col w-full fixed top-0 left-0 right-0 z-50 shadow-md">
      {/* Main navigation bar */}
      <div className="bg-[var(--color-primary)] text-white">
        {/* Top row with logo, auth buttons, cart */}
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo - always visible */}
          <Link href="/" className="flex items-center">
            <div className="w-8 h-8 relative mr-2">
              <Image 
                src="/assets/GlobalGreen-icon.png" 
                alt="GlobalGreen Logo" 
                width={42} 
                height={42} 
                className="object-contain"
              />
            </div>
            <span className="font-bold text-2xl">GlobalGreen</span>
          </Link>

          {/* Search bar - desktop view */}
          <div className="hidden md:flex flex-1 mx-8 relative" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="flex w-full">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search eco-friendly products"
                  className="w-full h-10 px-4 text-black rounded-l bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-paleGreen)]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                />
                {isSearchFocused && searchQuery.length > 0 && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded shadow-lg z-50 max-h-64 overflow-y-auto text-black">
                    <div className="p-2 text-sm text-gray-600">
                      Press enter to search for &quot;{searchQuery}&quot;
                    </div>
                  </div>
                )}
              </div>
              <div className="relative h-10">
                <select 
                  className="h-full bg-gray-100 text-gray-700 px-2 border-l border-gray-300 focus:outline-none appearance-none pr-8"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
              <button 
                type="submit"
                className="bg-[var(--color-darkGreen)] hover:bg-[var(--color-darkGreen)]/80 text-white px-4 rounded-r flex items-center justify-center transition-colors duration-200"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
            </form>
          </div>

          {/* Auth buttons, cart, and mobile menu */}
          <div className="flex items-center space-x-3">
            {isLoggedIn ? (
              // Show user-related icons when logged in
              <div className="flex items-center space-x-3">
                {/* Notifications */}
                <div className="relative">
                  <button
                    className="p-2 rounded-full relative transition-colors hover:bg-gray-100 dark:hover:bg-green-500"
                    onClick={() => {
                      setShowNotifications(!showNotifications);
                    }}
                    aria-label={`Notifications${
                      notificationCount > 0 ? ` (${notificationCount} unread)` : ""
                    }`}
                    aria-expanded={showNotifications}
                    aria-haspopup="true"
                    style={{ color: colors.black }}
                  >
                    <Bell size={23} />
                    {notificationCount > 0 && (
                      <span
                        className="absolute top-0 right-0 w-4 h-4 rounded-full text-white text-xs flex items-center justify-center animate-pulse"
                        style={{ backgroundColor: colors.red }}
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
                        backgroundColor: theme === 'dark' ? '#20603D' : 'white',
                        border: `1px solid ${theme === 'dark' ? '#20603D' : '#E5E7EB'}`
                      }}
                    >
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <h3 className="font-semibold" style={{ color: colors.darkGreen }}>Notifications</h3>
                        <button 
                          className="text-sm hover:underline"
                          style={{ color: colors.primary }}
                        >
                          Mark all as read
                        </button>
                      </div>
                      <NotificationsPanel />
                    </div>
                  )}
                </div>
                <ProfileDropdown />
              </div>
            ) : (
              // Show Auth buttons when not logged in
              <div className="hidden md:flex items-center space-x-3">
                <button 
                  className="hover:text-gray-200 px-4 py-2 border border-white rounded text-white transition-colors duration-200"
                  onClick={openRegisterModal}
                >
                  Start Selling
                </button>
                <button 
                  className="hover:bg-[var(--color-paleGreen)]/90 px-4 py-2 bg-[var(--color-paleGreen)] text-[var(--color-darkGreen)] font-medium rounded transition-colors duration-200"
                  onClick={openLoginModal}
                >
                  Login
                </button>
              </div>
            )}
            
            <Link href="/cart" className="text-white p-2 hover:bg-[var(--color-darkGreen)]/20 rounded-full transition-colors duration-200">
              <ShoppingCart size={22} />
            </Link>
            
            {/* Hamburger menu button - visible only on mobile */}
            <button 
              className="md:hidden text-white p-2"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Search bar - mobile view (below top row) */}
        <div className="md:hidden px-4 pb-3 pt-0" ref={searchRef}>
          <form onSubmit={handleSearchSubmit} className="flex w-full">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search eco-friendly products"
                className="w-full h-10 px-4 text-black rounded-l bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-paleGreen)]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
              />
              {isSearchFocused && searchQuery.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded shadow-lg z-50 max-h-64 overflow-y-auto text-black">
                  <div className="p-2 text-sm text-gray-600">
                    Press enter to search for &quot;{searchQuery}&quot;
                  </div>
                </div>
              )}
            </div>
            <button 
              type="submit"
              className="bg-[var(--color-darkGreen)] hover:bg-[var(--color-darkGreen)]/80 text-white px-4 rounded-r flex items-center justify-center"
            >
              <Search size={20} />
            </button>
          </form>
        </div>
      </div>

      {/* Navigation Links - desktop only */}
      <div className="hidden md:block bg-[var(--color-darkGreen)] text-white">
        <div className="container mx-auto px-4">
          <nav className="flex items-center py-2">
            <div className="flex space-x-6">
              <Link href="/products" className="py-1 px-2 hover:text-[var(--color-paleGreen)] transition-colors duration-200">All Products</Link>
              <Link href="/products?category=organic" className="py-1 px-2 hover:text-[var(--color-paleGreen)] transition-colors duration-200">Organic</Link>
              <Link href="/products?category=fruits" className="py-1 px-2 hover:text-[var(--color-paleGreen)] transition-colors duration-200">Fruits</Link>
              <Link href="/products?category=vegetables" className="py-1 px-2 hover:text-[var(--color-paleGreen)] transition-colors duration-200">Vegetables</Link>
              <Link href="/products?seasonal=in-season" className="py-1 px-2 hover:text-[var(--color-paleGreen)] transition-colors duration-200">Seasonal</Link>
              <Link href="/seller-hub" className="py-1 px-2 hover:text-[var(--color-paleGreen)] transition-colors duration-200">Become a Seller</Link>
              <Link href="/about" className="py-1 px-2 hover:text-[var(--color-paleGreen)] transition-colors duration-200">About Us</Link>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[var(--color-darkGreen)] text-white py-2 px-4">
          <nav className="flex flex-col space-y-2">
            <Link href="/products" className="py-2 border-b border-gray-700 text-left hover:text-[var(--color-paleGreen)]">
              All Products
            </Link>
            <Link href="/products?category=organic" className="py-2 border-b border-gray-700 text-left hover:text-[var(--color-paleGreen)]">
              Organic
            </Link>
            <Link href="/products?category=fruits" className="py-2 border-b border-gray-700 text-left hover:text-[var(--color-paleGreen)]">
              Fruits
            </Link>
            <Link href="/products?category=vegetables" className="py-2 border-b border-gray-700 text-left hover:text-[var(--color-paleGreen)]">
              Vegetables
            </Link>
            <Link href="/products?seasonal=in-season" className="py-2 border-b border-gray-700 text-left hover:text-[var(--color-paleGreen)]">
              Seasonal
            </Link>
            <Link href="/seller-hub" className="py-2 border-b border-gray-700 text-left hover:text-[var(--color-paleGreen)]">
              Become a Seller
            </Link>
            <Link href="/about" className="py-2 border-b border-gray-700 text-left hover:text-[var(--color-paleGreen)]">
              About Us
            </Link>
            
            {/* Only show login/register buttons if not logged in */}
            {!isLoggedIn && (
              <>
                <button 
                  className="py-2 border-b border-gray-700 text-left hover:text-[var(--color-paleGreen)]"
                  onClick={openLoginModal}
                >
                  Login
                </button>
                <button 
                  className="py-2 text-left hover:text-[var(--color-paleGreen)]"
                  onClick={openRegisterModal}
                >
                  Start Selling
                </button>
              </>
            )}
            
            {/* Show profile options when logged in */}
            {isLoggedIn && (
              <>
                <Link href="/user/profile" className="py-2 border-b border-gray-700 text-left hover:text-[var(--color-paleGreen)]">
                  My Profile
                </Link>
                <Link href="/user/orders" className="py-2 border-b border-gray-700 text-left hover:text-[var(--color-paleGreen)]">
                  My Orders
                </Link>
                <Link href="/notifications" className="py-2 border-b border-gray-700 text-left hover:text-[var(--color-paleGreen)]">
                  Notifications
                </Link>
                <Link href="/seller-dashboard" className="py-2 border-b border-gray-700 text-left hover:text-[var(--color-paleGreen)]">
                  Seller Dashboard
                </Link>
                <button 
                  className="py-2 text-left hover:text-[var(--color-paleGreen)]"
                  onClick={handleLogout}
                >
                  Sign Out
                </button>
              </>
            )}
          </nav>
        </div>
      )}
      
      {/* Auth Modals */}
      <AuthModals
        isLoginOpen={isLoginModalOpen}
        isRegisterOpen={isRegisterModalOpen}
        onCloseLogin={closeLoginModal}
        onCloseRegister={closeRegisterModal}
        onSwitchToLogin={() => {
          setIsRegisterModalOpen(false);
          setIsLoginModalOpen(true);
        }}
        onSwitchToRegister={() => {
          setIsLoginModalOpen(false);
          setIsRegisterModalOpen(true);
        }}
      />
    </div>
  );
};

export default NavbarGlobalGreen;