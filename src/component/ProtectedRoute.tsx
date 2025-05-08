// components/ProtectedRoute.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/redux/store';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const { token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // If no token is found, redirect to login
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  // While checking auth status, you could show a loading indicator
  if (!token) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  // If token exists, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;