import React, { useState, useEffect } from 'react';
import { Star, Gem, Crown, Shield, Heart, Zap, CheckCircle, Sparkles, Eye, TrendingUp, BookOpen, HeartPulse, Droplets } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// Sample data (replace with API data in production)
import { FaAward, FaBusinessTime, FaBookReader, FaHeartbeat } from "react-icons/fa";
import { GiPrayerBeads } from "react-icons/gi";
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

const HomePage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  // const [categories, setCategories] = useState([]);
  // const [bestSellers, setBestSellers] = useState([]);
  // const [loading, setLoading] = useState(true);

  // API Functions (Currently commented for development)
  /*
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch categories
      const categoriesResponse = await axios.get('/api/categories');
      setCategories(categoriesResponse.data);
      
      // Fetch best sellers
      const bestSellersResponse = await axios.get('/api/products/bestsellers');
      setBestSellers(bestSellersResponse.data);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      const response = await axios.post('/api/cart/add', {
        productId: productId,
        quantity: 1
      });
      
      if (response.data.success) {
        // Show success notification
        alert('Product added to cart successfully!');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart');
    }
  };
  */

  // Navigation functions (SPA routing without page reload)
  const handleNavigation = (path) => {
    // For React Router: navigate(path);
    // For now, using history.pushState to avoid page reload
    navigate("/products")
    // Trigger custom event to update URL without reload
    window.dispatchEvent(new CustomEvent('navigate', { detail: path }));
  };

  const handleCategoryClick = (categoryId, categoryName) => {
    // Pass the category name instead of ID to match your database structure
    navigate(`/products?category=${encodeURIComponent(categoryName)}`);
};

  const handleVisitClick = () => {
    navigate('/booking');
    // handleNavigation('/booking');
  }

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
    // handleNavigation(`/products/${productId}`);
  };

  const handleAddToCart = (productId, productName) => {
    // In real implementation, this would add to cart state/context
    console.log(`Added product ${productId} to cart`);
    // You could show a toast notification here
    alert(`${productName} added to cart!`);
  };

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Auto-slide for hero section
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const heroSlides = [
    {
      title: "Unlock Your Cosmic Destiny",
      subtitle: "Authentic Gemstones & Sacred Artifacts",
      description: "Transform your life with our genuine astrological products, blessed and energized by expert astrologers"
    },
    {
      title: "Sacred Yantras for Divine Energy & Ratnas for Prosperity",
      subtitle: "Channel Positive Vibrations",
      description: "Experience the power of ancient symbols and sacred geometry for prosperity and protection"
    },
    {
      title: "Mystical Bracelet & Spiritual Tools",
      subtitle: "Meditation & Manifestation",
      description: "Enhance your spiritual journey with authentic prayer beads and meditation accessories"
    }
  ];

  

const categories = [
  { 
    id: 1, 
    name: "Sarv Karya Siddhi", 
    icon: FaAward, // success / siddhi / accomplishment
    count: "150+ Remedies", 
    color: "from-red-500 to-pink-600" 
  },
  { 
    id: 2, 
    name: "Vyapar Vriddhi", 
    icon: FaBusinessTime, // business growth / prosperity
    count: "80+ Solutions", 
    color: "from-amber-500 to-orange-600" 
  },
  { 
    id: 3, 
    name: "Vidhya Prapti", 
    icon: FaBookReader, // knowledge / learning / wisdom
    count: "120+ Practices", 
    color: "from-purple-500 to-indigo-600" 
  },
  { 
    id: 4, 
    name: "Sarv Rog Nivaran", 
    icon: FaHeartbeat, // health / healing
    count: "60+ Treatments", 
    color: "from-emerald-500 to-teal-600" 
  },
  { 
    id: 5, 
    name: "Rudraksha", 
    icon: GiPrayerBeads, // spirituality / beads / mala
    count: "90+ Beads", 
    color: "from-yellow-500 to-amber-700" 
  }
];

  const bestSellers = [
    {
      id: 1,
      name: "Ruby Gemstone Ring",
      price: "₹12,500",
      originalPrice: "₹15,000",
      rating: 4.9,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop",
      badge: "Bestseller"
    },
    {
      id: 2,
      name: "Sri Yantra - Gold Plated",
      price: "₹8,999",
      originalPrice: "₹11,999",
      rating: 4.8,
      reviews: 189,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
      badge: "Premium"
    },
    {
      id: 3,
      name: "Rudraksha Mala 108 Beads",
      price: "₹3,500",
      originalPrice: "₹4,200",
      rating: 4.9,
      reviews: 456,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
      badge: "Authentic"
    },
    {
      id: 4,
      name: "Crystal Pyramid Set",
      price: "₹6,750",
      originalPrice: "₹8,500",
      rating: 4.7,
      reviews: 167,
      image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=300&h=300&fit=crop",
      badge: "New"
    }
  ];

  const whyChooseUs = [
    {
      icon: CheckCircle,
      title: "100% Authentic Products",
      description: "Every item is carefully sourced and verified for authenticity by our expert astrologers"
    },
    {
      icon: Sparkles,
      title: "Spiritually Energized",
      description: "All products are blessed and energized according to ancient Vedic rituals before dispatch"
    },
    {
      icon: Eye,
      title: "Expert Consultation",
      description: "Get personalized guidance from certified astrologers to choose the right products"
    },
    {
      icon: Zap,
      title: "Worldwide Delivery",
      description: "Fast and secure shipping to your doorstep with careful packaging and tracking"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEF7D7] to-white">
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#9C0B13] via-red-800 to-red-900">
          <div className="absolute inset-0 bg-black/20"></div>
          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-[#FEF7D7]/20 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-[#FEF7D7]/10 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-[#FEF7D7]/15 rounded-full animate-pulse delay-500"></div>
          <div className="absolute bottom-20 right-1/3 w-24 h-24 bg-[#FEF7D7]/10 rounded-full animate-bounce delay-2000"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <div className="transform transition-all duration-1000 animate-fade-in">
            <div className="mb-6 flex justify-center">
              <div className="w-24 h-24 bg-[#FEF7D7]/20 rounded-full flex items-center justify-center animate-spin-slow">
                <Sparkles className="w-12 h-12 text-[#FEF7D7]" />
              </div>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#FEF7D7] to-yellow-200 bg-clip-text text-transparent animate-pulse">
              {heroSlides[currentSlide].title}
            </h1>
            
            <p className="text-2xl md:text-3xl mb-4 text-[#FEF7D7]/90 font-semibold">
              {heroSlides[currentSlide].subtitle}
            </p>
            
            <p className="text-lg md:text-xl mb-8 text-[#FEF7D7]/80 max-w-2xl mx-auto">
              {heroSlides[currentSlide].description}
            </p>
            
            <div className="space-y-4 md:space-y-0 md:space-x-6 md:flex md:justify-center">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-[#FEF7D7] to-yellow-200 text-[#9C0B13] rounded-full font-bold text-lg transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-[#FEF7D7]/50"
              onClick={() => handleNavigation('/products')}
              >
                <span className="relative z-10">Explore Products</span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-[#FEF7D7] rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </button>
              
              <button className="px-8 py-4 border-2 border-[#FEF7D7] text-[#FEF7D7] rounded-full font-bold text-lg hover:bg-[#FEF7D7] hover:text-[#9C0B13] transition-all duration-300 shadow-lg"
              onClick={() => handleVisitClick('/booking')}>
                Book Consultation
              </button>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-[#FEF7D7] scale-125' : 'bg-[#FEF7D7]/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Featured Categories */}
      <section 
        id="categories"
        data-animate
        className={`py-20 px-6 transform transition-all duration-1000 ${
          isVisible.categories ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-[#9C0B13] mb-4">
              Sacred Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our curated collection of authentic spiritual products for your cosmic journey
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[#9C0B13] to-red-400 mx-auto mt-6"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className={`group relative p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden ${
                  isVisible.categories ? `animate-fade-in-up delay-${index * 200}` : ''
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
                onClick={() => handleCategoryClick(category.id, category.name)}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Icon */}
                <div className="relative mb-6 flex justify-center">
                  <div className={`w-20 h-20 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <category.icon className="w-10 h-10 text-white" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="relative text-center">
                  <h3 className="text-2xl font-bold text-[#9C0B13] mb-2 group-hover:text-gray-800 transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 font-semibold">{category.count}</p>
                </div>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#9C0B13]/20 rounded-3xl transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
{/* Astrology Query Section */}
      <section 
        id="queryform"
        data-animate
        className={`py-20 px-6 bg-gradient-to-br from-[#9C0B13] to-red-900 relative overflow-hidden transform transition-all duration-1000 ${
          isVisible.queryform ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-[#FEF7D7]/10 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-24 h-24 bg-[#FEF7D7]/5 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-[#FEF7D7]/15 rounded-full animate-pulse delay-500"></div>
          <div className="absolute bottom-32 right-1/3 w-36 h-36 bg-[#FEF7D7]/8 rounded-full animate-bounce delay-2000"></div>
          
          {/* Sacred Geometry Pattern */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="sacred-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <circle cx="50" cy="50" r="2" fill="#FEF7D7" opacity="0.3"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#sacred-pattern)" />
            </svg>
          </div>
          
          {/* Mystical Elements */}
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2">
            <Sparkles className="w-8 h-8 text-[#FEF7D7]/40 animate-spin-slow" />
          </div>
          <div className="absolute bottom-1/3 right-1/4">
            <Star className="w-6 h-6 text-[#FEF7D7]/50 animate-pulse" />
          </div>
          <div className="absolute top-1/3 left-1/6">
            <Gem className="w-5 h-5 text-[#FEF7D7]/40 animate-bounce delay-700" />
          </div>
        </div>

        <div className="container mx-auto relative z-10">
          {/* Enhanced Header */}
          <div className="text-center mb-16">
            {/* Central Sacred Symbol */}
            <div className="mb-10 flex justify-center">
              <div className="relative">
                {/* Main Icon with Orbiting Elements */}
                <div className="w-28 h-28 bg-gradient-to-br from-[#FEF7D7]/30 to-yellow-200/30 rounded-full flex items-center justify-center animate-spin-slow border-4 border-[#FEF7D7]/40 shadow-2xl shadow-[#FEF7D7]/20">
                  <Eye className="w-14 h-14 text-[#FEF7D7] animate-pulse" />
                </div>
                
                {/* Orbiting Sacred Symbols */}
                <div className="absolute inset-0 animate-spin-reverse">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-7 h-7 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
                    <Crown className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute top-1/2 -right-3 transform -translate-y-1/2 w-7 h-7 bg-gradient-to-br from-[#FEF7D7] to-yellow-300 rounded-full flex items-center justify-center">
                    <Gem className="w-4 h-4 text-[#9C0B13]" />
                  </div>
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-7 h-7 bg-gradient-to-br from-red-400 to-rose-500 rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute top-1/2 -left-3 transform -translate-y-1/2 w-7 h-7 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                </div>
                
                {/* Pulsing Rings */}
                <div className="absolute inset-0 rounded-full border-2 border-[#FEF7D7]/30 animate-ping"></div>
              </div>
            </div>

            <h2 className="text-5xl md:text-6xl font-bold text-[#FEF7D7] mb-6">
              Product Guidance Center
            </h2>
            <p className="text-2xl text-[#FEF7D7]/90 font-semibold mb-4">
              Get Expert Product Insights
            </p>
            <p className="text-lg text-[#FEF7D7]/80 max-w-3xl mx-auto mb-6">
              Have questions about our spiritual products? Get detailed information and expert recommendations from our astrologers
            </p>
            
            {/* Decorative Divider */}
            <div className="flex justify-center items-center space-x-4">
              <div className="w-20 h-1 bg-gradient-to-r from-transparent to-[#FEF7D7] animate-pulse"></div>
              <Sparkles className="w-6 h-6 text-yellow-300 animate-spin-slow" />
              <div className="w-20 h-1 bg-gradient-to-r from-[#FEF7D7] to-transparent animate-pulse"></div>
            </div>
          </div>

          {/* Main Content Card */}
          <div className="max-w-6xl mx-auto">
            <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border-2 border-[#FEF7D7]/30 shadow-2xl">
              {/* Card Inner Glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#FEF7D7]/5 to-yellow-200/5 animate-pulse"></div>
              
              <div className="relative grid lg:grid-cols-3 gap-12">
                {/* Left Side - Enhanced Form (2 columns) */}
                <div className="lg:col-span-2 space-y-8">
                  <div className="text-center lg:text-left mb-8">
                    <h3 className="text-3xl font-bold text-[#FEF7D7] mb-3 flex items-center justify-center lg:justify-start">
                      <BookOpen className="w-8 h-8 mr-3 text-yellow-300 animate-bounce" />
                      Product Inquiry
                    </h3>
                    <p className="text-[#FEF7D7]/80">Ask about any product's benefits, usage, or suitability for you</p>
                  </div>

                  <div className="space-y-6">
                    {/* Enhanced Query Field */}
                    <div className="relative group">
                      <label className="block text-[#FEF7D7] font-bold mb-3 text-lg flex items-center">
                        <Sparkles className="w-5 h-5 mr-2 text-yellow-300 animate-pulse" />
                        Your Product Question *
                      </label>
                      <div className="relative">
                        <textarea
                          placeholder="Which product are you interested in? Ask about gemstone benefits, yantra uses, rudraksha effects, crystal properties, or any specific product details..."
                          rows="4"
                          className="w-full px-6 py-4 bg-white/20 border-2 border-[#FEF7D7]/40 rounded-2xl text-[#FEF7D7] placeholder-[#FEF7D7]/60 focus:outline-none focus:ring-4 focus:ring-[#FEF7D7]/30 focus:border-[#FEF7D7]/70 backdrop-blur-sm transition-all duration-300 group-hover:border-[#FEF7D7]/60 resize-none"
                        ></textarea>
                        <div className="absolute top-4 right-4 w-8 h-8 bg-[#FEF7D7]/20 rounded-full flex items-center justify-center">
                          <Eye className="w-4 h-4 text-[#FEF7D7]/70" />
                        </div>
                      </div>
                    </div>

                    {/* Name Field */}
                    <div className="relative group">
                      <label className="block text-[#FEF7D7] font-bold mb-3 flex items-center">
                        <Heart className="w-5 h-5 mr-2 text-rose-300 animate-pulse" />
                        Your Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        className="w-full px-6 py-4 bg-white/20 border-2 border-[#FEF7D7]/40 rounded-2xl text-[#FEF7D7] placeholder-[#FEF7D7]/60 focus:outline-none focus:ring-4 focus:ring-[#FEF7D7]/30 focus:border-[#FEF7D7]/70 backdrop-blur-sm transition-all duration-300 group-hover:border-[#FEF7D7]/60"
                      />
                    </div>

                    {/* Email & Phone Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="relative group">
                        <label className="block text-[#FEF7D7] font-bold mb-3 flex items-center">
                          <Zap className="w-5 h-5 mr-2 text-yellow-300 animate-pulse" />
                          Email Address *
                        </label>
                        <input
                          type="email"
                          placeholder="your@email.com"
                          className="w-full px-6 py-4 bg-white/20 border-2 border-[#FEF7D7]/40 rounded-2xl text-[#FEF7D7] placeholder-[#FEF7D7]/60 focus:outline-none focus:ring-4 focus:ring-[#FEF7D7]/30 focus:border-[#FEF7D7]/70 backdrop-blur-sm transition-all duration-300 group-hover:border-[#FEF7D7]/60"
                        />
                      </div>
                      
                      <div className="relative group">
                        <label className="block text-[#FEF7D7] font-bold mb-3 flex items-center">
                          <Crown className="w-5 h-5 mr-2 text-amber-300 animate-pulse" />
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          placeholder="+91 XXXXX XXXXX"
                          className="w-full px-6 py-4 bg-white/20 border-2 border-[#FEF7D7]/40 rounded-2xl text-[#FEF7D7] placeholder-[#FEF7D7]/60 focus:outline-none focus:ring-4 focus:ring-[#FEF7D7]/30 focus:border-[#FEF7D7]/70 backdrop-blur-sm transition-all duration-300 group-hover:border-[#FEF7D7]/60"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Submit Button */}
                  <button className="group relative w-full py-5 bg-gradient-to-r from-[#FEF7D7] to-yellow-200 text-[#9C0B13] rounded-2xl font-bold text-xl transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-[#FEF7D7]/40 overflow-hidden">
                    <span className="relative z-10 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 mr-3 group-hover:animate-spin" />
                      Get Product Details
                      <Zap className="w-6 h-6 ml-3 group-hover:animate-pulse" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-[#FEF7D7] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </button>
                </div>

                {/* Right Side - Benefits (1 column) */}
                <div className="lg:col-span-1 space-y-6">
                  <div className="text-center lg:text-left">
                    <h3 className="text-2xl font-bold text-[#FEF7D7] mb-6 flex items-center justify-center lg:justify-start">
                      <Crown className="w-7 h-7 mr-3 text-yellow-300 animate-pulse" />
                      Product Support
                    </h3>
                  </div>

                  <div className="space-y-5">
                    {[
                      {
                        icon: CheckCircle,
                        title: "Product Information",
                        description: "Detailed info about benefits, usage, and authenticity"
                      },
                      {
                        icon: TrendingUp,
                        title: "Suitability Check",
                        description: "Expert advice on which products suit your needs"
                      },
                      {
                        icon: HeartPulse,
                        title: "Usage Guidelines",
                        description: "Proper methods for maximum spiritual benefits"
                      },
                      {
                        icon: Droplets,
                        title: "Product Comparison",
                        description: "Compare similar products to make the right choice"
                      }
                    ].map((feature, index) => (
                      <div key={index} className="group flex items-start space-x-4 p-5 bg-white/10 rounded-2xl backdrop-blur-sm border border-[#FEF7D7]/20 hover:border-[#FEF7D7]/40 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#FEF7D7]/30 to-yellow-200/30 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 border border-[#FEF7D7]/30">
                            <feature.icon className="w-6 h-6 text-[#FEF7D7] group-hover:animate-pulse" />
                          </div>
                        </div>
                        <div>
                          <h4 className="text-[#FEF7D7] font-bold text-lg mb-1 group-hover:text-yellow-200 transition-colors duration-300">
                            {feature.title}
                          </h4>
                          <p className="text-[#FEF7D7]/80 text-sm leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Response Time Card */}
                  <div className="mt-8 p-5 bg-gradient-to-br from-[#FEF7D7]/20 to-yellow-200/20 rounded-2xl border-2 border-[#FEF7D7]/40 text-center backdrop-blur-sm shadow-lg">
                    <div className="flex items-center justify-center mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#FEF7D7] to-yellow-300 rounded-full flex items-center justify-center mr-3 shadow-lg animate-bounce">
                        <Zap className="w-5 h-5 text-[#9C0B13]" />
                      </div>
                      <span className="text-[#FEF7D7] font-bold text-lg">Swift Response</span>
                    </div>
                    <p className="text-[#FEF7D7]/90 font-semibold text-sm">
                      Product expert replies within 24 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Enhancement */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-48 h-48 bg-[#FEF7D7]/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-0 w-48 h-48 bg-yellow-300/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
      </section>

      {/* Best Sellers */}
      <section 
        id="bestsellers"
        data-animate
        className={`py-20 px-6 bg-gradient-to-br from-[#FEF7D7]/30 to-yellow-50/50 transform transition-all duration-1000 ${
          isVisible.bestsellers ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-[#9C0B13] mb-4">
              Best Sellers
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Most loved products by our spiritual community worldwide
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[#9C0B13] to-red-400 mx-auto mt-6"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map((product, index) => (
              <div
                key={product.id}
                className={`group bg-white rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 overflow-hidden cursor-pointer ${
                  isVisible.bestsellers ? `animate-fade-in-up delay-${index * 150}` : ''
                }`}
                onClick={() => handleProductClick(product.id)}
              >
                {/* Product Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#9C0B13] text-[#FEF7D7] text-sm font-bold rounded-full">
                      {product.badge}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#9C0B13] mb-2 group-hover:text-red-700 transition-colors duration-300">
                    {product.name}
                  </h3>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-gray-600 text-sm ml-2">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-[#9C0B13]">{product.price}</span>
                      <span className="text-gray-400 line-through ml-2">{product.originalPrice}</span>
                    </div>
                  </div>
                  
                  {/* Add to Cart Button */}
                  <button 
                    className="w-full py-3 bg-gradient-to-r from-[#9C0B13] to-red-700 text-[#FEF7D7] rounded-xl font-bold hover:from-red-700 hover:to-[#9C0B13] transform hover:scale-105 transition-all duration-300 shadow-lg"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click when clicking button
                      handleAddToCart(product.id, product.name);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button 
              className="px-8 py-4 bg-gradient-to-r from-[#9C0B13] to-red-700 text-[#FEF7D7] rounded-full font-bold text-lg hover:from-red-700 hover:to-[#9C0B13] transform hover:scale-105 transition-all duration-300 shadow-xl"
              onClick={() => handleNavigation('/products')}
            >
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section 
        id="whychooseus"
        data-animate
        className={`py-20 px-6 bg-gradient-to-br from-[#9C0B13] to-red-900 text-white transform transition-all duration-1000 ${
          isVisible.whychooseus ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-[#FEF7D7] mb-4">
              Why Choose Us
            </h2>
            <p className="text-xl text-[#FEF7D7]/80 max-w-2xl mx-auto">
              Your trusted partner in spiritual transformation and cosmic alignment
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[#FEF7D7] to-yellow-200 mx-auto mt-6"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((feature, index) => (
              <div
                key={index}
                className={`group text-center transform hover:-translate-y-2 transition-all duration-500 ${
                  isVisible.whychooseus ? `animate-fade-in-up delay-${index * 200}` : ''
                }`}
              >
                {/* Icon */}
                <div className="relative mb-6 flex justify-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#FEF7D7]/20 to-yellow-200/20 rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 border border-[#FEF7D7]/30">
                    <feature.icon className="w-12 h-12 text-[#FEF7D7] group-hover:text-yellow-200 transition-colors duration-300" />
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold text-[#FEF7D7] mb-4 group-hover:text-yellow-200 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-[#FEF7D7]/80 leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Decorative Element */}
                <div className="mt-6 w-12 h-1 bg-gradient-to-r from-[#FEF7D7]/50 to-yellow-200/50 mx-auto group-hover:w-16 transition-all duration-300"></div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <button 
              className="group relative px-10 py-4 bg-gradient-to-r from-[#FEF7D7] to-yellow-200 text-[#9C0B13] rounded-full font-bold text-lg transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-[#FEF7D7]/30"
              onClick={() => handleNavigation('/products')}
            >
              <span className="relative z-10">Start Your Journey</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-[#FEF7D7] rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

// Export for use in React Router setup
export default HomePage;
