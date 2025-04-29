import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store/store';
import { addToCart } from './store/slices/cartSlice';
import './App.css';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  organic: boolean;
  origin: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Organic Carrots",
    price: 2.99,
    description: "Fresh, crunchy organic carrots grown locally with sustainable farming practices.",
    image: "https://images.unsplash.com/photo-1447175008436-054170c2e979?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "root-vegetables",
    organic: true,
    origin: "Local Farm"
  },
  {
    id: 2,
    name: "Fresh Spinach",
    price: 3.49,
    description: "Tender, nutrient-rich spinach leaves, perfect for salads and cooking.",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "leafy-greens",
    organic: true,
    origin: "Local Farm"
  },
  {
    id: 3,
    name: "Heirloom Tomatoes",
    price: 4.99,
    description: "Juicy, flavorful heirloom tomatoes grown using traditional methods.",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "fruits",
    organic: true,
    origin: "Local Farm"
  }
];

const App: React.FC = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const auth = useSelector((state: RootState) => state.auth);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Global Greens</h1>
        <p>Fresh, Organic Vegetables Delivered to Your Door</p>
        <nav className="auth-links">
          {auth.isAuthenticated ? (
            <>
              <span className="auth-link">Welcome, {auth.user?.name}</span>
              <Link to="/cart" className="auth-link">Cart ({cart.items.length})</Link>
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
          <Route path="/" element={
            <>
              <div className="products">
                {products.map((product) => (
                  <div key={product.id} className="product-card">
                    <img src={product.image} alt={product.name} className="product-image" />
                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <p className="product-description">{product.description}</p>
                      <div className="product-details">
                        <span className="product-origin">Origin: {product.origin}</span>
                        <span className="product-organic">{product.organic ? 'Organic' : 'Conventional'}</span>
                      </div>
                      <p className="price">${product.price.toFixed(2)}</p>
                      <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                    </div>
                  </div>
                ))}
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
            </>
          } />
        </Routes>
      </main>
    </div>
  );
};

export default App; 