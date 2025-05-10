import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { RootState } from "@/redux/store";
import { 
  fetchAllProducts, 
  fetchProductSummaries, 
  Product, 
  ProductSummary
} from "@/redux/features/product/productSlice";
import NavbarSeller from "@/component/layout-productpage/NavbarSeller";
import PaginatedProductGrid from "@/component/layout-productpage/PaginatedProductGrid";
import SidebarProduct from "@/component/layout-productpage/SidebarProduct";

// Transformed product interface to match what PaginatedProductGrid expects
interface TransformedProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  rating: number;
  ratingCount: number;
  label?: string;
}

// Helper type guard functions to determine the type of object
function isProduct(item: Product | ProductSummary): item is Product {
  return 'name' in item;
}

function isProductSummary(item: Product | ProductSummary): item is ProductSummary {
  return 'product_name' in item;
}

const GlobalGreenStorePage: NextPage = () => {
  const dispatch = useAppDispatch();
  
  // Get products and loading state from Redux store
  const { products, productSummaries, filteredProducts, loading, error } = useAppSelector((state: RootState) => state.products);
  
  // Store data
  const storeData = {
    name: "GlobalGreen Organic Store",
    avatar: "/images/store-logo.jpg",
    lastActive: "5 menit lalu",
    productCount: products?.length || 0,
    followerCount: "24.7K",
    following: 0,
    chatPerformance: 92,
    rating: 4.6,
    reviewCount: "5.2K",
    memberSince: "3 Tahun Lalu",
  };

  // Split data fetching to prioritize products loading first
  useEffect(() => {
    // Fetch products immediately
    dispatch(fetchAllProducts());
    
    // Add a slight delay for product summaries to prioritize main product loading
    const summariesTimer = setTimeout(() => {
      dispatch(fetchProductSummaries());
    }, 100);
    
    return () => clearTimeout(summariesTimer);
  }, [dispatch]);

  // Transform products to display format
  const transformProducts = (items: Array<Product | ProductSummary> | null | undefined): TransformedProduct[] => {
    if (!items || !Array.isArray(items)) {
      return [];
    }
    
    return items.map(item => {
      if (isProduct(item)) {
        // It's a full Product
        return {
          id: item.product_id?.toString() || "",
          name: item.name || "",
          price: item.price || 0,
          originalPrice: item.discount_id ? Math.round((item.price || 0) * 1.2) : undefined,
          discount: item.discount_id ? 20 : undefined,
          image: item.images && Array.isArray(item.images) && item.images.length > 0 && item.images[0]?.image_url
            ? item.images[0].image_url 
            : "/images/placeholder.jpg",
          rating: 4.5,
          ratingCount: 100,
          label: (item.stock_quantity < 10) ? "Limited Stock" : (item.organic ? "Organic" : undefined)
        };
      } else if (isProductSummary(item)) {
        // It's a ProductSummary
        return {
          id: item.product_id?.toString() || "",
          name: item.product_name || "",
          price: item.price || 0,
          originalPrice: item.sale > 0 ? Math.round((item.price || 0) / (1 - (item.sale || 0)/100)) : undefined,
          discount: item.sale > 0 ? item.sale : undefined,
          image: item.images && Array.isArray(item.images) && item.images.length > 0 
            ? item.images[0] 
            : "/images/placeholder.jpg",
          rating: 4.5,
          ratingCount: 100,
          label: (item.stock < 10) ? "Limited Stock" : undefined
        };
      } else {
        // Default fallback object
        return {
          id: "",
          name: "",
          price: 0,
          image: "/images/placeholder.jpg",
          rating: 0,
          ratingCount: 0
        };
      }
    });
  };

  // Prioritize showing products immediately, then update with filtered results when available
  // This helps with perceived performance - show something as quickly as possible
  const baseProductsToDisplay = products && products.length > 0
    ? products
    : productSummaries && productSummaries.length > 0
      ? productSummaries
      : [];
      
  // Only apply filters after initial load
  const productsToDisplay = filteredProducts && filteredProducts.length > 0 && !loading
    ? filteredProducts
    : baseProductsToDisplay;

  const displayProducts = transformProducts(productsToDisplay);

  // Track component mounting and initial product loading state
  const [isMounted, setIsMounted] = useState(false);
  const [initialProductsLoaded, setInitialProductsLoaded] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Set initialProductsLoaded when we have at least some products to show
  useEffect(() => {
    if ((products && products.length > 0) || (productSummaries && productSummaries.length > 0)) {
      setInitialProductsLoaded(true);
    }
  }, [products, productSummaries]);

  // This ensures consistent server and client rendering
  if (!isMounted) {
    return (
      <div className="bg-gray-100 min-h-screen pt-36">
        <Head>
          <title>{storeData.name} | GlobalGreen Indonesia</title>
          <meta name="description" content="Fresh organic products from GlobalGreen" />
        </Head>

        {/* Simple loading skeleton that's identical on both server and client */}
        <div className="container mx-auto px-4 mb-8 pt-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-64">
              {/* Sidebar loading placeholder */}
              <div className="bg-white rounded shadow p-4 h-96"></div>
            </div>
            <div className="flex-1">
              <div className="py-6">
                <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-white rounded shadow overflow-hidden"
                    >
                      <div className="bg-gray-300 h-40 w-full"></div>
                      <div className="p-3">
                        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/4 mt-3"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen pt-36">
      <Head>
        <title>{storeData.name} | GlobalGreen Indonesia</title>
        <meta name="description" content="Fresh organic products from GlobalGreen" />
      </Head>

      {/* Navbar */}
      <NavbarSeller />

      {/* Main content with sidebar and products */}
      <div className="container mx-auto px-4 mb-8 pt-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Sidebar container - this div ensures proper positioning */}
          <div className="w-full md:w-64">
            <SidebarProduct />
          </div>

          {/* Product listing section */}
          <div className="flex-1">
            {/* Show products ASAP - Use loading skeleton only for initial load */}
            {!initialProductsLoaded ? (
              <div className="py-6">
                <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-white rounded shadow overflow-hidden animate-pulse"
                    >
                      <div className="bg-gray-300 h-40 w-full"></div>
                      <div className="p-3">
                        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/4 mt-3"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : error ? (
              <div className="bg-white p-4 rounded shadow">
                <p className="text-red-500">Error: {error}</p>
                <button 
                  className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                  onClick={() => dispatch(fetchAllProducts())}
                >
                  Try Again
                </button>
              </div>
            ) : displayProducts.length === 0 ? (
              <div className="bg-white p-4 rounded shadow">
                <p className="text-gray-500">No products found matching your filters.</p>
              </div>
            ) : (
              <>
                <PaginatedProductGrid
                  products={displayProducts}
                  productsPerPage={8}
                  title="Fresh Organic Products"
                />
                
                {/* Show a subtle loading indicator for ongoing filter operations */}
                {loading && (
                  <div className="mt-4 text-center">
                    <div className="inline-block px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm">
                      Updating filters...
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalGreenStorePage;