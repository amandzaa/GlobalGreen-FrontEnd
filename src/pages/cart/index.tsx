import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NextPage } from 'next';
import Head from 'next/head';
import { RootState, AppDispatch } from '@/redux/store';
import { fetchCart } from '@/redux/features/cart/cartSlice';
import { ErrorBoundary } from 'react-error-boundary';
import CartHeader from '@/component/cart/CartHeader';
import CartSummary from '@/component/cart/CartSummary';
import CartTable from '@/component/cart/CartTable';
import EmptyCart from '@/component/cart/EmptyCart';
import { CartProduct } from '@/types/cart';

// Error fallback component to handle any crashes gracefully
const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) => {
  const dispatch = useDispatch<AppDispatch>();
  
  return (
    <div className="bg-red-50 border border-red-200 rounded p-4 my-4">
      <h2 className="text-xl font-semibold text-red-700 mb-2">Something went wrong:</h2>
      <p className="text-red-600 mb-4">{error.message}</p>
      <button
        onClick={() => {
          resetErrorBoundary();
          dispatch(fetchCart());
        }}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Try again
      </button>
    </div>
  );
};

const CartPage: NextPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((state: RootState) => state.cart);
  const [isClient, setIsClient] = useState(false);
  
  // State to hold selected items from CartTable
  const [selectedItems, setSelectedItems] = useState<CartProduct[]>([]);
  
  // Handler for when selected items change in CartTable
  const handleSelectedItemsChange = (items: CartProduct[]) => {
    setSelectedItems(items);
  };
  
  useEffect(() => {
    setIsClient(true);
    dispatch(fetchCart());
  }, [dispatch]);

  // Initialize selected items when cart items are loaded
  useEffect(() => {
    if (items.length > 0) {
      setSelectedItems(items); // Initially select all items
    } else {
      setSelectedItems([]);
    }
  }, [items]);

  // Loading state
  if (loading && !isClient) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <p className="text-xl">Loading cart...</p>
        </div>
      </div>
    );
  }

  // Error state outside ErrorBoundary (for API errors)
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded p-4 my-4">
          <h2 className="text-xl font-semibold text-red-700 mb-2">Error loading cart</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => dispatch(fetchCart())}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  // Empty cart state
  if (isClient && items.length === 0 && !loading) {
    return (
      <>
        <Head>
          <title>Shopping Cart</title>
        </Head>
        <div className="container mx-auto px-4 py-8">
          <CartHeader />
          <EmptyCart />
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Shopping Cart</title>
      </Head>
      
      <div className="container mx-auto px-4 py-8">
        <CartHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          <div className="lg:col-span-2">
            <ErrorBoundary 
              FallbackComponent={ErrorFallback}
              onReset={() => {
                console.log('Attempting to recover from cart table error');
              }}
            >
              {!isClient ? (
                <div className="flex justify-center items-center h-64">
                  <p className="text-xl">Loading cart...</p>
                </div>
              ) : (
                <CartTable onSelectedItemsChange={handleSelectedItemsChange} />
              )}
            </ErrorBoundary>
          </div>
          
          <div>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              {isClient && <CartSummary selectedItems={selectedItems} />}
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;