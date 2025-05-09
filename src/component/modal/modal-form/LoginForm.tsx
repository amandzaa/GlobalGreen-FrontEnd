import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { loginUser, reset } from "@/redux/features/auth/authSlice";
import { Eye, EyeOff, Mail, Lock, AlertCircle, X, Loader2 } from "lucide-react";

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // Validation states
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, token, isLoading, isSuccess, isError, errorMessage } =
    useAppSelector((state) => state.auth);

  // Check for stored email on component mount
  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberedEmail");
    if (storedEmail) {
      setEmail(storedEmail);
      setRememberMe(true);
    }
  }, []);

  // Handle successful login
  useEffect(() => {
    if (isSuccess && user && token) {
      // Store email if "Remember me" is checked
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
      
      // Redirect to dashboard
      router.push("/seller-dashboard");
    }
    return () => {
      dispatch(reset());
    };
  }, [isSuccess, user, token, dispatch, router, rememberMe, email]);

  // Form validation
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
  const isPasswordValid = (password: string) => password.length >= 6;

  // Computed validation states
  const emailError = email && !isValidEmail(email);
  const passwordError = password && !isPasswordValid(password);
  const formIsValid = isValidEmail(email) && isPasswordValid(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    
    if (formIsValid) {
      dispatch(loginUser({ email, password }));
    }
  };

  const handleDismissError = () => {
    dispatch(reset());
  };

  const handleForgotPassword = () => {
    router.push("/forgot-password");
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-green-600 font-semibold hover:text-green-700 hover:underline"
        >
          Create Account
        </button>
      </div>

      {/* Error Message */}
      {isError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md flex items-start justify-between">
          <div className="flex gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Authentication failed</p>
              <p className="text-sm">{errorMessage}</p>
            </div>
          </div>
          <button 
            onClick={handleDismissError} 
            className="text-gray-500 hover:text-gray-700"
            aria-label="Dismiss error"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              className={`w-full pl-10 pr-3 py-3 border rounded-md transition-all focus:outline-none focus:ring-2 ${
                emailError && (emailFocused || formSubmitted)
                  ? "border-red-300 focus:ring-red-200"
                  : "border-gray-300 focus:ring-green-200 focus:border-green-500"
              }`}
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              required
            />
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          {emailError && (emailFocused || formSubmitted) && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" /> 
              Please enter a valid email address
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-2"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className={`w-full pl-10 pr-10 py-3 border rounded-md transition-all focus:outline-none focus:ring-2 ${
                passwordError && (passwordFocused || formSubmitted)
                  ? "border-red-300 focus:ring-red-200"
                  : "border-gray-300 focus:ring-green-200 focus:border-green-500"
              }`}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPasswordFocused(true)} 
              onBlur={() => setPasswordFocused(false)}
              required
            />
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {passwordError && (passwordFocused || formSubmitted) && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" /> 
              Password must be at least 6 characters
            </p>
          )}
        </div>

        {/* Remember Me & Forgot Password
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>

          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-green-600 text-sm font-medium hover:text-green-700 hover:underline"
          >
            Forgot Password?
          </button>
        </div> */}

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-3 rounded-md font-semibold transition flex items-center justify-center ${
            formIsValid
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!formIsValid || isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </button>

        {/* Social Login Options */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 14-7.503 14-14 0-.21 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"/>
              </svg>
            </button>

            <button
              type="button"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"/>
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;