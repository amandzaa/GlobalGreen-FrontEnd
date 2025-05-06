import React from 'react';
import Link from 'next/link';

const CartHeader: React.FC = () => {
  return (
    <div className="mb-6">
      <div className="flex items-center text-sm text-blue-500 mb-3">
        <Link href="/page-1" className="hover:underline cursor-pointer">
          Page 1
        </Link>
        <span className="mx-2">&gt;</span>
        <Link href="/page-2" className="hover:underline cursor-pointer">
          Page 2
        </Link>
        <span className="mx-2">&gt;</span>
        <span className="text-gray-500">Default</span>
      </div>
      <h1 className="text-3xl font-bold text-gray-900">Cart</h1>
    </div>
  );
};

export default CartHeader;