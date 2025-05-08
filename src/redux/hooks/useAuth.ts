// hooks/useAuth.ts
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { logout } from '@/redux/features/auth/authSlice';
import { isTokenValid } from '@/utils/tokenValidation';

export const useAuth = (requireAuth = false, redirectTo = '/login') => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, token, isLoading } = useAppSelector((state) => state.auth);
  
  // Check if the user is authenticated based on token validity
  const isAuthenticated = !!token && isTokenValid(token);

  useEffect(() => {
    // If we require authentication and the token is invalid, redirect to login
    if (requireAuth && !isLoading && !isAuthenticated) {
      router.replace(redirectTo);
    }
    
    // Listen for unauthorized responses
    const handleUnauthorized = () => {
      router.replace(redirectTo);
    };
    
    // Add event listener for custom unauthorized event from API interceptor
    window.addEventListener('unauthorizedResponse', handleUnauthorized);
    
    // Clean up event listener on unmount
    return () => {
      window.removeEventListener('unauthorizedResponse', handleUnauthorized);
    };
  }, [isAuthenticated, isLoading, requireAuth, redirectTo, router]);
  
  // Function to handle logout
  const handleLogout = () => {
    dispatch(logout());
    router.push(redirectTo);
  };
  
  return {
    user,
    token,
    isLoading,
    isAuthenticated,
    logout: handleLogout
  };
};