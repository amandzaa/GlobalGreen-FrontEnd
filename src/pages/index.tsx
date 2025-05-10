// pages/home/index.tsx
import React, { useState } from "react";
import Image from "next/image";
import { 
  Calendar, 
  Leaf, 
  ShoppingBag, 
  Truck, 
  Users, 
  ChevronDown, 
  ChevronUp,
  Award,
  Heart
} from "lucide-react";
import HeroBanner, { BannerSlide } from "@/component/heropage/HeroBanner";
import NavbarGlobalGreen from "@/component/layout-productpage/NavbarSeller";

const FreshHomePage: React.FC = () => {
  const bannerSlides: BannerSlide[] = [
    {
      title: "Fresh From Farm to Table",
      description:
        "Discover locally-sourced, organic fruits and vegetables delivered straight to your doorstep. Support local farmers while enjoying the freshest produce available.",
      buttonText: "Shop Fresh Produce",
      imageSrc: "https://picsum.photos/id/292/800/400", // Image of fresh produce
      buttonLink: "/fresh-produce",
    },
    {
      title: "Become a GlobalGreen Supplier",
      description:
        "Join our network of trusted farmers and suppliers. Reach thousands of customers looking for quality produce and grow your business with our seller-friendly platform.",
      buttonText: "Start Selling",
      imageSrc: "https://picsum.photos/id/674/800/400", // Farm/agriculture image
      buttonLink: "/become-seller",
    },
    {
      title: "Weekly Organic Box Subscriptions",
      description:
        "Never run out of fresh produce! Subscribe to our weekly boxes filled with seasonal organic fruits and vegetables, curated to provide nutritional variety and value.",
      buttonText: "Subscribe Now",
      imageSrc: "https://picsum.photos/id/139/800/400", // Box of vegetables
      buttonLink: "/subscription-boxes",
    },
    {
      title: "Seasonal Harvest Specials",
      description:
        "Enjoy the best of each season with our specially curated collections. Currently featuring spring favorites at special prices - ripe strawberries, fresh asparagus, and more!",
      buttonText: "View Seasonal Deals",
      imageSrc: "https://picsum.photos/id/1080/800/400", // Seasonal produce
      buttonLink: "/seasonal-specials",
    },
  ];

  const [openSections, setOpenSections] = useState({
    howItWorks: true,
    benefits: false,
    sellerInfo: false,
  });

  type SectionKeys = "howItWorks" | "benefits" | "sellerInfo";
  
  interface OpenSectionsState {
    howItWorks: boolean;
    benefits: boolean;
    sellerInfo: boolean;
  }

  const toggleSection = (section: SectionKeys) => {
    setOpenSections((prev: OpenSectionsState) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Featured categories
  const featuredCategories = [
    {
      title: "Organic Fruits",
      image: "https://picsum.photos/id/1080/300/300",
      count: "25+ varieties"
    },
    {
      title: "Fresh Vegetables",
      image: "https://picsum.photos/id/292/300/300",
      count: "40+ varieties"
    },
    {
      title: "Seasonal Specials",
      image: "https://picsum.photos/id/139/300/300",
      count: "15+ items"
    },
    {
      title: "Value Bundles",
      image: "https://picsum.photos/id/674/300/300",
      count: "10+ bundles"
    }
  ];

  // Featured products (bestsellers)
  const bestSellers = [
    {
      name: "Organic Avocados",
      price: "Rp36000",
      unit: "pack of 4",
      image: "https://picsum.photos/id/1080/200/200",
      seller: "Green Valley Farms",
      rating: 4.8
    },
    {
      name: "Fresh Strawberries",
      price: "Rp39000",
      unit: "1 lb",
      image: "https://picsum.photos/id/1080/200/200",
      seller: "Berry Good Produce",
      rating: 4.7
    },
    {
      name: "Sweet Potatoes",
      price: "Rp30000",
      unit: "2 lb bag",
      image: "https://picsum.photos/id/292/200/200",
      seller: "Root Vegetable Co-op",
      rating: 4.6
    },
    {
      name: "Mixed Salad Greens",
      price: "Rp25200",
      unit: "5 oz box",
      image: "https://picsum.photos/id/292/200/200",
      seller: "Fresh Leaf Organics",
      rating: 4.9
    }
  ];

  // Seller highlights
  const sellerHighlights = [
    {
      name: "Green Valley Farms",
      specialty: "Organic Fruits",
      image: "https://picsum.photos/id/674/200/200",
      description: "Family-owned farm specializing in pesticide-free fruits with sustainable farming practices."
    },
    {
      name: "Fresh Leaf Organics",
      specialty: "Leafy Greens",
      image: "https://picsum.photos/id/674/200/200",
      description: "Urban farm focusing on quick-to-market hydroponic greens and herbs."
    },
    {
      name: "Root Vegetable Co-op",
      specialty: "Root Vegetables",
      image: "https://picsum.photos/id/674/200/200",
      description: "Collective of small farms combining resources to deliver the freshest root vegetables year-round."
    }
  ];

  // Handle banner button clicks
  const handleBannerButtonClick = (index: number) => {
    const slide = bannerSlides[index];
    if (slide.buttonLink) {
      console.log(`Navigating to: ${slide.buttonLink}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarGlobalGreen/>

      <main>
        {/* Hero Banner Component */}
        <div className="pt-36">
          <HeroBanner
            slides={bannerSlides}
            onButtonClick={handleBannerButtonClick}
          />
        </div>

        {/* How It Works + Benefits */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="space-y-4">
            {/* How It Works Section */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div
                className="px-6 py-4 flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection("howItWorks")}
              >
                <h2 className="text-xl font-semibold text-green-800">
                  How GlobalGreen Works
                </h2>
                {openSections.howItWorks ? (
                  <ChevronUp className="text-green-700" />
                ) : (
                  <ChevronDown className="text-green-700" />
                )}
              </div>

              {openSections.howItWorks && (
                <div className="px-6 py-6 text-gray-700 border-t border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-green-100 p-4 rounded-full">
                        <ShoppingBag className="h-8 w-8 text-green-700" />
                      </div>
                      <h3 className="mt-4 font-medium text-lg">Shop Fresh</h3>
                      <p className="mt-2">Browse organic fruits and vegetables from verified local farmers and suppliers.</p>
                    </div>
                    
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-green-100 p-4 rounded-full">
                        <Truck className="h-8 w-8 text-green-700" />
                      </div>
                      <h3 className="mt-4 font-medium text-lg">Fast Delivery</h3>
                      <p className="mt-2">Get same-day or next-day delivery to ensure maximum freshness.</p>
                    </div>
                    
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-green-100 p-4 rounded-full">
                        <Calendar className="h-8 w-8 text-green-700" />
                      </div>
                      <h3 className="mt-4 font-medium text-lg">Subscribe & Save</h3>
                      <p className="mt-2">Set up regular deliveries and save up to 15% on weekly produce boxes.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Benefits Section */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div
                className="px-6 py-4 flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection("benefits")}
              >
                <h2 className="text-xl font-semibold text-green-800">
                  Benefits of Choosing GlobalGreen
                </h2>
                {openSections.benefits ? (
                  <ChevronUp className="text-green-700" />
                ) : (
                  <ChevronDown className="text-green-700" />
                )}
              </div>

              {openSections.benefits && (
                <div className="px-6 py-6 text-gray-700 border-t border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex space-x-4">
                      <div className="flex-shrink-0">
                        <Leaf className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Fresher Produce</h3>
                        <p className="mt-1 text-sm">Direct from farms means produce is harvested at peak ripeness and delivered to you within 24-48 hours.</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-4">
                      <div className="flex-shrink-0">
                        <Users className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Support Local</h3>
                        <p className="mt-1 text-sm">Our platform connects you directly with local farmers, ensuring they receive fair compensation for their work.</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-4">
                      <div className="flex-shrink-0">
                        <Award className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Quality Guarantee</h3>
                        <p className="mt-1 text-sm">All our suppliers are vetted for quality. Not satisfied? We offer a 100% satisfaction guarantee.</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-4">
                      <div className="flex-shrink-0">
                        <Heart className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Better for the Planet</h3>
                        <p className="mt-1 text-sm">Reduced food miles, eco-friendly packaging, and support for sustainable farming practices.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Seller Information Section */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div
                className="px-6 py-4 flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection("sellerInfo")}
              >
                <h2 className="text-xl font-semibold text-green-800">
                  Become a GlobalGreen Seller
                </h2>
                {openSections.sellerInfo ? (
                  <ChevronUp className="text-green-700" />
                ) : (
                  <ChevronDown className="text-green-700" />
                )}
              </div>

              {openSections.sellerInfo && (
                <div className="px-6 py-6 text-gray-700 border-t border-gray-100">
                  <div className="md:flex md:space-x-6">
                    <div className="md:w-1/2 mb-6 md:mb-0">
                      <h3 className="font-medium text-lg mb-4">Why Sell With Us?</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Direct access to thousands of customers looking for fresh produce</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Low commission fees compared to traditional wholesalers</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Flexible delivery options - use our logistics or your own</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Analytics dashboard to track your sales and customer preferences</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Weekly payments and transparent fee structure</span>
                        </li>
                      </ul>
                    </div>
                    <div className="md:w-1/2">
                      <h3 className="font-medium text-lg mb-4">How to Get Started</h3>
                      <ol className="space-y-3 list-decimal pl-5">
                        <li>Register for a GlobalGreen seller account</li>
                        <li>Complete our simple verification process</li>
                        <li>List your products with photos and descriptions</li>
                        <li>Set your delivery options and areas</li>
                        <li>Start receiving orders and growing your business!</li>
                      </ol>
                      <div className="mt-6">
                        <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-lg font-medium">
                          Apply Now
                        </button>
                        <a href="#" className="ml-4 text-green-700 hover:text-green-800 font-medium">
                          Learn More
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Featured Categories */}
        <div className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-green-800 mb-6">Shop By Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {featuredCategories.map((category, index) => (
                <div 
                  key={index} 
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="relative h-48">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-lg">{category.title}</h3>
                    <p className="text-sm text-gray-500">{category.count}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Best Sellers */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-green-800 mb-6">Customer Favorites</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {bestSellers.map((product, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="relative h-48">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium">{product.name}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-lg font-bold text-green-700">{product.price}</span>
                    <span className="text-sm text-gray-500">per {product.unit}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Sold by: {product.seller}</p>
                  <div className="flex items-center mt-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-1">{product.rating}</span>
                  </div>
                  <button className="mt-3 w-full bg-green-700 hover:bg-green-800 text-white rounded-md py-2 text-sm font-medium">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Sellers */}
        <div className="bg-green-50 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-green-800 mb-6">Meet Our Farmers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sellerHighlights.map((seller, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-lg shadow-sm p-6 flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4"
                >
                  <div className="w-24 h-24 relative">
                    <Image
                      src={seller.image}
                      alt={seller.name}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{seller.name}</h3>
                    <p className="text-green-700 text-sm">{seller.specialty}</p>
                    <p className="mt-2 text-gray-600">{seller.description}</p>
                    <a href="#" className="inline-block mt-3 text-green-700 hover:text-green-800 font-medium">
                      View Products
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter & App Download */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="bg-green-700 rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-8">
                <h2 className="text-2xl font-bold text-white mb-4">Get Fresh Updates</h2>
                <p className="text-green-100 mb-6">
                  Subscribe to our newsletter for seasonal recipes, special offers, and updates from our farmers.
                </p>
                <div className="flex">
                  <input
                    type="email"
                    className="flex-grow rounded-l-lg px-4 py-2 focus:outline-none"
                    placeholder="Your email address"
                  />
                  <button className="bg-green-900 hover:bg-green-800 text-white font-medium px-6 py-2 rounded-r-lg">
                    Subscribe
                  </button>
                </div>
              </div>
              <div className="md:w-1/2 bg-green-800 p-8 text-center md:text-left">
                <h2 className="text-2xl font-bold text-white mb-4">Download Our App</h2>
                <p className="text-green-100 mb-6">
                  Get exclusive app-only deals and track your deliveries in real-time.
                </p>
                <div className="flex justify-center md:justify-start space-x-4">
                  <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center">
                    <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.5 12c0 1.7-0.7 3.2-1.8 4.3l-1.1 1.1 1.8 3.2c0.1 0.2 0 0.5-0.2 0.6-0.2 0.1-0.5 0-0.6-0.2l-1.8-3.2c-1.1 0.7-2.4 1.2-3.8 1.2s-2.7-0.5-3.8-1.2l-1.8 3.2c-0.1 0.2-0.4 0.3-0.6 0.2-0.2-0.1-0.3-0.4-0.2-0.6l1.8-3.2-1.1-1.1c-1.1-1.1-1.8-2.6-1.8-4.3 0-3.3 2.7-6 6-6s6 2.7 6 6z"/>
                    </svg>
                    <div className="text-left">
                      <div className="text-xs">Download on the</div>
                      <div className="text-sm font-semibold">App Store</div>
                    </div>
                  </button>
                  <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center">
                    <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M5 3v18c0 0.6 0.4 1 1 1h12c0.6 0 1-0.4 1-1V3c0-0.6-0.4-1-1-1H6C5.4 2 5 2.4 5 3zm7 18c-0.6 0-1-0.4-1-1s0.4-1 1-1 1 0.4 1 1-0.4 1-1 1z"/>
                    </svg>
                    <div className="text-left">
                      <div className="text-xs">GET IT ON</div>
                      <div className="text-sm font-semibold">Google Play</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-green-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">GlobalGreen</h3>
              <p className="text-green-200">
                Connecting farmers and consumers through fresh, sustainable produce.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Shop</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-green-200 hover:text-white">All Products</a></li>
                <li><a href="#" className="text-green-200 hover:text-white">Organic Fruits</a></li>
                <li><a href="#" className="text-green-200 hover:text-white">Fresh Vegetables</a></li>
                <li><a href="#" className="text-green-200 hover:text-white">Subscription Boxes</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Sell</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-green-200 hover:text-white">Become a Seller</a></li>
                <li><a href="#" className="text-green-200 hover:text-white">Seller Dashboard</a></li>
                <li><a href="#" className="text-green-200 hover:text-white">Seller Resources</a></li>
                <li><a href="#" className="text-green-200 hover:text-white">Success Stories</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-green-200 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-green-200 hover:text-white">Sustainability</a></li>
                <li><a href="#" className="text-green-200 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-green-200 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-green-200 hover:text-white">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-green-800 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-green-200">© 2025 GlobalGreen. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-green-200 hover:text-white">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-green-200 hover:text-white">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-green-200 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FreshHomePage;