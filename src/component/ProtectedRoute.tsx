import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppSelector } from '../redux/store';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Component to protect routes that require authentication
 * Redirects to login page if user is not authenticated
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, token } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user || !token) {
      router.push('/login');
    }
  }, [user, token, router]);

  // Show loading state while checking authentication or redirecting
  if (!user || !token) {
    return <div>Loading...</div>;
  }

  // Render children if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;