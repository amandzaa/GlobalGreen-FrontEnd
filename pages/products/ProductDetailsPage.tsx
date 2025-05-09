import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
  origin: string;
  organic: boolean;
  isNew: boolean;
  stock: number;
  category: string;
  stock_quantity: number;
}

const ProductDetailsPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchProductDetails = async () => {
    try {
      const response = await fetch('https://globalgreen-backend-production.up.railway.app/products/' + router.query.id);
      const productData: Product = await response.json();
      setProduct(productData);
    } catch (error) {
      setError('Failed to fetch product details');
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);

  if (error) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}><h2>{error}</h2></div>;
  }

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
          <p style={{ marginBottom: 16 }}><strong>Category:</strong> {product.category}</p>
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