import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import ProductCard from '../../components/ProductCard';
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
  quantity_stock: number;
  unit_type: string;
  update_at: string;
  sellerId: number;
}

const SellerProductsPage = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://globalgreen-backend-production.up.railway.app/products'); // Update with your API URL
        const productsData = await response.json();
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  if (!user || user.role !== 'seller') {
    return <div><h2>My Products</h2><p>You are not authorized to view this page.</p></div>;
  }

  const sellerProducts = products.filter(p => p.sellerId === parseInt(user.id, 10));

  return (
    <div style={{ maxWidth: 1000, margin: '2rem auto', padding: '0 1rem' }}>
      <h2 style={{ marginBottom: 24 }}>My Products</h2>
      {sellerProducts.length === 0 ? (
        <p>You have no products listed.</p>
      ) : (
        <div className="products-grid">
          {sellerProducts.map(product => (
            <div key={product.product_id}>
              <img src={product.image_url} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Stock: {product.quantity_stock} {product.unit_type}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerProductsPage;