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
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/features/auth/authSlice';
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
  const router = useRouter();
  const dispatch = useDispatch();
  const currentPath = activePath || pathname;
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const [isTabletScreen, setIsTabletScreen] = useState(false);
  
  // Handle sign out
  const handleSignOut = () => {
    // Dispatch logout action directly
    dispatch(logout());
    router.push('/seller-homepage');
  };
  
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
      ],
    },
    {
      name: 'Product',
      id: 'product',
      icon: <ShoppingBag size={18} />,
      items: [
        { name: 'My Products', href: '/seller-dashboard/my-products', icon: <ShoppingBag size={16} /> },
        { name: 'Add New Product', href: '/seller-dashboard/add-product', icon: <ShoppingBag size={16} /> },
      ],
    },
    {
      name: 'Voucher',
      id: 'voucher',
      icon: <Tag size={18} />,
      items: [
        { name: 'My Vouchers', href: '/seller-dashboard/my-vouchers', icon: <Tag size={16} /> },
        { name: 'Add New Voucher', href: '/seller-dashboard/add-voucher', icon: <Tag size={16} /> },
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  // Colors for styling - can be adjusted to match your theme
  const activeHighlightColor = colors.secondary || '#4cceac';
  // const hoverTransition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

  return (
    <aside 
      className={`${isMinimized ? 'w-16' : 'w-64'} h-screen sticky transition-all duration-500 ease-in-out flex flex-col ${
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
          className="p-1 rounded-md hover:bg-mediumGreen transition-all duration-300 ease-in-out text-white hover:text-secondary hover:scale-105"
          style={{ transition: 'all 0.25s ease' }}
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
                  className={`flex items-center justify-between w-full px-4 py-3 text-sm rounded-md ${
                    sectionActive 
                      ? 'bg-mediumGreen font-medium' 
                      : isHovered 
                        ? 'bg-mediumGreen/70' 
                        : 'hover:bg-mediumGreen/50'
                  }`}
                  style={{ 
                    color: sectionActive ? activeHighlightColor : isHovered ? activeHighlightColor : colors.white,
                    margin: isMinimized ? '0 4px' : '0 8px',
                    width: isMinimized ? 'calc(100% - 8px)' : 'calc(100% - 16px)',
                    borderLeft: sectionActive ? `3px solid ${activeHighlightColor}` : isHovered ? `3px solid ${activeHighlightColor}` : `3px solid transparent`,
                    paddingLeft: sectionActive || isHovered ? (isMinimized ? '13px' : '13px') : (isMinimized ? '13px' : '13px'),
                    transition: 'all 0.25s ease',
                    boxShadow: sectionActive || isHovered ? '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)' : 'none',
                    transform: isHovered && !sectionActive ? 'translateX(3px)' : 'translateX(0)',
                  }}
                >
                  <div className="flex items-center">
                    <span className={`mr-2 ${isHovered && !sectionActive ? 'transform scale-110' : ''}`} style={{ transition: 'transform 0.25s ease' }}>
                      {section.icon}
                    </span>
                    {!isMinimized && <span>{section.name}</span>}
                  </div>
                  {!isMinimized && (
                    <span className={`transform ${isHovered ? 'translate-x-1' : ''}`} style={{ transition: 'transform 0.25s ease' }}>
                      {collapsedSections[section.id] ? (
                        <ChevronRight size={16} className="transition-transform duration-300" />
                      ) : (
                        <ChevronDown size={16} className="transition-transform duration-300" />
                      )}
                    </span>
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
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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
                          className={`px-4 py-2 text-sm my-1 rounded-md relative flex items-center ${
                            itemActive ? 'bg-mediumGreen font-medium' : 'text-white hover:bg-mediumGreen/50'
                          }`}
                          style={{ 
                            marginLeft: '8px',
                            width: 'calc(100% - 16px)',
                            color: itemActive ? activeHighlightColor : isItemHovered ? activeHighlightColor : colors.white,
                            borderLeft: itemActive ? `3px solid ${activeHighlightColor}` : isItemHovered ? `3px solid ${activeHighlightColor}` : `3px solid transparent`,
                            paddingLeft: itemActive || isItemHovered ? '13px' : '13px',
                            transition: 'all 0.25s ease',
                            boxShadow: itemActive || isItemHovered ? '0 1px 2px rgba(0,0,0,0.12)' : 'none',
                            transform: isItemHovered && !itemActive ? 'translateX(3px)' : 'translateX(0)',
                          }}
                        >
                          <span className={`mr-2 ${isItemHovered && !itemActive ? 'transform scale-110' : ''}`} style={{ transition: 'transform 0.25s ease' }}>
                            {item.icon}
                          </span>
                          <span>{item.name}</span>
                          
                          {/* Visual active indicator dot for active items */}
                          <span 
                            className="absolute right-3 w-2 h-2 rounded-full" 
                            style={{ 
                              backgroundColor: itemActive ? activeHighlightColor : isItemHovered ? activeHighlightColor : 'transparent',
                              transform: itemActive || isItemHovered ? 'scale(1)' : 'scale(0)',
                              opacity: itemActive ? 1 : isItemHovered ? 0.7 : 0,
                              transition: 'all 0.25s ease',
                            }}
                          />
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
          
          <div 
            className={`p-2 hover:bg-mediumGreen/50 rounded-md cursor-pointer flex items-center text-white my-1 ${
              isMinimized ? 'justify-center' : ''
            }`}
            style={{ 
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateX(3px)';
              e.currentTarget.style.color = activeHighlightColor;
              e.currentTarget.style.borderLeft = `3px solid ${activeHighlightColor}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateX(0)';
              e.currentTarget.style.color = colors.white;
              e.currentTarget.style.borderLeft = '3px solid transparent';
            }}
          >
            <Settings size={18} className={`${isMinimized ? '' : 'mr-2'} transition-transform duration-250`}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1) rotate(15deg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
              }}
            />
            {!isMinimized && <span>Settings</span>}
          </div>
          
          <div 
            onClick={handleSignOut}
            className={`p-2 hover:bg-mediumGreen/50 rounded-md cursor-pointer flex items-center text-white my-1 ${
              isMinimized ? 'justify-center' : ''
            }`}
            style={{ 
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateX(3px)';
              e.currentTarget.style.color = activeHighlightColor;
              e.currentTarget.style.borderLeft = `3px solid ${activeHighlightColor}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateX(0)';
              e.currentTarget.style.color = colors.white;
              e.currentTarget.style.borderLeft = '3px solid transparent';
            }}
          >
            <LogOut size={18} className={`${isMinimized ? '' : 'mr-2'} transition-transform duration-250`}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1) translateX(2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) translateX(0)';
              }}
            />
            {!isMinimized && <span>Log Out</span>}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;