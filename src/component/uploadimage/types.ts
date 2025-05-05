'use client';

// Define the color palette used throughout the components
export const colors = {
  mediumGreen: '#2E8B57',
  skyBlue: '#87CEEB',
  paleGreen: '#E6F4EA',
  darkGreen: '#20603D',
};

// Product nutrition information type
export interface ProductNutrition {
  calories: number;
  fat: string;
  carbs: string;
  protein: string;
}

// Main product data interface
export interface ProductData {
  id?: string;
  name: string;
  category: string;
  price: number;
  salePrice: number;
  stock: number;
  unit: string;
  description: string;
  images: string[];
  nutrition?: ProductNutrition;
  organic: boolean;
  featured?: boolean;
  status?: 'draft' | 'published';
}

// Props for the image uploader component
export interface ProductImageUploaderProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  required?: boolean;
}

// Props for the product preview component
export interface ProductPreviewProps {
  product: ProductData;
}


export interface CustomProductData {
  id?: string;
  name: string;
  category: string;
  price: number;
  salePrice?: number;
  stock?: number;
  description?: string;
  isOnSale?: boolean;
  images: string[];
}