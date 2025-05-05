import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppSelector } from '../store';

interface UseAuthOptions {
  required?: boolean;
}

/**
 * Custom hook to handle authentication state and redirects
 * @param options Configuration options
 * @param options.required If true, redirects to login page when user is not authenticated
 * @returns Authentication state
 */
export function useAuth({ required = false }: UseAuthOptions = {}) {
  const { user, token } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    // If auth is required and there's no user, redirect to login
    if (required && !user && !token) {
      router.push('/login');
    }
  }, [required, user, token, router]);

  return { 
    user, 
    isAuthenticated: !!user && !!token 
  };
}