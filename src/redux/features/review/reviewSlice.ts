import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

// API base URL - updated to the production URL
const API_URL = 'https://globalgreen-backend-production.up.railway.app/reviews';

// Define the Review interface
export interface Review {
  review_id: number;
  product_id: number;
  user_id: number;
  rating: number;
  comment: string;
  created_at: string;
  updated_at?: string;
  user_name?: string;
  product_name?: string;
  helpful_count?: number;
  reported?: boolean;
}

// Define review creation request
export interface CreateReviewRequest {
  product_id: number;
  rating: number;
  comment: string;
}

// Define review update request
export interface UpdateReviewRequest {
  rating?: number;
  comment?: string;
}

interface ReviewState {
  productReviews: { [productId: number]: Review[] };
  userReviews: Review[];
  selectedReview: Review | null;
  loading: boolean;
  error: string | null;
  submitting: boolean;
  submitError: string | null;
}

const initialState: ReviewState = {
  productReviews: {},
  userReviews: [],
  selectedReview: null,
  loading: false,
  error: null,
  submitting: false,
  submitError: null,
};

// Async thunk to fetch reviews for a product
export const fetchProductReviews = createAsyncThunk<
  Review[],
  number, // product_id
  { rejectValue: string }
>(
  'reviews/fetchProductReviews',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get<Review[]>(`${API_URL}/product/${productId}`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      console.error("Fetch product reviews error:", err.response?.data || err.message);
      
      if (err.response?.data?.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(`Failed to fetch reviews for product ID: ${productId}`);
      }
    }
  }
);

// Async thunk to fetch user's reviews
export const fetchUserReviews = createAsyncThunk<
  Review[],
  number, // user_id
  { rejectValue: string }
>(
  'reviews/fetchUserReviews',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get<Review[]>(`${API_URL}/user/${userId}`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      console.error("Fetch user reviews error:", err.response?.data || err.message);
      
      if (err.response?.data?.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(`Failed to fetch reviews for user ID: ${userId}`);
      }
    }
  }
);

// Async thunk to fetch a single review
export const fetchReviewById = createAsyncThunk<
  Review,
  number, // review_id
  { rejectValue: string }
>(
  'reviews/fetchReviewById',
  async (reviewId, { rejectWithValue }) => {
    try {
      const response = await axios.get<Review>(`${API_URL}/${reviewId}`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      console.error("Fetch review error:", err.response?.data || err.message);
      
      if (err.response?.data?.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(`Failed to fetch review with ID: ${reviewId}`);
      }
    }
  }
);

// Async thunk to create a new review
export const createReview = createAsyncThunk<
  Review,
  { userId: number; data: CreateReviewRequest },
  { rejectValue: string }
>(
  'reviews/createReview',
  async ({ userId, data }, { rejectWithValue }) => {
    try {
      const response = await axios.post<Review>(`${API_URL}/user/${userId}`, data);
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      console.error("Create review error:", err.response?.data || err.message);
      
      if (err.response?.data?.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue('Failed to create review');
      }
    }
  }
);

// Async thunk to update a review
export const updateReview = createAsyncThunk<
  Review,
  { reviewId: number; data: UpdateReviewRequest },
  { rejectValue: string }
>(
  'reviews/updateReview',
  async ({ reviewId, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put<Review>(`${API_URL}/${reviewId}`, data);
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      console.error("Update review error:", err.response?.data || err.message);
      
      if (err.response?.data?.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(`Failed to update review with ID: ${reviewId}`);
      }
    }
  }
);

// Async thunk to delete a review
export const deleteReview = createAsyncThunk<
  number, // review_id
  number, // review_id
  { rejectValue: string }
>(
  'reviews/deleteReview',
  async (reviewId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${reviewId}`);
      return reviewId;
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      console.error("Delete review error:", err.response?.data || err.message);
      
      if (err.response?.data?.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(`Failed to delete review with ID: ${reviewId}`);
      }
    }
  }
);

// Async thunk to mark a review as helpful
export const markReviewHelpful = createAsyncThunk<
  Review,
  { reviewId: number; userId: number },
  { rejectValue: string }
>(
  'reviews/markHelpful',
  async ({ reviewId, userId }, { rejectWithValue }) => {
    try {
      const response = await axios.post<Review>(`${API_URL}/${reviewId}/helpful`, { user_id: userId });
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      console.error("Mark review helpful error:", err.response?.data || err.message);
      
      if (err.response?.data?.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(`Failed to mark review as helpful: ${reviewId}`);
      }
    }
  }
);

const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    resetReviews: (state) => {
      state.productReviews = {};
      state.userReviews = [];
      state.selectedReview = null;
      state.error = null;
      state.submitError = null;
    },
    setSelectedReview: (state, action: PayloadAction<Review | null>) => {
      state.selectedReview = action.payload;
    },
    clearSubmitError: (state) => {
      state.submitError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchProductReviews
      .addCase(fetchProductReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductReviews.fulfilled, (state, action: PayloadAction<Review[]>) => {
        state.loading = false;
        if (action.payload.length > 0) {
          const productId = action.payload[0].product_id;
          state.productReviews[productId] = action.payload;
        }
      })
      .addCase(fetchProductReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Handle fetchUserReviews
      .addCase(fetchUserReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserReviews.fulfilled, (state, action: PayloadAction<Review[]>) => {
        state.loading = false;
        state.userReviews = action.payload;
      })
      .addCase(fetchUserReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Handle fetchReviewById
      .addCase(fetchReviewById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviewById.fulfilled, (state, action: PayloadAction<Review>) => {
        state.loading = false;
        state.selectedReview = action.payload;
        
        // Update in the respective collections if exists
        const productId = action.payload.product_id;
        
        // Update in product reviews if it exists
        if (state.productReviews[productId]) {
          const index = state.productReviews[productId].findIndex(r => r.review_id === action.payload.review_id);
          if (index !== -1) {
            state.productReviews[productId][index] = action.payload;
          } else {
            state.productReviews[productId].push(action.payload);
          }
        }
        
        // Update in user reviews if it exists
        const userIndex = state.userReviews.findIndex(r => r.review_id === action.payload.review_id);
        if (userIndex !== -1) {
          state.userReviews[userIndex] = action.payload;
        }
      })
      .addCase(fetchReviewById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Handle createReview
      .addCase(createReview.pending, (state) => {
        state.submitting = true;
        state.submitError = null;
      })
      .addCase(createReview.fulfilled, (state, action: PayloadAction<Review>) => {
        state.submitting = false;
        state.selectedReview = action.payload;
        
        // Add to user reviews
        state.userReviews.unshift(action.payload);
        
        // Add to product reviews if that product's reviews are loaded
        const productId = action.payload.product_id;
        if (state.productReviews[productId]) {
          state.productReviews[productId].unshift(action.payload);
        }
      })
      .addCase(createReview.rejected, (state, action) => {
        state.submitting = false;
        state.submitError = action.payload as string;
      })
      
      // Handle updateReview
      .addCase(updateReview.pending, (state) => {
        state.submitting = true;
        state.submitError = null;
      })
      .addCase(updateReview.fulfilled, (state, action: PayloadAction<Review>) => {
        state.submitting = false;
        state.selectedReview = action.payload;
        
        // Update in product reviews if it exists
        const productId = action.payload.product_id;
        if (state.productReviews[productId]) {
          const index = state.productReviews[productId].findIndex(r => r.review_id === action.payload.review_id);
          if (index !== -1) {
            state.productReviews[productId][index] = action.payload;
          }
        }
        
        // Update in user reviews if it exists
        const userIndex = state.userReviews.findIndex(r => r.review_id === action.payload.review_id);
        if (userIndex !== -1) {
          state.userReviews[userIndex] = action.payload;
        }
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.submitting = false;
        state.submitError = action.payload as string;
      })
      
      // Handle deleteReview
      .addCase(deleteReview.pending, (state) => {
        state.submitting = true;
        state.submitError = null;
      })
      .addCase(deleteReview.fulfilled, (state, action: PayloadAction<number>) => {
        state.submitting = false;
        
        // Remove from selected review if it matches
        if (state.selectedReview && state.selectedReview.review_id === action.payload) {
          state.selectedReview = null;
        }
        
        // Remove from user reviews
        state.userReviews = state.userReviews.filter(r => r.review_id !== action.payload);
        
        // Remove from product reviews if it exists
        for (const productId in state.productReviews) {
          state.productReviews[productId] = state.productReviews[productId].filter(
            r => r.review_id !== action.payload
          );
        }
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.submitting = false;
        state.submitError = action.payload as string;
      })
      
      // Handle markReviewHelpful
      .addCase(markReviewHelpful.fulfilled, (state, action: PayloadAction<Review>) => {
        // Update in product reviews if it exists
        const productId = action.payload.product_id;
        if (state.productReviews[productId]) {
          const index = state.productReviews[productId].findIndex(r => r.review_id === action.payload.review_id);
          if (index !== -1) {
            state.productReviews[productId][index] = action.payload;
          }
        }
        
        // Update in user reviews if it exists
        const userIndex = state.userReviews.findIndex(r => r.review_id === action.payload.review_id);
        if (userIndex !== -1) {
          state.userReviews[userIndex] = action.payload;
        }
        
        // Update selected review if it matches
        if (state.selectedReview && state.selectedReview.review_id === action.payload.review_id) {
          state.selectedReview = action.payload;
        }
      });
  },
});

export const { resetReviews, setSelectedReview, clearSubmitError } = reviewSlice.actions;
export default reviewSlice.reducer; 