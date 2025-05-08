import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import ProductCard from '../../components/ProductCard';
import { useWishlist } from '../../contexts/WishlistContext';

// Mock products with sellerId
const products = [
  {
    id: 1,
    name: "Organic Carrots",
    price: 2.99,
    description: "Fresh, crunchy organic carrots grown locally with sustainable farming practices.",
    image: "https://images.unsplash.com/photo-1447175008436-054170c2e979?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "root-vegetables",
    organic: true,
    origin: "Local Farm",
    stock: 10,
    isNew: true,
    sellerId: '1',
  },
  {
    id: 2,
    name: "Fresh Spinach",
    price: 3.49,
    description: "Tender, nutrient-rich spinach leaves, perfect for salads and cooking.",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "leafy-greens",
    organic: true,
    origin: "Local Farm",
    stock: 0,
    isNew: false,
    sellerId: '2',
  },
  {
    id: 3,
    name: "Heirloom Tomatoes",
    price: 4.99,
    description: "Juicy, flavorful heirloom tomatoes grown using traditional methods.",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "fruits",
    organic: true,
    origin: "Local Farm",
    stock: 5,
    isNew: true,
    sellerId: '1',
  }
];

const SellerProductsPage: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { isWishlisted, toggleWishlist } = useWishlist();
  if (!user || user.role !== 'seller') {
    return <div><h2>My Products</h2><p>You are not authorized to view this page.</p></div>;
  }
  const sellerProducts = products.filter(p => p.sellerId === user.id);

  return (
    <div style={{ maxWidth: 1000, margin: '2rem auto', padding: '0 1rem' }}>
      <h2 style={{ marginBottom: 24 }}>My Products</h2>
      {sellerProducts.length === 0 ? (
        <p>You have no products listed.</p>
      ) : (
        <div className="products-grid">
          {sellerProducts.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={() => {}} onViewDetails={() => {}} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerProductsPage; 