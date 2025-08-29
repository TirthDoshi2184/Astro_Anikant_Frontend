import React, { useState, useEffect } from 'react';
import { Star, Gem, Crown, Shield, Heart, Zap, CheckCircle, Sparkles, Eye, TrendingUp, BookOpen, HeartPulse } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
    navigate(`/products?category=${categoryId}`);
    // handleNavigation(`/products?category=${categoryId}&name=${encodeURIComponent(categoryName)}`);
  };

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
      title: "Sacred Yantras for Divine Energy",
      subtitle: "Channel Positive Vibrations",
      description: "Experience the power of ancient symbols and sacred geometry for prosperity and protection"
    },
    {
      title: "Mystical Malas & Spiritual Tools",
      subtitle: "Meditation & Manifestation",
      description: "Enhance your spiritual journey with authentic prayer beads and meditation accessories"
    }
  ];

  // Sample data (replace with API data in production)
  const categories = [
  { id: 1, name: "Sarv Karya Siddhi", icon: CheckCircle, count: "150+ Remedies", color: "from-red-500 to-pink-600" },
  { id: 2, name: "Vyapar Vriddhi", icon: TrendingUp, count: "80+ Solutions", color: "from-amber-500 to-orange-600" },
  { id: 3, name: "Vidhya Prapti", icon: BookOpen, count: "120+ Practices", color: "from-purple-500 to-indigo-600" },
  { id: 4, name: "Sarv Rog Nivaran", icon: HeartPulse, count: "60+ Treatments", color: "from-emerald-500 to-teal-600" }
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
              
              <button className="px-8 py-4 border-2 border-[#FEF7D7] text-[#FEF7D7] rounded-full font-bold text-lg hover:bg-[#FEF7D7] hover:text-[#9C0B13] transition-all duration-300 shadow-lg">
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
