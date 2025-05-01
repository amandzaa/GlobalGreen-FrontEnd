// components/FloatingActionButtons.tsx
'use client';

import React from 'react';
import { Bell, MessageCircle } from 'lucide-react';

interface NotificationBadge {
  count: number;
  color?: string; // Optional custom color
}

interface FloatingActionButtonsProps {
  notificationCount?: NotificationBadge;
  messageCount?: NotificationBadge;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  spacing?: number; // Gap between buttons in pixels
  size?: number; // Size of the buttons in pixels
  iconSize?: number; // Size of the icons inside buttons
  onNotificationClick?: () => void;
  onMessageClick?: () => void;
}

const FloatingActionButtons: React.FC<FloatingActionButtonsProps> = ({
  notificationCount,
  messageCount,
  position = 'bottom-right',
  spacing = 2, // Corresponds to gap-2 in Tailwind
  size = 10, // Corresponds to w-10 h-10 in Tailwind
  iconSize = 20,
  onNotificationClick,
  onMessageClick,
}) => {
  // Map position to Tailwind classes
  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
  };

  // Map spacing to Tailwind gap classes
  const gapClass = `gap-${spacing}`;
  
  // Map size to Tailwind width and height classes
  const sizeClass = `w-${size} h-${size}`;
  
  return (
    <div className={`fixed ${positionClasses[position]} flex flex-col ${gapClass}`}>
      {notificationCount && (
        <button 
          className={`bg-red-500 text-white ${sizeClass} rounded-full flex items-center justify-center shadow-lg relative`}
          onClick={onNotificationClick}
        >
          {notificationCount.count > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 rounded-full text-xs flex items-center justify-center">
              {notificationCount.count > 99 ? '99+' : notificationCount.count}
            </span>
          )}
          <Bell size={iconSize} />
        </button>
      )}
      
      {messageCount && (
        <button 
          className={`bg-red-500 text-white ${sizeClass} rounded-full flex items-center justify-center shadow-lg relative`}
          onClick={onMessageClick}
        >
          {messageCount.count > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 rounded-full text-xs flex items-center justify-center">
              {messageCount.count > 99 ? '99+' : messageCount.count}
            </span>
          )}
          <MessageCircle size={iconSize} />
        </button>
      )}
    </div>
  );
};

export default FloatingActionButtons;