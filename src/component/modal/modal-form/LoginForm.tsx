import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { loginUser, reset } from "@/redux/features/auth/authSlice";
import { Eye, EyeOff, ChevronLeft, Mail } from 'lucide-react';

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  // Local component state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1); // 1 for email step, 2 for password step
  
  // Hooks
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  // Get auth state from Redux store
  const { user, isLoading, isSuccess, isError, errorMessage } = useAppSelector(
    (state) => state.auth
  );

  // Effect to handle successful login
  useEffect(() => {
    // If login successful, redirect to dashboard
    if (isSuccess && user) {
      router.push('/seller-dashboard');
    }

    // Clean up effect - reset auth state flags when component unmounts
    return () => {
      dispatch(reset());
    };
  }, [isSuccess, user, dispatch, router]);

  // Move to password step
  const handleNextStep = () => {
    if (email && isValidEmail(email)) {
      setStep(2);
    }
  };

  // Validate email format
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      // If we're on the email step, move to password step
      handleNextStep();
    } else {
      // If we're on the password step, attempt login
      dispatch(loginUser({ email, password }));
    }
  };

  // Go back to email input step
  const handleBackToEmail = () => {
    setStep(1);
  };

  // Handle forgotten password
  const handleForgotPassword = () => {
    // Add your forgot password logic here
    router.push('/forgot-password');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
      {/* Header */}
      <div className="flex items-baseline mb-6">
        <h2 className="text-2xl font-medium text-gray-800">Sign In</h2>
        <button 
          onClick={onSwitchToRegister}
          className="ml-auto text-green-600 font-medium hover:text-green-700 transition"
        >
          Register
        </button>
      </div>

      {/* Error message */}
      {isError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md flex items-start">
          <span className="font-medium mr-1">Error:</span> {errorMessage}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {step === 1 ? (
          // Email Step
          <>
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  required
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
              {email && !isValidEmail(email) && (
                <p className="text-red-500 text-sm mt-1">
                  Please enter a valid email address
                </p>
              )}
            </div>

            <div className="text-right">
              <button 
                type="button" 
                onClick={handleForgotPassword}
                className="text-green-600 text-sm font-medium hover:text-green-700 transition"
              >
                Forgot Password?
              </button>
            </div>

            <button 
              type="submit"
              className={`w-full py-3 rounded-md font-medium transition ${
                email && isValidEmail(email) 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!email || !isValidEmail(email) || isLoading}
            >
              {isLoading ? 'Processing...' : 'Continue'}
            </button>
          </>
        ) : (
          // Password Step
          <>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-gray-700 font-medium" htmlFor="email-display">
                  Email
                </label>
                <button
                  type="button"
                  onClick={handleBackToEmail}
                  className="text-green-600 text-sm font-medium flex items-center hover:text-green-700 transition"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Change
                </button>
              </div>
              <div className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-gray-700">
                {email}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              <div className="text-right mt-1">
                <button 
                  type="button" 
                  onClick={handleForgotPassword}
                  className="text-green-600 text-sm font-medium hover:text-green-700 transition"
                >
                  Forgot Password?
                </button>
              </div>
            </div>

            <button 
              type="submit"
              className={`w-full py-3 rounded-md font-medium transition ${
                password 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!password || isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </>
        )}

        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-gray-200"></div>
          <p className="px-4 text-gray-500 text-sm">or sign in with</p>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        <button 
          type="button" 
          className="w-full flex items-center justify-center py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition"
        >
          <div className="mr-2 relative w-5 h-5">
            <Image src="/google-logo.png" alt="Google" fill sizes="20px" />
          </div>
          <span className="font-medium">Google</span>
        </button>

        <div className="text-center pt-4">
          <p className="text-gray-600">
            Don't have a GlobalGreen account? 
            <button 
              type="button"
              onClick={onSwitchToRegister}
              className="text-green-600 font-medium ml-1 hover:text-green-700 transition"
            >
              Register
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;