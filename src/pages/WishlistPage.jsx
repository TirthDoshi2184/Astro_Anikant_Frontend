import React, { useState, useEffect } from "react";
import {
  Star,
  Heart,
  Share2,
  ShoppingCart,
  Trash2,
  Eye,
  Filter,
  Grid,
  List,
  Search,
  SortAsc,
  Plus,
  Minus,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomToast = ({ type, title, message, icon: Icon }) => (
  <div className="flex items-center space-x-4 p-2">
    <div className="relative">
      <div className={`p-3 rounded-full ${type === 'success' ? 'bg-gradient-to-br from-green-400 to-green-600' : 
        type === 'remove' ? 'bg-gradient-to-br from-red-400 to-red-600' : 
        'bg-gradient-to-br from-yellow-400 to-orange-500'} shadow-lg`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-md">
        <div className={`w-2 h-2 rounded-full ${type === 'success' ? 'bg-green-500' : 
          type === 'remove' ? 'bg-red-500' : 'bg-yellow-500'} animate-pulse`}></div>
      </div>
    </div>
    <div className="flex-1">
      <h4 className="font-bold text-gray-800 text-lg mb-1">{title}</h4>
      <p className="text-gray-600 text-sm leading-relaxed">{message}</p>
    </div>
    <div className="flex flex-col items-center space-y-1">
      <div className={`w-8 h-1 rounded-full ${type === 'success' ? 'bg-green-400' : 
        type === 'remove' ? 'bg-red-400' : 'bg-yellow-400'}`}></div>
      <div className={`w-6 h-1 rounded-full ${type === 'success' ? 'bg-green-300' : 
        type === 'remove' ? 'bg-red-300' : 'bg-yellow-300'}`}></div>
      <div className={`w-4 h-1 rounded-full ${type === 'success' ? 'bg-green-200' : 
        type === 'remove' ? 'bg-red-200' : 'bg-yellow-200'}`}></div>
    </div>
  </div>
);

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [allWishlistItems, setAllWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("name");
  const [filterBy, setFilterBy] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [quantities, setQuantities] = useState({});
  const [processingItems, setProcessingItems] = useState({});
  
  const { productId } = useParams();
  const navigate = useNavigate();

  const isUserLoggedIn = () => {
    const authToken = localStorage.getItem("authToken");
    const user = localStorage.getItem("user");
    return authToken && user;
  };

  const getUserId = () => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      try {
        const payload = JSON.parse(atob(authToken.split(".")[1]));
        return payload.id || payload.userId || payload._id || "user123";
      } catch (e) {
        console.log("Token decode error:", e);
        return "user123";
      }
    }
    return "user123";
  };

  useEffect(() => {
    if (!isUserLoggedIn()) {
      navigate('/login');
      return;
    }
    fetchWishlistItems();
  }, []);

  useEffect(() => {
    // If productId is provided, add it to wishlist
    if (productId) {
      handleAddToWishlist(productId);
    }
  }, [productId]);

  const fetchWishlistItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const currentUserId = getUserId();
      const authToken = localStorage.getItem("authToken");
      
      console.log("Current User ID:", currentUserId);
      
      // Fetch ALL wishlist items from the API
      const response = await axios.get(
        "http://localhost:1921/wishlist/getallwishlist",
        {
          headers: {
            ...(authToken && { Authorization: `Bearer ${authToken}` }),
          },
        }
      );
      
      console.log("All wishlist items:", response.data);
      
      if (response.data && response.data.data) {
        setAllWishlistItems(response.data.data);
        
        // Filter wishlist items for the current user
        const userWishlistItems = response.data.data.filter(item => {
          // Check various possible user field names and formats
          const itemUserId = item.user?._id || item.user?.id || item.user || item.userId;
          console.log("Item user ID:", itemUserId, "Current user ID:", currentUserId);
          
          // Convert both to strings for comparison in case one is ObjectId and other is string
          return String(itemUserId) === String(currentUserId);
        });
        
        console.log("Filtered user wishlist items:", userWishlistItems);
        setWishlistItems(userWishlistItems);
        
        // Initialize quantities for user's items
        const initialQuantities = {};
        userWishlistItems.forEach(item => {
          initialQuantities[item._id || item.id] = 1;
        });
        setQuantities(initialQuantities);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setError("Failed to fetch wishlist items");
      
      // If wishlist endpoint doesn't exist, show empty state instead of error
      if (error.response?.status === 404) {
        setWishlistItems([]);
        setAllWishlistItems([]);
        setError(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddToWishlist = async (productId) => {
    try {
      const userId = getUserId();
      const authToken = localStorage.getItem("authToken");
      
      const wishlistData = {
        user: userId,
        product: productId,
        dateAdded: new Date().toISOString()
      };

      // Replace with your actual add to wishlist endpoint
      await axios.post(
        "https://astroanikantbackend-2.onrender.com/wishlist/addtowishlist",
        wishlistData,
        {
          headers: {
            "Content-Type": "application/json",
            ...(authToken && { Authorization: `Bearer ${authToken}` }),
          },
        }
      );

      toast.success(
        <CustomToast 
          type="success"
          title="Added to Sacred Wishlist! ✨"
          message="Item added to your spiritual collection"
          icon={Heart}
        />,
        {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: "mystical-toast mystical-success",
          bodyClassName: "mystical-body",
          closeButton: false
        }
      );

      // Refresh wishlist
      fetchWishlistItems();
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const handleRemoveFromWishlist = async (itemId) => {
    setProcessingItems(prev => ({ ...prev, [itemId]: true }));
    
    try {
      const authToken = localStorage.getItem("authToken");
      
      // Replace with your actual remove from wishlist endpoint
      await axios.delete(
        `https://astroanikantbackend-2.onrender.com/wishlist/deletewishlist/${itemId}`,
        {
          headers: {
            ...(authToken && { Authorization: `Bearer ${authToken}` }),
          },
        }
      );

      setWishlistItems(prev => prev.filter(item => (item._id || item.id) !== itemId));
      
      toast.success(
        <CustomToast 
          type="remove"
          title="Removed from Wishlist"
          message="Item removed from your collection"
          icon={Trash2}
        />,
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: "mystical-toast mystical-remove",
          bodyClassName: "mystical-body",
          closeButton: false
        }
      );
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error("Failed to remove item from wishlist");
    } finally {
      setProcessingItems(prev => ({ ...prev, [itemId]: false }));
    }
  };

  const handleAddToCart = async (item) => {
    const itemId = item._id || item.id;
    setProcessingItems(prev => ({ ...prev, [`cart_${itemId}`]: true }));
    
    try {
      const userId = getUserId();
      const authToken = localStorage.getItem("authToken");
      
      const cartData = {
        user: userId,
        product: item.product?._id || item._id || item.id,
        quantity: quantities[itemId] || 1,
        order_dt: new Date().toISOString(),
        status: "pending",
      };

      const response = await axios.post(
        "https://astroanikantbackend-2.onrender.com/cart/createcart",
        cartData,
        {
          headers: {
            "Content-Type": "application/json",
            ...(authToken && { Authorization: `Bearer ${authToken}` }),
          },
        }
      );

      if (response.status === 200) {
        toast.success(
          <CustomToast 
            type="success"
            title="Added to Sacred Cart! 🛒"
            message={`${item.product?.name || item.name} added successfully`}
            icon={ShoppingCart}
          />,
          {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            className: "mystical-toast mystical-success",
            bodyClassName: "mystical-body",
            closeButton: false
          }
        );

        // Reset quantity to 1 after adding to cart
        setQuantities(prev => ({ ...prev, [itemId]: 1 }));
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart");
    } finally {
      setProcessingItems(prev => ({ ...prev, [`cart_${itemId}`]: false }));
    }
  };

  const handleQuantityChange = (itemId, type) => {
    const item = wishlistItems.find(item => (item._id || item.id) === itemId);
    const stock = item?.product?.stock || item?.stock || 99;
    
    setQuantities(prev => {
      const currentQty = prev[itemId] || 1;
      if (type === "increment" && currentQty < stock) {
        return { ...prev, [itemId]: currentQty + 1 };
      } else if (type === "decrement" && currentQty > 1) {
        return { ...prev, [itemId]: currentQty - 1 };
      }
      return prev;
    });
  };

  const getProductImage = (item) => {
    const product = item.product || item;
    if (product.images && product.images.length > 0) {
      const primaryImage = product.images.find(img => img.isPrimary);
      return primaryImage ? primaryImage.url : product.images[0].url;
    }
    return "/api/placeholder/300/300";
  };

  const getCurrentPrice = (item) => {
    const product = item.product || item;
    return product.discountedPrice || product.price || 0;
  };

  const getOriginalPrice = (item) => {
    const product = item.product || item;
    return product.discountedPrice ? product.price : null;
  };

  const getDiscountPercentage = (item) => {
    const product = item.product || item;
    if (product.discountedPrice && product.price) {
      return Math.round(((product.price - product.discountedPrice) / product.price) * 100);
    }
    return 0;
  };

  const filteredAndSortedItems = wishlistItems
    .filter(item => {
      const product = item.product || item;
      const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           product.stoneType?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterBy === "all" || 
                           product.category?.name?.toLowerCase() === filterBy.toLowerCase() ||
                           product.stoneType?.toLowerCase() === filterBy.toLowerCase();
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      const productA = a.product || a;
      const productB = b.product || b;
      
      switch (sortBy) {
        case "price-low":
          return getCurrentPrice(a) - getCurrentPrice(b);
        case "price-high":
          return getCurrentPrice(b) - getCurrentPrice(a);
        case "rating":
          return (productB.averageRating || 0) - (productA.averageRating || 0);
        case "date":
          return new Date(b.dateAdded || b.createdAt) - new Date(a.dateAdded || a.createdAt);
        default:
          return productA.name?.localeCompare(productB.name) || 0;
      }
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-800 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading your wishlist...</p>
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
            onClick={fetchWishlistItems}
            className="mt-4 bg-red-800 text-white px-6 py-2 rounded-lg hover:bg-red-900 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-red-50">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Sacred Wishlist</h1>
                <p className="text-gray-600">Your spiritual treasures await</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="bg-red-800 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {wishlistItems.length} items
              </span>
              {/* Debug info - remove in production */}
              <span className="bg-gray-500 text-white px-2 py-1 rounded text-xs">
                Total: {allWishlistItems.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Debug Panel - Remove in production */}
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-gray-100 p-4 rounded-lg mb-4 text-sm">
            <p><strong>Current User ID:</strong> {getUserId()}</p>
            <p><strong>Total Wishlist Items:</strong> {allWishlistItems.length}</p>
            <p><strong>User's Wishlist Items:</strong> {wishlistItems.length}</p>
          </div>
        )}

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search wishlist..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-800 focus:border-transparent"
                />
              </div>
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-800 focus:border-transparent"
              >
                <option value="all">All Items</option>
                <option value="rings">Rings</option>
                <option value="pendants">Pendants</option>
                <option value="yantras">Yantras</option>
                <option value="malas">Malas</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-800 focus:border-transparent"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="date">Recently Added</option>
              </select>
              
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${viewMode === "grid" ? "bg-red-800 text-white" : "text-gray-600 hover:bg-gray-100"} transition-colors`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${viewMode === "list" ? "bg-red-800 text-white" : "text-gray-600 hover:bg-gray-100"} transition-colors`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Wishlist Items */}
        {filteredAndSortedItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-600 mb-6">Start adding spiritual treasures to your wishlist</p>
            <Link
              to="/products"
              className="bg-red-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-900 transition-colors inline-flex items-center"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className={viewMode === "grid" ? 
            "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : 
            "space-y-6"
          }>
            {filteredAndSortedItems.map((item) => {
              const itemId = item._id || item.id;
              const product = item.product || item;
              const discountPercentage = getDiscountPercentage(item);
              const currentPrice = getCurrentPrice(item);
              const originalPrice = getOriginalPrice(item);

              if (viewMode === "grid") {
                return (
                  <div key={itemId} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    <div className="relative">
                      <img
                        src={getProductImage(item)}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-3 right-3 flex flex-col space-y-2">
                        <button
                          onClick={() => handleRemoveFromWishlist(itemId)}
                          disabled={processingItems[itemId]}
                          className="p-2 bg-white rounded-full shadow-lg text-red-600 hover:bg-red-50 transition-all duration-300 disabled:opacity-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <Link
                          to={`/product/${product._id || product.id}`}
                          className="p-2 bg-white rounded-full shadow-lg text-gray-600 hover:bg-gray-50 transition-all duration-300"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                      </div>
                      {discountPercentage > 0 && (
                        <div className="absolute top-3 left-3 bg-red-800 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          {discountPercentage}% OFF
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.shortDescription}</p>
                      
                      <div className="flex items-center mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3 h-3 ${
                              star <= Math.floor(product.averageRating || 0)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="ml-1 text-xs text-gray-600">({product.reviewCount || 0})</span>
                      </div>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <span className="text-lg font-bold text-red-800">₹{currentPrice.toLocaleString()}</span>
                          {originalPrice && (
                            <span className="text-sm text-gray-500 line-through ml-1">₹{originalPrice.toLocaleString()}</span>
                          )}
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          (product.stock || 0) > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}>
                          {(product.stock || 0) > 0 ? "In Stock" : "Out of Stock"}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => handleQuantityChange(itemId, "decrement")}
                            className="p-1 hover:bg-red-50 transition-colors"
                            disabled={quantities[itemId] <= 1}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 py-1 text-sm font-medium">{quantities[itemId] || 1}</span>
                          <button
                            onClick={() => handleQuantityChange(itemId, "increment")}
                            className="p-1 hover:bg-red-50 transition-colors"
                            disabled={quantities[itemId] >= (product.stock || 99)}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => handleAddToCart(item)}
                        disabled={(product.stock || 0) === 0 || processingItems[`cart_${itemId}`]}
                        className="w-full bg-red-800 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        {processingItems[`cart_${itemId}`] ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Adding...
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Add to Cart
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div key={itemId} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center space-x-6">
                      <div className="relative flex-shrink-0">
                        <img
                          src={getProductImage(item)}
                          alt={product.name}
                          className="w-24 h-24 object-cover rounded-xl"
                        />
                        {discountPercentage > 0 && (
                          <div className="absolute -top-2 -right-2 bg-red-800 text-white px-2 py-1 rounded-full text-xs font-semibold">
                            {discountPercentage}% OFF
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                            <p className="text-gray-600 mb-2">{product.shortDescription}</p>
                            <div className="flex items-center space-x-4 mb-2">
                              <div className="flex items-center">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`w-4 h-4 ${
                                      star <= Math.floor(product.averageRating || 0)
                                        ? "text-yellow-400 fill-current"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                                <span className="ml-1 text-sm text-gray-600">({product.reviewCount || 0})</span>
                              </div>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                (product.stock || 0) > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                              }`}>
                                {(product.stock || 0) > 0 ? "In Stock" : "Out of Stock"}
                              </span>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="mb-2">
                              <span className="text-xl font-bold text-red-800">₹{currentPrice.toLocaleString()}</span>
                              {originalPrice && (
                                <span className="text-sm text-gray-500 line-through ml-2">₹{originalPrice.toLocaleString()}</span>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center border border-gray-300 rounded-lg">
                                <button
                                  onClick={() => handleQuantityChange(itemId, "decrement")}
                                  className="p-1 hover:bg-red-50 transition-colors"
                                  disabled={quantities[itemId] <= 1}
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="px-2 py-1 text-sm font-medium">{quantities[itemId] || 1}</span>
                                <button
                                  onClick={() => handleQuantityChange(itemId, "increment")}
                                  className="p-1 hover:bg-red-50 transition-colors"
                                  disabled={quantities[itemId] >= (product.stock || 99)}
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                              <button
                                onClick={() => handleAddToCart(item)}
                                disabled={(product.stock || 0) === 0 || processingItems[`cart_${itemId}`]}
                                className="bg-red-800 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                              >
                                {processingItems[`cart_${itemId}`] ? (
                                  <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Adding...
                                  </>
                                ) : (
                                  <>
                                    <ShoppingCart className="w-4 h-4 mr-2" />
                                    Add to Cart
                                  </>
                                )}
                              </button>
                              <button
                                onClick={() => handleRemoveFromWishlist(itemId)}
                                disabled={processingItems[itemId]}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                              <Link
                                to={`/product/${product._id || product.id}`}
                                className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                              >
                                <Eye className="w-4 h-4" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        )}

        {/* Expert Consultation CTA */}
        {wishlistItems.length > 0 && (
          <div className="mt-12 bg-gradient-to-r from-red-800 to-red-900 rounded-2xl p-8 text-white shadow-xl">
            <div className="text-center">
              <MessageCircle className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Need Guidance for Your Collection?</h3>
              <p className="text-red-100 mb-6">
                Our expert astrologers can help you choose the perfect items from your wishlist
              </p>
              <button
                onClick={() => (window.location.href = "/booking")}
                className="bg-white text-red-800 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-200 transition-all duration-300 transform hover:scale-105"
              >
                Book Consultation
              </button>
            </div>
          </div>
        )}
      </div>

      <ToastContainer
        position="top-center"
        autoClose={4000}
        limit={3}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="mystical-toast"
      />

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @keyframes mysticalGlow {
          0% { box-shadow: 0 0 20px rgba(156, 11, 19, 0.3); }
          50% { box-shadow: 0 0 40px rgba(156, 11, 19, 0.5), 0 0 60px rgba(254, 247, 215, 0.3); }
          100% { box-shadow: 0 0 20px rgba(156, 11, 19, 0.3); }
        }

        @keyframes slideInFromTop {
          0% {
            transform: translateY(-100px) scale(0.8);
            opacity: 0;
          }
          50% {
            transform: translateY(10px) scale(1.05);
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        :global(.mystical-toast) {
          background: linear-gradient(135deg, #FEF7D7 0%, #FFF8E1 50%, #FEF7D7 100%) !important;
          border: 2px solid #9C0B13 !important;
          border-radius: 20px !important;
          box-shadow: 0 15px 35px rgba(156, 11, 19, 0.2), 0 5px 15px rgba(0, 0, 0, 0.1) !important;
          backdrop-filter: blur(10px) !important;
          animation: slideInFromTop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) !important;
          position: relative !important;
          overflow: visible !important;
          min-height: 80px !important;
          width: 400px !important;
          margin: 10px auto !important;
        }

        :global(.mystical-toast::before) {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, #9C0B13, #FEF7D7, #9C0B13, #FEF7D7);
          background-size: 400% 400%;
          border-radius: 22px;
          z-index: -1;
          animation: shimmer 3s ease-in-out infinite;
        }

        :global(.mystical-success) {
          animation: slideInFromTop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55), mysticalGlow 2s ease-in-out infinite 1s !important;
        }

        :global(.mystical-remove) {
          animation: slideInFromTop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55), mysticalGlow 2s ease-in-out infinite 1s !important;
          border-color: #DC2626 !important;
        }

        :global(.mystical-remove::before) {
          background: linear-gradient(45deg, #DC2626, #FEF7D7, #DC2626, #FEF7D7);
          background-size: 400% 400%;
        }

        :global(.mystical-body) {
          padding: 0 !important;
          margin: 0 !important;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
        }

        :global(.Toastify__toast-container) {
          z-index: 9999 !important;
        }

        :global(.mystical-toast:hover) {
          transform: translateY(-5px) scale(1.02) !important;
          box-shadow: 0 20px 45px rgba(156, 11, 19, 0.3), 0 10px 20px rgba(0, 0, 0, 0.15) !important;
        }
      `}</style>
    </div>
  );
};

export default WishlistPage;