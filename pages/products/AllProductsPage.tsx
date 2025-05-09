import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { addToCart } from '../../store/slices/cartSlice';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  organic: boolean;
  origin: string;
  stock: number;
  isNew: boolean;
  reviews: number;
  rating: number;
  image: string;
  brand: string;
  weight: string;
  ingredients: string;
  allergens: string;
}

const AllProductsPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://globalgreen-backend-production.up.railway.app/products');
        const productData = await response.json();
        setProducts(productData);
      } catch (error) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleViewDetails = (productId: number) => {
    router.push(`/products/${productId}`);
  };

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="all-products-page">
      <h2 className="products-title">All Products</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProductsPage;