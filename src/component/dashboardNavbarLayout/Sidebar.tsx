// components/Sidebar.tsx
'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Define the structure for menu items
interface MenuItem {
  name: string;
  href: string;
}

// Define the structure for menu sections
interface MenuSection {
  name: string;
  id: string;
  items: MenuItem[];
}

interface SidebarProps {
  defaultCollapsed?: {
    [key: string]: boolean;
  };
  activePath?: string;
  navbarHeight?: number; // Add prop for navbar height
}

const Sidebar: React.FC<SidebarProps> = ({ 
  defaultCollapsed = {}, 
  activePath,
  navbarHeight = 64 // Default navbar height of 64px if not specified
}) => {
  const pathname = usePathname();
  const currentPath = activePath || pathname;

  // Define the menu structure
  const menuSections: MenuSection[] = [
    {
      name: 'Order',
      id: 'order',
      items: [
        { name: 'My Order', href: '/seller-dashboard/my-order' },
        { name: 'Refund/Cancellation', href: '/seller-dashboard/refund-cancellation' },
        { name: 'Shipping Settings', href: '/seller-dashboard/shipping-settings' },
      ],
    },
    {
      name: 'Product',
      id: 'product',
      items: [
        { name: 'My Products', href: '/seller-dashboard/my-products' },
        { name: 'Add New Product', href: '/seller-dashboard/add-product' },
        { name: 'Voucher Product', href: '/seller-dashboard/voucher-product' },
      ],
    },
    {
      name: 'Finance',
      id: 'finance',
      items: [
        { name: 'My Income', href: '/seller-dashboard/my-income' },
      ],
    },
    {
      name: 'Store',
      id: 'store',
      items: [
        { name: 'Store Settings', href: '/seller-dashboard/store-settings' },
        { name: 'Account & Security', href: '/seller-dashboard/account-security' },
      ],
    },
  ];

  // GlobalGreen colors from palette - matching the product sidebar
  const colors = {
    mediumGreen: '#2E8B57',
    lightBlue: '#87CEEB',
    cream: '#E6F4EA',
    darkGreen: '#20603D',
    buttonBlue: '#3B75B4'
  };

  // Initialize collapsed state based on defaultCollapsed or all sections open
  const initialCollapsedState: {[key: string]: boolean} = {};
  menuSections.forEach(section => {
    initialCollapsedState[section.id] = defaultCollapsed[section.id] !== undefined 
      ? defaultCollapsed[section.id] 
      : false;
  });

  const [collapsedSections, setCollapsedSections] = useState(initialCollapsedState);

  const toggleSection = (sectionId: string) => {
    setCollapsedSections({
      ...collapsedSections,
      [sectionId]: !collapsedSections[sectionId],
    });
  };

  // Check if a menu item is active
  const isActive = (href: string) => {
    return currentPath === href;
  };

  // Check if section has active item
  const sectionHasActiveItem = (section: MenuSection) => {
    return section.items.some(item => isActive(item.href));
  };

  return (
    <aside 
      className="w-48 flex-shrink-0 h-screen sticky overflow-hidden"
      style={{ 
        backgroundColor: colors.cream, 
        borderRight: `1px solid ${colors.lightBlue}30`,
        top: `${navbarHeight}px`, // Position below navbar
        height: `calc(100vh - ${navbarHeight}px)`, // Adjust height to account for navbar
        marginTop: 0 // Ensure no margin at the top
      }}
    >
      <nav className="py-4 h-full overflow-y-auto">
        {menuSections.map((section) => {
          const sectionActive = sectionHasActiveItem(section);
          return (
            <div key={section.id} className="mb-1">
              <button 
                onClick={() => toggleSection(section.id)}
                className="flex items-center justify-between w-full px-4 py-2 text-sm hover:opacity-90 transition-all duration-300"
                style={{ 
                  color: sectionActive ? colors.darkGreen : colors.mediumGreen,
                  fontWeight: sectionActive ? 'bold' : 'normal'
                }}
              >
                <span>{section.name}</span>
                <ChevronDown 
                  size={16} 
                  className="transform transition-transform duration-300"
                  style={{ 
                    transform: collapsedSections[section.id] ? 'rotate(180deg)' : 'rotate(0deg)',
                    color: colors.mediumGreen
                  }}
                />
              </button>
              <div 
                className="pl-4 overflow-hidden transition-all duration-300 ease-in-out"
                style={{ 
                  maxHeight: !collapsedSections[section.id] ? '500px' : '0px',
                  opacity: !collapsedSections[section.id] ? 1 : 0
                }}
              >
                {section.items.map((item) => {
                  const itemActive = isActive(item.href);
                  return (
                    <Link 
                      key={item.href} 
                      href={item.href}
                      className="block px-4 py-2 text-sm transition-colors duration-300 hover:opacity-80"
                      style={{ 
                        color: itemActive ? colors.darkGreen : colors.mediumGreen,
                        fontWeight: itemActive ? 'medium' : 'normal'
                      }}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;