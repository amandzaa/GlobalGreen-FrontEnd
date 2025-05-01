"use client";
import { useState, useRef, useEffect } from "react";
import {
  Bell,
  MessageCircle,
  Menu,
  X,
  Search,
  Grid3X3,
  BookOpen,
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
}

export default function Header({
  notificationCount,
  messageCount = 0,
  userName,
  onSearch,
}: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const notificationsPanelRef = useRef<HTMLDivElement | null>(null);
  const { theme, toggleTheme } = useTheme();

  // Close notifications panel when clicking outside
  useEffect(() => {
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
  }, []);

  // Close mobile menu when ESC key is pressed
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowMobileMenu(false);
        setShowNotifications(false);
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
    }
  };

  return (
    <header className="bg-green-50 dark:bg-gray-900 border-b border-green-600 dark:border-gray-700 py-2 px- sticky top-0 z-50 transition-colors duration-200 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left section: Logo and nav */}
        <div className="flex items-center space-x-4">
          <Logo />
        </div>

        {/* Middle section: Search (desktop only) */}
        <div className="hidden md:block flex-grow max-w-md mx-6">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-green-600 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 dark:focus:ring-blue-500 transition-all text-green-800 dark:text-gray-200"
              aria-label="Search"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-600 dark:text-gray-300 hover:text-green-800 dark:hover:text-white"
              aria-label="Submit search"
            >
              <Search size={18} />
            </button>
          </form>
        </div>

        {/* Right section: Actions */}
        <div className="flex items-center space-x-2 md:space-x-4 justify-end">
          {/* Theme toggle */}
          <div className="hidden md:block">
            <ThemeToggle />
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              className="p-2 text-green-600 dark:text-green-300 hover:bg-green-50 dark:hover:bg-gray-700 hover:text-green-800 dark:hover:text-green-200 rounded-full relative transition-colors"
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label={`Notifications${
                notificationCount > 0 ? ` (${notificationCount} unread)` : ""
              }`}
              aria-expanded={showNotifications}
              aria-haspopup="true"
            >
              <Bell size={20} />
              {notificationCount > 0 && (
                <span
                  className="absolute top-0 right-0 w-5 h-5 bg-green-800 dark:bg-green-700 rounded-full text-white text-xs flex items-center justify-center"
                  aria-hidden="true"
                >
                  {notificationCount > 9 ? "9+" : notificationCount}
                </span>
              )}
            </button>
            {showNotifications && (
              <div
                className="absolute right-0 mt-2 z-50 w-80"
                ref={notificationsPanelRef}
                role="menu"
              >
                <NotificationsPanel />
              </div>
            )}
          </div>

          {/* Messages */}
          <div className="relative">
            <Link href="/messages" passHref>
              <button
                className="p-2 text-green-600 dark:text-green-300 hover:bg-green-50 dark:hover:bg-gray-700 hover:text-green-800 dark:hover:text-green-200 rounded-full relative transition-colors"
                aria-label={`Messages${
                  messageCount > 0 ? ` (${messageCount} unread)` : ""
                }`}
              >
                <MessageCircle size={20} />
                {messageCount > 0 && (
                  <span
                    className="absolute top-0 right-0 w-5 h-5 bg-green-800 dark:bg-green-700 rounded-full text-white text-xs flex items-center justify-center"
                    aria-hidden="true"
                  >
                    {messageCount > 9 ? "9+" : messageCount}
                  </span>
                )}
              </button>
            </Link>
          </div>

          {/* Profile dropdown - visible on desktop */}
          <div className="hidden md:block">
            <ProfileDropdown userName={userName} />
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-green-600 dark:text-green-300 hover:bg-green-50 dark:hover:bg-gray-700 hover:text-green-800 dark:hover:text-green-200 rounded-full transition-colors"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            aria-label={showMobileMenu ? "Close menu" : "Open menu"}
            aria-expanded={showMobileMenu}
          >
            {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div className="md:hidden fixed inset-0 z-50 bg-green-50 dark:bg-gray-900 pt-16">
          <div className="p-4 space-y-6">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-green-600 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 dark:focus:ring-blue-500 transition-all text-green-800 dark:text-gray-200"
                aria-label="Search"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600 dark:text-gray-400"
                aria-label="Submit search"
              >
                <Search size={18} />
              </button>
            </form>

            {/* Theme toggle in mobile menu */}
            <div className="py-3 border-t border-b border-green-600 dark:border-gray-700 flex justify-between items-center">
              <span className="text-green-800 dark:text-green-300">Theme</span>
              <ThemeToggle />
            </div>

            {/* User section */}
            <div className="pt-2">
              <ProfileDropdown isMobile userName={userName} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
