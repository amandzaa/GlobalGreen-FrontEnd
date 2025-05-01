import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import Head from "next/head";
import StoreInfo from "@/component/layout-productpage/StoreInfo";
import NavbarSeller from "@/component/layout-productpage/NavbarSeller";
import PaginatedProductGrid from "@/component/layout-productpage/PaginatedProductGrid";
import SidebarProduct from "@/component/layout-productpage/SidebarProduct";

interface Product {
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

const GlobalGreenStorePage: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state for demo purposes
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  // Sample product data - in a real app you'd fetch this from an API
  const products: Product[] = [
    {
      id: "1",
      name: "Jam tangan SMARTWATCH T500 & T55 SERIES 6",
      price: 41900,
      originalPrice: 51900,
      discount: 19,
      image: "/images/watch1.jpg",
      rating: 4.3,
      ratingCount: 1700,
      label: "Star",
    },
    {
      id: "2",
      name: "T500 SMARTWATCH Jam Tangan Pintar Anti Air",
      price: 43500,
      originalPrice: 53000,
      discount: 18,
      image: "/images/watch2.jpg",
      rating: 4.4,
      ratingCount: 3200,
      label: "Star",
    },
    {
      id: "3",
      name: "TWS M19 EARPHONE BLUETOOTH WIRELESS HEADSET",
      price: 32000,
      originalPrice: 42000,
      discount: 24,
      image: "/images/earphone1.jpg",
      rating: 4.5,
      ratingCount: 1600,
      label: "Star",
    },
    {
      id: "4",
      name: "(Terlaris) SmartWatch Y68 Sport Tahan Air",
      price: 28900,
      originalPrice: 39000,
      discount: 26,
      image: "/images/watch3.jpg",
      rating: 4.2,
      ratingCount: 1000,
      label: "Star",
    },
    {
      id: "5",
      name: "Ultrapods TWS Bluetooth 5.3 Earphone",
      price: 27500,
      originalPrice: 35000,
      discount: 22,
      image: "/images/earphone2.jpg",
      rating: 4.5,
      ratingCount: 1000,
      label: "Star",
    },
    {
      id: "6",
      name: "Smartwatch i8 Ultra Free 2 Tali Plus Earphone",
      price: 92000,
      originalPrice: 120000,
      discount: 24,
      image: "/images/watch4.jpg",
      rating: 4.6,
      ratingCount: 3200,
      label: "Star",
    },
    // Add more products to demonstrate pagination
    {
      id: "7",
      name: "SmartWatch Series 8 Pro Max GPS",
      price: 128000,
      originalPrice: 158000,
      discount: 19,
      image: "/images/watch5.jpg",
      rating: 4.7,
      ratingCount: 850,
      label: "Star",
    },
    {
      id: "8",
      name: "TWS Pro Earbuds With Active Noise Cancellation",
      price: 89000,
      originalPrice: 125000,
      discount: 29,
      image: "/images/earphone3.jpg",
      rating: 4.8,
      ratingCount: 1200,
      label: "Star",
    },
    {
      id: "9",
      name: "Premium Waterproof Bluetooth Speaker",
      price: 67500,
      originalPrice: 85000,
      discount: 21,
      image: "/images/speaker1.jpg",
      rating: 4.4,
      ratingCount: 950,
      label: "Star",
    },
    {
      id: "10",
      name: "Power Bank Fast Charging 20000mAh",
      price: 139000,
      originalPrice: 175000,
      discount: 21,
      image: "/images/powerbank1.jpg",
      rating: 4.6,
      ratingCount: 2100,
      label: "Star",
    },
    {
      id: "11",
      name: "Universal Phone Holder for Car Dashboard",
      price: 24500,
      originalPrice: 35000,
      discount: 30,
      image: "/images/holder1.jpg",
      rating: 4.3,
      ratingCount: 3500,
      label: "Star",
    },
    {
      id: "12",
      name: "Wireless Gaming Mouse RGB Backlight",
      price: 78000,
      originalPrice: 99000,
      discount: 21,
      image: "/images/mouse1.jpg",
      rating: 4.5,
      ratingCount: 1800,
      label: "Star",
    },
    {
      id: "13",
      name: "RGB Mechanical Gaming Keyboard Blue Switch",
      price: 249000,
      originalPrice: 299000,
      discount: 17,
      image: "/images/keyboard1.jpg",
      rating: 4.7,
      ratingCount: 920,
      label: "Star",
    },
    {
      id: "14",
      name: "USB Type C Fast Charging Cable 2m",
      price: 19500,
      originalPrice: 25000,
      discount: 22,
      image: "/images/cable1.jpg",
      rating: 4.4,
      ratingCount: 5200,
      label: "Star",
    },
    {
      id: "15",
      name: "HD Webcam 1080p with Microphone",
      price: 85000,
      originalPrice: 110000,
      discount: 23,
      image: "/images/webcam1.jpg",
      rating: 4.3,
      ratingCount: 780,
      label: "Star",
    },
  ];

  // Store data
  const storeData = {
    name: "Grosir_Jam_Tangan_Murah",
    avatar: "/images/store-logo.jpg",
    lastActive: "5 menit lalu",
    productCount: 108,
    followerCount: "524,4RB",
    following: 0,
    chatPerformance: 86,
    rating: 4.4,
    reviewCount: "783,7RB",
    memberSince: "6 Tahun Lalu",
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>{storeData.name} | GlobalGreen Indonesia</title>
        <meta name="description" content="Grosir jam tangan wanita pria" />
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

      {/* Navigation tabs */}
      {/* <div className="bg-white mb-4">
        <div className="container mx-auto px-4">
          <ProductNavigation />
        </div>
      </div> */}

      {/* Main content with sidebar and products */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-white rounded shadow">
            <SidebarProduct />
          </div>

          {/* Product listing section */}
          <div className="flex-1">
            {isLoading ? (
              <div className="py-6">
                <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[...Array(6)].map((_, i) => (
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
            ) : (
              <PaginatedProductGrid
                products={products}
                productsPerPage={8}
                title="Recommended"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalGreenStorePage;
