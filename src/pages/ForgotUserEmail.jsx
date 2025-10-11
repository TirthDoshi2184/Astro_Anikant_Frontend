import React, { useState } from 'react';
import { Star, Moon, Sun, Loader2, Mail, ArrowLeft } from "lucide-react";
import { useNavigate } from 'react-router-dom';

export const ForgotUserEmail = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    // Basic validation
    if (!email) {
      setError('Email is required');
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch("https://astroanikantbackend-2.onrender.com/user/getuserbyemail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (response.ok) {
        // Check for various "not found" messages
        if (data.message === "Admin Not found" || 
            data.message === "User Not found" || 
            data.message === "User not found" ||
            data.success === false) {
          setError("📧 Email not found. Please check your email address or sign up for a new account.");
        } else {
          setSuccess("✨ The stars have aligned! A password reset link has been sent to your astro anekant email address. Please check your inbox and spam folder.");
          setEmail('');
          
          // Optional: Navigate to a confirmation page after 3 seconds
          setTimeout(() => {
            // navigate('/login');
          }, 3000);
        }
      } else {
        // Handle HTTP error responses
        if (response.status === 404) {
          setError("📧 Email not found in our astro anekant database. Please check your email or sign up.");
        } else if (response.status === 400) {
          setError("❌ Invalid email format. Please enter a valid email address.");
        } else if (response.status === 429) {
          setError("⏰ Too many requests. Please wait a few minutes before trying again.");
        } else {
          setError(data.message || "❌ Something went wrong. Please try again.");
        }
      }
    } catch (err) {
      console.error("Network Error:", err);
      
      // Handle different types of errors
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        setError("🌐 Unable to connect to server. Please check your internet connection.");
      } else if (err.code === 'NETWORK_ERROR') {
        setError("🌐 Network error. Please check your connection and try again.");
      } else {
        setError("❌ An unexpected error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && email && !isLoading) {
      handleSubmit(e);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100 flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #FFF0C4 0%, #FFF5D6 50%, #FFEDD4 100%)' }}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Star className="absolute top-20 left-20 w-8 h-8 animate-pulse" style={{ color: '#660B05' }} />
        <Moon className="absolute top-40 right-32 w-6 h-6 animate-bounce" style={{ color: '#660B05' }} />
        <Sun className="absolute bottom-32 left-32 w-10 h-10 animate-pulse" style={{ color: '#660B05' }} />
        <Star className="absolute bottom-20 right-20 w-4 h-4 animate-ping" style={{ color: '#660B05' }} />
        <Star className="absolute top-60 left-60 w-5 h-5 animate-pulse opacity-70" style={{ color: '#660B05' }} />
        <Moon className="absolute bottom-60 right-60 w-7 h-7 animate-bounce opacity-50" style={{ color: '#660B05' }} />
        <Star className="absolute top-32 right-16 w-6 h-6 animate-pulse opacity-80" style={{ color: '#660B05' }} />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Main Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-2" style={{ borderColor: '#660B05', backgroundColor: 'rgba(255, 240, 196, 0.95)' }}>
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 shadow-lg" style={{ background: 'linear-gradient(135deg, #660B05 0%, #8B0E08 100%)' }}>
              <Mail className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: '#660B05' }}>
              Forgot Password
            </h1>
            <p className="text-sm" style={{ color: '#8B0E08' }}>
              The cosmos will guide you back to your account
            </p>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="bg-red-50 border-2 border-red-300 text-red-700 px-4 py-3 rounded-xl text-sm mb-6 flex items-start">
              <div className="flex-shrink-0 mr-2">⚠️</div>
              <div>{error}</div>
            </div>
          )}
          {success && (
            <div className="bg-green-50 border-2 border-green-300 text-green-700 px-4 py-3 rounded-xl text-sm mb-6 flex items-start animate-pulse">
              <div className="flex-shrink-0 mr-2">✨</div>
              <div>{success}</div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#660B05' }}>
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  className="w-full px-4 py-3 pl-12 border-2 rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all"
                  style={{ 
                    borderColor: '#660B05',
                    backgroundColor: 'rgba(255, 240, 196, 0.5)',
                  }}
                  placeholder="Enter your astro anekant email address"
                  required
                  disabled={isLoading}
                  autoComplete="email"
                  autoFocus
                />
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#660B05' }} />
              </div>
              <p className="text-xs mt-2 opacity-80" style={{ color: '#8B0E08' }}>
                We'll send you a password reset link
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading || !email}
              className="w-full py-3 px-4 rounded-xl font-semibold focus:ring-2 focus:ring-offset-2 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
              style={{ 
                background: 'linear-gradient(135deg, #660B05 0%, #8B0E08 100%)',
                color: '#FFF0C4',
              }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Consulting the stars...
                </>
              ) : (
                <>
                  <Star className="w-5 h-5 mr-2" />
                  Send Reset Link
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t-2" style={{ borderColor: 'rgba(102, 11, 5, 0.3)' }}></div>
            <span className="px-4 text-sm" style={{ color: '#660B05' }}>or</span>
            <div className="flex-1 border-t-2" style={{ borderColor: 'rgba(102, 11, 5, 0.3)' }}></div>
          </div>

          {/* Back to Login */}
          <div className="text-center">
            <button
              type="button"
              onClick={handleBackToLogin}
              disabled={isLoading}
              className="inline-flex items-center justify-center px-6 py-2 rounded-xl font-medium transition-all hover:shadow-md transform hover:-translate-y-0.5 disabled:opacity-50"
              style={{ 
                backgroundColor: 'rgba(102, 11, 5, 0.1)',
                color: '#660B05',
                border: '2px solid rgba(102, 11, 5, 0.2)'
              }}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Sign In
            </button>
          </div>

          {/* Additional Help */}
          <div className="text-center mt-6 p-4 rounded-xl" style={{ backgroundColor: 'rgba(102, 11, 5, 0.05)' }}>
            <p className="text-xs" style={{ color: '#8B0E08' }}>
              Remember your password?{' '}
              <button
                type="button"
                className="font-semibold hover:opacity-70 transition-opacity underline"
                style={{ color: '#660B05' }}
                onClick={handleBackToLogin}
                disabled={isLoading}
              >
                Sign in here
              </button>
            </p>
            <p className="text-xs mt-2" style={{ color: '#8B0E08' }}>
              Need help? Contact our{' '}
              <button
                type="button"
                className="font-semibold hover:opacity-70 transition-opacity underline"
                style={{ color: '#660B05' }}
                onClick={() => window.open('mailto:astroanekantsup@gmail.com', '_blank')}
              >
                Astro Anekant Support
              </button>
            </p>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-6 text-xs" style={{ color: '#660B05' }}>
          Protected by celestial security protocols
        </div>
      </div>
    </div>
  );
}

export default ForgotUserEmail;