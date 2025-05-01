import React from 'react';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link 
      href="/seller-dashboard" 
      className="flex items-center text-xl font-bold text-gray-800 hover:opacity-90"
    >
      <span className="text-red-500 mr-2">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 6H3C2.44772 6 2 6.44772 2 7V17C2 17.5523 2.44772 18 3 18H21C21.5523 18 22 17.5523 22 17V7C22 6.44772 21.5523 6 21 6Z" />
          <path fillRule="evenodd" clipRule="evenodd" d="M11.5 16C13.9853 16 16 13.9853 16 11.5C16 9.01472 13.9853 7 11.5 7C9.01472 7 7 9.01472 7 11.5C7 13.9853 9.01472 16 11.5 16ZM11.5 14C12.8807 14 14 12.8807 14 11.5C14 10.1193 12.8807 9 11.5 9C10.1193 9 9 10.1193 9 11.5C9 12.8807 10.1193 14 11.5 14Z" fill="white"/>
        </svg>
      </span>
      <span>GlobalGreen</span>
      <span className="text-gray-600 font-normal ml-1">Seller Center</span>
    </Link>
  );
}