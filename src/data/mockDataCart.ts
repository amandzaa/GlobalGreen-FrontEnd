import { CartState } from '@/types/cart';

export const mockCartData: CartState = {
  items: [
    {
      id: '1',
      name: 'Fitbit Sense Advanced Smartwatch with Tools for Heart Health, Stress Management & Skin Temperature',
      image: '/images/fitbit.jpg',
      price: 199,
      color: 'Glossy black',
      size: 'XL',
      quantity: 2,
      total: 398
    },
    {
      id: '2',
      name: 'iPhone 13 pro max-Pacific Blue-128GB storage',
      image: '/images/iphone.jpg',
      price: 150,
      color: 'Glossy black',
      size: 'XL',
      quantity: 2,
      total: 300
    },
    {
      id: '3',
      name: 'Apple MacBook Pro 13 inch-M1-8/256GB-space',
      image: '/images/macbook.jpg',
      price: 65,
      color: 'Glossy Golden',
      size: '34mm',
      quantity: 2,
      total: 130
    },
    {
      id: '4',
      name: 'Apple MacBook 12 inch-M1-8/256GB-space',
      image: '/images/macbook.jpg',
      price: 65,
      color: 'Glossy Golden',
      size: '34mm',
      quantity: 2,
      total: 130
    },
    {
      id: '5',
      name: 'Apple 17 inch-M1-8/256GB-space',
      image: '/images/macbook.jpg',
      price: 65,
      color: 'Glossy Golden',
      size: '34mm',
      quantity: 2,
      total: 130
    },
    {
      id: '6',
      name: 'Apple MacBook 12 inch-M1-8/256GB-space',
      image: '/images/macbook.jpg',
      price: 65,
      color: 'Glossy Golden',
      size: '34mm',
      quantity: 2,
      total: 130
    },
    {
      id: '7',
      name: 'Apple 17 inch-M1-8/256GB-space',
      image: '/images/macbook.jpg',
      price: 65,
      color: 'Glossy Golden',
      size: '34mm',
      quantity: 2,
      total: 130
    }
  ],
  loading: false,
  error: null
};