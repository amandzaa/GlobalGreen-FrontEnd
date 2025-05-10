import React, { useState } from 'react';
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
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
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
  isFavorite = false,
  onToggleFavorite,
}) => {
  const [imageError, setImageError] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [localFavorite, setLocalFavorite] = useState(isFavorite);
  
  const fallbackImageUrl =
    "https://img.freepik.com/free-vector/error-404-concept-landing-page_52683-10996.jpg?w=996";

  const handleImageError = () => {
    setImageError(true);
  };
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation
    e.stopPropagation();
    setLocalFavorite(!localFavorite);
    if (onToggleFavorite) {
      onToggleFavorite(id);
    }
  };
  
  // Format price with a general number format
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0, 
    }).format(price);
  };

  // Format rating count to k format if above 1000
  const formatRatingCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  // Clean image URL if it contains brackets or quotes
  const cleanImageUrl = image?.replace(/[\[\]"]/g, '') || '';

  return (
    <Link 
      href={`/product/${id}`} 
      className={`block bg-white rounded overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative">
        {/* Product image with fixed aspect ratio */}
        <div className="relative w-full h-48 overflow-hidden">
          <img
            src={imageError ? fallbackImageUrl : cleanImageUrl}
            alt={name}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        </div>
        
        {/* Wishlist/Favorite button */}
        <button 
          onClick={handleFavoriteClick}
          className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
            isHovering || localFavorite ? 'bg-white opacity-100' : 'opacity-0'
          } hover:bg-gray-50`}
          aria-label={localFavorite ? "Remove from wishlist" : "Add to wishlist"}
        >
          {localFavorite ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" style={{ color: colors.secondary }}>
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          )}
        </button>
        
        {/* Label overlay */}
        {label && (
          <div className="absolute top-2 left-2 text-white text-xs font-medium px-2 py-0.5 rounded"
               style={{ backgroundColor: colors.primary }}>
            {label}
          </div>
        )}
        
        {/* Discount tag */}
        {discount && discount > 0 && (
          <div className="absolute top-12 right-2 text-white text-xs font-medium px-2 py-0.5 rounded"
               style={{ backgroundColor: colors.darkGreen }}>
            -{discount}%
          </div>
        )}
      </div>
      
      <div className="p-3">
        {/* Product name */}
        <h3 className="text-sm text-gray-800 font-medium line-clamp-2 h-10 mb-2">{name}</h3>
        
        {/* Price and unit type */}
        <div className="mb-2">
          <div className="flex items-baseline">
            <span className="text-base font-medium" style={{ color: colors.primary }}>
              {formatPrice(price)}
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