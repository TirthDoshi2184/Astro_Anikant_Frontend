import React, { useState, useEffect } from 'react';
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  Home,
  Shield,
  Star,
  Zap,
  Moon,
  Sun
} from 'lucide-react';
import axios from 'axios';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    if (type === 'checkbox') {
      setRememberMe(checked);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    // Clear error for the field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({}); // Clear previous errors

    try {
      // Use http for localhost unless you have HTTPS set up for localhost
      const response = await axios.post("http://localhost:1921/admin/singleadmin", formData);

      console.log('API Response:', response.data.data);

      // Save admin info in localStorage (serialize if object)
      localStorage.setItem("admin", JSON.stringify(response.data.data));

      // Save email if remember me is checked
      if (rememberMe) {
        localStorage.setItem('adminEmail', formData.email);
        localStorage.setItem('rememberAdmin', 'true');
      } else {
        localStorage.removeItem('adminEmail');
        localStorage.removeItem('rememberAdmin');
      }

      window.location.href = '/admindashboard';
    } catch (error) {
      if (error.response) {
        setErrors({ general: error.response.data.message || 'Login failed. Please try again.' });
      } else if (error.request) {
        setErrors({ general: 'No response from server. Please try again later.' });
      } else {
        setErrors({ general: error.message });
      }
      setIsLoading(false);
      console.error('Login error:', error);
    }
  };

  useEffect(() => {
    // Load remembered email on mount
    const remembered = localStorage.getItem('rememberAdmin');
    const savedEmail = localStorage.getItem('adminEmail');

    if (remembered === 'true' && savedEmail) {
      setFormData(prev => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-red-50 flex items-center justify-center p-4 relative">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-red-800/10 to-amber-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-yellow-400/10 to-red-900/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-amber-300/20 to-red-700/20 rounded-full blur-2xl"></div>
      </div>

      {/* Floating Astro Icons */}
      <div className="absolute top-20 left-20 text-red-800/20 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
        <Star className="w-8 h-8" />
      </div>
      <div className="absolute top-32 right-32 text-amber-600/20 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}>
        <Moon className="w-6 h-6" />
      </div>
      <div className="absolute bottom-20 left-32 text-yellow-600/20 animate-bounce" style={{ animationDelay: '2s', animationDuration: '3.5s' }}>
        <Sun className="w-7 h-7" />
      </div>
      <div className="absolute bottom-32 right-20 text-red-700/20 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '4.5s' }}>
        <Zap className="w-5 h-5" />
      </div>

      {/* Login Container */}
      <div className="relative w-full max-w-md bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/50">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-900 to-red-800 rounded-2xl shadow-lg mb-4 relative">
            <Home className="w-10 h-10 text-amber-100" />
            <div className="absolute -inset-1 bg-gradient-to-br from-amber-400/30 to-red-700/30 rounded-2xl blur-sm"></div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-900 via-red-800 to-red-900 bg-clip-text text-transparent">
            Astro Anekant
          </h1>
          <p className="text-gray-600 font-medium">Admin Panel</p>
          <p className="text-sm text-gray-500 mt-1">Sign in to access your dashboard</p>
        </div>

        {/* Error Message */}
        {errors.general && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-4">
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              {errors.general}
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`block w-full pl-10 pr-3 py-3 border rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800 transition-all duration-300 ${
                  errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'
                }`}
                placeholder="admin@astroanekant.com"
              />
            </div>
            {errors.email && (
              <p className="text-red-600 text-xs mt-1 flex items-center">
                <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange}
                className={`block w-full pl-10 pr-10 py-3 border rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800 transition-all duration-300 ${
                  errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'
                }`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-600 text-xs mt-1 flex items-center">
                <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                {errors.password}
              </p>
            )}
          </div>

          {/* Remember Me */}
          <div className="flex items-center space-x-2">
            <input
              id="rememberMe"
              name="rememberMe"
              type="checkbox"
              checked={rememberMe}
              onChange={handleInputChange}
              className="h-4 w-4 text-red-800 focus:ring-red-700 border-gray-300 rounded"
            />
            <label htmlFor="rememberMe" className="text-sm text-gray-700 select-none cursor-pointer">
              Remember Me
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-semibold text-white bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Signing in...
              </>
            ) : (
              <>
                Sign in to Dashboard
                <Shield className="ml-2 h-4 w-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">Protected by advanced security measures</p>
          <div className="flex justify-center items-center mt-2 space-x-4 text-gray-400">
            <Shield className="w-4 h-4" />
            <span className="text-xs">SSL Encrypted</span>
            <Star className="w-4 h-4" />
          </div>
        </div>

        {/* Floating Action Hint */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-white/50">
            <p className="text-xs text-gray-600 flex items-center">
              <Home className="w-3 h-3 mr-1" />
              Secure Admin Access
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
