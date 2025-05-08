import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useTheme } from '../contexts/ThemeContext';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const cart = useSelector((state: RootState) => state.cart);
  const auth = useSelector((state: RootState) => state.auth);
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Global Greens</h1>
        <p>Fresh, Organic Vegetables Delivered to Your Door</p>
        <button onClick={toggleTheme} className="btn-secondary" style={{ position: 'absolute', top: 20, right: 20 }} aria-label="Toggle theme">
          Theme: {theme === 'light' ? '🌞 Light' : '🌙 Dark'}
        </button>
        <nav className="auth-links">
          {auth.isAuthenticated ? (
            <>
              <span className="auth-link">Welcome, {auth.user?.name}</span>
              {auth.user?.role === 'buyer' && (
                <>
                  <Link href="/profile" className="auth-link">Profile</Link>
                  <Link href="/order-history" className="auth-link">Order History</Link>
                </>
              )}
              <Link href="/cart" className="auth-link">Cart ({cart.items.length})</Link>
              <Link href="/products" className="auth-link">All Products</Link>
            </>
          ) : (
            <>
              <Link href="/login" className="auth-link">Login</Link>
              <Link href="/register" className="auth-link">Register</Link>
            </>
          )}
        </nav>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout; 