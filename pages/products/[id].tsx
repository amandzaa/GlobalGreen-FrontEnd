import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import { useWishlist } from '../../contexts/WishlistContext';

interface Product {
  category_id: number;
  created_at: string;
  description: string;
  image_url: string;
  images: string[];
  name: string;
  organic: boolean;
  price: number;
  product_id: number;
  stock_quantity: number;
  unit_type: string;
  update_at: string;
}

const ProductDetailsPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [product, setProduct] = useState<Product | null>(null);

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(`https://globalgreen-backend-production.up.railway.app/products/${router.query.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product details');
      }
      const productData = await response.json();
      console.log(productData);// log the fetched product data
      setProduct(productData);
    } catch (error) {
      console.error('Error fetching product details:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [router.query.id]);

  if (!product) {
    return <p>Loading product details...</p>;
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product,stock_quantity: 1 }));
  };

  return (
    <div style={{ maxWidth: 1000, margin: '2rem auto', padding: '0 1rem' }}>
      <button onClick={() => router.back()} style={{ marginBottom: 16 }}>← Back</button>
      <div style={{ display: 'flex', gap: 32 }}>
        <img src={product.image_url} alt={product.name} style={{ width: 400, height: 400, objectFit: 'cover', borderRadius: 8 }} />
        <div>
          <h1 style={{ marginBottom: 8 }}>{product.name}</h1>
          <p style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>${product.price.toFixed(2)}</p>
          <p style={{ marginBottom: 16 }}>{product.description}</p>
          <div style={{ marginBottom: 16 }}>
            <span style={{ marginRight: 16 }}>Category ID: {product.category_id}</span>
            <span style={{ marginRight: 16 }}>Organic: {product.organic ? 'Yes' : 'No'}</span>
          </div>
          <div style={{ marginBottom: 16 }}>
            <span>Stock: {product.stock_quantity} {product.unit_type}</span>
          </div>
          <button onClick={handleAddToCart} disabled={product.stock_quantity === 0} style={{ marginRight: 16 }}>
            Add to Cart
          </button>
          <button onClick={() => toggleWishlist(product.product_id)}>
            {isWishlisted(product.product_id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;