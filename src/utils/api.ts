// utils/api.ts
import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { store } from '@/redux/store';
import { logout } from '@/redux/features/auth/authSlice';
import { isTokenValid } from './tokenValidation';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: 'https://globalgreen-backend-production.up.railway.app',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor to check token validity and add it to requests
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { token } = store.getState().auth;
    
    // Check if we have a token
    if (token) {
      // First validate the token
      if (!isTokenValid(token)) {
        // Token is invalid or expired
        console.warn('Token is invalid or expired. Logging out...');
        store.dispatch(logout());
        
        // You could throw an error here to cancel the request
        // or let it proceed without a token (will likely fail with 401)
        
        // Option 1: Cancel the request
        // throw new axios.Cancel('Operation canceled due to invalid token');
        
        // Option 2: Let it proceed without a token (will fail with 401)
      } else {
        // Token is valid, add it to the request
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Add response interceptor to handle 401 errors
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Any status code within the range of 2xx cause this function to trigger
    return response;
  },
  (error) => {
    // Any status codes outside the range of 2xx cause this function to trigger
    if (error.response && error.response.status === 401) {
      // If we receive a 401 Unauthorized response, the token is no longer valid
      console.warn('Received 401 Unauthorized response. Logging out...');
      store.dispatch(logout());
      
      // Redirect to login page if needed
      // If you want to redirect programmatically, you'll need to use router
      // or window.location here, but this can be tricky in a util file
      
      // Alternative: you can use a custom event to notify components
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('unauthorizedResponse'));
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;