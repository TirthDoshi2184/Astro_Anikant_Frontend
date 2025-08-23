import React, { useState, useEffect, use } from 'react';
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

  // Mock product data - in real app, this would come from props/API
  const product = {
    id: 1,
    name: "Natural Ruby Gemstone Ring",
    shortDescription: "Authentic Burma Ruby for Love & Prosperity",
    description: "This exquisite Natural Ruby Gemstone Ring is crafted with genuine Burma ruby, known for its exceptional quality and powerful astrological properties. The ring features a 3.5-carat natural ruby set in pure silver, making it perfect for enhancing love, passion, and financial prosperity in your life.",
    price: 15999,
    originalPrice: 19999,
    discount: 20,
    sku: "RUB-RING-001",
    category: "Gemstone Rings",
    stock: 15,
    weight: "8.5g",
    dimensions: "Adjustable (Size 6-10)",
    origin: "Burma (Myanmar)",
    material: "Natural Ruby, Sterling Silver",
    certification: "Certified by Gemological Institute",
    astrologicalBenefits: [
      "Enhances love and relationships",
      "Boosts confidence and leadership",
      "Attracts wealth and prosperity",
      "Strengthens Sun's positive energy",
      "Improves blood circulation"
    ],
    usage: "Wear on the ring finger of right hand on Sunday morning after sunrise. Chant 'Om Suryaya Namaha' 108 times before wearing.",
    compatibleSigns: ["Leo", "Aries", "Sagittarius"],
    planets: ["Sun"],
    energization: "Pre-energized with Vedic mantras",
    careInstructions: "Clean with soft cloth, avoid chemicals, store separately",
    images: ["/api/placeholder/500/500"],
    rating: 4.8,
    reviewCount: 127,
    inStock: true
  };

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
    const interval = setInterval(() => {
      setSelectedImage((prev) => (prev + 1) % 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleQuantityChange = (type) => {
    if (type === 'increment' && quantity < product.stock) {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrement' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? '' : section);
  };

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
const { id: productID } = useParams();

useEffect(() => {
  fetchProducts(productID);
}, [productID]);

const fetchProducts = async (productID) => {
  setIsLoading(true);
  try {
    console.log('Fetching product with ID:', productID);
    const response = await axios.get('http://localhost:1921/product/getsingleproduct/' + productID);
    console.log('Fetched products:', response.data.data);

    setProducts(response.data.data);
  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
    setIsLoading(false);
  }
};
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-red-50">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <a href="/" className="hover:text-red-800 transition-colors">Home</a>
          <span>/</span>
          <a href="/products" className="hover:text-red-800 transition-colors">Products</a>
          <span>/</span>
          <a href="#" className="hover:text-red-800 transition-colors">{product.category}</a>
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
                  src={product.images[selectedImage]} 
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
                {product.discount > 0 && (
                  <div className="absolute top-4 left-4 bg-red-800 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                    {product.discount}% OFF
                  </div>
                )}
              </div>
            </div>

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
                          className={`w-5 h-5 ${star <= Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">({product.reviewCount} reviews)</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 space-y-1">
                    <p><strong>SKU:</strong> {product.sku}</p>
                    <p><strong>Category:</strong> {product.category}</p>
                    <p><strong>Weight:</strong> {product.weight}</p>
                    <p><strong>Origin:</strong> {product.origin}</p>
                  </div>
                </div>

                {/* Pricing */}
                <div className="border-t pt-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="text-3xl font-bold text-red-800">₹{product.price.toLocaleString()}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-xl text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 mb-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {product.inStock ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                    </span>
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
                  <div className="grid grid-cols-2 gap-4">
                    <button className="bg-red-800 text-white py-3 px-6 rounded-xl font-semibold hover:bg-red-900 transform hover:scale-105 transition-all duration-300 shadow-lg">
                      Add to Cart
                    </button>
                    <button className="bg-yellow-200 text-red-800 py-3 px-6 rounded-xl font-semibold hover:bg-yellow-300 transform hover:scale-105 transition-all duration-300 shadow-lg border-2 border-red-800">
                      Buy Now
                    </button>
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
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">How to Use</h3>
                  <p className="text-gray-700 bg-yellow-50 p-4 rounded-xl border-l-4 border-red-800">{product.usage}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Astrological Compatibility</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Compatible Zodiac Signs:</h4>
                      <div className="flex flex-wrap gap-2">
                        {product.compatibleSigns.map((sign, index) => (
                          <span key={index} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                            {sign}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Ruling Planet:</h4>
                      <div className="flex flex-wrap gap-2">
                        {product.planets.map((planet, index) => (
                          <span key={index} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                            {planet}
                          </span>
                        ))}
                      </div>
                    </div>
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
                        <dt className="font-medium text-gray-600">Material:</dt>
                        <dd className="text-gray-900">{product.material}</dd>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <dt className="font-medium text-gray-600">Weight:</dt>
                        <dd className="text-gray-900">{product.weight}</dd>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <dt className="font-medium text-gray-600">Dimensions:</dt>
                        <dd className="text-gray-900">{product.dimensions}</dd>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <dt className="font-medium text-gray-600">Origin:</dt>
                        <dd className="text-gray-900">{product.origin}</dd>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <dt className="font-medium text-gray-600">Certification:</dt>
                        <dd className="text-gray-900">{product.certification}</dd>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <dt className="font-medium text-gray-600">Energization:</dt>
                        <dd className="text-gray-900">{product.energization}</dd>
                      </div>
                    </dl>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Care Instructions</h3>
                    <div className="bg-yellow-50 p-4 rounded-xl border-l-4 border-red-800">
                      <p className="text-gray-700">{product.careInstructions}</p>
                    </div>
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