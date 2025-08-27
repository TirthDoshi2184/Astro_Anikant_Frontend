import React, { useState, useEffect } from 'react';
import { Star, Heart, Share2, ShoppingCart, Zap, Shield, Truck, MessageCircle, BookOpen, Users, ChevronDown, ChevronUp, Plus, Minus } from 'lucide-react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetailPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('benefits');
  const [expandedSection, setExpandedSection] = useState('');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  // State for API data
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);
  
  const { id: productID } = useParams();

  // Static data that might not come from API
  const relatedProducts = [
    { id: 2, name: "Ruby Pendant", price: 8999, image: "/api/placeholder/200/200" },
    { id: 3, name: "Sun Yantra", price: 2499, image: "/api/placeholder/200/200" },
    { id: 4, name: "Red Jasper Mala", price: 1999, image: "/api/placeholder/200/200" },
    { id: 5, name: "Copper Pyramid", price: 3499, image: "/api/placeholder/200/200" }
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

  useEffect(() => {
    if (productID) {
      fetchProduct(productID);
    }
  }, [productID]);

  useEffect(() => {
    if (product?.images?.length > 0) {
      const interval = setInterval(() => {
        setSelectedImage((prev) => (prev + 1) % product.images.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [product?.images?.length]);

  const fetchProduct = async (productID) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('Fetching product with ID:', productID);
      const response = await axios.get(`https://astroanikantbackend-2.onrender.com/product/getsingleproduct/${productID}`);
      console.log('Fetched product:', response.data.data);
      setProduct(response.data.data);
    } catch (error) {
      console.error('Error fetching product:', error);
      setError('Failed to fetch product details');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuantityChange = (type) => {
    if (type === 'increment' && quantity < product?.stock) {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrement' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? '' : section);
  };

  // Helper functions to process API data
  const getProductImages = () => {
    if (!product?.images || product.images.length === 0) {
      return ["/api/placeholder/500/500"];
    }
    return product.images.map(img => img.url || "/api/placeholder/500/500");
  };

  const getPrimaryImage = () => {
    if (!product?.images || product.images.length === 0) {
      return "/api/placeholder/500/500";
    }
    const primaryImage = product.images.find(img => img.isPrimary);
    return primaryImage ? primaryImage.url : product.images[0]?.url || "/api/placeholder/500/500";
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

  // Add to Cart functionality
  const handleAddToCart = async () => {
  setIsAddingToCart(true);
  try {
    const authToken = localStorage.getItem('authToken');
    let userId = "user123"; // fallback default
    
    if (authToken) {
      try {
        const payload = JSON.parse(atob(authToken.split('.')[1]));
        userId = payload.id || payload.userId || payload._id || userId;
      } catch (e) {
        console.log('Token decode error:', e);
      }
    }

    const cartData = {
      user: userId,
      product: productID,
      order_dt: new Date().toISOString(),
      status: "pending"
    };

    const response = await axios.post('https://astroanikantbackend-2.onrender.com/cart/createcart', cartData, {
      headers: {
        'Content-Type': 'application/json',
        ...(authToken && { 'Authorization': `Bearer ${authToken}` })
      }
    });
    
    if (response.status === 200 && response.data.message === "Created Cart") {
      alert('Product added to cart successfully!');
    } else {
      throw new Error('Unexpected response');
    }
  } catch (error) {
    console.error('Error adding to cart:', error.response?.data || error);
    
    // Handle duplicate product error
    if (error.response?.status === 409) {
      alert('Product is already added to cart!');
    } else {
      const errorMessage = error.response?.data?.message || 'Failed to add product to cart. Please try again.';
      alert(errorMessage);
    }
  } finally {
    setIsAddingToCart(false);
  }
};
  // Buy Now functionality
  // const handleBuyNow = async () => {
  //   setIsBuyingNow(true);
  //   try {
  //     const orderData = {
  //       order: {
  //         user: "user123", // Replace with actual user ID from your auth system
  //         products: [{
  //           product: productID,
  //           quantity: quantity,
  //           price: getCurrentPrice()
  //         }],
  //         totalAmount: getCurrentPrice() * quantity,
  //         shippingAddress: {}, // You might want to collect this from user
  //         paymentMethod: "pending", // This could be set during payment
  //         status: "pending",
  //         orderDate: new Date().toISOString()
  //       }
  //     };

  //     const response = await axios.post('https://astroanikantbackend-2.onrender.com/order/createorder', orderData);
      
  //     if (response.data.message === "Order Placed Successfully") {
  //       alert('Order placed successfully! Redirecting to payment...');
  //       // Here you could redirect to payment page or show payment modal
  //       // window.location.href = `/payment/${response.data.data._id}`;
  //     }
  //   } catch (error) {
  //     console.error('Error creating order:', error);
  //     alert('Failed to create order. Please try again.');
  //   } finally {
  //     setIsBuyingNow(false);
  //   }
  // };

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-800 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-600">{error}</p>
          <button 
            onClick={() => fetchProduct(productID)}
            className="mt-4 bg-red-800 text-white px-6 py-2 rounded-lg hover:bg-red-900 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-red-50 flex items-center justify-center">
        <p className="text-lg text-gray-600">Product not found</p>
      </div>
    );
  }

  const productImages = getProductImages();
  const discountPercentage = getDiscountPercentage();
  const currentPrice = getCurrentPrice();
  const originalPrice = getOriginalPrice();

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-red-50">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <a href="/" className="hover:text-red-800 transition-colors">Home</a>
          <span>/</span>
          <a href="/products" className="hover:text-red-800 transition-colors">Products</a>
          <span>/</span>
          <a href="#" className="hover:text-red-800 transition-colors">{product.category?.name || 'Category'}</a>
          <span>/</span>
          <span className="text-red-800 font-medium">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image Section */}
          <div className="space-y-6">
            <div className="relative bg-white rounded-2xl shadow-xl p-8 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-red-800/5 to-yellow-200/10"></div>
              <div className="relative">
                <img 
                  src={productImages[selectedImage]} 
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-xl group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                  <button 
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`p-2 rounded-full shadow-lg transition-all duration-300 ${isWishlisted ? 'bg-red-800 text-white' : 'bg-white text-gray-600 hover:bg-red-50'}`}
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
            {productImages.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === index ? 'border-red-800' : 'border-gray-200 hover:border-red-400'
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
                          className={`w-5 h-5 ${star <= Math.floor(product.averageRating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">({product.reviewCount || 0} reviews)</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 space-y-1">
                    <p><strong>SKU:</strong> {product.sku || 'N/A'}</p>
                    <p><strong>Stone Type:</strong> {product.stoneType}</p>
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
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                    </span>
                    {product.isFeatured && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Quantity Selector */}
                  <div className="flex items-center space-x-4 mb-6">
                    <label className="text-sm font-medium text-gray-700">Quantity:</label>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button 
                        onClick={() => handleQuantityChange('decrement')}
                        className="p-2 hover:bg-red-50 transition-colors"
                        disabled={quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 font-medium">{quantity}</span>
                      <button 
                        onClick={() => handleQuantityChange('increment')}
                        className="p-2 hover:bg-red-50 transition-colors"
                        disabled={quantity >= product.stock}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="">
                    <button 
                      onClick={handleAddToCart}
                      className="bg-red-800 text-white py-3 px-6 rounded-xl font-semibold hover:bg-red-900 transform hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                      disabled={product.stock === 0 || isAddingToCart}
                    >
                      {isAddingToCart ? (
                        <>
                          <div className="animate-spin rounded-full border-b-2 border-white mr-2"></div>
                          Adding...
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-5 h-5 mr-2" />
                          Add to Cart
                        </>
                      )}
                    </button>
                    {/* <button 
                      onClick={handleBuyNow}
                      className="bg-yellow-200 text-red-800 py-3 px-6 rounded-xl font-semibold hover:bg-yellow-300 transform hover:scale-105 transition-all duration-300 shadow-lg border-2 border-red-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                      disabled={product.stock === 0 || isBuyingNow}
                    >
                      {isBuyingNow ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-800 mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Zap className="w-5 h-5 mr-2" />
                          Buy Now
                        </>
                      )}
                    </button> */}
                  </div>
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
                    className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
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
              <div className="space-y-6 animate-fadeIn">
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
                    <p className="text-gray-700 bg-yellow-50 p-4 rounded-xl border-l-4 border-red-800">{product.usage}</p>
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
              <div className="space-y-6 animate-fadeIn">
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
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Customer Reviews</h3>
                  <button className="bg-red-800 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-900 transition-colors">
                    Write a Review
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
                              className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
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

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">You Might Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-red-800 font-semibold">₹{item.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProductDetailPage;