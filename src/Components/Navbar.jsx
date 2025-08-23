import React, { useState } from 'react';
import { ShoppingCart, User, ChevronDown, Lock, LogOut, Eye, Heart, Home } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
// Make sure AstrologyNavbar is used inside a <BrowserRouter> in your app entry point

const AstrologyNavbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('home');
  
  const navigate = useNavigate();

  const navItems = [
    { id: 'home', label: 'Home', link: '/' },
    { id: 'products', label: 'Products', link: '/products' },
    { id: 'about', label: 'About Us', link: '/about' },
    { id: 'orders', label: 'Orders', link: '/orders' },
    { id: 'donation', label: 'Donation', link: '/donation' },
    { id: 'booking', label: 'Book Visit', link: '/booking' }
  ];

  const profileMenuItems = [
    { id: 'profile', label: 'View Profile', icon: Eye, link: '/profile' },
    { id: 'password', label: 'Change Password', icon: Lock, link: '/change-password' },
    { id: 'logout', label: 'Logout', icon: LogOut, link: '/login' }
  ];

  // Modified handlers for navigation
  const handleNavClick = (item) => {
    setActiveItem(item.id);
    navigate(item.link);
  };

  const handleProfileMenuClick = (item) => {
    navigate(item.link);
    setIsProfileOpen(false);
  };

// const handleCartClick = () => {
//   alert("dsjdjj")
//   console.log('Cart button clicked - navigating to /cart');
//     navigate('/cart');
//     // setActiveItem('cart');
// };

  const handleLogoClick = () => {
    setActiveItem('home');
    navigate('/');
  };

  return (
    <nav className="relative z-50 bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-100 border-b-2 border-red-900/20 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <div 
            className="flex items-center space-x-3 group cursor-pointer"
            onClick={handleLogoClick}
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-red-800 to-red-900 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300">
                <Home className="w-6 h-6 text-amber-50 drop-shadow-sm" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-red-700 to-red-800 rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-300 blur-sm"></div>
            </div>
            <div className="text-2xl font-bold text-red-900">
              Astro Anekant
            </div>
          </div>

          {/* Navigation Items */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`relative px-5 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeItem === item.id
                    ? 'text-amber-50 bg-gradient-to-r from-red-800 to-red-900 shadow-lg shadow-red-900/30'
                    : 'text-red-900 hover:text-amber-50 hover:bg-red-800/80'
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                {activeItem === item.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 rounded-full animate-pulse opacity-30"></div>
                )}
              </button>
            ))}
          </div>

          {/* Right Section - Cart & Profile */}
          <div className="flex items-center space-x-4">
            
             {/* Cart Button */}
              <div className="relative group">
                {/* <button 
                  onClick={handleCartClick}
                  className="p-3 rounded-full bg-gradient-to-br from-red-800 to-red-900 text-amber-50 shadow-lg hover:shadow-red-900/40 transition-all duration-300 transform hover:scale-110"
                >
                  <ShoppingCart className="w-5 h-5" />
                </button> */}
                <Link to="/cart">
                  Cart
                </Link>
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-red-900 text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-bounce shadow-md">
                  3
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-red-700 to-red-800 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-md"></div>
              </div>
            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`flex items-center space-x-2 p-3 rounded-full transition-all duration-300 transform hover:scale-105 ${
                  isProfileOpen
                    ? 'bg-gradient-to-br from-red-800 to-red-900 text-amber-50 shadow-lg shadow-red-900/30'
                    : 'bg-red-800/10 text-red-900 hover:bg-red-800/80 hover:text-amber-50'
                }`}
              >
                <User className="w-5 h-5" />
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-amber-50/95 backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-red-900/20 overflow-hidden animate-in fade-in slide-in-from-top-5 duration-200">
                  <div className="p-4 border-b border-red-900/10 bg-gradient-to-r from-red-900/5 to-red-800/5">
                    <div className="text-red-900 font-semibold">John Doe</div>
                    <div className="text-red-700 text-sm">john.doe@email.com</div>
                  </div>
                  
                  <div className="py-2">
                    {profileMenuItems.map((item) => {
                      const IconComponent = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleProfileMenuClick(item)}
                          className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-all duration-200 hover:bg-gradient-to-r hover:from-red-800/10 hover:to-red-900/10 ${
                            item.id === 'logout' 
                              ? 'text-red-800 hover:text-red-900 hover:bg-red-100' 
                              : 'text-red-800 hover:text-red-900'
                          }`}
                        >
                          <IconComponent className="w-4 h-4" />
                          <span>{item.label}</span>
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

      {/* Mobile Navigation */}
      <div className="lg:hidden border-t border-red-900/10 bg-gradient-to-r from-amber-100/80 to-yellow-100/80 backdrop-blur-sm">
        <div className="px-4 py-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item)}
              className={`block w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeItem === item.id
                  ? 'text-amber-50 bg-gradient-to-r from-red-800 to-red-900 shadow-lg'
                  : 'text-red-900 hover:text-amber-50 hover:bg-red-800/80'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default AstrologyNavbar;