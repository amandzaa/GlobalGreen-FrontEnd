import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

// API base URL - updated to the production URL
const API_URL = 'https://globalgreen-backend-production.up.railway.app/discounts';

// Define discount type enum
export enum DiscountType {
  PERCENTAGE = 'percentage',
  FIXED_AMOUNT = 'fixed_amount',
  BUY_X_GET_Y = 'buy_x_get_y',
  FREE_SHIPPING = 'free_shipping'
}

// Define the Discount interface
export interface Discount {
  discount_id: number;
  code: string;
  description: string;
  discount_type: DiscountType;
  discount_value: number;
  minimum_purchase?: number;
  start_date: string;
  end_date: string;
  is_active: boolean;
  usage_limit?: number;
  usage_count: number;
  applies_to?: 'product' | 'category' | 'order';
  target_id?: number; // product_id or category_id if applies_to is product or category
  created_at?: string;
  updated_at?: string;
}

// Define discount creation request
export interface CreateDiscountRequest {
  code: string;
  description: string;
  discount_type: DiscountType;
  discount_value: number;
  minimum_purchase?: number;
  start_date: string;
  end_date: string;
  is_active: boolean;
  usage_limit?: number;
  applies_to?: 'product' | 'category' | 'order';
  target_id?: number;
}

// Define discount update request
export interface UpdateDiscountRequest {
  code?: string;
  description?: string;
  discount_type?: DiscountType;
  discount_value?: number;
  minimum_purchase?: number;
  start_date?: string;
  end_date?: string;
  is_active?: boolean;
  usage_limit?: number;
  applies_to?: 'product' | 'category' | 'order';
  target_id?: number;
}

// Define discount validation response
export interface DiscountValidationResponse {
  valid: boolean;
  discount?: Discount;
  message?: string;
  discount_amount?: number;
}

interface DiscountState {
  discounts: Discount[];
  activeDiscounts: Discount[];
  selectedDiscount: Discount | null;
  validatedDiscount: DiscountValidationResponse | null;
  loading: boolean;
  error: string | null;
  validating: boolean;
  validationError: string | null;
}

const initialState: DiscountState = {
  discounts: [],
  activeDiscounts: [],
  selectedDiscount: null,
  validatedDiscount: null,
  loading: false,
  error: null,
  validating: false,
  validationError: null,
};

// Async thunk to fetch all discounts
export const fetchAllDiscounts = createAsyncThunk<
  Discount[],
  void,
  { rejectValue: string }
>(
  'discounts/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Discount[]>(API_URL);
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      console.error("Fetch discounts error:", err.response?.data || err.message);
      
      if (err.response?.data?.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue('Failed to fetch discounts');
      }
    }
  }
);

// Async thunk to fetch active discounts
export const fetchActiveDiscounts = createAsyncThunk<
  Discount[],
  void,
  { rejectValue: string }
>(
  'discounts/fetchActive',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Discount[]>(`${API_URL}/active`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      console.error("Fetch active discounts error:", err.response?.data || err.message);
      
      if (err.response?.data?.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue('Failed to fetch active discounts');
      }
    }
  }
);

// Async thunk to fetch a discount by ID
export const fetchDiscountById = createAsyncThunk<
  Discount,
  number,
  { rejectValue: string }
>(
  'discounts/fetchById',
  async (discountId, { rejectWithValue }) => {
    try {
      const response = await axios.get<Discount>(`${API_URL}/${discountId}`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      console.error("Fetch discount error:", err.response?.data || err.message);
      
      if (err.response?.data?.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(`Failed to fetch discount with ID: ${discountId}`);
      }
    }
  }
);

// Async thunk to validate a discount code
export const validateDiscountCode = createAsyncThunk<
  DiscountValidationResponse,
  { code: string, orderTotal?: number },
  { rejectValue: string }
>(
  'discounts/validate',
  async ({ code, orderTotal }, { rejectWithValue }) => {
    try {
      const response = await axios.post<DiscountValidationResponse>(`${API_URL}/validate`, { code, orderTotal });
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      console.error("Validate discount error:", err.response?.data || err.message);
      
      if (err.response?.data?.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(`Failed to validate discount code: ${code}`);
      }
    }
  }
);

// Async thunk to create a new discount
export const createDiscount = createAsyncThunk<
  Discount,
  CreateDiscountRequest,
  { rejectValue: string }
>(
  'discounts/createDiscount',
  async (discountData, { rejectWithValue }) => {
    try {
      const response = await axios.post<Discount>(API_URL, discountData);
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ error?: string, message?: string }>;
      console.error("Create discount error:", err.response?.data || err.message);
      
      const errorMessage = err.response?.data?.error || err.response?.data?.message || 'Failed to create discount';
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk to update a discount
export const updateDiscount = createAsyncThunk<
  Discount,
  { id: number; data: UpdateDiscountRequest },
  { rejectValue: string }
>(
  'discounts/updateDiscount',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put<Discount>(`${API_URL}/${id}`, data);
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      console.error("Update discount error:", err.response?.data || err.message);

      if (err.response?.data?.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(`Failed to update discount with ID: ${id}`);
      }
    }
  }
);

// Async thunk to delete a discount
export const deleteDiscount = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>(
  'discounts/deleteDiscount',
  async (discountId, { rejectWithValue }) => {
    try {
      await axios.delete<{ message: string }>(`${API_URL}/${discountId}`);
      return discountId; // Return the ID for the reducer to filter it out
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      console.error("Delete discount error:", err.response?.data || err.message);
      if (err.response?.data?.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(`Failed to delete discount with ID: ${discountId}`);
      }
    }
  }
);

// Create the discount slice
const discountSlice = createSlice({
  name: 'discounts',
  initialState,
  reducers: {
    clearDiscounts: (state) => {
      state.discounts = [];
      state.activeDiscounts = [];
    },
    setSelectedDiscount: (state, action: PayloadAction<Discount | null>) => {
      state.selectedDiscount = action.payload;
    },
    clearValidatedDiscount: (state) => {
      state.validatedDiscount = null;
      state.validationError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchAllDiscounts
      .addCase(fetchAllDiscounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllDiscounts.fulfilled, (state, action: PayloadAction<Discount[]>) => {
        state.loading = false;
        state.discounts = action.payload;
      })
      .addCase(fetchAllDiscounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Handle fetchActiveDiscounts
      .addCase(fetchActiveDiscounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActiveDiscounts.fulfilled, (state, action: PayloadAction<Discount[]>) => {
        state.loading = false;
        state.activeDiscounts = action.payload;
      })
      .addCase(fetchActiveDiscounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Handle fetchDiscountById
      .addCase(fetchDiscountById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDiscountById.fulfilled, (state, action: PayloadAction<Discount>) => {
        state.loading = false;
        state.selectedDiscount = action.payload;
        // Also update in discounts array if it exists
        const index = state.discounts.findIndex(d => d.discount_id === action.payload.discount_id);
        if (index !== -1) {
          state.discounts[index] = action.payload;
        } else {
          state.discounts.push(action.payload);
        }
      })
      .addCase(fetchDiscountById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Handle validateDiscountCode
      .addCase(validateDiscountCode.pending, (state) => {
        state.validating = true;
        state.validationError = null;
      })
      .addCase(validateDiscountCode.fulfilled, (state, action: PayloadAction<DiscountValidationResponse>) => {
        state.validating = false;
        state.validatedDiscount = action.payload;
      })
      .addCase(validateDiscountCode.rejected, (state, action) => {
        state.validating = false;
        state.validationError = action.payload as string;
        state.validatedDiscount = null;
      })
      
      // Handle createDiscount
      .addCase(createDiscount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDiscount.fulfilled, (state, action: PayloadAction<Discount>) => {
        state.loading = false;
        state.discounts.push(action.payload);
        // Also add to active discounts if it's active
        if (action.payload.is_active) {
          state.activeDiscounts.push(action.payload);
        }
      })
      .addCase(createDiscount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Handle updateDiscount
      .addCase(updateDiscount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDiscount.fulfilled, (state, action: PayloadAction<Discount>) => {
        state.loading = false;
        
        // Update in main discounts array
        const index = state.discounts.findIndex(d => d.discount_id === action.payload.discount_id);
        if (index !== -1) {
          state.discounts[index] = { 
            ...state.discounts[index], 
            ...action.payload 
          };
        } else {
          state.discounts.push(action.payload);
        }
        
        // Update in active discounts array
        const activeIndex = state.activeDiscounts.findIndex(d => d.discount_id === action.payload.discount_id);
        if (action.payload.is_active) {
          if (activeIndex !== -1) {
            state.activeDiscounts[activeIndex] = {
              ...state.activeDiscounts[activeIndex],
              ...action.payload
            };
          } else {
            state.activeDiscounts.push(action.payload);
          }
        } else if (activeIndex !== -1) {
          // Remove from active discounts if it's no longer active
          state.activeDiscounts.splice(activeIndex, 1);
        }
        
        // Update selected discount if it's the one being edited
        if (state.selectedDiscount && state.selectedDiscount.discount_id === action.payload.discount_id) {
          state.selectedDiscount = { 
            ...state.selectedDiscount, 
            ...action.payload 
          };
        }
      })
      .addCase(updateDiscount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Handle deleteDiscount
      .addCase(deleteDiscount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDiscount.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.discounts = state.discounts.filter(d => d.discount_id !== action.payload);
        state.activeDiscounts = state.activeDiscounts.filter(d => d.discount_id !== action.payload);
        
        // Clear selected discount if it's the one being deleted
        if (state.selectedDiscount && state.selectedDiscount.discount_id === action.payload) {
          state.selectedDiscount = null;
        }
      })
      .addCase(deleteDiscount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearDiscounts, setSelectedDiscount, clearValidatedDiscount } = discountSlice.actions;
export default discountSlice.reducer;