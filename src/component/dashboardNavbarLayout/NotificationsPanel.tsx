'use client';

import { useState, useEffect } from 'react';
import { Bell, ChevronRight, RotateCw } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  time: string;
  read: boolean;
  hasMore: boolean;
}

export default function NotificationsPanel() {
  const [activeTab, setActiveTab] = useState<'info' | 'promotion' | 'shop'>('info');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Just Create Content, 500 Million Reward',
      message: 'You are ready to get additional commission up to 500 million by joining the YouTube Shopping Shorts League...',
      date: '24/04/2025',
      time: '20:30',
      read: false,
      hasMore: true
    },
    {
      id: '2',
      title: 'Your Coins Will Expire!',
      message: 'You have 45 Coins that will expire on 2025-04-30. Use them before they expire!',
      date: '24/04/2025',
      time: '06:05',
      read: false,
      hasMore: false
    },
    {
      id: '3',
      title: 'First Class Tickets Ready to Ship!',
      message: 'Thank you for participating in the Ramadan Competition program. Check the winners here 🌟',
      date: '22/04/2025',
      time: '19:20',
      read: true,
      hasMore: false
    },
    {
      id: '4',
      title: 'SPayLater',
      message: 'Congratulations! Your SPayLater bill payment has been received and your SPayLater limit will be restored s...',
      date: '17/04/2025',
      time: '13:00',
      read: true,
      hasMore: true
    },
    {
      id: '5',
      title: 'Win Your 500JT Here!',
      message: 'Win & grab 500JT Prize by registering for the YouTube Shopping Shorts League, create Shorts, & generate...',
      date: '16/04/2025',
      time: '19:25',
      read: true,
      hasMore: true
    },
  ]);

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-800">Notifications</h2>
        <button className="text-gray-400 hover:text-gray-500">
          <RotateCw size={18} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('info')}
          className={`flex-1 py-3 text-sm font-medium ${
            activeTab === 'info'
              ? 'text-red-500 border-b-2 border-red-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Info GlobalGreen
        </button>
        <button
          onClick={() => setActiveTab('promotion')}
          className={`flex-1 py-3 text-sm font-medium ${
            activeTab === 'promotion'
              ? 'text-red-500 border-b-2 border-red-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Promotion
        </button>
        <button
          onClick={() => setActiveTab('shop')}
          className={`flex-1 py-3 text-sm font-medium ${
            activeTab === 'shop'
              ? 'text-red-500 border-b-2 border-red-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Shop
        </button>
      </div>

      {/* Notification list */}
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <div 
            key={notification.id}
            className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
              !notification.read ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex items-start mb-1">
              <h3 className="font-medium text-gray-800 text-sm flex-1 mr-2">{notification.title}</h3>
              <span className="text-xs text-gray-400 whitespace-nowrap">{notification.date} {notification.time}</span>
            </div>
            <p className="text-sm text-gray-600 mb-1">
              {notification.message}
              {notification.hasMore && (
                <button className="text-blue-500 ml-1 text-xs">More</button>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}