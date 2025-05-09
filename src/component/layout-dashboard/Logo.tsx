import Link from 'next/link';
import React from 'react';
import { useEffect, useState } from 'react';
import Image from "next/image";

export default function Logo() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Function to check if viewport is mobile width
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup event listener
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <Link 
      href="/seller-dashboard" 
      className="flex items-center text-xl font-bold text-gray-800 hover:opacity-90"
    >
      <Image 
        src="/assets/GlobalGreen-icon.png" 
        alt="GlobalGreen Logo" 
        width={42} 
        height={42} 
        className="object-contain"
      />
      {!isMobile && (
        <>
          <span>GlobalGreen</span>
          <span className="text-gray-800 font-normal ml-1">Seller Center</span>
        </>
      )}
    </Link>
  );
}