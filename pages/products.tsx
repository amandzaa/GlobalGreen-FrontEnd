import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from '../store/store';
import { addToCart } from '../store/slices/cartSlice';
import ProductCard from '../components/ProductCard';
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

// Mock products
const products: Product[] = [
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

const AllProductsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('newest');
  const dispatch = useDispatch();
  const router = useRouter();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const handleAddToCart = (product: any) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  const handleViewDetails = (product: Product) => {
    router.push(`/products/${product.id}`);
  };

  const filteredProducts = products.filter(product => {
    if (category === 'all') return true;
    if (category === 'organic') return product.organic;
    if (category === 'new') return product.isNew;
    return product.category === category;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === 'price') return a.price - b.price;
    return a.name.localeCompare(b.name);
  });

  return (
    <div style={{ maxWidth: 1200, margin: '2rem auto', padding: '0 1rem' }}>
      <h2 style={{ marginBottom: 24 }}>All Products</h2>
      <div style={{ marginBottom: 24, display: 'flex', gap: 16 }}>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All Products</option>
          <option value="organic">Organic Only</option>
          <option value="new">New Arrivals</option>
          <option value="root-vegetables">Root Vegetables</option>
          <option value="leafy-greens">Leafy Greens</option>
          <option value="fruits">Fruits</option>
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="price">Sort by Price</option>
          <option value="name">Sort by Name</option>
        </select>
      </div>
      <div className="products-grid">
        {sortedProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={() => handleAddToCart(product)}
            onViewDetails={() => handleViewDetails(product)}
          />
        ))}
      </div>
    </div>
  );
};

export default AllProductsPage; 