import { useEffect } from 'react';
import { fetchUserData } from '../redux/features/auth/authSlice';
import { useAppSelector, useAppDispatch } from "@/redux/store"

/**
 * Component that initializes authentication state when the app loads
 * This should be placed high in your component tree
 */
const AuthInitializer: React.FC = () => {
  const dispatch = useAppDispatch(); // Use your existing typed dispatch
  const { token, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // If we have a token but no user, fetch the user data
    if (token && !user) {
      dispatch(fetchUserData());
    }
  }, [dispatch, token, user]);

  // This is a utility component that doesn't render anything
  return null;
};

export default AuthInitializer;