import React, { useState, useEffect } from 'react';
import { Search, Filter, Star, ShoppingCart, ChevronLeft, ChevronRight, X } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductPage = () => {
  const [sortBy, setSortBy] = useState('popularity');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  // Dynamic categories, benefits, and stone types from API data
  // Scroll to top when component loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch products from API
  useEffect(() => {
    fetchProducts();
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
      
      const products = response.data.data || [];
      setAllProducts(products);
      setFilteredProducts(products);
      
      // Extract unique categories, benefits, and stone types from the data
      
    } catch (error) {
      console.error('Error fetching products:', error);
      
      // Check if it's a 404 (no products found for category)
      if (error.response && error.response.status === 404) {
        setAllProducts([]);
        setFilteredProducts([]);
      } else {
        setAllProducts([]);
        setFilteredProducts([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  
  // Filter and sort products
  useEffect(() => {
    let filtered = [...allProducts];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        (product.name && product.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.stoneType && product.stoneType.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Category filter
   
    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return (a.discountedPrice || a.price || 0) - (b.discountedPrice || b.price || 0);
        case 'price-high':
          return (b.discountedPrice || b.price || 0) - (a.discountedPrice || a.price || 0);
        case 'rating':
          return (b.averageRating || 0) - (a.averageRating || 0);
        case 'newest':
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        case 'popularity':
        default:
          return (b.salesCount || 0) - (a.salesCount || 0);
      }
    });

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [allProducts, searchQuery, priceRange, sortBy]);

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

 
const clearAllFilters = () => {
  setPriceRange([0, 50000]);
  setSearchQuery('');
  setCurrentPage(1);
};

  const clearCategoryFilter = () => {
    navigate('/products');
    fetchProducts(); // Fetch all products
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Hero Section */}
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
                onKeyPress={handleSearchKeyPress}
                placeholder="Search gems, pyramids, malas..."
                className="w-full px-6 py-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
              <button 
                onClick={handleSearch}
                className="absolute right-2 top-2 bg-red-900 text-white px-6 py-2 rounded-lg hover:bg-red-800 transition-colors"
              >
                <Search size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Free Delivery Banner */}
      <div className="relative bg-gradient-to-r from-red-800 via-red-700 to-orange-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <div className="absolute top-2 left-10 animate-pulse">✨</div>
          <div className="absolute top-4 right-20 animate-bounce">🕉️</div>
          <div className="absolute bottom-3 left-32 animate-pulse">💎</div>
          <div className="absolute bottom-2 right-40 animate-bounce">⭐</div>
          <div className="absolute top-3 left-1/2 animate-pulse">🌟</div>
        </div>
        
        <div className="relative text-center py-4">
          <div className="flex items-center justify-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-300 rounded-full blur-sm opacity-40 animate-pulse"></div>
              <div className="relative bg-white/20 rounded-full p-2">
                <span className="text-xl">🚚</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <span className="text-lg font-bold tracking-wide">
                🌟 DIVINE BLESSING 🌟
              </span>
              <span className="hidden sm:inline text-white/80">•</span>
              <span className="text-base font-semibold">
                FREE SACRED DELIVERY ON ALL ORDERS
              </span>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-300 rounded-full blur-sm opacity-40 animate-pulse"></div>
              <div className="relative text-xl" style={{animation: 'spin 3s linear infinite'}}>
                🔮
              </div>
            </div>
          </div>
          
          <div className="mt-1 text-sm opacity-90 font-medium">
            Bringing spiritual energy to your doorstep with love & care ✨
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400"></div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 bg-white rounded-lg p-4 shadow-md">
  <div className="flex items-center gap-4 mb-4 sm:mb-0">
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

    {/* Clear Data Button */}
    <button 
      onClick={clearAllFilters}
      className="bg-red-900 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-colors"
    >
      Clear Data
    </button>

    {/* Clear Category Filter Button */}
    {new URLSearchParams(window.location.search).get('category') && (
      <button 
        onClick={clearCategoryFilter}
        className="flex items-center gap-2 text-sm text-red-600 hover:text-red-800 bg-red-50 px-3 py-2 rounded-lg"
      >
        <X size={16} />
        Clear Category Filter
      </button>
    )}
  </div>
  
  <div className="text-gray-600">
    {!isLoading && (
      <>Showing {filteredProducts.length > 0 ? startIndex + 1 : 0}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products</>
    )}
  </div>
</div>

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

        {/* Products Grid */}
        {/* Products Grid */}
      {/* Products Grid */}
{!isLoading && (
  <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 mb-8">
    {currentProducts.map(product => (
      <div
        key={product._id}
        className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden group cursor-pointer flex flex-col h-full"
        onClick={() => navigate(`/productdetail/${product._id}`)}
      >
        {/* Product Image */}
        <div className="relative overflow-hidden">
          <img 
            src={product.images && product.images.length > 0 
              ? product.images.find(img => img.isPrimary)?.url || product.images[0]?.url 
              : 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400'
            } 
            alt={product.name}
            className="w-full h-40 sm:h-48 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const fallbackImages = {
                'Yantras': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
                'Rudraksha': 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400',
                'Gems': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
                'default': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'
              };
              e.target.src = fallbackImages[product.category] || fallbackImages.default;
            }}
          />
          
          {/* Badges - Mobile Optimized */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isFeatured && (
              <span className="bg-green-500 text-white px-1.5 py-0.5 rounded text-xs font-semibold">FEATURED</span>
            )}
            {product.discountedPrice && product.price && product.discountedPrice < product.price && (
              <span className="bg-red-600 text-white px-1.5 py-0.5 rounded text-xs font-semibold">
                {Math.round(((product.price - product.discountedPrice) / product.price) * 100)}% OFF
              </span>
            )}
          </div>

          {/* Stock Status - Mobile Optimized */}
          <div className="absolute bottom-2 left-2">
            <span className={`px-1.5 py-0.5 rounded text-xs font-semibold ${
              product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>
        
        {/* Product Info - Mobile Optimized */}
        <div className="p-3 lg:p-4 flex flex-col flex-grow">
          {/* Product Name */}
          <h3 className="text-sm lg:text-lg font-semibold text-gray-800 mb-2 line-clamp-2 leading-tight">
            {product.name}
          </h3>
          
          {/* Description - Hidden on mobile to save space */}
          <p className="hidden lg:block text-sm text-gray-600 mb-3 line-clamp-2">
            {product.shortDescription || product.description}
          </p>
          
          {/* Rating - Simplified for mobile */}
          <div className="flex items-center gap-1 mb-2 lg:mb-3">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={12} 
                  className={i < Math.floor(product.averageRating || 0) ? "fill-current" : "fill-none stroke-current"} 
                />
              ))}
            </div>
            <span className="text-xs lg:text-sm text-gray-600">
              {(product.averageRating || 0).toFixed(1)}
            </span>
          </div>

          {/* Benefits - Show only 2 on mobile, 3 on desktop */}
          {product.astrologicalBenefits && product.astrologicalBenefits.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2 lg:mb-3">
              {product.astrologicalBenefits.slice(0, 2).map((benefit, index) => (
                <span key={index} className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full font-medium">
                  {benefit}
                </span>
              ))}
              {product.astrologicalBenefits.length > 2 && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full font-medium">
                  +{product.astrologicalBenefits.length - 2}
                </span>
              )}
            </div>
          )}

          {/* Stone Type - Hidden on mobile */}
          {product.stoneType && (
            <div className="hidden lg:block mb-3">
              <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full font-medium">
                {product.stoneType}
              </span>
            </div>
          )}

          {/* Spacer */}
          <div className="flex-grow"></div>

          {/* Price - Mobile Optimized */}
          <div className="mb-3">
            {product.price && (
              <div className="flex flex-col lg:flex-row lg:items-center lg:gap-2">
                <span className="text-lg lg:text-xl font-bold text-red-900">
                  ₹{(product.discountedPrice || product.price).toLocaleString()}
                </span>
                {product.discountedPrice && product.discountedPrice < product.price && (
                  <span className="text-xs lg:text-sm text-gray-500 line-through">
                    ₹{product.price.toLocaleString()}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Button - Mobile Optimized */}
          <button 
            className={`w-full py-2.5 lg:py-3 text-sm lg:text-base rounded-lg font-semibold transition-colors flex items-center justify-center gap-1 mt-auto ${
              product.stock > 0 && product.isActive
                ? 'bg-red-900 text-white hover:bg-red-800'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={product.stock === 0 || !product.isActive}
            onClick={(e) => {
              e.stopPropagation();
              if (product.stock > 0 && product.isActive) {
                navigate(`/productdetail/${product._id}`);
              }
            }}
          >
            {product.stock > 0 && product.isActive ? 'View Product' : 'Out of Stock'}
          </button>
        </div>
      </div>
    ))}
  </div>
)}
        {/* No Products Found */}
        {!isLoading && currentProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">
              {new URLSearchParams(window.location.search).get('category') 
                ? `No products found for category: ${new URLSearchParams(window.location.search).get('category')}`
                : searchQuery 
                  ? `No products found for "${searchQuery}"`
                  : 'No products found'
              }
            </div>
            <div className="text-gray-400 mb-6">
              {searchQuery 
                ? 'Try adjusting your filters or search terms'
                : 'Check back later for new products'
              }
            </div>
            <button 
              onClick={clearAllFilters}
              className="bg-red-900 text-white px-6 py-3 rounded-lg hover:bg-red-800 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {!isLoading && filteredProducts.length > 0 && totalPages > 1 && (
          <div className="bg-white rounded-lg p-4 shadow-md">
            {/* Desktop Layout */}
            <div className="hidden md:flex justify-between items-center">
              <div className="flex items-center gap-4">
                <span className="text-gray-700">Items per page:</span>
                <select 
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(parseInt(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value={12}>12</option>
                  <option value={24}>24</option>
                  <option value={48}>48</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={20} />
                </button>
                
                {/* Page numbers */}
                {[...Array(Math.min(5, totalPages))].map((_, index) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = index + 1;
                  } else if (currentPage <= 3) {
                    pageNum = index + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + index;
                  } else {
                    pageNum = currentPage - 2 + index;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => goToPage(pageNum)}
                      className={`px-4 py-2 rounded ${
                        currentPage === pageNum
                          ? 'bg-red-900 text-white'
                          : 'border border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                <button 
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              <div className="text-sm text-gray-600">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden space-y-4">
              {/* Items per page - Mobile */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Items per page:</span>
                <select 
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(parseInt(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value={12}>12</option>
                  <option value={24}>24</option>
                  <option value={48}>48</option>
                </select>
              </div>

              {/* Page navigation - Mobile */}
              <div className="flex items-center justify-center gap-2">
                <button 
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
                >
                  <ChevronLeft size={18} />
                </button>
                
                <span className="px-3 py-2 bg-red-900 text-white rounded text-sm">
                  {currentPage}
                </span>
                <span className="text-sm text-gray-500">of {totalPages}</span>
                
                <button 
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Results info - Mobile */}
              <div className="text-center text-sm text-gray-600">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
              </div>
            </div>
          </div>
        )}

        {/* Spiritual Collections Info */}
        <div className="bg-gradient-to-r from-red-900 to-red-800 text-white rounded-xl p-8 mt-8">
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
      </div>
    </div>
  );
};

export default ProductPage;