import React, { useState } from 'react';
import Link from 'next/link';

const ProductNavigation: React.FC = () => {
  const [activeTab, setActiveTab] = useState('halaman-utama');
  
  const tabs = [
    { id: 'halaman-utama', name: 'Halaman Utama' },
    { id: 'semua-produk', name: 'Semua Produk' },
    { id: 'produk-terlaris', name: 'Produk Terlaris Kami' },
    { id: 'diskon-besar', name: 'Diskon Besar' },
  ];

  return (
    <div className="border-b border-gray-200">
      <nav className="flex -mb-px">
        {tabs.map((tab) => (
          <Link 
            key={tab.id}
            href={`#${tab.id}`}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === tab.id
                ? 'border-orange-500 text-orange-500'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab(tab.id);
            }}
          >
            {tab.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default ProductNavigation;