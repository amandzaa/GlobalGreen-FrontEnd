// utils/tokenValidation.ts
import { store } from '@/redux/store';
import { logout } from '@/redux/features/auth/authSlice';
import { jwtDecode } from 'jwt-decode'

/**
 * Check if a token exists and is not expired
 */
export const isTokenValid = (token: string | null): boolean => {
  if (!token) {
    return false;
  }

  try {
    // Try to decode the token
    const decodedToken: any = jwtDecode(token);
    
    // Check token expiration
    // JWT exp is in seconds, Date.now() is in milliseconds
    if (!decodedToken.exp) {
      // If there's no expiration claim, we can't verify expiration
      // You may decide to consider this invalid
      return false;
    }
    
    const currentTime = Date.now() / 1000; // Convert to seconds
    return decodedToken.exp > currentTime;
  } catch (error) {
    // If we can't decode the token, it's invalid
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
    const decodedToken: any = jwtDecode(token);
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