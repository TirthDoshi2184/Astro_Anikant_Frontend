import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid, List, Star, Heart, ShoppingCart, ChevronDown, ChevronLeft, ChevronRight, Eye, Sparkles, Zap, Shield, DollarSign, TrendingUp, X } from 'lucide-react';
import axios from 'axios';

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

  // Sample products with more variety
  const sampleProducts = [
    {
      id: 1,
      name: 'Premium Ruby Gemstone Ring',
      description: 'Authentic Burmese Ruby with 92.5 Silver setting',
      price: 12500,
      originalPrice: 15000,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
      rating: 4.8,
      reviews: 234,
      category: 'Gems',
      benefits: ['Wealth', 'Success', 'Confidence'],
      inStock: true,
      isNew: true,
      isBestSeller: false,
      weight: '3.2 carats',
      origin: 'Burma',
      certification: 'GIA Certified'
    },
    {
      id: 2,
      name: 'Vastu Crystal Pyramid Set',
      description: 'Set of 9 crystal pyramids for complete Vastu correction',
      price: 3200,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
      rating: 4.9,
      reviews: 189,
      category: 'Pyramids',
      benefits: ['Protection', 'Health', 'Peace'],
      inStock: true,
      isNew: false,
      isBestSeller: true,
      size: '2 inches each',
      material: 'Clear Quartz'
    },
    {
      id: 3,
      name: '108 Beads Rudraksha Mala',
      description: 'Authentic 5 Mukhi Rudraksha beads from Nepal',
      price: 2800,
      originalPrice: 3500,
      image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400',
      rating: 4.7,
      reviews: 156,
      category: 'Malas',
      benefits: ['Spirituality', 'Peace', 'Health'],
      inStock: true,
      isNew: false,
      isBestSeller: true,
      beadSize: '8mm',
      origin: 'Nepal'
    },
    {
      id: 4,
      name: 'Shree Yantra Gold Plated',
      description: 'Sacred geometry for abundance and prosperity',
      price: 4500,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
      rating: 4.6,
      reviews: 98,
      category: 'Yantras',
      benefits: ['Wealth', 'Success', 'Spirituality'],
      inStock: false,
      isNew: true,
      isBestSeller: false,
      size: '3x3 inches',
      material: 'Copper with Gold Plating'
    },
    {
      id: 5,
      name: 'Amethyst Healing Crystal',
      description: 'Natural amethyst cluster for meditation and healing',
      price: 1800,
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400',
      rating: 4.9,
      reviews: 276,
      category: 'Crystals',
      benefits: ['Spirituality', 'Peace', 'Health'],
      inStock: true,
      isNew: false,
      isBestSeller: true,
      weight: '250 grams',
      origin: 'Brazil'
    },
    {
      id: 6,
      name: 'Blue Sapphire Ring',
      description: 'Royal blue sapphire with diamond accents',
      price: 25000,
      originalPrice: 30000,
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400',
      rating: 4.8,
      reviews: 89,
      category: 'Gems',
      benefits: ['Wealth', 'Success', 'Protection'],
      inStock: true,
      isNew: true,
      isBestSeller: false,
      weight: '2.5 carats',
      origin: 'Kashmir',
      certification: 'GRS Certified'
    },
    {
      id: 7,
      name: 'Rose Quartz Heart',
      description: 'Love and compassion crystal for relationships',
      price: 850,
      image: 'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=400',
      rating: 4.7,
      reviews: 145,
      category: 'Crystals',
      benefits: ['Love', 'Peace', 'Health'],
      inStock: true,
      isNew: false,
      isBestSeller: false,
      weight: '150 grams',
      origin: 'Madagascar'
    },
    {
      id: 8,
      name: 'Copper Meditation Pyramid',
      description: 'Handcrafted copper pyramid for energy amplification',
      price: 5500,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
      rating: 4.5,
      reviews: 67,
      category: 'Pyramids',
      benefits: ['Spirituality', 'Health', 'Protection'],
      inStock: true,
      isNew: false,
      isBestSeller: false,
      size: '6 inches base',
      material: '99.9% Pure Copper'
    },
    {
      id: 9,
      name: 'Tulsi Mala Premium',
      description: 'Sacred Tulsi beads blessed by priests',
      price: 1200,
      image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400',
      rating: 4.8,
      reviews: 198,
      category: 'Malas',
      benefits: ['Spirituality', 'Peace', 'Health'],
      inStock: true,
      isNew: false,
      isBestSeller: true,
      beadCount: '108 beads',
      origin: 'Vrindavan'
    }
  ];

  // API Integration (commented for future use)
  
useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:1921/product/getallproducts');
      console.log('Fetched products:', response.data.data);
      
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
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

      <div className="container mx-auto px-6 py-8">
        {/* Category Description */}
        <div className="bg-gradient-to-r from-red-900 to-red-800 text-white rounded-xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-4">Spiritual Gems & Crystals</h2>
          <p className="text-lg mb-6 opacity-90">
            Our carefully curated collection of spiritual products harnesses ancient wisdom to bring positive energy into your life.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Perfect Selection</h4>
              <p className="text-sm opacity-80">Choose based on your zodiac and spiritual goals</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Sacred Care</h4>
              <p className="text-sm opacity-80">Cleanse under moonlight and store properly</p>
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
            <div className="text-gray-500 text-lg mb-4">No products found</div>
            <div className="text-gray-400">Try adjusting your search or filters</div>
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

export default ProductPage;