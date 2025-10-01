import React, { useState } from 'react';
import { Star, Moon, Sun, Loader2, Lock, ArrowLeft, Eye, EyeOff, Shield } from "lucide-react";
import { useParams } from 'react-router-dom';

export const EmailResetPassword = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Simulated useParams and useNavigate
   // This would come from useParams() in real app
  const navigate = (path) => console.log(`Navigate to: ${path}`); // This would be useNavigate()
  const token  = useParams()
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError(''); // Clear errors when user starts typing
    if (success) setSuccess(''); // Clear success message when typing
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    setError('');
    setSuccess('');

    // Validation
    if (!formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const requestData = {
        password: formData.password,
      };

      // Replace with your actual API endpoint
      const response = await fetch(`https://astroanikantbackend-2.onrender.com/user/updateforgotuserpassword/${token}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (response.status === 201 || response.ok) {
        setSuccess("🌟 Password reset successful! The stars have blessed your new cosmic key.");
        setFormData({ password: '', confirmPassword: '' });
        
        // Navigate after a short delay to show success message
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setError("Request failed. Please try again.");
      }
    } catch (err) {
      console.error("Network Error:", err);
      
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        setError("Unable to connect to server. Please check your internet connection.");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/");
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
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: '#660B05' }}>
              Reset Password
            </h1>
            <p className="text-sm" style={{ color: '#8B0E08' }}>
              Create a new cosmic key for your account
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
            <div className="bg-green-50 border-2 border-green-300 text-green-700 px-4 py-3 rounded-xl text-sm mb-6 flex items-start">
              <div className="flex-shrink-0 mr-2">✨</div>
              <div>{success}</div>
            </div>
          )}

          {/* Form */}
          <div className="space-y-6">
            {/* New Password */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#660B05' }}>
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pl-12 pr-12 border-2 rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all"
                  style={{ 
                    borderColor: '#660B05',
                    backgroundColor: 'rgba(255, 240, 196, 0.5)',
                  }}
                  placeholder="Enter your new cosmic password"
                  required
                  disabled={isLoading}
                  minLength={8}
                />
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#660B05' }} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  disabled={isLoading}
                >
                  {showPassword ? 
                    <EyeOff className="w-5 h-5" style={{ color: '#660B05' }} /> : 
                    <Eye className="w-5 h-5" style={{ color: '#660B05' }} />
                  }
                </button>
              </div>
              <p className="text-xs mt-2 opacity-80" style={{ color: '#8B0E08' }}>
                Minimum 8 characters for cosmic security
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#660B05' }}>
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pl-12 pr-12 border-2 rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all"
                  style={{ 
                    borderColor: '#660B05',
                    backgroundColor: 'rgba(255, 240, 196, 0.5)',
                  }}
                  placeholder="Confirm your cosmic password"
                  required
                  disabled={isLoading}
                />
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#660B05' }} />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? 
                    <EyeOff className="w-5 h-5" style={{ color: '#660B05' }} /> : 
                    <Eye className="w-5 h-5" style={{ color: '#660B05' }} />
                  }
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading || !formData.password || !formData.confirmPassword || formData.password !== formData.confirmPassword}
                className="flex-1 py-3 px-4 rounded-xl font-semibold focus:ring-2 focus:ring-offset-2 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                style={{ 
                  background: 'linear-gradient(135deg, #660B05 0%, #8B0E08 100%)',
                  color: '#FFF0C4',
                }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Aligning the stars...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5 mr-2" />
                    Reset Password
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={handleCancel}
                disabled={isLoading}
                className="flex-1 py-3 px-4 rounded-xl font-medium transition-all hover:shadow-md transform hover:-translate-y-0.5 disabled:opacity-50 flex items-center justify-center"
                style={{ 
                  backgroundColor: 'rgba(102, 11, 5, 0.1)',
                  color: '#660B05',
                  border: '2px solid rgba(102, 11, 5, 0.2)'
                }}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Cancel
              </button>
            </div>
          </div>

          {/* Additional Help */}
          <div className="text-center mt-6 p-4 rounded-xl" style={{ backgroundColor: 'rgba(102, 11, 5, 0.05)' }}>
            <p className="text-xs" style={{ color: '#8B0E08' }}>
              Need help? Contact our{' '}
              <button
                type="button"
                className="font-semibold hover:opacity-70 transition-opacity underline"
                style={{ color: '#660B05' }}
                onClick={() => console.log('Contact support')}
              >
                cosmic support team
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

export default EmailResetPassword;