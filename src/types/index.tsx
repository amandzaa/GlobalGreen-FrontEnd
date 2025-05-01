// Product interface
export interface Product {
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
  
  // Store interface
  export interface Store {
    id: string;
    name: string;
    avatar: string;
    lastActive: string;
    productCount: number;
    followerCount: string;
    following: number;
    chatPerformance: number;
    rating: number;
    reviewCount: string;
    memberSince: string;
  }
  
  // Category interface
  export interface Category {
    id: string;
    name: string;
    slug: string;
  }
  
  // Filter option interface
  export interface FilterOption {
    id: string;
    name: string;
    type: 'checkbox' | 'radio' | 'range';
    options?: {
      id: string;
      name: string;
      value: string;
    }[];
    minValue?: number;
    maxValue?: number;
  }

  export const colors = {
    mediumGreen: '#2E8B57',
    skyBlue: '#87CEEB',
    paleGreen: '#E6F4EA',
    darkGreen: '#20603D',
  };
  