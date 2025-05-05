'use client';

import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  ShoppingBag, 
  Package, 
  Tag, 
  DollarSign, 
  Store, 
  Settings, 
  LogOut, 
  ChevronLeft,
  LayoutDashboard
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { colors } from '@/types';

// Define the structure for menu items
interface MenuItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

// Define the structure for menu sections
interface MenuSection {
  name: string;
  id: string;
  items: MenuItem[];
  icon: React.ReactNode;
}

interface SidebarProps {
  defaultCollapsed?: {
    [key: string]: boolean;
  };
  activePath?: string;
  navbarHeight?: number;
  isMobileOpen?: boolean; // Prop to control mobile visibility
}

const Sidebar: React.FC<SidebarProps> = ({ 
  defaultCollapsed = {}, 
  activePath,
  navbarHeight = 64,
  isMobileOpen = false // Default to closed on mobile
}) => {
  const pathname = usePathname();
  const currentPath = activePath || pathname;
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const [isTabletScreen, setIsTabletScreen] = useState(false);
  
  // Check screen size and set responsive states
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobileScreen(width < 768); // 768px is the md breakpoint
      setIsTabletScreen(width >= 768 && width < 1024); // 768-1024px is typical tablet size
      
      // Auto-minimize on tablet
      if (width >= 768 && width < 1024) {
        setIsMinimized(true);
      }
    };
    
    // Initial check
    checkScreenSize();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Define the menu structure with icons
  const menuSections: MenuSection[] = [
    {
      name: 'Dashboard',
      id: 'dashboard',
      icon: <LayoutDashboard size={18} />,
      items: [
        { name: 'Overview', href: '/seller-dashboard', icon: <LayoutDashboard size={16} /> },
        // { name: 'Analytics', href: '/seller-dashboard/analytics', icon: <BarChart3 size={16} /> },
      ],
    },
    {
      name: 'Order',
      id: 'order',
      icon: <Package size={18} />,
      items: [
        { name: 'My Order', href: '/seller-dashboard/my-order', icon: <Package size={16} /> },
        { name: 'Refund/Cancellation', href: '/seller-dashboard/refund-cancellation', icon: <Package size={16} /> },
        { name: 'Shipping Settings', href: '/seller-dashboard/shipping-settings', icon: <Package size={16} /> },
      ],
    },
    {
      name: 'Product',
      id: 'product',
      icon: <ShoppingBag size={18} />,
      items: [
        { name: 'My Products', href: '/seller-dashboard/my-products', icon: <ShoppingBag size={16} /> },
        { name: 'Add New Product', href: '/seller-dashboard/add-product', icon: <ShoppingBag size={16} /> },
        { name: 'Edit Product', href: '/seller-dashboard/edit-product', icon: <ShoppingBag size={16} /> },
      ],
    },
    {
      name: 'Voucher',
      id: 'voucher',
      icon: <Tag size={18} />,
      items: [
        { name: 'My Vouchers', href: '/seller-dashboard/my-vouchers', icon: <Tag size={16} /> },
        { name: 'Add New Voucher', href: '/seller-dashboard/add-voucher', icon: <Tag size={16} /> },
        { name: 'Edit Voucher', href: '/seller-dashboard/edit-voucher', icon: <Tag size={16} /> },
      ],
    },
    {
      name: 'Finance',
      id: 'finance',
      icon: <DollarSign size={18} />,
      items: [
        { name: 'My Income', href: '/seller-dashboard/my-income', icon: <DollarSign size={16} /> },
      ],
    },
    {
      name: 'Store',
      id: 'store',
      icon: <Store size={18} />,
      items: [
        { name: 'Store Settings', href: '/seller-dashboard/store-settings', icon: <Store size={16} /> },
        { name: 'Account & Security', href: '/seller-dashboard/account-security', icon: <Settings size={16} /> },
      ],
    },
  ];

  // Auto-expand section with active item on mount
  const initialCollapsedState: {[key: string]: boolean} = {};
  menuSections.forEach(section => {
    // Check if section has active item to auto-expand it
    const hasActiveItem = section.items.some(item => currentPath === item.href);
    
    initialCollapsedState[section.id] = defaultCollapsed[section.id] !== undefined 
      ? defaultCollapsed[section.id] 
      : !hasActiveItem; // Expand active sections by default
  });

  const [collapsedSections, setCollapsedSections] = useState(initialCollapsedState);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const toggleSection = (sectionId: string) => {
    setCollapsedSections({
      ...collapsedSections,
      [sectionId]: !collapsedSections[sectionId],
    });
  };

  // Toggle sidebar minimize/maximize
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  // Check if a menu item is active
  const isActive = (href: string) => {
    return currentPath === href;
  };

  // Check if section has active item
  const sectionHasActiveItem = (section: MenuSection) => {
    return section.items.some(item => isActive(item.href));
  };

  // If on tablet, don't render the sidebar at all
  if (isTabletScreen) {
    return null;
  }

  // If on mobile and sidebar not open, don't render
  if (isMobileScreen && !isMobileOpen) {
    return null;
  }

  return (
    <aside 
      className={`${isMinimized ? 'w-16' : 'w-64'} h-screen sticky transition-all duration-300 ease-in-out flex flex-col ${
        isMobileScreen ? 'fixed z-40 shadow-xl' : 'shadow-lg'
      }`}
      style={{ 
        backgroundColor: colors.darkGreen,
        top: `${navbarHeight}px`,
        height: `calc(100vh - ${navbarHeight}px)`,
        marginTop: 0,
        left: 0,
      }}
    >
      {/* Logo and Toggle Button */}
      <div className="flex items-center justify-between p-4 border-b border-opacity-20 border-white">
        {!isMinimized && (
          <h1 className="text-xl font-bold text-white">GlobalGreen</h1>
        )}
        <button 
          onClick={toggleMinimize}
          className="p-1 rounded-md hover:bg-mediumGreen transition-colors duration-200 text-white"
        >
          {isMinimized ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Main Menu Area - With Flex Grow to Push Account Section to Bottom */}
      <div className="flex flex-col h-full">
        <nav className="py-4 flex-grow overflow-y-auto">
          {/* Main Menu Label */}
          {!isMinimized && (
            <p className="text-lightBlue uppercase text-xs font-semibold mb-2 pl-4">Main Menu</p>
          )}

          {/* Menu Sections */}
          {menuSections.map((section) => {
            const sectionActive = sectionHasActiveItem(section);
            const isHovered = hoveredSection === section.id;
            
            return (
              <div key={section.id} className="mb-1">
                <button 
                  onClick={() => toggleSection(section.id)}
                  onMouseEnter={() => setHoveredSection(section.id)}
                  onMouseLeave={() => setHoveredSection(null)}
                  className={`flex items-center justify-between w-full px-4 py-3 text-sm transition-all duration-200 rounded-md ${
                    isHovered ? 'bg-mediumGreen' : sectionActive ? 'bg-mediumGreen' : 'hover:bg-mediumGreen/50'
                  }`}
                  style={{ 
                    color: colors.white,
                    margin: isMinimized ? '0 4px' : '0 8px',
                    width: isMinimized ? 'calc(100% - 8px)' : 'calc(100% - 16px)',
                  }}
                >
                  <div className="flex items-center">
                    <span className="mr-2">{section.icon}</span>
                    {!isMinimized && <span>{section.name}</span>}
                  </div>
                  {!isMinimized && (
                    collapsedSections[section.id] ? (
                      <ChevronRight size={16} className="transition-transform duration-300" />
                    ) : (
                      <ChevronDown size={16} className="transition-transform duration-300" />
                    )
                  )}
                </button>
                
                {/* Only show submenu when not minimized */}
                {!isMinimized && (
                  <div 
                    className="pl-4 overflow-hidden transition-all duration-300 ease-in-out"
                    style={{ 
                      maxHeight: !collapsedSections[section.id] ? '500px' : '0px',
                      opacity: !collapsedSections[section.id] ? 1 : 0,
                      transform: !collapsedSections[section.id] ? 'translateY(0)' : 'translateY(-10px)',
                    }}
                  >
                    {section.items.map((item) => {
                      const itemActive = isActive(item.href);
                      const isItemHovered = hoveredItem === item.href;
                      
                      return (
                        <Link 
                          key={item.href} 
                          href={item.href}
                          onMouseEnter={() => setHoveredItem(item.href)}
                          onMouseLeave={() => setHoveredItem(null)}
                          className={`px-4 py-2 text-sm transition-all duration-200 my-1 rounded-md relative flex items-center ${
                            itemActive ? 'bg-mediumGreen text-white' : 'text-white hover:bg-mediumGreen/50'
                          }`}
                          style={{ 
                            marginLeft: '8px',
                            width: 'calc(100% - 16px)',
                          }}
                        >
                          <span className="mr-2">{item.icon}</span>
                          <span>{item.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Bottom Actions - Now in a fixed position at the bottom */}
        <div className="px-4 py-2 border-t border-white/20">
          {!isMinimized && (
            <p className="text-lightBlue uppercase text-xs font-semibold mb-2">Account</p>
          )}
          
          <div className={`p-2 hover:bg-mediumGreen/50 rounded-md cursor-pointer flex items-center text-white my-1 ${
            isMinimized ? 'justify-center' : ''
          }`}>
            <Settings size={18} className={isMinimized ? '' : 'mr-2'} />
            {!isMinimized && <span>Settings</span>}
          </div>
          
          <div className={`p-2 hover:bg-mediumGreen/50 rounded-md cursor-pointer flex items-center text-white my-1 ${
            isMinimized ? 'justify-center' : ''
          }`}>
            <LogOut size={18} className={isMinimized ? '' : 'mr-2'} />
            {!isMinimized && <span>Log Out</span>}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;