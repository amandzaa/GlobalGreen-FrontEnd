import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { colors } from '@/types';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  rating: number;
  ratingCount: number;
  label?: string;
  unit_type?: string;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  originalPrice,
  discount,
  image,
  rating,
  ratingCount,
  label,
  unit_type = '',
  className = '',
}) => {
  // Format price with a general number format
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US').format(price);
  };

  // Format rating count to k format if above 1000
  const formatRatingCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };


  return (
    <Link 
      href={`/product/${id}`} 
      className={`block bg-white rounded overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}
    >
      <div className="relative">
        {/* Product image */}
        <div className="relative w-full pb-[100%]"> {/* 1:1 aspect ratio */}
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        {/* Label overlay */}
        {label && (
          <div className="absolute top-2 left-2 text-white text-xs font-medium px-2 py-0.5 rounded"
               style={{ backgroundColor: colors.primary }}>
            {label}
          </div>
        )}
        {/* Discount tag */}
        {discount && discount > 0 && (
          <div className="absolute top-2 right-2 text-white text-xs font-medium px-2 py-0.5 rounded"
               style={{ backgroundColor: colors.darkGreen }}>
            -{discount}%
          </div>
        )}
      </div>
      <div className="p-3">
        {/* Product name */}
        <h3 className="text-sm text-gray-800 line-clamp-2 h-10 mb-2">{name}</h3>
        
        {/* Price and unit type */}
        <div className="mb-2">
          <div className="flex items-baseline">
            <span className="font-medium" style={{ color: colors.primary }}>
              ${formatPrice(price)}
            </span>
            {unit_type && (
              <span className="text-xs text-gray-500 ml-1">/{unit_type}</span>
            )}
          </div>
          
          {originalPrice && originalPrice > price && (
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <span className="line-through mr-2">${formatPrice(originalPrice)}</span>
              <span style={{ color: colors.darkGreen }}>-{discount}%</span>
            </div>
          )}
        </div>
        
        {/* Rating */}
        <div className="flex items-center text-xs text-gray-600">
          <div className="flex items-center mr-1" style={{ color: colors.secondary }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {rating}
          </div>
          <div>
            Sold {formatRatingCount(ratingCount)}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;