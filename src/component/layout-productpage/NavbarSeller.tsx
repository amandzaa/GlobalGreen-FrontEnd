import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, ChevronDown, Menu, X } from 'lucide-react';

interface NavbarGlobalGreenProps {
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
}

const NavbarGlobalGreen: React.FC<NavbarGlobalGreenProps> = ({ 
  onLoginClick, 
  onRegisterClick 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const popularSearches = [
    "Organic Seeds",
    "Eco-Friendly Products",
    "Sustainable Tools",
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex flex-col w-full fixed top-0 left-0 right-0 z-50 shadow-md">
      {/* Main navigation bar */}
      <div className="bg-[#2E8B57] text-white px-4 py-3 flex flex-wrap items-start">
        <div className="flex w-full justify-between items-center mb-3">
          {/* Logo - always visible */}
          <Link href="/" className="flex items-center">
            <div className="w-8 h-8 bg-[#E6F4EA] rounded text-[#20603D] flex items-center justify-center mr-2">
              <span className="font-bold text-lg">G</span>
            </div>
            <span className="font-bold text-2xl">GlobalGreen</span>
          </Link>

          {/* Auth buttons and cart - moved to top row */}
          <div className="flex items-center space-x-4">
            <button 
              className="hover:text-gray-200 px-4 py-2 border border-white rounded text-white hidden md:block"
              onClick={onRegisterClick}
            >
              Start Selling
            </button>
            <button 
              className="hover:bg-[#E6F4EA]/90 px-4 py-2 bg-[#E6F4EA] text-[#20603D] font-medium rounded hidden md:block"
              onClick={onLoginClick}
            >
              Login
            </button>
            <Link href="/cart" className="text-white p-2">
              <ShoppingCart size={24} />
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

        {/* Search bar - below logo, always visible on desktop */}
        <div className="w-full md:flex flex-1 flex-col">
          <div className="flex h-10">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search eco-friendly products"
                className="w-full h-full px-4 text-black rounded-l bg-white focus:outline-none focus:ring-2 focus:ring-[#2E8B57]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute right-0 top-0 h-full flex items-center">
                <select className="h-full bg-gray-100 text-gray-700 px-2 border-l border-gray-300 focus:outline-none appearance-none pr-8">
                  <option>All products</option>
                  <option>Sustainable items</option>
                </select>
                <ChevronDown size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
            </div>
            <button className="bg-[#20603D] hover:bg-[#20603D]/80 text-white px-4 rounded-r flex items-center justify-center">
              <Search size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu items */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#20603D] text-white py-2 px-4">
          <div className="flex justify-end mb-2">
            <button 
              className="text-white p-1"
              onClick={toggleMenu}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>
          <nav className="flex flex-col space-y-2">
            <Link href="/seller" className="py-2 hover:text-[#87CEEB]">Seller Centre</Link>
            <Link href="/start-selling" className="py-2 hover:text-[#87CEEB]">Start Selling</Link>
            <Link href="/download" className="py-2 hover:text-[#87CEEB]">Download</Link>
            <Link href="/help" className="py-2 hover:text-[#87CEEB]">Help</Link>
            {/* Adding login/register buttons to mobile menu */}
            <button 
              className="py-2 text-left hover:text-[#87CEEB]"
              onClick={onLoginClick}
            >
              Login
            </button>
            <button 
              className="py-2 text-left hover:text-[#87CEEB]"
              onClick={onRegisterClick}
            >
              Start Selling
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default NavbarGlobalGreen;