import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useWishlist } from '../contexts/WishlistContext';

const HomePage: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const { wishlist } = useWishlist();

  return (
    <div style={{ maxWidth: 1000, margin: '2rem auto', padding: '0 1rem' }}>
      <div className="home-hero">
        <h2 className="home-title">Welcome to Global Greens!</h2>
        <p className="home-subtitle">Discover the freshest, organic produce delivered to your door.</p>
        <Link href="/products" className="btn-primary home-cta">Browse All Products</Link>
      </div>

      <div className="cart">
        <h2>Shopping Cart</h2>
        {cart.items.map((item, index) => (
          <div key={index} className="cart-item">
            <p>{item.name}</p>
            <p>${item.price.toFixed(2)}</p>
          </div>
        ))}
        <p className="total">
          Total: ${cart.total.toFixed(2)}
        </p>
      </div>

      <div className="wishlist">
        <h2>Wishlist</h2>
        {wishlist.length === 0 ? (
          <p>Your wishlist is empty</p>
        ) : (
          <p>You have {wishlist.length} items in your wishlist</p>
        )}
      </div>
    </div>
  );
};

export default HomePage; 