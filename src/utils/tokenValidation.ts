// utils/tokenValidation.ts
import { store } from '@/redux/store';
import { logout } from '@/redux/features/auth/authSlice';
import { jwtDecode } from 'jwt-decode'

interface DecodedToken {
    exp?: number;
  }


  export const isTokenValid = (token: string | null): boolean => {
    if (!token) {
      return false;
    }
  
    try {
      const decodedToken: DecodedToken = jwtDecode<DecodedToken>(token);
  
      if (!decodedToken.exp) {
        // No expiration claim — consider invalid
        return false;
      }
      
      const currentTime = Date.now() / 1000; // Convert to seconds
      return decodedToken.exp > currentTime;
    } catch (error) {
      console.error('Error decoding token:', error);
      return false;
    }
  };

/**
 * Get token expiration time in milliseconds
 */
export const getTokenExpirationTime = (token: string | null): number | null => {
    if (!token) return null;
    
    try {
      const decodedToken: DecodedToken = jwtDecode<DecodedToken>(token);
      if (!decodedToken.exp) return null;
  
      // Return expiration time in milliseconds
      return decodedToken.exp * 1000;
    } catch {
      return null;
    }
  };

/**
 * Check current token in Redux store
 */
export const validateCurrentToken = (): boolean => {
  const { token } = store.getState().auth;
  return isTokenValid(token);
};

/**
 * Logout if token is invalid
 */
export const checkAndHandleInvalidToken = (): boolean => {
  if (!validateCurrentToken()) {
    // Token is invalid, dispatch logout action
    store.dispatch(logout());
    return false;
  }
  return true;
};