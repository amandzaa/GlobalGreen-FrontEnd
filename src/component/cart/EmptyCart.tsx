import React from 'react';
import Link from 'next/link';

const EmptyCart: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm text-center">
      <p className="text-gray-500 mb-4">Your cart is empty</p>
      <Link href="/products" className="text-blue-500 hover:underline">
        Continue Shopping
      </Link>
    </div>
  );
};

export default EmptyCart;