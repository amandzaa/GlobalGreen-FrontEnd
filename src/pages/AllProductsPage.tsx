import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../store/slices/cartSlice';
import ProductCard from '../components/ProductCard';

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

const PRODUCTS_PER_PAGE = 2;

const AllProductsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('newest');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  // Filter and search
  let filteredProducts = products.filter(product => {
    const matchesCategory = category === 'all' || product.category === category;
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort
  if (sort === 'price-low-high') {
    filteredProducts = filteredProducts.slice().sort((a, b) => a.price - b.price);
  } else if (sort === 'price-high-low') {
    filteredProducts = filteredProducts.slice().sort((a, b) => b.price - a.price);
  } else if (sort === 'newest') {
    filteredProducts = filteredProducts.slice().sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  }

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE
  );

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
    setMessage(`${product.name} added to cart!`);
    setTimeout(() => setMessage(''), 1500);
  };

  const handleViewDetails = (product: Product) => {
    navigate(`/products/${product.id}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    setPage(1);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
    setPage(1);
  };

  return (
    <div className="all-products-page">
      <h2 className="products-title">All Products</h2>
      <div className="product-filters">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={handleSearchChange}
          className="product-search"
        />
        <select value={category} onChange={handleCategoryChange} className="product-category-filter">
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}</option>
          ))}
        </select>
        <select value={sort} onChange={handleSortChange} className="product-sort-filter">
          <option value="newest">Newest</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
        </select>
      </div>
      {message && <div className="cart-message">{message}</div>}
      <div className="products-grid">
        {paginatedProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} onViewDetails={handleViewDetails} />
          ))
        )}
      </div>
      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1} className="pagination-btn">Previous</button>
        <span className="pagination-info"> Page {page} of {totalPages} </span>
        <button onClick={() => setPage(page + 1)} disabled={page === totalPages} className="pagination-btn">Next</button>
      </div>
    </div>
  );
};

export default AllProductsPage; 