import React from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';

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
  }
];

const ProductDetailsPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}><h2>Product not found</h2></div>;
  }

  return (
    <div className="product-details-page" style={{ maxWidth: 700, margin: '2rem auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: '2rem' }}>
      <button onClick={() => router.back()} className="btn-secondary" style={{ marginBottom: 20 }}>&larr; Back</button>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
        <img src={product.image} alt={product.name} style={{ width: 280, borderRadius: 12, objectFit: 'cover', flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '2rem', marginBottom: 8 }}>{product.name}</h2>
          <div style={{ marginBottom: 8 }}>
            <span className={`badge ${product.organic ? 'badge-organic' : 'badge-conventional'}`}>{product.organic ? 'Organic' : 'Conventional'}</span>
            {product.isNew && <span className="badge badge-new" style={{ marginLeft: 8 }}>New</span>}
          </div>
          <p className="product-price" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4CAF50', marginBottom: 16 }}>${product.price.toFixed(2)}</p>
          <p style={{ marginBottom: 16 }}>{product.description}</p>
          <p style={{ marginBottom: 16 }}><strong>Origin:</strong> {product.origin}</p>
          {product.stock === 0 ? (
            <button className="btn-disabled" disabled>Out of Stock</button>
          ) : (
            <button className="btn-primary" onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage; 