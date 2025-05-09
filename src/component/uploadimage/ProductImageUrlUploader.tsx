'use client';
import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { colors } from "@/types";

/**
 * Props for the ProductImageUrlUploader component
 */
export interface ProductImageUrlUploaderProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  required?: boolean;
  maxImages?: number;
}

/**
 * ProductImageUrlUploader component for handling product image URLs
 * Designed to work with ProductPreview component
 */
export const ProductImageUrlUploader: React.FC<ProductImageUrlUploaderProps> = ({
  images = [],
  onImagesChange,
  required = true,
  maxImages = 5
}) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Handle adding a new image URL
  const handleAddImageUrl = () => {
    if (!imageUrl.trim()) {
      setValidationError('Please enter an image URL');
      return;
    }

    setIsValidating(true);
    setValidationError(null);

    // Validate image URL by attempting to load it
    const img = new Image();
    img.onload = () => {
      // Add to product images
      onImagesChange([...images, imageUrl]);
      setImageUrl(''); // Clear input after successful add
      setIsValidating(false);
    };
    
    img.onerror = () => {
      setValidationError('Invalid image URL. Please check and try again.');
      setIsValidating(false);
    };
    
    img.src = imageUrl;
  };
  
  // Remove an image by index
  const handleRemoveImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    onImagesChange(updatedImages);
  };

  // Check if we've reached the maximum number of images
  const isMaxImagesReached = images.length >= maxImages;
  
  return (
    <div className="border-b border-gray-200 pb-6">
      <h2 className="text-lg font-medium text-gray-700 mb-4">
        Product Images
        {required && <span className="text-red-500">*</span>}
      </h2>
     
      <div>
        {/* Image Previews */}
        <div className="flex flex-wrap gap-4 mb-4">
          {images.map((image, index) => (
            <div key={index} className="relative">
              {/* Using regular img tag for better compatibility */}
              <img
                src={image}
                alt={`Product image ${index + 1}`}
                className="w-24 h-24 object-cover rounded-md border border-gray-200"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center text-xs"
                aria-label="Remove image"
              >
                <X size={14} />
              </button>
            </div>
          ))}
         
          {images.length === 0 && (
            <div className="h-24 w-24 flex items-center justify-center border border-dashed border-gray-300 rounded-md">
              <span className="text-xs text-gray-500">No images</span>
            </div>
          )}
        </div>
       
        {/* URL Input */}
        {!isMaxImagesReached ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                  setValidationError(null);
                }}
                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ 
                  outlineColor: colors.primary,
                  borderColor: validationError ? 'red' : undefined
                }}
                placeholder="Enter image URL (https://...)"
              />
              <button
                type="button"
                onClick={handleAddImageUrl}
                disabled={isValidating || !imageUrl.trim()}
                className={`p-2 rounded-md ${
                  isValidating || !imageUrl.trim()
                    ? 'bg-gray-300 text-white cursor-not-allowed'
                    : 'text-white hover:opacity-90'
                }`}
                style={{ backgroundColor: colors.primary }}
              >
                {isValidating ? (
                  <div className="w-6 h-6 border-2 border-gray-200 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <Plus size={24} />
                )}
              </button>
            </div>
            
            {validationError && (
              <p className="text-sm text-red-500">{validationError}</p>
            )}

            <div className="text-xs text-gray-500">
              <p>Add up to {maxImages} image URLs {required && "(Min. 1 image required)"}</p>
              <p>For best results, use direct links to image files (ending in .jpg, .png, etc.)</p>
            </div>
          </div>
        ) : (
          <p className="text-sm" style={{ color: colors.darkGreen }}>
            Maximum number of images reached ({maxImages})
          </p>
        )}
      </div>
    </div>
  );
};