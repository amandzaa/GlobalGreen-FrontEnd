import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store/store';
import './App.css';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import SellerDashboardPage from './pages/SellerDashboardPage';
import StoreProfilePage from './pages/StoreProfilePage';
import SellerOrdersPage from './pages/SellerOrdersPage';
import SellerProductsPage from './pages/SellerProductsPage';
import AddProductPage from './pages/AddProductPage';
import AddVoucherPage from './pages/AddVoucherPage';
import ProfileConsumersPage from './pages/ProfileConsumersPage';
import HistoryOrderPage from './pages/HistoryOrderPage';
import AllProductsPage from './pages/AllProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import { useTheme } from './contexts/ThemeContext';

const App: React.FC = () => {
  const dispatch = useDispatch();
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
                  <Link to="/profile" className="auth-link">Profile</Link>
                  <Link to="/order-history" className="auth-link">Order History</Link>
                </>
              )}
              <Link to="/cart" className="auth-link">Cart ({cart.items.length})</Link>
              <Link to="/products" className="auth-link">All Products</Link>
            </>
          ) : (
            <>
              <Link to="/login" className="auth-link">Login</Link>
              <Link to="/register" className="auth-link">Register</Link>
            </>
          )}
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/profile" element={<ProfileConsumersPage />} />
          <Route path="/order-history" element={<HistoryOrderPage />} />
          <Route path="/products" element={<AllProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/seller/dashboard" element={<SellerDashboardPage />}>
            <Route path="profile" element={<StoreProfilePage />} />
            <Route path="orders" element={<SellerOrdersPage />} />
            <Route path="products" element={<SellerProductsPage />} />
            <Route path="add-product" element={<AddProductPage />} />
            <Route path="add-voucher" element={<AddVoucherPage />} />
          </Route>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/" element={
            <div className="home-hero">
              <h2 className="home-title">Welcome to Global Greens!</h2>
              <p className="home-subtitle">Discover the freshest, organic produce delivered to your door.</p>
              <Link to="/products" className="btn-primary home-cta">Browse All Products</Link>
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
            </div>
          } />
        </Routes>
      </main>
    </div>
  );
};

export default App; 