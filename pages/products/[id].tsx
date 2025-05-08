import React from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import { useWishlist } from '../../contexts/WishlistContext';

// Mock products
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

export async function getServerSideProps({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === parseInt(params.id));
  return {
    props: {
      product: product || null,
    },
  };
}

const ProductDetailsPage = ({ product }: { product: any }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isWishlisted, toggleWishlist } = useWishlist();

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  return (
    <div style={{ maxWidth: 1000, margin: '2rem auto', padding: '0 1rem' }}>
      <button onClick={() => router.back()} style={{ marginBottom: 16 }}>← Back</button>
      <div style={{ display: 'flex', gap: 32 }}>
        <img src={product.image} alt={product.name} style={{ width: 400, height: 400, objectFit: 'cover', borderRadius: 8 }} />
        <div>
          <h1 style={{ marginBottom: 8 }}>{product.name}</h1>
          <p style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>${product.price.toFixed(2)}</p>
          <p style={{ marginBottom: 16 }}>{product.description}</p>
          <div style={{ marginBottom: 16 }}>
            <span style={{ marginRight: 16 }}>Category: {product.category}</span>
            {product.organic && <span style={{ marginRight: 16 }}>Organic</span>}
            {product.isNew && <span>New Arrival</span>}
          </div>
          <div style={{ marginBottom: 16 }}>
            <span>Origin: {product.origin}</span>
          </div>
          <div style={{ marginBottom: 16 }}>
            <span>Stock: {product.stock}</span>
          </div>
          <button onClick={handleAddToCart} disabled={product.stock === 0} style={{ marginRight: 16 }}>
            Add to Cart
          </button>
          <button onClick={() => toggleWishlist(product.id)}>
            {isWishlisted(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage; 