import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const SellerDashboardPage: React.FC = () => {
  const router = useRouter();
  
  return (
    <div className="seller-dashboard">
      <aside className="dashboard-sidebar">
        <nav>
          <ul>
            <li><Link href="/seller/profile">Store Profile</Link></li>
            <li><Link href="/seller/orders">My Orders</Link></li>
            <li><Link href="/seller/products">My Products</Link></li>
            <li><Link href="/seller/add-product">Add Product</Link></li>
            <li><Link href="/seller/add-voucher">Add Voucher</Link></li>
          </ul>
        </nav>
      </aside>
      <main className="dashboard-content">
        {/* Content will be rendered by Next.js pages */}
      </main>
    </div>
  );
};

export default SellerDashboardPage; 