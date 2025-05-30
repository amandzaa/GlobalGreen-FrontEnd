import React, { useEffect } from "react";
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
import StoreInfo from "@/component/layout-productpage/StoreInfo";
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

const GlobalGreenStorePageSeller: NextPage = () => {
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

  // Fetch products when component mounts
  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchProductSummaries());
  }, [dispatch]);

  // Transform products to display format
  const transformProducts = (items: Array<Product | ProductSummary>): TransformedProduct[] => {
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

  // Use filtered products if available, otherwise use all products or summaries
  const productsToDisplay = filteredProducts && filteredProducts.length > 0
    ? filteredProducts
    : productSummaries && productSummaries.length > 0
      ? productSummaries
      : products || [];

  const displayProducts = transformProducts(productsToDisplay);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>{storeData.name} | GlobalGreen Indonesia</title>
        <meta name="description" content="Fresh organic products from GlobalGreen" />
      </Head>

      {/* Navbar */}
      <NavbarSeller />

      {/* Store info */}
      <div className="bg-white mb-4 pt-32 pb-4">
        <div className="container mx-auto px-4">
          <StoreInfo
            name={storeData.name}
            avatar={storeData.avatar}
            lastActive={storeData.lastActive}
            productCount={storeData.productCount}
            followerCount={storeData.followerCount}
            following={storeData.following}
            chatPerformance={storeData.chatPerformance}
            rating={storeData.rating}
            reviewCount={storeData.reviewCount}
            memberSince={storeData.memberSince}
          />
        </div>
      </div>

      {/* Main content with sidebar and products */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-white rounded shadow">
            <SidebarProduct />
          </div>

          {/* Product listing section */}
          <div className="flex-1">
            {loading ? (
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
              <PaginatedProductGrid
                products={displayProducts}
                productsPerPage={8}
                title="Fresh Organic Products"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalGreenStorePageSeller;
