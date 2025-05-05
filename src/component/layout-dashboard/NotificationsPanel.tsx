'use client';

import { useState, useEffect, useRef } from 'react';
import { Bell, CheckCircle, ChevronRight, RotateCw, Search, Trash2, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  time: string;
  read: boolean;
  hasMore: boolean;
  category: 'info' | 'promotion' | 'shop';
  isDeleting?: boolean;
  isNew?: boolean;
}

export default function NotificationsPanel() {
  const [activeTab, setActiveTab] = useState<'info' | 'promotion' | 'shop' | 'all'>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedNotifications, setExpandedNotifications] = useState<string[]>([]);
  
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Just Create Content, 500 Million Reward',
      message: 'You are ready to get additional commission up to 500 million by joining the YouTube Shopping Shorts League. Create engaging content today and start earning!',
      date: '24/04/2025',
      time: '20:30',
      read: false,
      hasMore: true,
      category: 'promotion'
    },
    {
      id: '2',
      title: 'Your Coins Will Expire!',
      message: 'You have 45 Coins that will expire on 2025-04-30. Use them before they expire!',
      date: '24/04/2025',
      time: '06:05',
      read: false,
      hasMore: false,
      category: 'info'
    },
    {
      id: '3',
      title: 'First Class Tickets Ready to Ship!',
      message: 'Thank you for participating in the Ramadan Competition program. Check the winners here 🌟',
      date: '22/04/2025',
      time: '19:20',
      read: true,
      hasMore: false,
      category: 'shop'
    },
    {
      id: '4',
      title: 'SPayLater',
      message: 'Congratulations! Your SPayLater bill payment has been received and your SPayLater limit will be restored so you can continue shopping with ease.',
      date: '17/04/2025',
      time: '13:00',
      read: true,
      hasMore: true,
      category: 'info'
    },
    {
      id: '5',
      title: 'Win Your 500JT Here!',
      message: 'Win & grab 500JT Prize by registering for the YouTube Shopping Shorts League, create Shorts, & generate sales to win big rewards!',
      date: '16/04/2025',
      time: '19:25',
      read: true,
      hasMore: true,
      category: 'promotion'
    },
  ]);

  // Filter notifications based on active tab and search query
  const filteredNotifications = notifications.filter(notification => {
    const matchesTab = activeTab === 'all' || notification.category === activeTab;
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });
  
  const unreadCount = notifications.filter(n => !n.read).length;

  // Simulate refreshing notifications with a new notification
  const refreshNotifications = () => {
    setIsLoading(true);
    setTimeout(() => {
      const newNotification = {
        id: `new-${Date.now()}`,
        title: 'New Update Available',
        message: 'A new version of GlobalGreen app is available. Update now to get the latest features and improvements.',
        date: '04/05/2025',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: false,
        hasMore: false,
        category: 'info' as const,
        isNew: true
      };
      
      setNotifications(prev => [newNotification, ...prev]);
      setIsLoading(false);
      
      // Remove "new" flag after animation
      setTimeout(() => {
        setNotifications(prev => 
          prev.map(n => n.id === newNotification.id ? { ...n, isNew: false } : n)
        );
      }, 2000);
    }, 1000);
  };

  // Mark a single notification as read
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  // Delete a notification with animation
  const deleteNotification = (id: string) => {
    // Mark the notification for deletion first to trigger animation
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isDeleting: true } : n)
    );
    
    // Actually remove after animation completes
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 300);
  };
  
  // Clear all notifications
  const clearAllNotifications = () => {
    // Mark all notifications for deletion first
    setNotifications(prev => prev.map(n => ({ ...n, isDeleting: true })));
    
    // Remove all after animation
    setTimeout(() => {
      setNotifications([]);
    }, 300);
  };
  
  // Toggle expanded state for notifications with "more" content
  const toggleExpand = (id: string) => {
    setExpandedNotifications(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg border border-gray-200">
      {/* Header with refresh and actions */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center">
          <Bell size={18} className="text-green-600 mr-2" />
          <h2 className="text-lg font-medium text-gray-800">Notifications</h2>
          <AnimatePresence mode="wait">
            {unreadCount > 0 && (
              <motion.span 
                key="badge"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="ml-2 px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full"
              >
                {unreadCount}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <div className="flex space-x-2">
          <motion.button 
            onClick={markAllAsRead}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-sm text-green-600 hover:text-green-700 flex items-center transition-colors"
            disabled={unreadCount === 0}
          >
            <CheckCircle size={16} className="mr-1" />
            <span className="hidden sm:inline">Mark all read</span>
          </motion.button>
          <motion.button 
            onClick={refreshNotifications}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`text-gray-400 hover:text-gray-500 transition-colors ${isLoading ? 'animate-spin' : ''}`}
          >
            <RotateCw size={18} />
          </motion.button>
        </div>
      </div>

      {/* Search bar */}
      <div className="p-3 border-b border-gray-200">
        <div className="relative">
          <input
            type="text"
            placeholder="Search notifications..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <AnimatePresence>
            {searchQuery && (
              <motion.button 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-500"
              >
                <X size={16} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {["all", "info", "promotion", "shop"].map((tab) => (
          <motion.button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`flex-1 py-3 text-sm font-medium ${
              activeTab === tab
                ? 'text-green-600'
                : 'text-gray-500 hover:text-gray-700'
            } transition-colors duration-300`}
            whileHover={{ backgroundColor: "rgba(0,0,0,0.03)" }}
            whileTap={{ scale: 0.98 }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {activeTab === tab && (
              <motion.div
                layoutId="activeTabIndicator"
                className="border-b-2 border-green-600 absolute bottom-0 left-0 right-0"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Loading state */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center items-center p-8"
          >
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-gray-200 mb-2"></div>
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state */}
      <AnimatePresence>
        {!isLoading && filteredNotifications.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center p-8 text-center"
          >
            <Bell size={40} className="text-gray-300 mb-2" />
            <p className="text-gray-500 mb-1">No notifications found</p>
            <p className="text-gray-400 text-sm">
              {searchQuery ? 'Try a different search term' : 'You\'re all caught up!'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification list */}
      {!isLoading && (
        <div className="max-h-96 overflow-y-auto">
          <AnimatePresence>
            {filteredNotifications.map((notification) => {
              const isExpanded = expandedNotifications.includes(notification.id);
              return (
                <motion.div 
                  key={notification.id}
                  initial={notification.isNew ? { opacity: 0, y: -20, backgroundColor: "#d1fae5" } : { opacity: 0, y: 10 }}
                  animate={notification.isDeleting 
                    ? { opacity: 0, height: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0, overflow: "hidden" } 
                    : notification.isNew 
                      ? { opacity: 1, y: 0, backgroundColor: ["#d1fae5", "#ffffff"] }
                      : { opacity: 1, y: 0 }
                  }
                  exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                  transition={{ 
                    duration: 0.3,
                    backgroundColor: { duration: 1.5, delay: 0.3 },
                    layout: { duration: 0.3 }
                  }}
                  layout
                  className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${
                    !notification.read ? 'bg-green-50' : ''
                  }`}
                >
                  <div className="flex items-start mb-1 group">
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <h3 className="font-medium text-gray-800 text-sm flex-1 mr-2">
                          {notification.title}
                          {!notification.read && (
                            <motion.span 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="inline-block w-2 h-2 bg-green-500 rounded-full ml-2"
                            />
                          )}
                        </h3>
                        <span className="text-xs text-gray-400 whitespace-nowrap">{notification.date} {notification.time}</span>
                      </div>
                      <div className="text-sm text-gray-600 mb-1">
                        {notification.hasMore && isExpanded 
                          ? (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              transition={{ duration: 0.3 }}
                            >
                              {notification.message}
                            </motion.div>
                          )
                          : notification.hasMore 
                            ? notification.message.substring(0, 70) + '...' 
                            : notification.message}
                      </div>
                      {notification.hasMore && (
                        <motion.button 
                          onClick={() => toggleExpand(notification.id)}
                          whileHover={{ x: 3 }}
                          whileTap={{ scale: 0.98 }}
                          className="text-green-600 hover:text-green-700 text-xs flex items-center"
                        >
                          {isExpanded ? 'Show less' : 'Read more'}
                          <motion.span
                            initial={false}
                            animate={{ rotate: isExpanded ? 90 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronRight size={12} className="ml-1" />
                          </motion.span>
                        </motion.button>
                      )}
                    </div>
                    <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-1">
                      {!notification.read && (
                        <motion.button 
                          onClick={() => markAsRead(notification.id)}
                          whileHover={{ scale: 1.1, backgroundColor: "rgba(0,200,0,0.1)" }}
                          whileTap={{ scale: 0.9 }}
                          className="p-1 text-green-600 hover:bg-green-100 rounded"
                        >
                          <CheckCircle size={16} />
                        </motion.button>
                      )}
                      <motion.button 
                        onClick={() => deleteNotification(notification.id)}
                        whileHover={{ scale: 1.1, backgroundColor: "rgba(200,0,0,0.1)" }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1 text-red-500 hover:bg-red-100 rounded"
                      >
                        <Trash2 size={16} />
                      </motion.button>
                    </div>
                  </div>
                  <motion.div 
                    layout="position"
                    className="flex items-center mt-2"
                  >
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      notification.category === 'info' ? 'bg-blue-100 text-blue-700' :
                      notification.category === 'promotion' ? 'bg-purple-100 text-purple-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {notification.category}
                    </span>
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
      
      {/* Footer with clear all button */}
      <AnimatePresence>
        {!isLoading && filteredNotifications.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="p-3 border-t border-gray-200 flex justify-center"
          >
            <motion.button 
              onClick={clearAllNotifications}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-sm text-red-500 hover:text-red-600 flex items-center transition-all duration-300"
            >
              <Trash2 size={16} className="mr-1" />
              Clear all notifications
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}