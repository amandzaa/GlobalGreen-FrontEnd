import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { addToCart } from '../../store/slices/cartSlice';
import ProductCard from '../../components/ProductCard';

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

const AllProductsPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleViewDetails = (productId: number) => {
    router.push(`/products/${productId}`);
  };

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="all-products-page">
      <h2 className="products-title">All Products</h2>
      {/* Add your product list rendering here */}
    </div>
  );
};

export default AllProductsPage; 