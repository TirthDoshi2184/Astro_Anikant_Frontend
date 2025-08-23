import React, { useState } from "react";
import { Eye, EyeOff, Star, Moon, Sun, Loader2 } from "lucide-react";

export default function AstrologyLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear errors when user starts typing
    if (error) setError("");
  };

  const handleLogin = async () => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:1921/user/loginuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      console.log("Login response:", data.data);

      if (response.ok) {
        // Login successful
        setSuccess("Login successful! Welcome back!");
        console.log("Login successful:", data);

        // Store token and user data
        if (data.data && data.data.token) {
          // You can store the token in localStorage or context
          localStorage.setItem('authToken', data.data.token);
          localStorage.setItem('user', JSON.stringify(data.data.user));

          // For demo purposes, we'll just log it
          console.log("Token:", data.data.token);
          console.log("User:", <data value="" className="data user"></data>);
        }

        // Reset form
        setFormData({ ...formData, email: "", password: "" });

        // Redirect or update app state here
        window.location.href = "/";
      } else {
        // Handle different error cases
        if (response.status === 404) {
          setError("User not found. Please check your email or sign up.");
        } else if (response.status === 401) {
          setError("Invalid password. Please try again.");
        } else {
          setError(data.message || "Login failed. Please try again.");
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async () => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setIsLoading(false);
      return;
    }

    try {
      // Updated to match controller fields
      const response = await fetch("http://localhost:1921/user/useradd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone,
          password: formData.password,
          role: "customer",
          isActive: true,
          // product: '',
          // address: '', // directly use array as per controller
          // gender: ''
        }),
      });

      let data;
      if (response.headers.get("content-type")?.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text(); // fallback for HTML error page
        throw new Error(`Unexpected response: ${text}`);
      }

      if (response.ok) {
        // success
      } else {
        setError(data?.message || "Something went wrong");
      }
      if (response.status === 201) {
        setSuccess("Account created successfully! You can now sign in.");
        setIsLogin(true);
        setFormData({
          email: formData.email,
          password: "",
          confirmPassword: "",
          firstName: "",
          lastName: "",
          phone: "",
        });
      } else {
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (isLogin) {
      handleLogin();
    } else {
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.confirmPassword
      ) {
        setError("Please fill in all required fields.");
        return;
      }
      handleSignup();
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
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Main Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-2" style={{ borderColor: '#660B05', backgroundColor: 'rgba(255, 240, 196, 0.95)' }}>
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 shadow-lg" style={{ background: 'linear-gradient(135deg, #660B05 0%, #8B0E08 100%)' }}>
              <Star className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: '#660B05' }}>
              Astro Anekant
            </h1>
            <p className="text-sm" style={{ color: '#8B0E08' }}>
              {isLogin
                ? "Welcome back to your cosmic journey"
                : "Begin your celestial adventure"}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex mb-6 p-1 rounded-2xl" style={{ backgroundColor: 'rgba(102, 11, 5, 0.1)' }}>
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-xl font-medium text-sm transition-all ${
                isLogin
                  ? "shadow-md"
                  : "hover:opacity-80"
              }`}
              style={isLogin ? 
                { backgroundColor: '#FFF0C4', color: '#660B05' } :
                { color: '#660B05' }
              }
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-xl font-medium text-sm transition-all ${
                !isLogin
                  ? "shadow-md"
                  : "hover:opacity-80"
              }`}
              style={!isLogin ? 
                { backgroundColor: '#FFF0C4', color: '#660B05' } :
                { color: '#660B05' }
              }
            >
              Sign Up
            </button>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="bg-red-50 border-2 border-red-300 text-red-700 px-4 py-3 rounded-xl text-sm mb-4">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 border-2 border-green-300 text-green-700 px-4 py-3 rounded-xl text-sm mb-4">
              {success}
            </div>
          )}

          {/* Form */}
          <div className="space-y-4">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#660B05' }}>
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all"
                    style={{ 
                      borderColor: '#660B05',
                      backgroundColor: 'rgba(255, 240, 196, 0.5)',
                      focusRingColor: '#660B05'
                    }}
                    placeholder="John"
                    required={!isLogin}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#660B05' }}>
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all"
                    style={{ 
                      borderColor: '#660B05',
                      backgroundColor: 'rgba(255, 240, 196, 0.5)',
                      focusRingColor: '#660B05'
                    }}
                    placeholder="Doe"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#660B05' }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all"
                  style={{ 
                    borderColor: '#660B05',
                    backgroundColor: 'rgba(255, 240, 196, 0.5)',
                    focusRingColor: '#660B05'
                  }}
                  placeholder="+91 12345 67890"
                  required={!isLogin}
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#660B05' }}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all"
                style={{ 
                  borderColor: '#660B05',
                  backgroundColor: 'rgba(255, 240, 196, 0.5)',
                  focusRingColor: '#660B05'
                }}
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium mb-2" style={{ color: '#660B05' }}>
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 pr-12 border-2 rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all"
                style={{ 
                  borderColor: '#660B05',
                  backgroundColor: 'rgba(255, 240, 196, 0.5)',
                  focusRingColor: '#660B05'
                }}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-11 hover:opacity-70"
                style={{ color: '#660B05' }}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {!isLogin && (
              <div className="relative">
                <label className="block text-sm font-medium mb-2" style={{ color: '#660B05' }}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all"
                  style={{ 
                    borderColor: '#660B05',
                    backgroundColor: 'rgba(255, 240, 196, 0.5)',
                    focusRingColor: '#660B05'
                  }}
                  placeholder="••••••••"
                  required={!isLogin}
                />
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded focus:ring-2"
                    style={{ accentColor: '#660B05' }}
                  />
                  <span className="ml-2" style={{ color: '#8B0E08' }}>Remember me</span>
                </label>
                <button
                  type="button"
                  className="font-medium hover:opacity-70"
                  style={{ color: '#660B05' }}
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl font-semibold focus:ring-2 focus:ring-offset-2 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
              style={{ 
                background: 'linear-gradient(135deg, #660B05 0%, #8B0E08 100%)',
                color: '#FFF0C4',
                focusRingColor: '#660B05'
              }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {isLogin ? "Signing In..." : "Creating Account..."}
                </>
              ) : isLogin ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t-2" style={{ borderColor: '#660B05' }}></div>
            <span className="px-4 text-sm" style={{ color: '#660B05' }}>or</span>
            <div className="flex-1 border-t-2" style={{ borderColor: '#660B05' }}></div>
          </div>

          {/* Footer */}
          <div className="text-center mt-6 text-sm" style={{ color: '#660B05' }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-semibold hover:opacity-70"
              style={{ color: '#8B0E08' }}
            >
              {isLogin ? "Sign up here" : "Sign in here"}
            </button>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-6 text-xs" style={{ color: '#660B05' }}>
          By continuing, you agree to our{" "}
          <button className="underline hover:opacity-70">
            Terms of Service
          </button>{" "}
          and{" "}
          <button className="underline hover:opacity-70">
            Privacy Policy
          </button>
        </div>
      </div>
    </div>
  );
}