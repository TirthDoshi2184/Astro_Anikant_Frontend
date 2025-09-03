import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, ChevronDown, Lock, LogOut, Eye, Home, LogIn, Star, Sparkles } from 'lucide-react';

const AstrologyNavbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // New state for scroll behavior

  // Navigation items
  const navItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'products', label: 'Products', path: '/products' },
    { id: 'about', label: 'About Us', path: '/about' },
    { id: 'order', label: 'Orders', path: '/order' },
    { id: 'donation', label: 'Donation', path: '/donation' },
    { id: 'booking', label: 'Book Consultation', path: '/booking' }
  ];

   // Check authentication and fetch user data
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      const userId = localStorage.getItem('user');
      
      console.log('Checking auth - Token exists:', !!token);
      console.log('Checking auth - User ID:', userId);
      
      if (token && userId) {
        setIsAuthenticated(true);
        await fetchUserData(userId);
        await fetchCartCount(userId);
      } else {
        console.log('No valid auth data found');
        setIsAuthenticated(false);
        setUser(null);
        setCartCount(0);
      }
    };

    checkAuth();
    
    // Set active item based on current path
    const currentPath = window.location.pathname;
    const currentItem = navItems.find(item => item.path === currentPath);
    if (currentItem) {
      setActiveItem(currentItem.id);
    } else {
      // Default to home if no match
      setActiveItem('home');
    }
  }, []);

  // Fetch user data from API
  const fetchUserData = async (userId) => {
    try {
      setIsLoading(true);
      console.log('Fetching user data for ID:', userId);
      
      const response = await fetch(`https://astroanikantbackend-2.onrender.com/user/getsingleuser/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('User API Response status:', response.status);

      if (response.ok) {
        const result = await response.json();
        console.log('User data received:', result);
        if (result.data) {
          setUser(result.data);
        } else {
          console.error('No user data in response');
        }
      } else {
        console.error('Failed to fetch user data, status:', response.status);
        const errorText = await response.text();
        console.error('Error response:', errorText);
        // Don't logout immediately, user might still be valid
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Don't logout on network error, user might still be valid
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch cart count from API
  const fetchCartCount = async (userId) => {
    try {
      console.log('Fetching cart for user ID:', userId);
      
      const response = await fetch(`https://astroanikantbackend-2.onrender.com/cart/getsinglecart/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Cart API Response status:', response.status);

      if (response.ok) {
        const result = await response.json();
        console.log('Cart data received:', result);
        
        if (result.data && Array.isArray(result.data)) {
          setCartCount(result.data.length);
        } else {
          setCartCount(0);
        }
      } else if (response.status === 404) {
        // No cart found is normal for new users
        console.log('No cart found for user (404) - setting count to 0');
        setCartCount(0);
      } else {
        console.error('Failed to fetch cart data, status:', response.status);
        setCartCount(0);
      }
    } catch (error) {
      console.error('Error fetching cart count:', error);
      setCartCount(0);
    }
  };

  // Dynamic profile menu items
  const profileMenuItems = isAuthenticated 
    ? [
        { id: 'profile', label: 'View Profile', icon: Eye, path: '/profile' },
        { id: 'password', label: 'Change Password', icon: Lock, path: '/change-password' },
        { id: 'logout', label: 'Logout', icon: LogOut, action: 'logout' }
      ]
    : [
        { id: 'login', label: 'Login', icon: LogIn, path: '/login' }
      ];

  // Navigation handler
  const handleNavClick = (item) => {
    setActiveItem(item.id);
    window.location.href = item.path;
  };

  // Profile menu handler
  const handleProfileMenuClick = (item) => {
    if (item.action === 'logout') {
      handleLogout();
    } else {
      window.location.href = item.path;
    }
    setIsProfileOpen(false);
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
    setUser(null);
    setCartCount(0);
    window.location.href = '/login';
  };

  // Cart handler with enhanced debugging and proper navigation
  const handleCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Cart button clicked!');
    console.log('Is authenticated:', isAuthenticated);
    
    const authToken = localStorage.getItem('authToken');
    const userId = localStorage.getItem('user');
    
    console.log('Auth token exists:', !!authToken);
    console.log('User ID exists:', !!userId);
    
    if (!authToken || !userId) {
      console.log('No auth token or user ID, redirecting to login');
      window.location.assign('/login');
      return;
    }
    
    console.log('Authenticated user, redirecting to cart');
    window.location.assign('/cart');
  };

  // Logo click handler
  const handleLogoClick = () => {
    setActiveItem('home');
    window.location.href = '/';
  };

  return (
    <>
      {/* Mystical floating particles */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <div className="absolute top-20 left-1/4 w-2 h-2 bg-gradient-to-r from-yellow-400 to-amber-300 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-32 right-1/3 w-1 h-1 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full animate-bounce opacity-40"></div>
        <div className="absolute top-28 left-1/2 w-1.5 h-1.5 bg-gradient-to-r from-yellow-300 to-amber-400 rounded-full animate-ping opacity-50"></div>
      </div>

      <nav className="sticky top-0 z-50 bg-gradient-to-r from-[#FEF7D7] via-amber-50 to-[#FEF7D7] border-b-3 border-[#9C0B13]/30 shadow-2xl backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-24">
            
            {/* Enhanced Logo Section */}
{/* Enhanced Logo Section - Mobile Optimized */}
<div 
  className="flex items-center space-x-2 group cursor-pointer transform transition-all duration-300 hover:scale-105 flex-shrink-0"
  onClick={handleLogoClick}
>
  <div className="relative">
    <div className="w-10 h-10 bg-gradient-to-br from-[#9C0B13] via-red-800 to-[#9C0B13] rounded-full flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-all duration-300 border-2 border-amber-200">
      <Star className="w-5 h-5 text-[#FEF7D7]" />
    </div>
  </div>
  <div className="flex flex-col min-w-0">
    <div className="text-lg lg:text-2xl font-bold bg-gradient-to-r from-[#9C0B13] to-red-800 bg-clip-text text-transparent tracking-wide truncate">
      Astro Anekant
    </div>
    <div className="text-xs text-[#9C0B13]/70 font-medium tracking-wider hidden sm:block">
      ✨ Astro Essentials ✨
    </div>
  </div>
</div>
            {/* Enhanced Navigation Items */}
            <div className="hidden lg:flex items-center space-x-2">
              {navItems.map((item, index) => (
                <div
                  key={item.id}
                  className="relative"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <button
                    onClick={() => handleNavClick(item)}
                    className={`relative px-6 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-110 group overflow-hidden ${
                      activeItem === item.id
                        ? 'text-[#FEF7D7] bg-gradient-to-r from-[#9C0B13] to-red-800 shadow-xl shadow-[#9C0B13]/40 border-2 border-amber-300/50'
                        : 'text-[#9C0B13] hover:text-[#FEF7D7] hover:bg-gradient-to-r hover:from-[#9C0B13]/90 hover:to-red-800/90 border-2 border-transparent hover:border-amber-300/30'
                    }`}
                  >
                    <span className="relative z-10 flex items-center space-x-2">
                      {item.label}
                      {activeItem === item.id && (
                        <div className="w-2 h-2 bg-amber-300 rounded-full animate-pulse"></div>
                      )}
                    </span>
                    
                    {/* Magical hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-yellow-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                    
                    {/* Active item mystical glow */}
                    {activeItem === item.id && (
                      <div className="absolute inset-0 bg-gradient-to-r from-[#9C0B13]/30 to-red-800/30 rounded-full animate-pulse blur-md"></div>
                    )}
                  </button>
                </div>
              ))}
            </div>

            {/* Enhanced Right Section */}
            {/* Enhanced Right Section - Mobile Optimized */}
<div className="flex items-center space-x-2 lg:space-x-6 flex-shrink-0">
  
  {/* Enhanced Cart Button - Mobile Optimized */}
  <div className="relative group">
    <a 
      href="/cart"
      onClick={(e) => {
        e.preventDefault();
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
          window.location.href = '/cart';
        } else {
          window.location.href = '/login';
        }
      }}
      className="block p-3 lg:p-4 rounded-full bg-gradient-to-br from-[#9C0B13] via-red-800 to-[#9C0B13] text-[#FEF7D7] shadow-2xl hover:shadow-[#9C0B13]/50 transition-all duration-500 transform hover:scale-110 hover:rotate-6 border-2 lg:border-3 border-amber-200/50"
    >
      <ShoppingCart className="w-5 h-5 lg:w-6 lg:h-6 relative z-10" />
    </a>
    
    {cartCount > 0 && (
      <div className="absolute -top-1 -right-1 lg:-top-2 lg:-right-2 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-[#9C0B13] text-xs lg:text-sm rounded-full w-6 h-6 lg:w-8 lg:h-8 flex items-center justify-center font-bold shadow-lg border-2 border-white animate-bounce">
        {cartCount > 99 ? '99+' : cartCount}
      </div>
    )}
  </div>

  {/* Enhanced Profile Dropdown - Mobile Optimized */}
  <div className="relative">
    <button
      onClick={() => setIsProfileOpen(!isProfileOpen)}
      disabled={isLoading}
      className={`flex items-center space-x-1 lg:space-x-3 p-3 lg:p-4 rounded-full transition-all duration-500 transform hover:scale-105 border-2 ${
        isProfileOpen
          ? 'bg-gradient-to-br from-[#9C0B13] to-red-800 text-[#FEF7D7] shadow-2xl shadow-[#9C0B13]/40 border-amber-300/50'
          : 'bg-gradient-to-br from-[#FEF7D7] to-amber-100 text-[#9C0B13] hover:bg-gradient-to-br hover:from-[#9C0B13]/90 hover:to-red-800/90 hover:text-[#FEF7D7] border-amber-300/30 hover:border-amber-300/60'
      } ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
    >
      <div className="relative">
        <User className="w-5 h-5 lg:w-6 lg:h-6" />
        {isAuthenticated && (
          <div className="absolute -bottom-1 -right-1 w-2 h-2 lg:w-3 lg:h-3 bg-green-400 rounded-full border border-white lg:border-2 animate-pulse"></div>
        )}
      </div>
      <ChevronDown className={`w-4 h-4 lg:w-5 lg:h-5 transition-transform duration-500 ${isProfileOpen ? 'rotate-180' : ''} hidden sm:block`} />
    </button>

    {/* Enhanced Dropdown Menu */}
    {isProfileOpen && (
      <div className="absolute right-0 mt-4 w-72 lg:w-80 bg-gradient-to-br from-[#FEF7D7]/95 via-amber-50/95 to-[#FEF7D7]/95 backdrop-blur-2xl rounded-3xl shadow-2xl border-3 border-[#9C0B13]/20 overflow-hidden animate-in fade-in slide-in-from-top-10 duration-300">
        
        {/* Navigation Items for Mobile */}
        <div className="lg:hidden py-3 border-b border-[#9C0B13]/10">
          <div className="px-3 pb-2">
            <div className="text-xs text-[#9C0B13]/60 font-semibold uppercase tracking-wider">Navigation</div>
          </div>
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => {
                handleNavClick(item);
                setIsProfileOpen(false);
              }}
              className={`w-full flex items-center justify-between px-6 py-3 text-left transition-all duration-300 hover:bg-gradient-to-r group ${
                activeItem === item.id
                  ? 'text-[#FEF7D7] bg-gradient-to-r from-[#9C0B13] to-red-800'
                  : 'text-[#9C0B13] hover:from-[#9C0B13]/10 hover:to-red-800/10'
              }`}
            >
              <span className="font-medium">{item.label}</span>
              {activeItem === item.id && (
                <div className="w-2 h-2 bg-amber-300 rounded-full animate-pulse"></div>
              )}
            </button>
          ))}
        </div>
        
        {/* User info section */}
        {isAuthenticated && user && (
          <div className="p-6 border-b border-[#9C0B13]/10 bg-gradient-to-r from-[#9C0B13]/5 via-red-800/5 to-[#9C0B13]/5">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-[#9C0B13] to-red-800 rounded-full flex items-center justify-center shadow-xl">
                <User className="w-7 h-7 text-[#FEF7D7]" />
              </div>
              <div>
                <div className="text-[#9C0B13] font-bold text-lg">
                  {user?.name || user?.firstName 
                    ? (user.firstName && user.lastName 
                        ? `${user.firstName} ${user.lastName}` 
                        : user.name || user.username || 'User')
                    : 'Loading...'}
                </div>
                <div className="text-[#9C0B13]/70 text-sm">
                  {user?.email || 'Loading...'}
                </div>
                <div className="flex items-center space-x-1 mt-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-600 font-medium">Online</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Profile Menu items */}
        <div className="py-3">
          <div className="px-3 pb-2 lg:hidden">
            <div className="text-xs text-[#9C0B13]/60 font-semibold uppercase tracking-wider">Account</div>
          </div>
          {profileMenuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleProfileMenuClick(item)}
                className={`w-full flex items-center space-x-4 px-6 py-4 text-left transition-all duration-300 hover:bg-gradient-to-r group ${
                  item.id === 'logout' 
                    ? 'text-red-600 hover:from-red-50 hover:to-red-100 hover:text-red-700' 
                    : 'text-[#9C0B13] hover:from-[#9C0B13]/5 hover:to-red-800/5 hover:text-[#9C0B13]'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className={`p-2 rounded-full transition-all duration-300 ${
                  item.id === 'logout'
                    ? 'bg-red-100 group-hover:bg-red-200'
                    : 'bg-amber-100 group-hover:bg-amber-200'
                }`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <span className="font-medium">{item.label}</span>
                {item.id === 'logout' && (
                  <div className="ml-auto w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    )}
  </div>
</div>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
       {/* Enhanced Mobile Navigation */}
<div className="lg:hidden border-t-2 border-[#9C0B13]/10 bg-gradient-to-r from-[#FEF7D7]/90 via-amber-100/90 to-[#FEF7D7]/90 backdrop-blur-sm">
  <div className="px-4 py-3">
    {/* Mobile Menu Toggle Button */}
    <button
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      className="flex items-center justify-between w-full p-3 rounded-xl bg-gradient-to-r from-[#9C0B13]/10 to-red-800/10 border-2 border-[#9C0B13]/20 hover:border-[#9C0B13]/40 transition-all duration-300"
    >
      <span className="text-[#9C0B13] font-semibold">Explore</span>
      <div className="flex flex-col space-y-1">
        <div className={`w-5 h-0.5 bg-[#9C0B13] rounded transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></div>
        <div className={`w-5 h-0.5 bg-[#9C0B13] rounded transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
        <div className={`w-5 h-0.5 bg-[#9C0B13] rounded transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></div>
      </div>
    </button>
    
    {/* Dropdown Menu Items */}
    {isMobileMenuOpen && (
      <div className="mt-3 space-y-2 animate-in fade-in slide-in-from-top-10 duration-300">
        {navItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => {
              handleNavClick(item);
              setIsMobileMenuOpen(false); // Close menu after navigation
            }}
            className={`block w-full text-left px-6 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
              activeItem === item.id
                ? 'text-[#FEF7D7] bg-gradient-to-r from-[#9C0B13] to-red-800 shadow-xl border-2 border-amber-300/50'
                : 'text-[#9C0B13] hover:text-[#FEF7D7] hover:bg-gradient-to-r hover:from-[#9C0B13]/90 hover:to-red-800/90 border-2 border-transparent hover:border-amber-300/30'
            }`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center justify-between">
              <span>{item.label}</span>
              {activeItem === item.id && (
                <div className="w-3 h-3 bg-amber-300 rounded-full animate-pulse"></div>
              )}
            </div>
          </button>
        ))}
      </div>
    )}
  </div>
</div>
      </nav>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes reverse-spin {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .animate-reverse-spin {
          animation: reverse-spin 12s linear infinite;
        }
      `}</style>
    </>
  );
};

export default AstrologyNavbar;