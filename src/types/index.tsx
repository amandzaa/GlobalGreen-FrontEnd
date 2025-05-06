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
    primary: '#2E8B57',
    secondary: '#87CEEB', 
    paleGreen: '#E6F4EA',
    darkGreen: '#20603D',
    lightGreen: "#DCFCE7",
    hoverGreen: '#2E8B57/50',
    white: '#FFFFFF',
    accent: '#3875B5',
    lightGray: '#F5F7F5',
  };
  

  // --color-primary: #2E8B57,
  // --color-secondary: #87CEEB, 
  // --color-paleGreen: #E6F4EA,
  // --color-darkGreen: #20603D,
  // --color-hoverGreen: #2E8B57/50,
  // --color-white: #FFFFFF,
  // --color-accent: #3875B5,