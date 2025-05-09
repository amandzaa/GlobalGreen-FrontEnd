import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { loginStart, loginSuccess, loginFailure } from '../../store/slices/authSlice';
import { loginUser } from '../../public/services/api';
import './styles.css'; // Import your styles

interface User {
  created_at: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  role: string;
  user_id: number;
}

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [role, setRole] = useState<'buyer' | 'seller'>('buyer');
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://globalgreen-backend-production.up.railway.app/login'); // Replace with your friend's login API URL
        const data = await response.json();
        setUser(data.user);
        setAccessToken(data.access_token);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const userData = await loginUser(email, password);
      dispatch(loginSuccess(userData));
      
      // Simplified navigation logic
      const destination = router.pathname === '/' ? '/dashboard' : '/';
      router.push(destination);
    } catch (err) {
      dispatch(loginFailure('Login failed. Please try again.'));
      console.error('Login error:', err);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
      <Link href="/register">Don't have an account? Register here</Link>
      {error && <div className="error-message">{error}</div>}
      {user ? (
        <div>
          <h2>Welcome, {user.first_name} {user.last_name}</h2>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>Role: {user.role}</p>
          <p>User ID: {user.user_id}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default LoginPage;