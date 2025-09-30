import React, { useState, useEffect } from 'react';
import { Star, Gem, Crown, Shield, Heart, Zap, CheckCircle, Sparkles, Eye, TrendingUp, BookOpen, HeartPulse, Stars, Infinity, Pill, Droplets, Package, User, Phone, Mail, Send, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// Sample data (replace with API data in production)
import { FaAward, FaBusinessTime, FaBookReader, FaHeartbeat } from "react-icons/fa";
import { GiPrayerBeads } from "react-icons/gi";
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const HomePage = () => {
  const [showEnergizationPopup, setShowEnergizationPopup] = useState(true);

  const [formData, setFormData] = useState({
    productName: '',
    fullName: '',
    email: '',
    phone: '',
    additionalInfo: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
  // Validation
  if (!formData.productName || !formData.fullName || !formData.phone || !formData.email) {
    alert('Please fill in all required fields.');
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    alert('Please enter a valid email address');
    return;
  }

  try {
    const response = await axios.post('http://localhost:1921/productrequest/insertproductrequest', {
      name: formData.productName,
      fullName: formData.fullName,
      phoneNo: formData.phone,
      email: formData.email,
      additionalDetails: formData.additionalInfo || 'No additional details provided'
    });

    if (response.status === 201) {
      alert('Thank you! Your product inquiry has been submitted. Our team will contact you soon.');
      // Reset form
      setFormData({
        productName: '',
        fullName: '',
        email: '',
        phone: '',
        additionalInfo: ''
      });
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('Failed to submit request. Please try again later.');
  }
};
const navigate = useNavigate();
const [currentSlide, setCurrentSlide] = useState(0);
const [productSlide, setProductSlide] = useState(0);
const [isVisible, setIsVisible] = useState({});
const [Categories, setCategories] = useState([]);
const [bestsellers, setBestSellers] = useState([]);
const [loading, setLoading] = useState(true);
  // API Functions
useEffect(() => {
  fetchData();
}, []);


const fetchData = async () => {
  try {
    setLoading(true);
    
    // Fetch best sellers (featured products)
    const bestSellersResponse = await axios.get('https://astroanikantbackend-2.onrender.com/product/bestsellers');
    setBestSellers(bestSellersResponse.data.data || []);
    
    setLoading(false);
  } catch (error) {
    console.error('Error fetching data:', error);
    setLoading(false);
  }
};
const getProductsPerSlide = () => {
  if (window.innerWidth < 768) return 1; // Mobile: 1 per slide
  if (window.innerWidth < 1024) return 2; // Tablet: 2 per slide
  return 4; // Desktop: 4 per slide
};

const nextProductSlide = () => {
  const productsPerSlide = getProductsPerSlide();
  setProductSlide((prev) => (prev + 1) % Math.ceil(bestsellers.length / productsPerSlide));
};

const prevProductSlide = () => {
  const productsPerSlide = getProductsPerSlide();
  setProductSlide((prev) => (prev - 1 + Math.ceil(bestsellers.length / productsPerSlide)) % Math.ceil(bestsellers.length / productsPerSlide));
};
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
    navigate(`/productdetail/${productId}`);
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
      title: "Mystical Bracelets & Spiritual Tools",
      subtitle: "Meditation & Manifestation",
      description: "Enhance your spiritual journey with authentic prayer beads and meditation accessories"
    }
  ];

  

const categories = [
  { 
    id: 1, 
    name: "Sarv Karya Siddhi", 
    icon: Infinity, // success / siddhi / accomplishment
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
    icon: Pill, // health / healing
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


  // const bestSellers = [
  //   {
  //     id: 1,
  //     name: "Ruby Gemstone Ring",
  //     price: "₹12,500",
  //     originalPrice: "₹15,000",
  //     rating: 4.9,
  //     reviews: 234,
  //     image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop",
  //     badge: "Bestseller"
  //   },
  //   {
  //     id: 2,
  //     name: "Sri Yantra - Gold Plated",
  //     price: "₹8,999",
  //     originalPrice: "₹11,999",
  //     rating: 4.8,
  //     reviews: 189,
  //     image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
  //     badge: "Premium"
  //   },
  //   {
  //     id: 3,
  //     name: "Rudraksha Mala 108 Beads",
  //     price: "₹3,500",
  //     originalPrice: "₹4,200",
  //     rating: 4.9,
  //     reviews: 456,
  //     image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
  //     badge: "Authentic"
  //   },
  //   {
  //     id: 4,
  //     name: "Crystal Pyramid Set",
  //     price: "₹6,750",
  //     originalPrice: "₹8,500",
  //     rating: 4.7,
  //     reviews: 167,
  //     image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=300&h=300&fit=crop",
  //     badge: "New"
  //   }
  // ];

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

  useEffect(() => {
  // Auto-hide popup after 8 seconds
  const timer = setTimeout(() => {
    setShowEnergizationPopup(false);
  }, 5000);

  return () => clearTimeout(timer);
}, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEF7D7] to-white">

    {/* Energization Popup */}
{showEnergizationPopup && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
    <div className="relative mx-4 max-w-md w-full">
      <button
        onClick={() => setShowEnergizationPopup(false)}
        className="absolute -top-4 -right-4 z-10 w-12 h-12 bg-gradient-to-br from-[#FEF7D7] to-yellow-300 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300"
      >
        <svg className="w-6 h-6 text-[#9C0B13]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="relative bg-gradient-to-br from-[#9C0B13] to-red-900 rounded-3xl p-8 shadow-2xl border-4 border-[#FEF7D7]/30 animate-scale-in">
        
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center animate-bounce shadow-xl">
            <Sparkles className="w-8 h-8 text-white animate-pulse" />
          </div>
        </div>
        
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-8 right-8 w-8 h-8 bg-[#FEF7D7]/30 rounded-full animate-spin-slow">
            <div className="w-3 h-3 bg-yellow-400 rounded-full m-2.5 animate-pulse"></div>
          </div>
          <div className="absolute bottom-8 left-8 w-6 h-6 bg-yellow-300/40 rounded-full animate-bounce delay-1000">
            <div className="w-2 h-2 bg-[#FEF7D7] rounded-full m-2 animate-pulse"></div>
          </div>
          <div className="absolute top-1/2 right-4 w-4 h-4 bg-amber-400/50 rounded-full animate-ping delay-500"></div>
          <div className="absolute top-16 left-4 w-5 h-5 bg-[#FEF7D7]/40 rounded-full animate-bounce delay-700"></div>
        </div>

        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 200 200">
            <defs>
              <pattern id="sacred-energy" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="2" fill="#FEF7D7" opacity="0.6"/>
                <circle cx="20" cy="20" r="8" fill="none" stroke="#FEF7D7" strokeWidth="0.5" opacity="0.4"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#sacred-energy)" />
          </svg>
        </div>

        <div className="relative z-10 text-center pt-6">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-[#FEF7D7]/20 to-yellow-200/20 rounded-full flex items-center justify-center border-3 border-[#FEF7D7]/50 animate-pulse shadow-2xl">
<Sun className="w-10 h-10 text-[#FEF7D7] animate-spin-slow" />
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-[#FEF7D7]/30 animate-ping"></div>
              <div className="absolute inset-0 rounded-full border border-yellow-300/20 animate-ping delay-500"></div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-[#FEF7D7] mb-4 animate-glow">
            🙏 Temple Blessed 🙏
          </h2>
          
          <div className="mb-6">
            <div className="flex items-center justify-center mb-2">
              <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-yellow-400"></div>
              <Sparkles className="w-5 h-5 text-yellow-300 mx-3 animate-spin-slow" />
              <div className="w-8 h-0.5 bg-gradient-to-r from-yellow-400 to-transparent"></div>
            </div>
            <p className="text-[#FEF7D7]/90 font-semibold text-lg">
              Temple Blessed Products
            </p>
          </div>

          <div className="bg-gradient-to-r from-[#FEF7D7]/10 to-yellow-200/10 rounded-2xl p-6 mb-6 border border-[#FEF7D7]/20">
            <p className="text-[#FEF7D7] text-base leading-relaxed mb-4">
              Every product is <span className="font-bold text-yellow-200">spiritually energized</span> in our sacred temple with proper mantras and rituals before reaching you.
            </p>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center justify-center text-[#FEF7D7]/80">
                <Star className="w-4 h-4 mr-2 text-yellow-300" />
                Vedic Mantras
              </div>
              <div className="flex items-center justify-center text-[#FEF7D7]/80">
                <Heart className="w-4 h-4 mr-2 text-yellow-300" />
                Pure Intentions
              </div>
              <div className="flex items-center justify-center text-[#FEF7D7]/80">
                <Gem className="w-4 h-4 mr-2 text-yellow-300" />
                Sacred Rituals
              </div>
              <div className="flex items-center justify-center text-[#FEF7D7]/80">
                <Shield className="w-4 h-4 mr-2 text-yellow-300" />
                Divine Protection
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
  <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-[#9C0B13] px-8 py-3 rounded-full font-bold text-sm shadow-lg animate-pulse border-2 border-white/50">
      Blessed for your cosmic journey ✨
  </div>
</div>

          <div className="mt-4">
            <div className="w-16 h-1 bg-[#FEF7D7]/30 rounded-full mx-auto overflow-hidden">
              <div className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full animate-progress"></div>
            </div>
            <p className="text-[#FEF7D7]/60 text-xs mt-2">Auto-closing...</p>
          </div>
        </div>

        <div className="absolute top-4 left-4 w-8 h-8">
          <div className="w-full h-0.5 bg-[#FEF7D7]/40 rounded"></div>
          <div className="w-0.5 h-full bg-[#FEF7D7]/40 rounded absolute top-0 left-0"></div>
        </div>
        <div className="absolute top-4 right-4 w-8 h-8">
          <div className="w-full h-0.5 bg-[#FEF7D7]/40 rounded"></div>
          <div className="w-0.5 h-full bg-[#FEF7D7]/40 rounded absolute top-0 right-0"></div>
        </div>
        <div className="absolute bottom-4 left-4 w-8 h-8">
          <div className="w-full h-0.5 bg-[#FEF7D7]/40 rounded absolute bottom-0"></div>
          <div className="w-0.5 h-full bg-[#FEF7D7]/40 rounded absolute bottom-0 left-0"></div>
        </div>
        <div className="absolute bottom-4 right-4 w-8 h-8">
          <div className="w-full h-0.5 bg-[#FEF7D7]/40 rounded absolute bottom-0"></div>
          <div className="w-0.5 h-full bg-[#FEF7D7]/40 rounded absolute bottom-0 right-0"></div>
        </div>
      </div>
    </div>
  </div>
)}
      
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
          Special Product Request
        </h2>
        <p className="text-2xl text-[#FEF7D7]/90 font-semibold mb-4">
          Looking for Something Unique?
        </p>
        <p className="text-lg text-[#FEF7D7]/80 max-w-3xl mx-auto mb-6">
          Can't find what you're looking for? Tell us about the spiritual product you need and we'll help you find it or create a custom solution
        </p>
        
        {/* Decorative Divider */}
        <div className="flex justify-center items-center space-x-4">
          <div className="w-20 h-1 bg-gradient-to-r from-transparent to-[#FEF7D7] animate-pulse"></div>
          <Sparkles className="w-6 h-6 text-yellow-300 animate-spin-slow" />
          <div className="w-20 h-1 bg-gradient-to-r from-[#FEF7D7] to-transparent animate-pulse"></div>
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-gradient-to-br from-[#FEF7D7]/10 to-yellow-200/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-[#FEF7D7]/20 shadow-2xl mb-12">
        <div className="space-y-8">
          {/* Product Name Field */}
          <div className="group">
            <label className="flex items-center text-xl font-semibold text-[#FEF7D7] mb-4">
              <Package className="w-6 h-6 mr-3 text-yellow-300" />
              Product Name You're Looking For
            </label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              placeholder="e.g., Rudraksha Mala, Crystal Healing Set, Sacred Yantra..."
              className="w-full px-6 py-4 bg-white/90 border-2 border-transparent rounded-2xl text-[#9C0B13] text-lg font-medium placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:bg-white transition-all duration-300 shadow-lg"
              required
            />
          </div>

          {/* Personal Information */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Full Name */}
            <div className="group">
              <label className="flex items-center text-xl font-semibold text-[#FEF7D7] mb-4">
                <User className="w-6 h-6 mr-3 text-yellow-300" />
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Your full name"
                className="w-full px-6 py-4 bg-white/90 border-2 border-transparent rounded-2xl text-[#9C0B13] text-lg font-medium placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:bg-white transition-all duration-300 shadow-lg"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="group">
              <label className="flex items-center text-xl font-semibold text-[#FEF7D7] mb-4">
                <Phone className="w-6 h-6 mr-3 text-yellow-300" />
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+91 XXXXX XXXXX"
                className="w-full px-6 py-4 bg-white/90 border-2 border-transparent rounded-2xl text-[#9C0B13] text-lg font-medium placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:bg-white transition-all duration-300 shadow-lg"
                required
              />
            </div>
          </div>

          {/* Email Address */}
          <div className="group">
            <label className="flex items-center text-xl font-semibold text-[#FEF7D7] mb-4">
              <Mail className="w-6 h-6 mr-3 text-yellow-300" />
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your.email@example.com"
              className="w-full px-6 py-4 bg-white/90 border-2 border-transparent rounded-2xl text-[#9C0B13] text-lg font-medium placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:bg-white transition-all duration-300 shadow-lg"
              required
            />
          </div>

          {/* Additional Information */}
          <div className="group">
            <label className="flex items-center text-xl font-semibold text-[#FEF7D7] mb-4">
              <Sparkles className="w-6 h-6 mr-3 text-yellow-300" />
              Additional Details (Optional)
            </label>
            <textarea
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleInputChange}
              rows="4"
              placeholder="Please describe any specific requirements, size preferences, material preferences, or any other details that would help us find the perfect product for you..."
              className="w-full px-6 py-4 bg-white/90 border-2 border-transparent rounded-2xl text-[#9C0B13] text-lg font-medium placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:bg-white transition-all duration-300 shadow-lg resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center pt-6">
            <button
              type="button"
              onClick={handleSubmit}
              className="group bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-[#9C0B13] px-12 py-4 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center mx-auto"
            >
              <Send className="w-6 h-6 mr-3 group-hover:animate-pulse" />
              Submit Product Request
            </button>
            <p className="text-[#FEF7D7]/70 mt-4 text-sm">
              We'll get back to you within 24 hours with availability and pricing information
            </p>
          </div>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="text-center">
        <div className="bg-gradient-to-br from-yellow-400/20 to-amber-500/20 rounded-2xl p-8 border border-yellow-300/30">
          <h3 className="text-2xl font-bold text-[#FEF7D7] mb-4">What Happens Next?</h3>
          <div className="grid md:grid-cols-3 gap-6 text-[#FEF7D7]/90">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mb-3">
                <span className="text-[#9C0B13] font-bold text-lg">1</span>
              </div>
              <p className="text-sm font-medium">We review your request and search our network</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mb-3">
                <span className="text-[#9C0B13] font-bold text-lg">2</span>
              </div>
              <p className="text-sm font-medium">Our experts find or create the perfect match</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mb-3">
                <span className="text-[#9C0B13] font-bold text-lg">3</span>
              </div>
              <p className="text-sm font-medium">We contact you with availability and pricing</p>
            </div>
          </div>
        </div>
      </div>        </div>

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
<div className="relative">
  {/* Navigation Buttons */}
  <button 
    onClick={prevProductSlide}
    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-[#9C0B13] text-[#FEF7D7] rounded-full flex items-center justify-center hover:bg-red-700 transition-all duration-300 shadow-lg -ml-6"
   disabled={loading || bestsellers.length <= getProductsPerSlide()}
  >
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  </button>

  <button 
    onClick={nextProductSlide}
    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-[#9C0B13] text-[#FEF7D7] rounded-full flex items-center justify-center hover:bg-red-700 transition-all duration-300 shadow-lg -mr-6"
    disabled={loading || bestsellers.length <= 4}
  >
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </button>

  {/* Slider Container */}
  <div className="overflow-hidden">
    <div 
  className="flex transition-transform duration-500 ease-in-out"
  style={{ 
    transform: `translateX(-${productSlide * (100 / getProductsPerSlide())}%)` 
  }}
>
      {loading ? (
        // Loading skeleton
        [...Array(4)].map((_, index) => (
          <div key={index} className="w-full md:w-1/2 lg:w-1/4 flex-shrink-0 px-4">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="w-full h-64 bg-gray-200 animate-pulse"></div>
              <div className="p-6">
                <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-3 w-2/3"></div>
                <div className="h-8 bg-gray-200 rounded animate-pulse w-1/3"></div>
              </div>
            </div>
          </div>
        ))
      ) : (
        bestsellers.map((product, index) => (
          <div key={product._id} className="w-full md:w-1/2 lg:w-1/4 flex-shrink-0 px-2 md:px-4">
            <div
              className={`group bg-white rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 overflow-hidden cursor-pointer h-full ${
                isVisible.bestsellers ? `animate-fade-in-up delay-${index * 150}` : ''
              }`}
              onClick={() => handleProductClick(product._id)}
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <img
                  src={product.images?.[0]?.url || "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop"}
                  alt={product.images?.[0]?.alt || product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-[#9C0B13] text-[#FEF7D7] text-sm font-bold rounded-full">
                    {product.isFeatured ? "Featured" : "Authentic"}
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
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.averageRating) ? 'fill-current' : ''}`} />
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm ml-2">
                    {product.averageRating.toFixed(1)} ({product.reviewCount} reviews)
                  </span>
                </div>
                
                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-[#9C0B13]">
                      ₹{product.discountedPrice || product.price}
                    </span>
                    {product.discountedPrice && (
                      <span className="text-gray-400 line-through ml-2">₹{product.price}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  </div>

  {/* Slide Indicators */}
  {!loading && bestsellers.length > 4 && (
    <div className="flex justify-center mt-8 space-x-2">
      {[...Array(Math.ceil(bestsellers.length / getProductsPerSlide()))].map((_, index) => (
        <button
          key={index}
          onClick={() => setProductSlide(index)}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            productSlide === index ? 'bg-[#9C0B13] scale-125' : 'bg-gray-300'
          }`}
        />
      ))}
    </div>
  )}
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
<style jsx>{`
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scale-in {
  from { 
    transform: scale(0.8);
    opacity: 0;
  }
  to { 
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes glow {
  0%, 100% { text-shadow: 0 0 20px rgba(254, 247, 215, 0.5); }
  50% { text-shadow: 0 0 30px rgba(254, 247, 215, 0.8); }
}

@keyframes progress {
  from { width: 0%; }
  to { width: 100%; }
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}

.animate-scale-in {
  animation: scale-in 0.6s ease-out;
}

.animate-glow {
  animation: glow 2s ease-in-out infinite;
}

.animate-progress {
  animation: progress 8s linear;
}

.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
}
`}</style>

// Export for use in React Router setup
export default HomePage;
