// utils/auth.ts
import axios from 'axios';
import { store } from '@/redux/store';
import { logout } from '@/redux/features/auth/authSlice';

// Create an axios instance with default configuration
export const api = axios.create({
  baseURL: 'https://globalgreen-backend-production.up.railway.app'
});

// Add request interceptor to inject the token
api.interceptors.request.use(
  (config) => {
    // Get the current token from Redux store
    const token = store.getState().auth.token;
    
    // If token exists, add it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors (expired token)
    if (error.response && error.response.status === 401) {
      // Dispatch logout action to clear auth state
      store.dispatch(logout());
      
      // You could also redirect to login here if needed
      // But that's usually better handled by the ProtectedRoute component
    }
    
    return Promise.reject(error);
  }
);

// Helper hook for components to check auth status
import { useAppSelector } from '@/redux/store';

export const useAuth = () => {
  const auth = useAppSelector((state) => state.auth);
  
  return {
    user: auth.user,
    token: auth.token,
    isAuthenticated: !!auth.token,
    isLoading: auth.isLoading,
    isError: auth.isError,
    errorMessage: auth.errorMessage
  };
};

// Example of a function to make authenticated API calls
export const fetchAuthenticatedData = async (endpoint: string) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};