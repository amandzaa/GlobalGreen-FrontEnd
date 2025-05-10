// src/redux/features/cart/cartSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CartProduct, ApplyVoucherPayload } from '@/types/cart';

// Mock API calls - replace with actual API calls in production
const mockFetchCart = (): Promise<CartProduct[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            name: 'Bayam Hijau Segar',
            price: 36000,
            quantity: 2,
            total: 72000,
            color: 'Hijau',
            size: '1 kg',
            image: '/images/products/bayam-hijau.jpg'
          },
          {
            id: '2',
            name: 'Apel Fuji Import',
            price: 45000,
            quantity: 1,
            total: 45000,
            color: 'Merah',
            size: '1 kg',
            image: '/images/products/apel-fuji.jpg'
          }
        ]);
      }, 500);
    });
  };
  

const mockApplyVoucher = (code: string): Promise<{ discountAmount: number }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (code === 'ECO20') {
        resolve({ discountAmount: 10 });
      } else if (code === 'GREEN10') {
        resolve({ discountAmount: 5 });
      } else {
        reject(new Error('Invalid voucher code'));
      }
    }, 500);
  });
};

// Define the cart state interface
interface CartState {
  items: CartProduct[];
  loading: boolean;
  error: string | null;
  discount: number;
  tax: number;
  shipping: number;
  subtotal: number;
  total: number;
}

// Initial state
const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
  discount: 0,
  tax: 0,
  shipping: 4.99,
  subtotal: 0,
  total: 0
};

// Calculate cart totals helper function
const calculateCartTotals = (state: CartState) => {
  state.subtotal = state.items.reduce((sum, item) => sum + item.total, 0);
  state.tax = Math.round(state.subtotal * 0.05 * 100) / 100; // 5% tax
  
  // Free shipping for orders over $50 after discount
  state.shipping = state.subtotal - state.discount >= 50 ? 0 : 4.99;
  
  state.total = state.subtotal - state.discount + state.tax + state.shipping;
};

// Async thunks
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await mockFetchCart();
      return response;
    } catch (error) {
        console.log(error)
      return rejectWithValue('Failed to fetch cart items. Please try again later.');
    }
  }
);

export const applyVoucher = createAsyncThunk(
  'cart/applyVoucher',
  async (payload: ApplyVoucherPayload, { rejectWithValue }) => {
    try {
      const response = await mockApplyVoucher(payload.code);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An error occurred while applying the voucher');
    }
  }
);

// Create the cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      calculateCartTotals(state);
    },
    updateQuantity: (state, action: PayloadAction<{ productId: string, quantity: number }>) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item.id === productId);
      
      if (item) {
        item.quantity = quantity;
        item.total = item.price * quantity;
        calculateCartTotals(state);
      }
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.id === action.payload);
      
      if (item) {
        item.quantity += 1;
        item.total = item.price * item.quantity;
        calculateCartTotals(state);
      }
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.id === action.payload);
      
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        item.total = item.price * item.quantity;
        calculateCartTotals(state);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.discount = 0;
      calculateCartTotals(state);
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch cart cases
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        calculateCartTotals(state);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Apply voucher cases
      .addCase(applyVoucher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(applyVoucher.fulfilled, (state, action) => {
        state.loading = false;
        state.discount = action.payload.discountAmount;
        calculateCartTotals(state);
      })
      .addCase(applyVoucher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { removeFromCart, updateQuantity, incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;