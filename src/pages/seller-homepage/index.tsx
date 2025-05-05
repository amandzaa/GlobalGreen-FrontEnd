// pages/index.tsx
import React, { useState } from "react";
import Head from "next/head";
import AuthModals from "@/component/modal/AuthModal";
import NavbarSeller from "@/component/layout-productpage/NavbarSeller";
import HeroBanner, { BannerSlide } from "@/component/heropage/HeroBanner";
import {
  Award,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Coffee,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";

const Home: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsRegisterModalOpen(false);
  };

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
    setIsLoginModalOpen(false);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  // Banner slide data - you can replace these with actual content
  const bannerSlides: BannerSlide[] = [
    {
      title: "Explore Our Spring Collection",
      description:
        "Step into the season with fresh, vibrant styles curated to refresh your store’s look. Discover top-selling trends, limited-edition pieces, and exclusive discounts on our new spring arrivals—available for a limited time only.",
      buttonText: "Shop Now",
      imageSrc: "https://picsum.photos/id/1011/800/400",
      buttonLink: "/spring-collection",
    },
    {
      title: "New Tools for Sellers in 2025",
      description:
        "Unleash the power of cutting-edge AI and automation with our latest tools designed specifically for online sellers. From smarter inventory management to automated customer service, discover features that save time and boost your bottom line.",
      buttonText: "Learn More",
      imageSrc: "https://picsum.photos/id/1005/800/400",
      buttonLink: "/seller-tools",
    },
    {
      title: "Join the Ultimate Seller Webinar Series",
      description:
        "Stay ahead of the curve with our free weekly webinars hosted by top e-commerce professionals. Learn best practices, marketing strategies, and real-life growth hacks that help sellers scale faster and smarter—live Q&A included.",
      buttonText: "Sign Up Free",
      imageSrc: "https://picsum.photos/id/1027/800/400",
      buttonLink: "/webinar-series",
    },
    {
      title: "Level Up Your Storefront Design",
      description:
        "Give your online store the makeover it deserves. Our customizable storefront tools let you tweak layouts, banners, colors, and more—no design experience needed. Make a lasting impression that converts visitors into loyal customers.",
      buttonText: "Get Started",
      imageSrc: "https://picsum.photos/id/1035/800/400",
      buttonLink: "/storefront-tools",
    },
    {
      title: "Top Seller Success Stories of the Month",
      description:
        "Take a behind-the-scenes look at how our most successful sellers achieved their goals. From humble beginnings to six-figure stores, these stories highlight the strategies, tools, and habits that truly make a difference.",
      buttonText: "Read Stories",
      imageSrc: "https://picsum.photos/id/1043/800/400",
      buttonLink: "/success-stories",
    },
  ];

  const [openSections, setOpenSections] = useState({
    tips: true,
    openStore: false,
    features: false,
    shipping: false,
  });

  type SectionKeys = "tips" | "openStore" | "features" | "shipping";
  interface OpenSectionsState {
    tips: boolean;
    openStore: boolean;
    features: boolean;
    shipping: boolean;
  }

  const toggleSection = (section: SectionKeys) => {
    setOpenSections((prev: OpenSectionsState) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Featured articles data
  const featuredArticles = [
    {
      title: "7 Effective Ways to Increase Your Sales on GlobalGreen",
      description:
        "Proven strategies to enhance store visibility and sales conversion",
      image: "https://picsum.photos/id/103/800/400",
      category: "Business Strategy",
    },
    {
      title: "Complete Guide to Using GreenAds for Beginners",
      description: "How to maximize advertising to boost your product sales",
      image: "https://picsum.photos/id/365/800/400",
      category: "Digital Marketing",
    },
    {
      title: "Tips for Building a Trusted Store Reputation",
      description: "Secrets to getting positive reviews and loyal customers",
      image: "https://picsum.photos/id/203/800/400",
      category: "Customer Service",
    },
  ];

  // Business categories
  const businessCategories = [
    {
      icon: <ShoppingBag className="text-green-700" />,
      title: "Start Selling",
      bgColor: "bg-green-100",
    },
    {
      icon: <TrendingUp className="text-blue-500" />,
      title: "Increase Sales",
      bgColor: "bg-blue-100",
    },
    {
      icon: <BookOpen className="text-blue-500" />,
      title: "Guides & Tutorials",
      bgColor: "bg-blue-100",
    },
    {
      icon: <Award className="text-green-800" />,
      title: "Seller Programs",
      bgColor: "bg-green-100",
    },
  ];

  // Handle banner button clicks
  const handleBannerButtonClick = (index: number) => {
    const slide = bannerSlides[index];
    if (slide.buttonLink) {
      // You can use router.push here if you want to navigate programmatically
      console.log(`Navigating to: ${slide.buttonLink}`);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>GlobalGreen Pusat Edukasi Seller</title>
        <meta
          name="description"
          content="Pusat Edukasi untuk Seller GlobalGreen"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Using the NavbarSeller component with custom handlers */}
      <NavbarSeller
        onLoginClick={openLoginModal}
        onRegisterClick={openRegisterModal}
      />

      <main>
        {/* Hero Banner Component */}
        <div className="pt-28">
          <HeroBanner
            slides={bannerSlides}
            onButtonClick={handleBannerButtonClick}
          />
        </div>

        {/* Topic Selection */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-green-800">
              All About Selling on GlobalGreen
            </h1>
          </div>

          <div className="space-y-4">
            {/* Tips Section */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div
                className="px-6 py-4 flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection("tips")}
              >
                <h2 className="text-xl font-semibold text-green-800">
                  Lots of Tips in the Seller Education Center
                </h2>
                {openSections.tips ? (
                  <ChevronUp className="text-green-700" />
                ) : (
                  <ChevronDown className="text-green-700" />
                )}
              </div>

              {openSections.tips && (
                <div className="px-6 py-4 text-gray-700 border-t border-gray-100">
                  <p className="mb-4">
                    The GlobalGreen Seller Education Center is a hub where
                    GlobalGreen Sellers can get the latest information about
                    selling on GlobalGreen, new features, and how to use them.
                    There are also many tips and tricks to boost your sales on
                    GlobalGreen.
                  </p>
                  <p>
                    Why sell on GlobalGreen? Selling on GlobalGreen is free with
                    no fees and has wide reach, nationwide. Maximize your sales
                    with GlobalGreen and use all of the Seller features that you
                    can access for free.
                  </p>
                </div>
              )}
            </div>

            {/* Open Store Section */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div
                className="px-6 py-4 flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection("openStore")}
              >
                <h2 className="text-xl font-semibold text-green-800">
                  How Easy It Is to Open a Store on GlobalGreen
                </h2>
                {openSections.openStore ? (
                  <ChevronUp className="text-green-700" />
                ) : (
                  <ChevronDown className="text-green-700" />
                )}
              </div>

              {openSections.openStore && (
                <div className="px-6 py-4 text-gray-700 border-t border-gray-100">
                  <p className="mb-4">
                    Opening a store on GlobalGreen is very easy and quick. You
                    only need to follow a few simple steps to start selling.
                  </p>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>
                      Register a GlobalGreen account or login if you already
                      have an account
                    </li>
                    <li>Complete your personal data and verify your email</li>
                    <li>Click "Open Store" on the profile page</li>
                    <li>Fill in store information such as name and address</li>
                    <li>Upload product photos and set prices</li>
                    <li>Set up available shipping methods</li>
                    <li>Start receiving orders and grow your business!</li>
                  </ol>
                </div>
              )}
            </div>

            {/* Features Section */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div
                className="px-6 py-4 flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection("features")}
              >
                <h2 className="text-xl font-semibold text-green-800">
                  Various Selling Features on the GlobalGreen Seller Page
                </h2>
                {openSections.features ? (
                  <ChevronUp className="text-green-700" />
                ) : (
                  <ChevronDown className="text-green-700" />
                )}
              </div>

              {openSections.features && (
                <div className="px-6 py-4 text-gray-700 border-t border-gray-100">
                  <p className="mb-4">
                    GlobalGreen provides various features to help sellers
                    develop their business:
                  </p>
                  <ul className="space-y-2">
                    <li>
                      <span className="font-medium">GreenAds</span> - Increase
                      your product visibility with targeted advertising
                    </li>
                    <li>
                      <span className="font-medium">Store Promotions</span> -
                      Create attractive promotions for products in your store
                    </li>
                    <li>
                      <span className="font-medium">GlobalGreen Now</span> -
                      Fast delivery service within a few hours
                    </li>
                    <li>
                      <span className="font-medium">Power Merchant</span> -
                      Program for trusted sellers with various benefits
                    </li>
                    <li>
                      <span className="font-medium">GlobalGreen Analytics</span>{" "}
                      - Monitor your store performance with detailed data
                    </li>
                    <li>
                      <span className="font-medium">Store Chat</span> - Direct
                      communication with potential buyers
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Shipping Section */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div
                className="px-6 py-4 flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection("shipping")}
              >
                <h2 className="text-xl font-semibold text-green-800">
                  Use Free Shipping Feature Anytime
                </h2>
                {openSections.shipping ? (
                  <ChevronUp className="text-green-700" />
                ) : (
                  <ChevronDown className="text-green-700" />
                )}
              </div>

              {openSections.shipping && (
                <div className="px-6 py-4 text-gray-700 border-t border-gray-100">
                  <p className="mb-4">
                    GlobalGreen's Free Shipping program is a major attraction
                    for buyers. By activating this feature in your store, you
                    can increase sales conversion by up to 3 times!
                  </p>
                  <p className="mb-4">
                    Benefits of using the Free Shipping feature:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Increase the appeal of your store and products</li>
                    <li>Encourage buyers to checkout more products</li>
                    <li>Reduce order cancellation rates</li>
                    <li>
                      Your products appear in searches with Free Shipping filter
                    </li>
                    <li>
                      Your store will appear on the GlobalGreen Free Shipping
                      promo page
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Business Categories */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-green-800 mb-6">
              Business Categories
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {businessCategories.map((category, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div
                    className={`w-12 h-12 ${category.bgColor} rounded-full flex items-center justify-center mb-4`}
                  >
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-medium text-center">
                    {category.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Articles */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-green-800 mb-6">
              Featured Articles for Your Business
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredArticles.map((article, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-5">
                    <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded mb-2">
                      {article.category}
                    </span>
                    <h3 className="text-lg font-semibold mb-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {article.description}
                    </p>
                    <button className="mt-4 text-green-700 font-medium hover:text-green-800 flex items-center">
                      Read More
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="mt-12 bg-blue-100 rounded-lg p-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h2 className="text-2xl font-bold text-green-800 mb-2">
                  Get the Latest Business Tips
                </h2>
                <p className="text-gray-600">
                  Subscribe to our newsletter to receive the latest updates and
                  tips about selling on GlobalGreen.
                </p>
              </div>
              <div className="w-full md:w-1/3">
                <div className="flex">
                  <input
                    type="email"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-l-lg block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-green-700"
                    placeholder="Your email"
                  />
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-5 py-2.5 rounded-r-lg">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Latest Programs */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-green-800 mb-6">
              Latest GlobalGreen Programs
            </h2>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start">
                <div className="bg-green-100 p-4 rounded-lg mr-6">
                  <Coffee className="text-green-800" size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    GlobalGreen Seller Masterclass
                  </h3>
                  <p className="text-gray-700 mb-4">
                    An intensive 8-week training program to improve selling
                    skills and business strategy. Get direct mentoring from top
                    GlobalGreen sellers and e-commerce experts.
                  </p>
                  <div className="flex items-center text-gray-500 text-sm">
                    <span className="mr-4">
                      <svg
                        className="w-4 h-4 inline mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      Starts May 10, 2025
                    </span>
                    <span>
                      <svg
                        className="w-4 h-4 inline mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Registration: April 1-30, 2025
                    </span>
                  </div>
                  <button className="mt-4 bg-green-700 hover:bg-green-800 text-white font-medium rounded-lg text-sm px-5 py-2.5">
                    Register Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Auth Modals */}
      <AuthModals
        isLoginOpen={isLoginModalOpen}
        isRegisterOpen={isRegisterModalOpen}
        onCloseLogin={closeLoginModal}
        onCloseRegister={closeRegisterModal}
        onSwitchToLogin={() => {
          setIsRegisterModalOpen(false);
          setIsLoginModalOpen(true);
        }}
        onSwitchToRegister={() => {
          setIsLoginModalOpen(false);
          setIsRegisterModalOpen(true);
        }}
      />
    </div>
  );
};

export default Home;
