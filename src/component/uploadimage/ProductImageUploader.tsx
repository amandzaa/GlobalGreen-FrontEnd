'use client';
import React from 'react';
import Image from 'next/image';
import { ProductImageUploaderProps } from '@/component/uploadimage/types';
/**
 * ProductImageUploader component for handling product image uploads
 */
export const ProductImageUploader: React.FC<ProductImageUploaderProps> = ({
  images = [],
  onImagesChange,
  required = true
}) => {
  // We've removed the unused selectedImage state
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          const newImage = event.target.result as string;
          // Add to product images
          onImagesChange([...images, newImage]);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  const handleRemoveImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    onImagesChange(updatedImages);
  };
  
  return (
    <div className="border-b border-gray-200 pb-6">
      <h2 className="text-lg font-medium text-gray-700 mb-4">
        Product Images
        {required && <span className="text-red-500">*</span>}
      </h2>
     
      <div>
        <div className="flex flex-wrap gap-4 mb-4">
          {images.map((image, index) => (
            <div key={index} className="relative">
              {/* Replaced img with Next.js Image component */}
              <Image
                src={image.startsWith('/api') ? image : image}
                alt={`Product image ${index + 1}`}
                width={96}
                height={96}
                className="object-cover rounded-md border border-gray-200"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center text-xs"
              >
                ×
              </button>
            </div>
          ))}
         
          {images.length === 0 && (
            <div className="h-24 w-24 flex items-center justify-center border border-dashed border-gray-300 rounded-md">
              <span className="text-xs text-gray-500">No images</span>
            </div>
          )}
        </div>
       
        <label className="flex justify-center items-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-green-500 focus:outline-none">
          <div className="flex flex-col items-center space-y-2">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            <span className="text-sm text-gray-500">
              Drop files to upload or <span className="text-green-600 underline">browse</span>
            </span>
            <span className="text-xs text-gray-500">
              PNG, JPG, GIF up to 10MB {required && "(Min. 1 image required)"}
            </span>
          </div>
          <input
            type="file"
            name="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>
      </div>
    </div>
  );
};