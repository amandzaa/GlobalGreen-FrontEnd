// redux/features/auth/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define types for better TypeScript support
interface User {
  id: string;
  email: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  imageUrl?: string;
  // Add more user properties as needed
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
}

// Initialize state (no need to read from localStorage since Redux Persist handles this)
const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};

// Create async thunk for registration action
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: RegisterData, { rejectWithValue }) => {
    try {
      // Transform the field names to match what the API expects
      const transformedData = {
        email: userData.email,
        password: userData.password,
        first_name: userData.firstName,    // Changed from firstName to first_name
        last_name: userData.lastName,      // Changed from lastName to last_name
        phone: userData.phoneNumber        // Changed from phoneNumber to phone
      };
      
      console.log("Sending registration data to API:", transformedData);
      
      const response = await axios.post(
        'https://globalgreen-backend-production.up.railway.app/auth/register',
        transformedData
      );
      
      console.log("API response:", response.data);
      
      // We don't need to store in localStorage as Redux Persist handles this
      // Just return the response data
      return response.data;
    } catch (error: any) {
      // Handle error responses
      console.error("Registration error:", error.response?.data || error.message);
      
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else if (error.response && error.response.data) {
        // Handle case where error message might be in a different format
        return rejectWithValue(
          typeof error.response.data === 'string' 
            ? error.response.data 
            : 'An error occurred during registration.'
        );
      } else {
        return rejectWithValue('An error occurred during registration.');
      }
    }
  }
);

// Create async thunk for login action
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://globalgreen-backend-production.up.railway.app/auth/login',
        { email, password }
      );
      
      console.log("Login API response:", response.data);
      
      // We don't need to store in localStorage as Redux Persist handles this
      return response.data;
    } catch (error: any) {
      // Handle error responses
      console.error("Login error:", error.response?.data || error.message);
      
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else if (error.response && error.response.data) {
        // Handle case where error message might be in a different format
        return rejectWithValue(
          typeof error.response.data === 'string' 
            ? error.response.data 
            : 'An error occurred during login.'
        );
      } else {
        return rejectWithValue('An error occurred during login.');
      }
    }
  }
);

// Create async thunk for fetching user data
export const fetchUserData = createAsyncThunk(
  'auth/fetchUser',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { auth: AuthState };
      const token = state.auth.token;
      
      if (!token) {
        return rejectWithValue('No token available');
      }
      
      const response = await axios.get(
        'https://globalgreen-backend-production.up.railway.app/auth/me',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      return response.data;
      // No need to save to localStorage as Redux Persist handles this
    } catch (error: any) {
      console.error("Fetch user error:", error.response?.data || error.message);
      return rejectWithValue('Failed to fetch user data');
    }
  }
);

// Create the auth slice with reducers and actions
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Reset the auth state flags (loading, success, error)
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = '';
    },
    // Handle user logout
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = '';
    },
    // Manually set user credentials
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
  // Handle async action states
  extraReducers: (builder) => {
    builder
      // When registration request is initiated
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.errorMessage = '';
      })
      // When registration is successful
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<any>) => {
        console.log("Registration fulfilled with payload:", action.payload);
        state.isLoading = false;
        state.isSuccess = true;
        
        // Handle potential different API response structures
        if (action.payload) {
          // Try to extract user object and token from the response
          if (action.payload.user) {
            state.user = action.payload.user;
          } else {
            // Create user object from available fields
            state.user = {
              id: action.payload.userId || action.payload.id || 'unknown',
              email: action.payload.email || '',
              first_name: action.payload.first_name,
              last_name: action.payload.last_name
            };
          }
          
          state.token = action.payload.token || action.payload.accessToken || null;
        }
      })
      // When registration fails
      .addCase(registerUser.rejected, (state, action) => {
        console.log("Registration rejected with payload:", action.payload);
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload as string || 'Registration failed. Please try again.';
        state.user = null;
        state.token = null;
      })
      // When login request is initiated
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      // When login is successful
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        
        // Set user data, handling potential different response structures
        if (action.payload.user) {
          state.user = action.payload.user;
        } else {
          // Try to construct a user object from available fields
          state.user = {
            id: action.payload.userId || action.payload.id || 'unknown',
            email: action.payload.email || '',
            first_name: action.payload.first_name,
            last_name: action.payload.last_name
          };
        }
        
        state.token = action.payload.token || action.payload.accessToken;
      })
      // When login fails
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload as string;
        state.user = null;
      })
      // When fetching user data
      .addCase(fetchUserData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserData.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

// Export actions and reducer
export const { reset, logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;