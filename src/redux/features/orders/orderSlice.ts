import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

// API base URL - updated to the production URL
const API_URL = 'https://globalgreen-backend-production.up.railway.app/orders';

// Define the OrderItem interface
export interface OrderItem {
  order_item_id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
  product_name?: string;
  image_url?: string;
}

// Define order status enum
export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}

// Define the Order interface
export interface Order {
  order_id: number;
  user_id: number;
  status: OrderStatus;
  total_amount: number;
  shipping_address: string;
  billing_address?: string;
  payment_method: string;
  created_at: string;
  updated_at?: string;
  items: OrderItem[];
  tracking_number?: string;
  estimated_delivery?: string;
  notes?: string;
}

// Define order creation request
export interface CreateOrderRequest {
  shipping_address: string;
  billing_address?: string;
  payment_method: string;
  notes?: string;
}

// Define order update request
export interface UpdateOrderRequest {
  status?: OrderStatus;
  tracking_number?: string;
  estimated_delivery?: string;
  notes?: string;
}

interface OrderState {
  orders: Order[];
  selectedOrder: Order | null;
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
}

const initialState: OrderState = {
  orders: [],
  selectedOrder: null,
  loading: false,
  error: null,
  lastFetched: null,
};

// Async thunk to fetch user orders
export const fetchUserOrders = createAsyncThunk<
  Order[],
  number, // user_id
  { rejectValue: string }
>(
  'orders/fetchUserOrders',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get<Order[]>(`${API_URL}/user/${userId}`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      console.error("Fetch user orders error:", err.response?.data || err.message);
      
      if (err.response?.data?.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(`Failed to fetch orders for user ID: ${userId}`);
      }
    }
  }
);

// Async thunk to fetch order by ID
export const fetchOrderById = createAsyncThunk<
  Order,
  number, // order_id
  { rejectValue: string }
>(
  'orders/fetchOrderById',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axios.get<Order>(`${API_URL}/${orderId}`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      console.error("Fetch order error:", err.response?.data || err.message);
      
      if (err.response?.data?.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(`Failed to fetch order with ID: ${orderId}`);
      }
    }
  }
);

// Async thunk to create a new order
export const createOrder = createAsyncThunk<
  Order,
  { userId: number; data: CreateOrderRequest },
  { rejectValue: string }
>(
  'orders/createOrder',
  async ({ userId, data }, { rejectWithValue }) => {
    try {
      const response = await axios.post<Order>(`${API_URL}/user/${userId}`, data);
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      console.error("Create order error:", err.response?.data || err.message);
      
      if (err.response?.data?.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue('Failed to create order');
      }
    }
  }
);

// Async thunk to update order
export const updateOrder = createAsyncThunk<
  Order,
  { orderId: number; data: UpdateOrderRequest },
  { rejectValue: string }
>(
  'orders/updateOrder',
  async ({ orderId, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put<Order>(`${API_URL}/${orderId}`, data);
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      console.error("Update order error:", err.response?.data || err.message);
      
      if (err.response?.data?.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(`Failed to update order with ID: ${orderId}`);
      }
    }
  }
);

// Async thunk to cancel order
export const cancelOrder = createAsyncThunk<
  Order,
  number, // order_id
  { rejectValue: string }
>(
  'orders/cancelOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axios.put<Order>(`${API_URL}/${orderId}/cancel`, {});
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      console.error("Cancel order error:", err.response?.data || err.message);
      
      if (err.response?.data?.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(`Failed to cancel order with ID: ${orderId}`);
      }
    }
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetOrders: (state) => {
      state.orders = [];
      state.selectedOrder = null;
      state.lastFetched = null;
      state.error = null;
    },
    setSelectedOrder: (state, action: PayloadAction<Order | null>) => {
      state.selectedOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchUserOrders
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.loading = false;
        state.orders = action.payload;
        state.lastFetched = Date.now();
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Handle fetchOrderById
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action: PayloadAction<Order>) => {
        state.loading = false;
        state.selectedOrder = action.payload;
        
        // Also update in orders array if it exists
        const index = state.orders.findIndex(o => o.order_id === action.payload.order_id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        } else {
          state.orders.push(action.payload);
        }
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Handle createOrder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.loading = false;
        state.orders.unshift(action.payload); // Add to beginning of array
        state.selectedOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Handle updateOrder
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.loading = false;
        const index = state.orders.findIndex(o => o.order_id === action.payload.order_id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
        
        // Update selected order if it matches
        if (state.selectedOrder && state.selectedOrder.order_id === action.payload.order_id) {
          state.selectedOrder = action.payload;
        }
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Handle cancelOrder
      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.loading = false;
        const index = state.orders.findIndex(o => o.order_id === action.payload.order_id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
        
        // Update selected order if it matches
        if (state.selectedOrder && state.selectedOrder.order_id === action.payload.order_id) {
          state.selectedOrder = action.payload;
        }
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetOrders, setSelectedOrder } = orderSlice.actions;
export default orderSlice.reducer;