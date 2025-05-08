import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useWishlist } from '../contexts/WishlistContext';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  organic: boolean;
  origin: string;
  stock: number;
  isNew: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onViewDetails }) => {
  const { isWishlisted, toggleWishlist } = useWishlist();

  return (
    <div className="product-card">
      <button
        className="wishlist-btn"
        aria-label={isWishlisted(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
        onClick={() => toggleWishlist(product.id)}
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1.5rem',
          color: isWishlisted(product.id) ? '#e53935' : '#aaa'
        }}
      >
        {isWishlisted(product.id) ? '❤️' : '🤍'}
      </button>
      <Image
        src={product.image}
        alt={product.name}
        width={400}
        height={300}
        className="product-image"
      />
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <p className="product-description">{product.description}</p>
        <div className="product-actions">
          <button onClick={() => onAddToCart(product)} disabled={product.stock === 0} className="btn-primary">
            Add to Cart
          </button>
          <Link href={`/products/${product.id}`} className="btn-secondary">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 