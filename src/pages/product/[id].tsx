// pages/product/[id].tsx
import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/router';
import NavbarGlobalGreen from '@/component/layout-productpage/NavbarSeller';

// Define TypeScript interfaces
interface ProductImage {
  id: number;
  url: string;
  alt: string;
}

interface ProductAttribute {
  name: string;
  options: { id: number; name: string; selected: boolean }[];
}

interface NutritionItem {
  name: string;
  value: string;
}

interface Product {
  product_id: number;
  name: string;
  description: string;
  price: number;
  discount: number | null;
  stock_quantity: number;
  unit_type: string;
  organic: boolean;
  nutrition: NutritionItem[] | null;
  category_id: number;
  images: ProductImage[];
  user_id: number;
  created_at: string;
  update_at: string;
  rating?: number;
  reviews_count?: number;
}

interface ProductPageProps {
  product: Product;
  relatedProducts?: Product[];
}

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  const router = useRouter();
  
  // States
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Dummy attributes (you can fetch these from your API)
  const [attributes, setAttributes] = useState<ProductAttribute[]>([
    {
      name: 'Size',
      options: [
        { id: 1, name: '250g', selected: false },
        { id: 2, name: '500g', selected: true },
        { id: 3, name: '1kg', selected: false },
        { id: 4, name: '5kg', selected: false },
      ],
    },
    {
      name: 'Quality',
      options: [
        { id: 1, name: 'Premium', selected: false },
        { id: 2, name: 'Standard', selected: true },
        { id: 3, name: 'Economy', selected: false },
      ],
    },
  ]);
  
  // Calculate original price if there's a discount
  const originalPrice = product.discount 
    ? product.price / (1 - product.discount / 100) 
    : null;
  
  // Format price in Indonesian Rupiah
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };
  
  // Dummy nutrition info (replace with actual data from your API)
  const nutritionFacts: NutritionItem[] = product.nutrition || [
    { name: 'Calories', value: '77 kcal' },
    { name: 'Carbohydrates', value: '17g' },
    { name: 'Protein', value: '2g' },
    { name: 'Fat', value: '0.1g' },
    { name: 'Fiber', value: '2.2g' },
    { name: 'Vitamin C', value: '19.7mg' },
    { name: 'Potassium', value: '421mg' },
    { name: 'Vitamin B6', value: '0.2mg' },
  ];
  
  // Placeholder images (replace with your actual images)
  const images: ProductImage[] = product.images.length > 0 ? product.images : [
    { id: 1, url: '/placeholder-product.jpg', alt: `${product.name} main` },
    { id: 2, url: '/placeholder-product-2.jpg', alt: `${product.name} thumbnail 1` },
    { id: 3, url: '/placeholder-product-3.jpg', alt: `${product.name} thumbnail 2` },
  ];
  
  // Handle attribute selection
  const selectAttributeOption = (attributeIndex: number, optionId: number) => {
    const newAttributes = [...attributes];
    
    // Unselect all options for this attribute
    newAttributes[attributeIndex].options = newAttributes[attributeIndex].options.map(option => ({
      ...option,
      selected: option.id === optionId,
    }));
    
    setAttributes(newAttributes);
  };
  
  // Handle quantity changes
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    if (quantity < product.stock_quantity) {
      setQuantity(quantity + 1);
    }
  };
  
  // Handle add to cart
  const addToCart = () => {
    // Implement your cart logic here
    console.log('Added to cart:', {
      product,
      quantity,
      selectedAttributes: attributes.map(attr => ({
        name: attr.name,
        value: attr.options.find(opt => opt.selected)?.name
      }))
    });
    
    // Show success message or modal
    alert('Added to cart!');
  };
  
  // Handle add to wishlist
  const addToWishlist = () => {
    // Implement your wishlist logic here
    console.log('Added to wishlist:', product);
    
    // Show success message
    alert('Added to wishlist!');
  };
  
  if (router.isFallback) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }
  
  return (
    <>
    <div className="bg-gray-100 min-h-screen m-20 p-10">
      {/* Navbar */}
      <NavbarGlobalGreen />
    
      <Head>
        <title>{product.name} - Fresh Vegetables & Fruits</title>
        <meta name="description" content={product.description} />
      </Head>        
        <div className="flex flex-wrap md:flex-nowrap gap-8">
          {/* Product Gallery */}
          <div className="w-full md:w-1/2">
            <div className="border border-gray-200 rounded-lg overflow-hidden bg-white mb-4">
              <div className="relative w-full h-96">
                <Image 
                  src={images[selectedImage].url}
                  alt={images[selectedImage].alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
            </div>
            
            <div className="flex gap-3">
              {images.map((image, index) => (
                <div 
                  key={image.id}
                  className={`w-20 h-20 border ${selectedImage === index ? 'border-green-500 border-2' : 'border-gray-200'} rounded cursor-pointer overflow-hidden bg-white`}
                  onClick={() => setSelectedImage(index)}
                >
                  <div className="relative w-full h-full">
                    <Image 
                      src={image.url}
                      alt={image.alt}
                      fill
                      sizes="80px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div className="w-full md:w-1/2">
            <div className="flex items-center mb-2">
              <div className="text-yellow-400 text-2xl">
                {'★'.repeat(Math.floor(product.rating || 5))}
                {'☆'.repeat(5 - Math.floor(product.rating || 5))}
              </div>
              <span className="text-blue-600 ml-2">
                {product.reviews_count || 248} Reviews
              </span>
            </div>
            
            <h1 className="text-3xl font-semibold mb-3 text-gray-800">{product.name}</h1>
            
            <div className="mb-4">
              <span className="bg-green-500 text-white px-3 py-1 rounded-md text-sm font-medium">
                #1 Best seller
              </span>
              <span className="text-blue-600 ml-2">in Root Vegetables 2025</span>
            </div>
            
            <div className="flex items-center my-4">
              <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
              {originalPrice && (
                <>
                  <span className="text-xl text-gray-500 line-through ml-3">
                    {formatPrice(originalPrice)}
                  </span>
                  <span className="text-orange-500 text-xl font-semibold ml-3">
                    {product.discount}% off
                  </span>
                </>
              )}
            </div>
            
            <div className="text-green-500 text-lg font-medium mb-4">
              In Stock: {product.stock_quantity} {product.unit_type}
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-5">
              <div>
                Need it on <strong>Saturday, May 12?</strong>{' '}
                <span className="text-blue-600 cursor-pointer">Choose</span> express delivery
              </div>
              <div className="mt-2">
                If you order within 3 hours 45 minutes. <span className="text-blue-600 cursor-pointer">Details</span>
              </div>
              <div className="mt-2">Gift wrapping available</div>
            </div>
            
            <div className="text-red-600 font-semibold mb-6">
              Special offer ends in 15:20:45 hours
            </div>
            
            {/* Product Attributes */}
            <div className="mb-6">
              {attributes.map((attribute, attrIndex) => (
                <div key={attribute.name} className="mb-4">
                  <div className="font-semibold mb-2">{attribute.name}:</div>
                  <div className="flex flex-wrap gap-3">
                    {attribute.options.map(option => (
                      <div
                        key={option.id}
                        className={`px-4 py-2 border rounded-md cursor-pointer text-center min-w-[60px] ${
                          option.selected
                            ? 'border-green-500 border-2'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        onClick={() => selectAttributeOption(attrIndex, option.id)}
                      >
                        {option.name}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Quantity Selector */}
            <div className="flex items-center mb-6">
              <div className="font-semibold mr-4">Quantity:</div>
              <div className="flex items-center">
                <button
                  onClick={decreaseQuantity}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 bg-gray-100"
                >
                  -
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-14 h-10 border-t border-b border-gray-300 text-center"
                />
                <button
                  onClick={increaseQuantity}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={addToWishlist}
                className="flex items-center justify-center px-6 py-3 border-2 border-orange-500 text-orange-500 font-semibold rounded-lg hover:bg-orange-50"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                Add to Wishlist
              </button>
              <button
                onClick={addToCart}
                className="flex-1 flex items-center justify-center px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                Add to Cart
              </button>
              <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="18" cy="5" r="3"></circle>
                  <circle cx="6" cy="12" r="3"></circle>
                  <circle cx="18" cy="19" r="3"></circle>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="mt-10 border-b border-gray-200">
          <div className="flex">
            <button
              className={`py-4 px-6 font-semibold text-base relative ${
                activeTab === 'description'
                  ? 'text-blue-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600'
                  : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button
              className={`py-4 px-6 font-semibold text-base relative ${
                activeTab === 'specifications'
                  ? 'text-blue-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600'
                  : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('specifications')}
            >
              Specifications
            </button>
            <button
              className={`py-4 px-6 font-semibold text-base relative ${
                activeTab === 'reviews'
                  ? 'text-blue-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600'
                  : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews & Ratings
            </button>
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="py-6">
          {activeTab === 'description' && (
            <div className="description">
              <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
              <p className="mt-4 text-gray-700 leading-relaxed">
                {product.description || 'High-quality local potatoes grown using environmentally friendly farming methods. Perfect for various dishes such as french fries, boiled potatoes, or as an ingredient for soups and curries.'}
              </p>
              <p className="mt-4 text-gray-700 leading-relaxed">
                Our vegetables are harvested at optimal maturity to ensure delicious taste and perfect texture. Each item is carefully selected to ensure the best quality reaches your kitchen.
              </p>
              
              {/* Nutrition Facts */}
              <div className="mt-8 border border-gray-200 rounded-lg p-4 bg-white">
                <h4 className="text-lg font-semibold mb-3">Nutrition Facts (per 100g)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {nutritionFacts.map((item, index) => (
                    <div key={index} className="flex py-1 border-b border-gray-100">
                      <div className="w-1/2 font-medium">{item.name}</div>
                      <div className="w-1/2">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Storage Instructions */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-3">Storage Instructions</h4>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li>Store in a cool, dry place</li>
                  <li>Avoid direct sunlight exposure</li>
                  <li>Do not store with onions or fruits that produce ethylene</li>
                  <li>Optimal storage time: 2-3 weeks at room temperature</li>
                </ul>
              </div>
            </div>
          )}
          
          {activeTab === 'specifications' && (
            <div className="specifications">
              <h3 className="text-xl font-semibold text-gray-800">Product Specifications</h3>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Product Details</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Product ID</span>
                      <span className="font-medium">{product.product_id}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Category</span>
                      <span className="font-medium">Root Vegetables</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Unit</span>
                      <span className="font-medium">{product.unit_type}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Organic</span>
                      <span className="font-medium">{product.organic ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Added On</span>
                      <span className="font-medium">{new Date(product.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Shipping Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Weight</span>
                      <span className="font-medium">Varies by package size</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Shipping Method</span>
                      <span className="font-medium">Standard, Express</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Delivery Time</span>
                      <span className="font-medium">1-3 business days</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Refrigeration</span>
                      <span className="font-medium">Not required</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div className="reviews">
              <h3 className="text-xl font-semibold text-gray-800">Customer Reviews</h3>
              <div className="mt-4 text-gray-700">
                <p>Review components would go here. This would typically include:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Overall rating summary</li>
                  <li>Rating distribution (5 star, 4 star, etc.)</li>
                  <li>Individual review cards with ratings, dates, and comments</li>
                  <li>Review pagination</li>
                  <li>Option to add a new review</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
      
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  
  try {
    // Replace with your actual API call
    // const response = await fetch(`${process.env.API_URL}/products/${id}`);
    // const product = await response.json();
    
    // Sample product data based on your structure
    const product: Product = {
      product_id: parseInt(id),
      name: "Local Potatoes",
      description: "High-quality local potatoes grown using environmentally friendly farming methods.",
      price: 12000, // Price in Rupiah
      discount: 20, // 20% discount
      stock_quantity: 60,
      unit_type: "kg",
      organic: false,
      nutrition: null,
      category_id: 1,
      images: [],
      user_id: 17,
      created_at: "2025-05-07T04:38:37.194312",
      update_at: "2025-05-07T04:38:37.194320",
      rating: 4.8,
      reviews_count: 248
    };
    
    return {
      props: {
        product: product,
      },
    };
  } catch (error) {
    console.error('Error fetching product data:', error);
    
    return {
      notFound: true,
    };
  }
};

export default ProductPage;