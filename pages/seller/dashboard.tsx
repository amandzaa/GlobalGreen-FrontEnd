import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const SellerDashboardPage = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user || user.role !== 'seller') {
    return <div>You are not authorized to view this page.</div>;
  }

  return (
    <div style={{ maxWidth: 1000, margin: '2rem auto', padding: '0 1rem' }}>
      <h1>Seller Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
        <Link href="/seller/products" style={{ textDecoration: 'none' }}>
          <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h2>My Products</h2>
            <p>Manage your product listings</p>
          </div>
        </Link>
        <Link href="/seller/orders" style={{ textDecoration: 'none' }}>
          <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h2>Orders</h2>
            <p>View and manage customer orders</p>
          </div>
        </Link>
        <Link href="/seller/profile" style={{ textDecoration: 'none' }}>
          <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h2>Store Profile</h2>
            <p>Update your store information</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SellerDashboardPage; 