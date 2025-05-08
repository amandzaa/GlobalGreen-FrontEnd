// redux/features/auth/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

interface User {
  user_id: string;
  email: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  image_url?: string;
  role?: string;
  phone?: string;
  created_at?: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role?:string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
}

// API response types
interface AuthResponse {
  user?: User;
  userId?: string;
  id?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  role?: string;
  token?: string;
  access_token?: string;
  message?: string;
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
export const registerUser = createAsyncThunk<
  AuthResponse, 
  RegisterData, 
  { rejectValue: string }
>(
  'auth/register',
  async (userData: RegisterData, { rejectWithValue }) => {
    try {
      // Transform the field names to match what the API expects
      const transformedData = {
        email: userData.email,
        password: userData.password,
        first_name: userData.firstName,
        last_name: userData.lastName,
        phone: userData.phone,
        role:"Seller"
      };
      
      console.log("Sending registration data to API:", transformedData);
      
      const response = await axios.post<AuthResponse>(
        'https://globalgreen-backend-production.up.railway.app/auth/register',
        transformedData
      );
      
      console.log("API response:", response.data);
      
      // We don't need to store in localStorage as Redux Persist handles this
      // Just return the response data
      return response.data;
    } catch (error) {
      // Handle error responses
      const err = error as AxiosError<{ message?: string }>;
      console.error("Registration error:", err.response?.data || err.message);
      
      if (err.response && err.response.data && err.response.data.message) {
        return rejectWithValue(err.response.data.message);
      } else if (err.response && err.response.data) {
        // Handle case where error message might be in a different format
        return rejectWithValue(
          typeof err.response.data === 'string' 
            ? err.response.data 
            : 'An error occurred during registration.'
        );
      } else {
        return rejectWithValue('An error occurred during registration.');
      }
    }
  }
);

// Create async thunk for login action
export const loginUser = createAsyncThunk<
  AuthResponse,
  { email: string; password: string },
  { rejectValue: string }
>(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post<AuthResponse>(
        'https://globalgreen-backend-production.up.railway.app/auth/login',
        { email, password }
      );
      
      console.log("Login API response:", response.data);

      return response.data;
    } catch (error) {
      // Handle error responses
      const err = error as AxiosError<{ message?: string }>;
      console.error("Login error:", err.response?.data || err.message);
      
      if (err.response && err.response.data && err.response.data.message) {
        return rejectWithValue(err.response.data.message);
      } else if (err.response && err.response.data) {
        // Handle case where error message might be in a different format
        return rejectWithValue(
          typeof err.response.data === 'string' 
            ? err.response.data 
            : 'An error occurred during login.'
        );
      } else {
        return rejectWithValue('An error occurred during login.');
      }
    }
  }
);

// Create async thunk for fetching user data
export const fetchUserData = createAsyncThunk<
  User,
  void,
  { state: { auth: AuthState }; rejectValue: string }
>(
  'auth/fetchUser',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token;
      
      if (!token) {
        return rejectWithValue('No token available');
      }
      
      const response = await axios.get<User>(
        'https://globalgreen-backend-production.up.railway.app/auth/me',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      console.log("cek response fetch", response.data)
      return response.data;
      // No need to save to localStorage as Redux Persist handles this
    } catch (error) {
      const err = error as AxiosError;
      console.error("Fetch user error:", err.response?.data || err.message);
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
        console.error("regist PENDING PAYLOAD:"); 
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.errorMessage = '';
      })
      // When registration is successful
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        console.log("regist RESPONSE FULLFILLED PAYLOAD:", action.payload);
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
              user_id: action.payload.userId || action.payload.id || 'unknown',
              email: action.payload.email || '',
              first_name: action.payload.first_name,
              last_name: action.payload.last_name
            };
          }
          
          // Explicitly handle undefined by converting to null
          state.token = action.payload.token || action.payload.access_token || null;
        }
      })
      // When registration fails
      .addCase(registerUser.rejected, (state, action) => {
        console.log("Registration rejected with payload:", action.payload);
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload ?? 'Registration failed. Please try again.';
        state.user = null;
        state.token = null;
      })
      // When login request is initiated
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        console.error("LOGIN pending PAYLOAD:"); 
      })
      // When login is successful
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        console.log("regist RESPONSE FULLFILLED PAYLOAD:", action.payload);
        state.isLoading = false;
        state.isSuccess = true;
        
        if (action.payload.user) {
            state.user = {
            user_id: action.payload.user.user_id,
            email: action.payload.user.email,
            first_name: action.payload.user.first_name,
            last_name: action.payload.user.last_name,
            image_url: action.payload.user.image_url,
            role: action.payload.user.role,
            phone: action.payload.user.phone,
            created_at: action.payload.user.created_at
            };
        } else {
            // Fallback if user not provided (very rare)
            state.user = null;
        }
        
        state.token = action.payload.token || action.payload.access_token || null;
      })
      // When login fails
      .addCase(loginUser.rejected, (state, action) => {
        console.error("LOGIN REJECTED PAYLOAD:", action.payload); 
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload ?? 'Login failed. Please try again.';
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