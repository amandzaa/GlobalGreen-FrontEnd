// components/RegisterForm.tsx
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Mail, User, Phone, Eye, EyeOff, Lock, AlertCircle, CheckCircle, Info, Store, UserCircle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { registerUser, reset } from '@/redux/features/auth/authSlice';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
  onClose: () => void;
}

// Define user role types
type UserRole = 'customer' | 'seller';

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin, onClose }) => {
  // Local component state
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showExistingUserModal, setShowExistingUserModal] = useState(false);
  const [role, setRole] = useState<UserRole>('customer'); // Default to customer role

  // Hooks
  const dispatch = useAppDispatch();
  
  // Get auth state from Redux store
  const { user, token, isLoading, isSuccess, isError, errorMessage } = useAppSelector(
    (state) => state.auth
  );

  // Add debugging log to monitor Redux state changes
  useEffect(() => {
    console.log("Auth state updated:", { isLoading, isSuccess, isError, errorMessage, user, token });
  }, [isLoading, isSuccess, isError, errorMessage, user, token]);

  // Validate email format
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate password strength
  const isStrongPassword = (password: string) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return strongPasswordRegex.test(password);
  };

  // Validate phone number
  const isValidPhone = (phone: string) => {
    if (!phone) return true; // Phone is optional
    const phoneRegex = /^\+[0-9]+$/;
    return phoneRegex.test(phone);
  };

  // Reset form fields
  const resetForm = () => {
    setEmail('');
    setFirstName('');
    setLastName('');
    setPhone('');
    setPhoneError('');
    setPassword('');
    setConfirmPassword('');
    setRole('customer');
  };

  // Check if passwords match
  useEffect(() => {
    if (confirmPassword) {
      setPasswordsMatch(password === confirmPassword);
    } else {
      setPasswordsMatch(true);
    }
  }, [password, confirmPassword]);

  // Validate phone number when it changes
  useEffect(() => {
    if (phone) {
      if (!isValidPhone(phone)) {
        setPhoneError('Phone number must start with + followed by numbers only');
      } else {
        setPhoneError('');
      }
    } else {
      setPhoneError('');
    }
  }, [phone]);

  // Effect to handle modal displays with improved logic
  useEffect(() => {
    console.log("Modal effect triggered:", { 
      formSubmitted, 
      isSuccess, 
      isError, 
      errorMessage, 
      showSuccessModal,
      showExistingUserModal
    });

    // If registration was attempted and is now successful
    if (formSubmitted && isSuccess) {
      console.log("Success condition met - showing success modal");
      // First close the register modal
      onClose();
      // Then show the success modal
      setShowSuccessModal(true);
      setFormSubmitted(false);
    }

    // If registration was attempted and has an error
    if (formSubmitted && isError) {
      console.log("Error condition met, message:", errorMessage);
      
      // More flexible check for existing user errors
      const existingUserTerms = ['exist', 'already', 'registered', 'taken', 'duplicate'];
      const isExistingUserError = existingUserTerms.some(term => 
        errorMessage.toLowerCase().includes(term)
      );
      
      if (isExistingUserError) {
        console.log("Existing user error detected - showing modal");
        setShowExistingUserModal(true);
      }
      setFormSubmitted(false);
    }

  }, [isSuccess, isError, errorMessage, formSubmitted, onClose, showSuccessModal, showExistingUserModal]);

  // Clean up auth state when component unmounts
  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  // Handle closing the success modal and redirect to login
  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    resetForm();
    // Switch to login modal instead of redirecting to dashboard
    onSwitchToLogin();
  };

  // Handle closing the existing user modal
  const handleExistingUserModalClose = () => {
    setShowExistingUserModal(false);
    dispatch(reset()); // Clear the error state
  };

  // Handle switching to login after existing user notification
  const handleSwitchToLoginFromModal = () => {
    setShowExistingUserModal(false);
    dispatch(reset()); // Clear the error state
    onSwitchToLogin();
  };

  // State for input focus tracking
  const [emailFocused, setEmailFocused] = useState(false);
  const [firstNameFocused, setFirstNameFocused] = useState(false);
  const [lastNameFocused, setLastNameFocused] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    
    // Validation checks
    if (!isValidEmail(email) || !isStrongPassword(password) || !passwordsMatch) {
      return;
    }

    // If phone is provided but invalid, don't submit
    if (phone && !isValidPhone(phone)) {
      return;
    }
    
    // If required fields are empty for the role, don't submit
    if (!firstName || !lastName || (role === 'seller' && !phone)) {
      return;
    }
    
    // Handle registration submission
    const userData = {
      email,
      password,
      firstName,
      lastName,
      phone: phone || undefined,
      role,
    };
    
    console.log("Submitting registration data:", userData);
    
    // Flag that form has been submitted - IMPORTANT for modal logic
    setFormSubmitted(true);
    
    // Dispatch the register action
    dispatch(registerUser(userData));
  };

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
        {/* Header */}
        <div className="flex items-baseline mb-6">
          <h2 className="text-2xl font-medium text-gray-800">Register</h2>
          <button
            onClick={onSwitchToLogin}
            className="ml-auto text-green-600 font-medium hover:text-green-700 transition"
          >
            Sign In
          </button>
        </div>

        {/* Error message (only show if it's not an "existing user" error) */}
        {isError && 
          !errorMessage.toLowerCase().includes('already exist') && 
          !errorMessage.toLowerCase().includes('already registered') &&
          !errorMessage.toLowerCase().includes('email already') && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md flex items-start">
            <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="register-email">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                id="register-email"
                className={`w-full pl-10 pr-3 py-3 border rounded-md transition-all focus:outline-none focus:ring-2 ${
                  email && !isValidEmail(email) && (emailFocused || formSubmitted)
                    ? "border-red-300 focus:ring-red-200"
                    : "border-gray-300 focus:ring-green-200 focus:border-green-500"
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
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

          {/* Name Fields */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="first-name">
                First Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="first-name"
                  className={`w-full pl-10 pr-3 py-3 border rounded-md transition-all focus:outline-none focus:ring-2 ${
                    !firstName && (firstNameFocused || formSubmitted)
                      ? "border-red-300 focus:ring-red-200"
                      : "border-gray-300 focus:ring-green-200 focus:border-green-500"
                  }`}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  onFocus={() => setFirstNameFocused(true)}
                  onBlur={() => setFirstNameFocused(false)}
                  placeholder="John"
                  required
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>

            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="last-name">
                Last Name
              </label>
              <input
                type="text"
                id="last-name"
                className={`w-full px-3 py-3 border rounded-md transition-all focus:outline-none focus:ring-2 ${
                  !lastName && (lastNameFocused || formSubmitted)
                    ? "border-red-300 focus:ring-red-200"
                    : "border-gray-300 focus:ring-green-200 focus:border-green-500"
                }`}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                onFocus={() => setLastNameFocused(true)}
                onBlur={() => setLastNameFocused(false)}
                placeholder="Doe"
                required
              />
            </div>
          </div>

          {/* User Role Selection */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Account Type
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setRole('customer')}
                className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 rounded-md border transition ${
                  role === 'customer'
                    ? 'bg-green-50 border-green-500 text-green-700'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <UserCircle className={`w-5 h-5 ${role === 'customer' ? 'text-green-600' : 'text-gray-500'}`} />
                <span className="font-medium">Customer</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('seller')}
                className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 rounded-md border transition ${
                  role === 'seller'
                    ? 'bg-green-50 border-green-500 text-green-700'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Store className={`w-5 h-5 ${role === 'seller' ? 'text-green-600' : 'text-gray-500'}`} />
                <span className="font-medium">Seller</span>
              </button>
            </div>
            <p className="text-gray-500 text-sm mt-1">
              {role === 'seller' 
                ? 'You will be able to list and sell products on GlobalGreen marketplace'
                : 'You will be able to purchase products from GlobalGreen marketplace'}
            </p>
          </div>

          {/* Phone Number Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">
              Phone Number {role === 'seller' ? '(Required for sellers)' : '(Optional)'}
            </label>
            <div className="relative">
              <input
                type="tel"
                id="phone"
                className={`w-full pl-10 pr-3 py-3 border rounded-md transition-all focus:outline-none focus:ring-2 ${
                  (phoneError || (role === 'seller' && !phone && (phoneFocused || formSubmitted)))
                    ? "border-red-300 focus:ring-red-200"
                    : "border-gray-300 focus:ring-green-200 focus:border-green-500"
                }`}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onFocus={() => setPhoneFocused(true)}
                onBlur={() => setPhoneFocused(false)}
                placeholder="+12345678900"
                required={role === 'seller'} // Make phone required for sellers
              />
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            {phoneError && (
              <div className="flex items-center mt-1 text-red-500 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {phoneError}
              </div>
            )}
            {!phoneError && phone && (
              <p className="text-gray-500 text-sm mt-1">
                Format: +12345678900 (country code followed by number)
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className={`w-full pl-10 pr-10 py-3 border rounded-md transition-all focus:outline-none focus:ring-2 ${
                  password && !isStrongPassword(password) && (passwordFocused || formSubmitted)
                    ? "border-red-300 focus:ring-red-200"
                    : "border-gray-300 focus:ring-green-200 focus:border-green-500"
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                placeholder="Create a strong password"
                required
                minLength={8}
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
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
            {password && !isStrongPassword(password) && (
              <div className="flex items-center mt-1 text-red-500 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                Password must be at least 8 characters with uppercase, lowercase and numbers
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="confirm-password">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirm-password"
                className={`w-full pl-10 pr-10 py-3 border rounded-md transition-all focus:outline-none focus:ring-2 ${
                  confirmPassword && !passwordsMatch && (confirmPasswordFocused || formSubmitted)
                    ? "border-red-300 focus:ring-red-200"
                    : "border-gray-300 focus:ring-green-200 focus:border-green-500"
                }`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onFocus={() => setConfirmPasswordFocused(true)}
                onBlur={() => setConfirmPasswordFocused(false)}
                placeholder="Confirm your password"
                required
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {confirmPassword && !passwordsMatch && (
              <div className="flex items-center mt-1 text-red-500 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                Passwords don&apos;t match
              </div>
            )}
          </div>

          {/* Additional seller information note */}
          {role === 'seller' && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
              <div className="flex items-start">
                <Info className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-700">
                  <p className="font-medium mb-1">Creating a Seller Account</p>
                  <p>After registration, you'll need to complete your seller profile with business details before you can list products on the marketplace.</p>
                </div>
              </div>
            </div>
          )}

          {/* Terms and Conditions */}
          <div className="mt-4">
            <label className="flex items-start mb-4">
              <input
                type="checkbox"
                className="mt-1 mr-2"
                required
              />
              <span className="text-sm text-gray-600">
                I agree to GlobalGreen&apos;s <a href="#" className="text-green-600 hover:underline">Terms of Service</a> and <a href="#" className="text-green-600 hover:underline">Privacy Policy</a>
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 rounded-md font-medium transition ${
              firstName && lastName && email && isValidEmail(email) && password && confirmPassword && passwordsMatch && isStrongPassword(password) && 
              (role !== 'seller' || phone) && (!phone || isValidPhone(phone))
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
            disabled={
              !firstName || !lastName || !email || !isValidEmail(email) || !password || !confirmPassword || 
              !passwordsMatch || !isStrongPassword(password) || 
              (role === 'seller' && !phone) || // Require phone for sellers
              (phone && !isValidPhone(phone)) || isLoading
            }
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
      </div>

      {/* Success Modal - Shown after the register modal is closed */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4 animate-fadeIn">
            <div className="text-center mb-4">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Registration Successful!</h3>
              <p className="text-gray-600">
                Your GlobalGreen {role === 'seller' ? 'seller' : ''} account has been created successfully. Please sign in to continue.
              </p>
              
              {role === 'seller' && (
                <div className="mt-3 p-3 bg-blue-50 border border-blue-100 rounded text-left">
                  <p className="text-sm text-blue-700">
                    <span className="font-medium">Next steps:</span> After signing in, you'll need to complete your seller profile before you can list products on the marketplace.
                  </p>
                </div>
              )}
            </div>
            
            <div className="mt-6">
              <button
                onClick={handleSuccessModalClose}
                className="w-full py-3 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Continue to Sign In
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Existing User Modal */}
      {showExistingUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4 animate-fadeIn">
            <div className="text-center mb-4">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Info className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Account Already Exists</h3>
              <p className="text-gray-600">
                An account with this email address is already registered. Would you like to sign in instead?
              </p>
            </div>
            
            <div className="mt-6 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
              <button
                onClick={handleSwitchToLoginFromModal}
                className="flex-1 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Sign In
              </button>
              <button
                onClick={handleExistingUserModalClose}
                className="flex-1 py-3 border border-gray-300 bg-white text-gray-700 rounded-md font-medium hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Try Another Email
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterForm;