import { CartState } from '@/types/cart';

export const mockCartData: CartState = {
  items: [
    {
      id: '1',
      name: 'Bayam Hijau Segar',
      image: '/images/bayam-hijau.jpg',
      price: 36000,
      color: 'Hijau',
      size: '1 kg',
      quantity: 2,
      total: 72000
    },
    {
      id: '2',
      name: 'Apel Fuji Import',
      image: '/images/apel-fuji.jpg',
      price: 45000,
      color: 'Merah',
      size: '1 kg',
      quantity: 2,
      total: 90000
    },
    {
      id: '3',
      name: 'Pisang Cavendish Premium',
      image: '/images/pisang-cavendish.jpg',
      price: 32000,
      color: 'Kuning',
      size: '1 sisir',
      quantity: 2,
      total: 64000
    },
    {
      id: '4',
      name: 'Wortel Organik',
      image: '/images/wortel-organik.jpg',
      price: 28000,
      color: 'Oranye',
      size: '1 kg',
      quantity: 2,
      total: 56000
    },
    {
      id: '5',
      name: 'Jeruk Mandarin',
      image: '/images/jeruk-mandarin.jpg',
      price: 40000,
      color: 'Oranye',
      size: '1 kg',
      quantity: 2,
      total: 80000
    },
    {
      id: '6',
      name: 'Brokoli Segar',
      image: '/images/brokoli.jpg',
      price: 38000,
      color: 'Hijau',
      size: '1 kg',
      quantity: 2,
      total: 76000
    },
    {
      id: '7',
      name: 'Mangga Harum Manis',
      image: '/images/mangga.jpg',
      price: 35000,
      color: 'Kuning',
      size: '1 kg',
      quantity: 2,
      total: 70000
    }
  ],
  loading: false,
  error: null
};
