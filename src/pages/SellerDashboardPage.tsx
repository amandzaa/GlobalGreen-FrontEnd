import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const SellerDashboardPage: React.FC = () => {
  return (
    <div className="seller-dashboard">
      <aside className="dashboard-sidebar">
        <nav>
          <ul>
            <li><Link to="/seller/profile">Store Profile</Link></li>
            <li><Link to="/seller/orders">My Orders</Link></li>
            <li><Link to="/seller/products">My Products</Link></li>
            <li><Link to="/seller/add-product">Add Product</Link></li>
            <li><Link to="/seller/add-voucher">Add Voucher</Link></li>
          </ul>
        </nav>
      </aside>
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
};

export default SellerDashboardPage; 