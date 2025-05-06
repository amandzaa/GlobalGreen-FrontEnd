import React from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  organic: boolean;
  origin: string;
  stock?: number;
  isNew?: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onViewDetails }) => {
  return (
    <div className="product-card card-shadow">
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.name} className="product-image" />
        {product.isNew && <span className="badge badge-new">New</span>}
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <div className="product-meta">
          <span className={`product-organic badge ${product.organic ? 'badge-organic' : 'badge-conventional'}`}>{product.organic ? 'Organic' : 'Conventional'}</span>
          <span className="product-origin">Origin: {product.origin}</span>
        </div>
        <p className="product-description">{product.description}</p>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <div className="product-actions">
          {product.stock === 0 ? (
            <button className="add-to-cart btn-disabled" disabled>Out of Stock</button>
          ) : (
            <button className="add-to-cart btn-primary" onClick={() => onAddToCart(product)}>Add to Cart</button>
          )}
          <button className="view-details btn-secondary" onClick={() => onViewDetails(product)}>View Details</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 