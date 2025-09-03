import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid, List, Star, Heart, ShoppingCart, ChevronDown, ChevronLeft, ChevronRight, Eye, Sparkles, Zap, Shield, DollarSign, TrendingUp, X } from 'lucide-react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const ProductPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('popularity');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBenefits, setSelectedBenefits] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = [
    { name: 'Gems', icon: '💎', count: 245 },
    { name: 'Pyramids', icon: '🔺', count: 87 },
    { name: 'Malas', icon: '📿', count: 156 },
    { name: 'Yantras', icon: '🕉️', count: 98 },
    { name: 'Crystals', icon: '💠', count: 203 },
    { name: 'Rudraksha', icon: '🔮', count: 134 }
  ];

  const benefits = [
    { name: 'Wealth', icon: '💰', color: 'from-yellow-400 to-orange-500' },
    { name: 'Health', icon: '🌿', color: 'from-green-400 to-emerald-500' },
    { name: 'Protection', icon: '🛡️', color: 'from-blue-400 to-indigo-500' },
    { name: 'Love', icon: '💖', color: 'from-pink-400 to-rose-500' },
    { name: 'Success', icon: '🏆', color: 'from-purple-400 to-violet-500' },
    { name: 'Spirituality', icon: '🕉️', color: 'from-indigo-400 to-purple-500' },
    { name: 'Peace', icon: '☮️', color: 'from-teal-400 to-cyan-500' },
    { name: 'Confidence', icon: '⚡', color: 'from-orange-400 to-red-500' }
  ];

  const brands = [
    { name: 'Vedic Collection', rating: 4.8, products: 89 },
    { name: 'Crystal Palace', rating: 4.9, products: 156 },
    { name: 'Sacred Gems', rating: 4.7, products: 203 },
    { name: 'Divine Energy', rating: 4.6, products: 134 },
    { name: 'Mystic Treasures', rating: 4.8, products: 98 }
  ];

  // API Integration (commented for future use)
  
useEffect(() => {
    fetchProducts();
    
    // Listen for URL changes to refetch products
    const handleUrlChange = () => {
        fetchProducts();
    };
    
    window.addEventListener('popstate', handleUrlChange);
    
    return () => {
        window.removeEventListener('popstate', handleUrlChange);
    };
}, []);
const fetchProducts = async (categoryFilter = null) => {
    setIsLoading(true);
    try {
        // Get category from URL params
        const urlParams = new URLSearchParams(window.location.search);
        const categoryFromUrl = urlParams.get('category');
        
        // Use the category filter parameter or URL parameter
        const categoryToFetch = categoryFilter || categoryFromUrl;
        
        let url = 'https://astroanikantbackend-2.onrender.com/product/getallproducts';
        if (categoryToFetch) {
            url += `?category=${categoryToFetch}`;
        }
        
        const response = await axios.get(url);
        console.log('Fetched products:', response.data.data);
        
        setProducts(response.data.data);
    } catch (error) {
        console.error('Error fetching products:', error);
        
        // Check if it's a 404 (no products found for category)
        if (error.response && error.response.status === 404) {
            setProducts([]); // Set empty array to show "no products" message
        } else {
            // For other errors, you might want to show all products or handle differently
            setProducts([]);
        }
    } finally {
        setIsLoading(false);
    }
};
  const handleSearch = async () => {
    await fetchProducts();
  };

  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleBenefit = (benefit) => {
    setSelectedBenefits(prev => 
      prev.includes(benefit) 
        ? prev.filter(b => b !== benefit)
        : [...prev, benefit]
    );
  };

  const clearCategoryFilter = () => {
    navigate('/products');
    fetchProducts(); // Fetch all products
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Hero Section - Clean and Professional */}
      <div className="bg-gradient-to-r from-red-900 to-red-800 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Sacred Collections</h1>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Discover authentic spiritual products for your sacred journey
            </p>
            
            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search gems, pyramids, malas..."
                className="w-full px-6 py-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
              <button className="absolute right-2 top-2 bg-red-900 text-white px-6 py-2 rounded-lg hover:bg-red-800 transition-colors">
                <Search size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Free Delivery Banner */}
{/* Enhanced Free Delivery Banner */}
{/* Enhanced Free Delivery Banner - Theme Matched */}
<div className="relative bg-gradient-to-r from-red-800 via-red-700 to-orange-700 text-white overflow-hidden">
  {/* Animated background elements */}
  <div className="absolute inset-0 opacity-25">
    <div className="absolute top-2 left-10 animate-pulse">✨</div>
    <div className="absolute top-4 right-20 animate-bounce">🕉️</div>
    <div className="absolute bottom-3 left-32 animate-pulse">💎</div>
    <div className="absolute bottom-2 right-40 animate-bounce">⭐</div>
    <div className="absolute top-3 left-1/2 animate-pulse">🌟</div>
  </div>
  
  {/* Main content */}
  <div className="relative text-center py-4">
    <div className="flex items-center justify-center gap-3">
      {/* Truck icon with glow effect */}
      <div className="relative">
        <div className="absolute inset-0 bg-yellow-300 rounded-full blur-sm opacity-40 animate-pulse"></div>
        <div className="relative bg-white/20 rounded-full p-2">
          <span className="text-xl">🚚</span>
        </div>
      </div>
      
      {/* Main text */}
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <span className="text-lg font-bold tracking-wide">
          🌟 DIVINE BLESSING 🌟
        </span>
        <span className="hidden sm:inline text-white/80">•</span>
        <span className="text-base font-semibold">
          FREE SACRED DELIVERY ON ALL ORDERS
        </span>
      </div>
      
      {/* Sacred symbol */}
      <div className="relative">
        <div className="absolute inset-0 bg-yellow-300 rounded-full blur-sm opacity-40 animate-pulse"></div>
        <div className="relative text-xl animate-spin-slow">
          🔮
        </div>
      </div>
    </div>
    
    {/* Subtitle */}
    <div className="mt-1 text-sm opacity-90 font-medium">
      Bringing spiritual energy to your doorstep with love & care ✨
    </div>
  </div>
  
  {/* Decorative border */}
  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400"></div>
</div>
      <div className="container mx-auto px-6 py-8">
        {/* Category Description */}
        <div className="bg-gradient-to-r from-red-900 to-red-800 text-white rounded-xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-4">Spiritual Collections</h2>
          <p className="text-lg mb-6 opacity-90">
            Our carefully curated collection of spiritual products harnesses ancient wisdom to bring positive energy into your life.
          </p>
<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
  <div className="bg-white/10 rounded-lg p-4">
    <h4 className="font-semibold mb-2">Perfect Selection</h4>
    <p className="text-sm opacity-80">Choose based on your zodiac and spiritual goals</p>
  </div>
  <div className="bg-white/10 rounded-lg p-4">
  <h4 className="font-semibold mb-2">Free Delivery</h4>
  <p className="text-sm opacity-80">Free shipping on all orders nationwide</p>
</div>
  <div className="bg-white/10 rounded-lg p-4">
    <h4 className="font-semibold mb-2">Powerful Energy</h4>
    <p className="text-sm opacity-80">Amplify your aura and manifest positive vibrations</p>
  </div>
  <div className="bg-white/10 rounded-lg p-4">
    <h4 className="font-semibold mb-2">100% Authentic</h4>
    <p className="text-sm opacity-80">Certified genuine with authenticity guarantee</p>
  </div>

</div>      
        </div>

        {/* Filter Toggle & Sort Options */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 bg-white rounded-lg p-4 shadow-md">
          <div className="flex items-center gap-4 mb-4 sm:mb-0">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 bg-red-900 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-colors"
            >
              <Filter size={20} />
              <span>Filters</span>
              {(selectedCategories.length > 0 || selectedBenefits.length > 0) && (
                <span className="bg-orange-400 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  {selectedCategories.length + selectedBenefits.length}
                </span>
              )}
              
            </button>
            
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="popularity">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest First</option>
            </select>
  
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-gray-600">View:</span>
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-red-900 text-white' : 'bg-gray-200'}`}
            >
              <Grid size={20} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-red-900 text-white' : 'bg-gray-200'}`}
            >
              <List size={20} />
            </button>
  
          </div>
        </div>

        {/* Collapsible Filter Sidebar */}
        {isFilterOpen && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Filter Products</h3>
              <button 
                onClick={() => setIsFilterOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Price Range */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Price Range</h4>
                <input 
                  type="range" 
                  min="0" 
                  max="50000" 
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full mb-2"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
              </div>

              {/* Categories */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Categories</h4>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {categories.map(category => (
                    <label key={category.name} className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        checked={selectedCategories.includes(category.name)}
                        onChange={() => toggleCategory(category.name)}
                        className="text-red-900"
                      />
                      <span className="text-sm">{category.icon} {category.name} ({category.count})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Benefits</h4>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {benefits.slice(0, 6).map(benefit => (
                    <label key={benefit.name} className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        checked={selectedBenefits.includes(benefit.name)}
                        onChange={() => toggleBenefit(benefit.name)}
                        className="text-red-900"
                      />
                      <span className="text-sm">{benefit.icon} {benefit.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Stone Types</h4>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {[...new Set(products.map(p => p.stoneType))].slice(0, 5).map(stoneType => (
                    <label key={stoneType} className="flex items-center space-x-2">
                      <input type="checkbox" className="text-red-900" />
                      <span className="text-sm">{stoneType}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
                              {/* // Add this after your filter buttons */}
{window.location.search.includes('category') && (
    <button 
        onClick={clearCategoryFilter}
        className="flex items-center gap-2 text-sm text-red-600 hover:text-red-800"
    >
        <X size={16} />
        Clear Category Filter
    </button>
)}

            <div className="flex justify-end mt-6">
              <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2">
                Clear All
              </button>
              <button 
                onClick={() => setIsFilterOpen(false)}
                className="bg-red-900 text-white px-6 py-2 rounded-lg hover:bg-red-800"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-red-900 transition ease-in-out duration-150">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading products...
            </div>
          </div>
        )}

          {!isLoading && (
            <div className={`grid gap-6 mb-8 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
              {products.map(product => (
                <div
            key={product._id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden group cursor-pointer"
            onClick={() => window.location.href = `/productdetail/${product._id}`}
                >
            {/* Product Image */}
            <div className="relative overflow-hidden">
              <img 
                src={product.images && product.images.length > 0 
                  ? product.images.find(img => img.isPrimary)?.url || product.images[0]?.url 
                  : '/api/placeholder/300/250'
                } 
                alt={product.images && product.images.length > 0 
                  ? product.images.find(img => img.isPrimary)?.alt || product.name
                  : product.name
                }
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = '/api/placeholder/300/250';
                }}
              />
              
              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-1">
                {product.isFeatured && (
                  <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">FEATURED</span>
                )}
                {product.salesCount > 50 && (
                  <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-semibold">BESTSELLER</span>
                )}
                {product.discountedPrice && (
                  <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
              {Math.round(((product.price - product.discountedPrice) / product.price) * 100)}% OFF
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 bg-white rounded-full shadow-md hover:bg-red-50">
                  <Heart size={16} className="text-red-600" />
                </button>
                <button className="p-2 bg-white rounded-full shadow-md hover:bg-red-50">
                  <Eye size={16} className="text-red-600" />
                </button>
              </div>

              {/* Stock Status */}
              <div className="absolute bottom-3 left-3">
                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>
            
            {/* Product Info */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                {product.name}
              </h3>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {product.shortDescription || product.description}
              </p>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={14} 
                fill={i < Math.floor(product.averageRating || 0) ? "currentColor" : "none"} 
              />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.averageRating || 0} ({product.reviewCount || 0})
                </span>
              </div>

              {/* Astrological Benefits */}
              <div className="flex flex-wrap gap-1 mb-3">
                {product.astrologicalBenefits && product.astrologicalBenefits.slice(0, 2).map((benefit, index) => (
                  <span key={index} className="text-xs bg-amber-100 text-red-800 px-2 py-1 rounded">
              {benefit}
                  </span>
                ))}
                {product.astrologicalBenefits && product.astrologicalBenefits.length > 2 && (
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
              +{product.astrologicalBenefits.length - 2} more
                  </span>
                )}
              </div>

              {/* Stone Type */}
              {product.stoneType && (
                <div className="mb-3">
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
              {product.stoneType}
                  </span>
                </div>
              )}

              {/* Weight */}
              {product.weight && product.weight.value && (
                <div className="text-xs text-gray-500 mb-3">
                  Weight: {product.weight.value} {product.weight.unit}
                </div>
              )}

              {/* Price */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-xl font-bold text-red-900">
              ₹{(product.discountedPrice || product.price).toLocaleString()}
                  </span>
                  {product.discountedPrice && (
              <span className="text-sm text-gray-500 line-through ml-2">
                ₹{product.price.toLocaleString()}
              </span>
                  )}
                </div>
              </div>

              {/* Add to Cart Button */}
              {/* Cart logic is remaining */}
              {/* Free Delivery Info */}
{/* Product card delivery info - Theme matched */}
<div className="flex items-center gap-1 text-red-700 text-xs mb-2">
  <span>✨</span>
  <span className="font-medium">Sacred Delivery Included</span>
</div>
              <button 
                className={`w-full py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                  product.stock > 0 && product.isActive
              ? 'bg-red-900 text-white hover:bg-red-800'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={product.stock === 0 || !product.isActive}
                onClick={(e) => {
                  e.stopPropagation();
                  if (product.stock > 0 && product.isActive) {
              // Add to cart logic here
              console.log(`Added ${product.name} to cart`);
              window.location.href = `/cart`;
                  }
                }}
              >
                
                <ShoppingCart size={18} />
                
                {product.stock > 0 && product.isActive ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
                </div>
              ))}
            </div>
          )}
        {!isLoading && products.length === 0 && (
    <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-4">
            {new URLSearchParams(window.location.search).get('category') 
                ? `No products found for category: ${new URLSearchParams(window.location.search).get('category')}`
                : 'No products found'
            }
        </div>
        <div className="text-gray-400 mb-6">Try browsing other categories or check back later</div>
        {new URLSearchParams(window.location.search).get('category') && (
            <button 
                onClick={() => {
                    window.history.pushState({}, '', '/products');
                    fetchProducts();
                }}
                className="bg-red-900 text-white px-6 py-3 rounded-lg hover:bg-red-800 transition-colors"
            >
                View All Products
            </button>
        )}
    </div>
)}

        {/* Simple Pagination */}
        {!isLoading && products.length > 0 && (
          <div className="flex justify-between items-center bg-white rounded-lg p-4 shadow-md">
            <div className="flex items-center gap-4">
              <span className="text-gray-700">Items per page:</span>
              <select 
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value={12}>12</option>
                <option value={24}>24</option>
                <option value={48}>48</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="p-2 border border-gray-300 rounded hover:bg-gray-100">
                <ChevronLeft size={20} />
              </button>
              <span className="px-4 py-2 bg-red-900 text-white rounded">1</span>
              <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">2</button>
              <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">3</button>
              <button className="p-2 border border-gray-300 rounded hover:bg-gray-100">
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="text-sm text-gray-600">
              Showing 1-{Math.min(itemsPerPage, products.length)} of {products.length} products
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
<style jsx>{`
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .animate-spin-slow {
    animation: spin-slow 3s linear infinite;
  }
`}</style>
export default ProductPage;