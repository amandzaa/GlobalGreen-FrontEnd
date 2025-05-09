import axios from 'axios';
import { CartProduct, ApplyVoucherPayload } from '@/types/cart';
import { mockCartData } from '@/data/mockDataCart';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com';

export const cartApi = {
//   fetchCart: async () => {
//     try {
//       const response = await axios.get(`${API_URL}/cart`);
//       return response.data;
//     } catch (error) {
//       throw new Error('Failed to fetch cart');
//     }
//   },
    fetchCart: async () => {
        try {
        // For development, use mock data
        if (process.env.NODE_ENV === 'development') {
            return Promise.resolve(mockCartData);
        }
        
        const response = await axios.get(`${API_URL}/cart`);
        return response.data;
        } catch (error) {
            console.log(error)
        throw new Error('Failed to fetch cart');
        }
    },

  addToCart: async (product: Partial<CartProduct>) => {
    try {
      const response = await axios.post(`${API_URL}/cart/add`, product);
      return response.data;
    } catch (error) {
        console.log(error)
      throw new Error('Failed to add item to cart');
    }
  },

  updateQuantity: async (productId: string, quantity: number) => {
    try {
      const response = await axios.put(`${API_URL}/cart/update`, { productId, quantity });
      return response.data;
    } catch (error) {
        console.log(error)
      throw new Error('Failed to update item quantity');
    }
  },

  removeFromCart: async (productId: string) => {
    try {
      const response = await axios.delete(`${API_URL}/cart/remove/${productId}`);
      return response.data;
    } catch (error) {
        console.log(error)
      throw new Error('Failed to remove item from cart');
    }
  },

  applyVoucher: async (payload: ApplyVoucherPayload) => {
    try {
      const response = await axios.post(`${API_URL}/cart/voucher`, payload);
      return response.data;
    } catch (error) {
        console.log(error)
      throw new Error('Failed to apply voucher');
    }
  },
};