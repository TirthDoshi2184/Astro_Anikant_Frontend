import React, { useState, useEffect } from 'react';
import {
  Search,
  UserPlus,
  Users,
  Settings,
  LogOut,
  BarChart3,
  Eye,
  Home,
  Star,
  Moon,
  Sun,
  Heart,
  Share2,
  ShoppingCart,
  Zap,
  Shield,
  Truck,
  MessageCircle,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  ShoppingBag,
  Package
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const IntegratedAdminProductDetail = () => {
  const { id } = useParams(); // Get product ID from URL
  
  const [activeMenuItem, setActiveMenuItem] = useState('astrology');

  // Navigation handler
  const handleNavigation = (item) => {
    setActiveMenuItem(item.id);

    // Handle different navigation scenarios
    if (item.id === 'logout') {
      if (window.confirm('Are you sure you want to logout?')) {
        // Clear any stored tokens/session data
        localStorage.removeItem('authToken');
        // Redirect to login or home page
        window.location.href = "/adminlogin";
      }
      return;
    }

    // For other navigation items, you can either:
    // 1. Use React Router (if available)
    // 2. Use window.location for full page navigation
    // 3. Show different components based on activeMenuItem

    // Using window.location for now (you can replace with React Router)
    if (item.link) {
      window.location.href = item.link;
    }

    console.log(`Navigating to: ${item.label} (${item.link})`);
  };

  // Product detail state
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('benefits');
  const [expandedSection, setExpandedSection] = useState('');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Mock product data (replace with your API call)
  const [product, setProduct] = useState(null);

    useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://astroanikantbackend-2.onrender.com/product/getsingleproduct/${id}`);
        const result = await response.json();
        
        if (!response.ok) {
          throw new Error(result.message || 'Failed to fetch product');
        }
        
        // Transform the data to match your frontend structure
        const transformedProduct = {
          ...result.data,
          images: result.data.images?.map(img => img.url) || ["/api/placeholder/500/500"],
          stoneType: result.data.category?.name || 'N/A',
          // Add any other transformations needed
        };
        
        setProduct(transformedProduct);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching product:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Auto-rotate images
useEffect(() => {
  if (product?.images?.length > 1) {
    const interval = setInterval(() => {
      setSelectedImage((prev) => (prev + 1) % product.images.length);
    }, 5000);
    return () => clearInterval(interval);
  }
}, [product?.images]);
  // Sidebar items
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, link: '/admindashboard' },
    { id: 'users', label: 'Users', icon: Users, link: '/adminusers' },
    { id: 'astrology', label: 'Products', icon: Star, link: '/adminproducts' },
    { id: 'predictions', label: 'Visits', icon: Moon, link: '/adminvisits' },
    { id: 'orders', label: 'Orders Booked', icon: ShoppingBag, link: '/adminorders' },
    { id: 'product-requests', label: 'Product Requests', icon: Package, link: '/adminproductrequest' },
    { id: 'logout', label: 'Logout', icon: LogOut, link: '/adminlogin' },

  ];

  const reviews = [
    {
      id: 1,
      name: "Priya Sharma",
      rating: 5,
      date: "2024-01-15",
      comment: "Amazing quality ruby ring! I can feel the positive energy already.",
      helpful: 12
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      rating: 4,
      date: "2024-01-10",
      comment: "Good product, fast delivery. The ring fits perfectly.",
      helpful: 8
    }
  ];

  const relatedProducts = [
    { id: 2, name: "Ruby Pendant", price: 8999, image: "/api/placeholder/200/200" },
    { id: 3, name: "Sun Yantra", price: 2499, image: "/api/placeholder/200/200" },
    { id: 4, name: "Red Jasper Mala", price: 1999, image: "/api/placeholder/200/200" },
    { id: 5, name: "Copper Pyramid", price: 3499, image: "/api/placeholder/200/200" }
  ];

  const handleQuantityChange = (type) => {
    if (type === 'increment' && quantity < product?.stock) {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrement' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Product added to cart successfully!');
    } catch (error) {
      alert('Failed to add product to cart. Please try again.');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const getDiscountPercentage = () => {
    if (product?.discountedPrice && product?.price) {
      return Math.round(((product.price - product.discountedPrice) / product.price) * 100);
    }
    return 0;
  };

  const getCurrentPrice = () => {
    return product?.discountedPrice || product?.price || 0;
  };

  const getOriginalPrice = () => {
    return product?.discountedPrice ? product.price : null;
  };

  const getWeightDisplay = () => {
    if (product?.weight?.value && product?.weight?.unit) {
      return `${product.weight.value}${product.weight.unit}`;
    }
    return 'N/A';
  };

  const getDimensionsDisplay = () => {
    if (product?.dimensions?.length && product?.dimensions?.width) {
      const { length, width, height, unit = 'mm' } = product.dimensions;
      return height
        ? `${length}×${width}×${height} ${unit}`
        : `${length}×${width} ${unit}`;
    }
    return 'N/A';
  };

  const discountPercentage = getDiscountPercentage();
  const currentPrice = getCurrentPrice();
  const originalPrice = getOriginalPrice();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100">
      {/* Fixed Sidebar */}
      <div className="w-64 bg-gradient-to-b from-red-900 via-red-800 to-red-900 shadow-2xl fixed h-full z-10">
        {/* Logo Section */}
        <div className="p-6 border-b border-red-700/50">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                <Home className="w-5 h-5 text-red-900" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-amber-300 to-yellow-400 rounded-full opacity-30 blur-sm"></div>
            </div>
            <div>
              <h2 className="text-lg font-bold text-amber-50">Astro Anekant</h2>
              <p className="text-xs text-amber-200">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => {
            const IconComponent = item.icon;
            const handleNavigation = () => {
              setActiveMenuItem(item.id);
              if (item.link) {
                // For React Router navigation, you would use navigate(item.link)
                // For now, we'll use window.location for demonstration
                window.location.href = item.link;
              }
            };

            return (
              <button
                key={item.id}
                onClick={handleNavigation}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${activeMenuItem === item.id
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-red-900 shadow-lg shadow-amber-500/30'
                  : 'text-amber-100 hover:text-red-900 hover:bg-amber-400/90'
                  }`}
              >
                <IconComponent className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="ml-64 flex-1 min-h-screen bg-gradient-to-br from-yellow-50 to-red-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Product Details</h1>
              <p className="text-gray-600">Manage and view product information</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => window.history.back()}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                ← Back
              </button>
            
            </div>
          </div>
        </div>
        
{!isLoading && !error && product && (
        <div className="p-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product Image Section */}
              <div className="space-y-6">
                <div className="relative bg-white rounded-2xl shadow-xl p-8 overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-800/5 to-yellow-200/10"></div>
                  <div className="relative">
                    <img
                      src={product.images[selectedImage]}
                      alt={product.name}
                      className="w-full h-96 object-cover rounded-xl group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 flex flex-col space-y-2">
                      <button
                        onClick={() => setIsWishlisted(!isWishlisted)}
                        className={`p-2 rounded-full shadow-lg transition-all duration-300 ${isWishlisted ? 'bg-red-800 text-white' : 'bg-white text-gray-600 hover:bg-red-50'
                          }`}
                      >
                        <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                      </button>
                      <button className="p-2 bg-white rounded-full shadow-lg text-gray-600 hover:bg-red-50 transition-all duration-300">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                    {discountPercentage > 0 && (
                      <div className="absolute top-4 left-4 bg-red-800 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                        {discountPercentage}% OFF
                      </div>
                    )}
                  </div>
                </div>

                {/* Image Thumbnails */}
                {product.images.length > 1 && (
                  <div className="flex space-x-2 overflow-x-auto">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${selectedImage === index ? 'border-red-800' : 'border-gray-200 hover:border-red-400'
                          }`}
                      >
                        <img src={image} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl p-4 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Shield className="w-8 h-8 text-red-800 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-700">Certified Authentic</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Zap className="w-8 h-8 text-red-800 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-700">Pre-Energized</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Truck className="w-8 h-8 text-red-800 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-700">Free Shipping</p>
                  </div>
                </div>
              </div>

              {/* Product Information Section */}
              <div className="space-y-8">
                {/* Basic Info */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <div className="space-y-6">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                      <p className="text-lg text-gray-600 mb-4">{product.shortDescription}</p>
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-5 h-5 ${star <= Math.floor(product.averageRating || 0)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                                }`}
                            />
                          ))}
                          <span className="ml-2 text-sm text-gray-600">({product.reviewCount || 0} reviews)</span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 space-y-1">
                        <p><strong>SKU:</strong> {product.sku || 'N/A'}</p>
<p><strong>Stone Type:</strong> {product.category?.name || product.stoneType || 'N/A'}</p>
                        <p><strong>Weight:</strong> {getWeightDisplay()}</p>
                        <p><strong>Dimensions:</strong> {getDimensionsDisplay()}</p>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="border-t pt-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <span className="text-3xl font-bold text-red-800">₹{currentPrice.toLocaleString()}</span>
                        {originalPrice && (
                          <span className="text-xl text-gray-500 line-through">₹{originalPrice.toLocaleString()}</span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 mb-6">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                          {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                        </span>
                        {product.isFeatured && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Featured
                          </span>
                        )}
                      </div>

                      {/* Quantity Selector */}


                      {/* Action Buttons */}

                    </div>
                  </div>
                </div>

                {/* Expert Consultation CTA */}
                <div className="bg-gradient-to-r from-red-800 to-red-900 rounded-2xl p-6 text-white shadow-xl">
                  <div className="flex items-center space-x-4">
                    <MessageCircle className="w-8 h-8" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">Need Expert Guidance?</h3>
                      <p className="text-red-100">Consult our astrologer for personalized recommendations</p>
                    </div>
                    <button className="bg-white text-red-800 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-200 transition-all duration-300">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Information Tabs */}
            <div className="mt-16 bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-8">
                  {[
                    { id: 'benefits', label: 'Benefits & Usage', icon: Zap },
                    { id: 'specs', label: 'Specifications', icon: BookOpen },
                    { id: 'reviews', label: 'Reviews', icon: Users }
                  ].map((tab) => {
                    const IconComponent = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                            ? 'border-red-800 text-red-800'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                          }`}
                      >
                        <IconComponent className="w-4 h-4" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="p-8">
                {activeTab === 'benefits' && (
                  <div className="space-y-6">
                    {product.astrologicalBenefits && product.astrologicalBenefits.length > 0 && (
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Spiritual Benefits</h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {product.astrologicalBenefits.map((benefit, index) => (
                            <li key={index} className="flex items-center space-x-3">
                              <div className="w-2 h-2 bg-red-800 rounded-full"></div>
                              <span className="text-gray-700">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {product.usage && (
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">How to Use</h3>
                        <p className="text-gray-700 bg-yellow-50 p-4 rounded-xl border-l-4 border-red-800">
                          {product.usage}
                        </p>
                      </div>
                    )}

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Product Description</h3>
                      <div className="text-gray-700 bg-gray-50 p-4 rounded-xl">
                        <p>{showFullDescription ? product.description : `${product.description?.substring(0, 200)}...`}</p>
                        {product.description && product.description.length > 200 && (
                          <button
                            onClick={() => setShowFullDescription(!showFullDescription)}
                            className="mt-2 text-red-800 font-medium hover:text-red-900"
                          >
                            {showFullDescription ? 'Show Less' : 'Read More'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'specs' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Product Specifications</h3>
                        <dl className="space-y-3">
                          <div className="flex justify-between py-2 border-b border-gray-200">
                            <dt className="font-medium text-gray-600">Stone Type:</dt>
                            <dd className="text-gray-900">{product.stoneType}</dd>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-200">
                            <dt className="font-medium text-gray-600">Weight:</dt>
                            <dd className="text-gray-900">{getWeightDisplay()}</dd>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-200">
                            <dt className="font-medium text-gray-600">Dimensions:</dt>
                            <dd className="text-gray-900">{getDimensionsDisplay()}</dd>
                          </div>
                          {product.certification && (
                            <div className="flex justify-between py-2 border-b border-gray-200">
                              <dt className="font-medium text-gray-600">Certification:</dt>
                              <dd className="text-gray-900">{product.certification}</dd>
                            </div>
                          )}
                          <div className="flex justify-between py-2 border-b border-gray-200">
                            <dt className="font-medium text-gray-600">Views:</dt>
                            <dd className="text-gray-900">{product.views || 0}</dd>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-200">
                            <dt className="font-medium text-gray-600">Sales Count:</dt>
                            <dd className="text-gray-900">{product.salesCount || 0}</dd>
                          </div>
                        </dl>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Tags</h3>
                        {product.tags && product.tags.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {product.tags.map((tag, index) => (
                              <span key={index} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                                {tag}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500">No tags available</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold text-gray-900">Customer Reviews</h3>
                      <button className="bg-red-800 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-900 transition-colors">
                        Manage Reviews
                      </button>
                    </div>

                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <div key={review.id} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-red-800 text-white rounded-full flex items-center justify-center font-semibold">
                                {review.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{review.name}</p>
                                <p className="text-sm text-gray-500">{review.date}</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                    }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700 mb-3">{review.comment}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <span>Helpful ({review.helpful})</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default IntegratedAdminProductDetail;