
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Star, Plus, Minus, Trash2, Heart, ShoppingCart, Truck, Shield, Lock, CreditCard, Package, Clock, ArrowLeft, ChevronRight, Sparkles } from 'lucide-react';

const CartPage = () => {
const [cartItems, setCartItems] = useState([]);
const [savedItems, setSavedItems] = useState([]);
const [selectedShipping, setSelectedShipping] = useState('standard');
const [isVisible, setIsVisible] = useState({});
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [submitting, setSubmitting] = useState(false);

const userId = useMemo(() => {
  if (typeof window === 'undefined') return null;

  const user = window.localStorage?.getItem("user");
  if (!user) return null;

  try {
    const parsedUser = JSON.parse(user);
    return parsedUser.userId || parsedUser.id || parsedUser._id || null;
  } catch (e) {
    console.error("Error parsing user from localStorage", e);
    return null;
  }
}, []);

// Calculate total items count (considering quantities)
const totalItemsCount = useMemo(() => {
  return cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
}, [cartItems]);

// Calculate unique products count
const uniqueProductsCount = useMemo(() => {
  return cartItems.length;
}, [cartItems]);

// Update cart count in navbar whenever totalItemsCount changes
useEffect(() => {
  // Dispatch custom event when cart count changes
  const cartCountEvent = new CustomEvent('cartCountUpdated', {
    detail: { count: totalItemsCount }
  });
  window.dispatchEvent(cartCountEvent);

  // Also store in localStorage for persistence
  localStorage.setItem('cartCount', totalItemsCount.toString());
}, [totalItemsCount]);

// Debug function to check localStorage
useEffect(() => {
  console.log("Current localStorage user:", window.localStorage?.getItem("user"));
  console.log("Extracted userId:", userId);

}, [userId]);

// Optimize intersection observer with useCallback
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      const updates = {};
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updates[entry.target.id] = true;
        }
      });
      if (Object.keys(updates).length > 0) {
        setIsVisible(prev => ({ ...prev, ...updates }));
      }
    },
    { threshold: 0.1 }
  );

  // Use setTimeout to defer observer setup after initial render
  const timeoutId = setTimeout(() => {
    document.querySelectorAll('[id]').forEach((el) => observer.observe(el));
  }, 100);

  return () => {
    clearTimeout(timeoutId);
    observer.disconnect();
  };
}, [cartItems.length]); // Only re-run when cart items change

const fetchCartData = useCallback(async () => {
  if (!userId) {
    setError('Please log in to view your cart');
    setLoading(false);
    return;
  }

  try {
    setLoading(true);
    setError(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(`https://astroanikantbackend-2.onrender.com/cart/getcart/${userId}`, {
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      if (response.status === 404) {
        setCartItems([]);
        return;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Cart API Response:", data);


    // Updated to match your backend response structure
    if (data && data.data && data.data.items && Array.isArray(data.data.items)) {
      const transformedItems = data.data.items.map(cartItem => {
        const product = cartItem.product || {};
        return {
          id: cartItem._id || `${data.data._id}_${product._id}`,
          cartId: data.data._id, // The main cart ID
          productId: product._id,
          name: product.name || product.title || 'Unknown Product',
          price: product.discountedPrice || product.price || 0,
          originalPrice: product.price || 0,
          quantity: cartItem.quantity || 1,
          image: product.images && product.images.length > 0 ? product.images[0].url || product.images[0] : null,
          category: product.category || "General",
          energized: product.energized !== false,
          description: product.description || product.shortDescription || '',
          status: data.data.status || 'active',
          sku: product.sku,
          stoneType: product.stoneType,
          weight: product.weight,
          dimensions: product.dimensions,
          certification: product.certification,
          astrologicalBenefits: product.astrologicalBenefits || []
        };
      });

      setCartItems(transformedItems);
    } else {
      setCartItems([]);
    }
  } catch (err) {
    if (err.name === 'AbortError') {
      setError('Request timed out. Please check your connection and try again.');
    } else {
      setError(err.message || 'Failed to load cart. Please try again.');
    }
    console.error('Error fetching cart:', err);
  } finally {
    setLoading(false);
  }
}, [userId]);

// Fetch cart data only when userId changes
useEffect(() => {
  fetchCartData();
}, [fetchCartData]);

// Fixed fetchCartData to match your API structure
// Replace the existing updateQuantity function with this:
const updateQuantity = useCallback(async (itemId, newQuantity) => {
  if (newQuantity < 1) {
    return;
  }

  try {
    const item = cartItems.find(item => item.id === itemId);
    if (!item) return;

    // Optimistically update UI
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );

    // Use the proper update endpoint
    const response = await fetch(`https://astroanikantbackend-2.onrender.com/cart/${item.cartId}/item/${item.productId}/quantity`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity: newQuantity })
    });

    if (!response.ok) {
      fetchCartData(); // Revert on failure
      const data = await response.json().catch(() => ({}));
      setError(data.message || 'Failed to update quantity');
    }

  } catch (err) {
    setError('Network error while updating quantity');
    fetchCartData(); // Revert on error
  }
}, [cartItems, fetchCartData]);
// Also update the fetchCartData function to handle the quantity field:

// Since your API doesn't handle quantity updates, we'll just update local state

// Fixed removeItem to use the correct API endpoint


const removeItem = useCallback(async (itemId) => {
  try {
    const item = cartItems.find(item => item.id === itemId);
    if (!item) return;

    // Optimistically remove from UI
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));

    // Use the correct delete endpoint - your backend uses cart ID, not item ID
    const response = await fetch(`https://astroanikantbackend-2.onrender.com/cart/deletecart/${item.cartId}`, {
      method: 'GET' // Your backend uses GET for delete
    });

    if (!response.ok) {
      // Revert on failure
      setCartItems(prevItems => [...prevItems, item]);
      const data = await response.json().catch(() => ({}));
      setError(data.message || 'Failed to remove item');
    } else {
      // Since deleting the cart removes all items, refresh the cart
      setTimeout(() => fetchCartData(), 500);
    }
  } catch (err) {
    setError('Network error while removing item');
    console.error('Error removing item:', err);
    // Revert on error
    fetchCartData();
  }
}, [cartItems, fetchCartData]);

const saveForLater = useCallback((id) => {
  const item = cartItems.find(item => item.id === id);
  if (item) {
    setSavedItems(prev => [...prev, item]);
    setCartItems(items => items.filter(item => item.id !== id));
  }
}, [cartItems]);

const moveToCart = useCallback((id) => {
  const item = savedItems.find(item => item.id === id);
  if (item) {
    setCartItems(prev => [...prev, item]);
    setSavedItems(prev => prev.filter(item => item.id !== id));
  }
}, [savedItems]);

// Fixed addToCart to match your API structure
const addToCart = useCallback(async (productId) => {
  try {
    const response = await fetch('https://astroanikantbackend-2.onrender.com/cart/createcart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: userId,
        product: productId,
        quantity: 1 // Backend expects quantity field
      })
    });

    const data = await response.json();

    if (response.ok) {
      fetchCartData();
    } else {
      setError(data.message || 'Failed to add item to cart');
    }
  } catch (err) {
    setError('Network error while adding to cart');
    console.error('Error adding to cart:', err);
  }
}, [userId, fetchCartData]);

const removeIndividualItem = useCallback(async (productId) => {
  try {
    const item = cartItems.find(item => item.productId === productId);
    if (!item) return;

    // Optimistically remove from UI
    setCartItems(prevItems => prevItems.filter(item => item.productId !== productId));

    // Use the new remove item endpoint instead of delete cart
    const response = await fetch(`https://astroanikantbackend-2.onrender.com/cart/removeitem/${item.cartId}/${productId}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      // Revert on failure
      fetchCartData();
      const data = await response.json().catch(() => ({}));
      setError(data.message || 'Failed to remove item');
    } else {
      // Refresh cart data
      setTimeout(() => fetchCartData(), 500);
    }
  } catch (err) {
    setError('Network error while removing item');
    console.error('Error removing individual item:', err);
    fetchCartData(); // Revert on error
  }
}, [cartItems, fetchCartData]);

const reduceQuantityByOne = useCallback(async (itemId) => {
  const item = cartItems.find(item => item.id === itemId);
  if (!item) return;
  
  if (item.quantity === 1) {
    removeIndividualItem(item.productId);
    return;
  }
  
  updateQuantity(itemId, item.quantity - 1);
}, [cartItems, updateQuantity, removeIndividualItem]);
// Memoize calculations
const calculations = useMemo(() => {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0; // Changed to 0
  const packaging = 0; // Changed to 0
  const Shipping = 0;
  const total = subtotal ; // Removed shipping and packaging

  return { subtotal, shipping, total, packaging };
}, [cartItems, selectedShipping]);

// Removed recommendedProducts since it's not part of your API

// Early return for no user ID
// Early return for no user ID
if (!userId && !loading) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEF7D7] to-white flex items-center justify-center">
      <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock className="w-8 h-8 text-blue-500" />
        </div>
        <h2 className="text-2xl font-bold text-[#9C0B13] mb-4">Please Log In</h2>
        <p className="text-gray-600 mb-6">You need to be logged in to view your cart</p>
        <div className="space-y-3">
          <button
            onClick={() => window.location.href = '/login'}
            className="w-full bg-[#9C0B13] text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
          >
            Go to Login
          </button>
          <button
            onClick={() => {
              // Try to reload and check localStorage again
              window.location.reload();
            }}
            className="w-full bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  );
}

// Loading state
if (loading) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEF7D7] to-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#9C0B13] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-[#9C0B13] text-xl font-semibold">Loading your sacred cart...</p>
        <p className="text-gray-500 text-sm mt-2">This should only take a moment</p>
      </div>
    </div>
  );
}

// Error state with retry button
if (error) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEF7D7] to-white flex items-center justify-center">
      <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-red-500 text-2xl">⚠️</span>
        </div>
        <h2 className="text-2xl font-bold text-[#9C0B13] mb-4">Oops! Something went wrong</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <div className="space-y-3">
          <button
            onClick={fetchCartData}
            className="w-full bg-[#9C0B13] text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.href = '/products'}
            className="w-full bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

return (
  <div className="min-h-screen bg-gradient-to-br from-[#FEF7D7] to-white">
    {/* Header */}
    <section className="py-12 bg-gradient-to-r from-[#9C0B13] to-red-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 flex items-center">
<div className="relative mr-2 sm:mr-4">
  <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 animate-pulse" />
  {totalItemsCount > 0 && (
    <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 bg-[#FEF7D7] text-[#9C0B13] rounded-full w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 flex items-center justify-center text-xs sm:text-sm font-bold border border-white sm:border-2">
      {totalItemsCount > 99 ? '99+' : totalItemsCount}
    </div>
  )}
</div>
<span className="break-words">Your Sacred Cart</span>
</h1>
<p className="text-sm sm:text-lg lg:text-xl opacity-90">
              {uniqueProductsCount > 0
                ? `${uniqueProductsCount} ${uniqueProductsCount === 1 ? 'product' : 'products'} with ${totalItemsCount} ${totalItemsCount === 1 ? 'item' : 'items'} total`
                : 'Your spiritual journey begins here'
              }
            </p>
          </div>
          <button
className="flex items-center space-x-1 sm:space-x-2 bg-[#FEF7D7] text-[#9C0B13] px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-xl font-semibold hover:bg-white transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
onClick={() => window.location.href = '/products'}
>
<ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
<span className="hidden sm:inline">Continue Shopping</span>
<span className="sm:hidden">Continue</span>
</button>          </div>
      </div>
    </section>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {/* Cart Items Section */}
        <div className="xl:col-span-2 space-y-4 sm:space-y-6">
          {/* Cart Items List */}
          {cartItems.length > 0 && (
            <div id="cart-items" className={`transition-all duration-1000 ${isVisible['cart-items'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h2 className="text-2xl font-bold text-[#9C0B13] mb-6 flex items-center">
                <Package className="w-6 h-6 mr-2" />
                Your Selected Item(s)
                <span className="ml-2 bg-[#9C0B13] text-white rounded-full px-3 py-1 text-sm">
                  {totalItemsCount}
                </span>
              </h2>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-[#9C0B13]/10">
                    <div className="p-3 sm:p-4 lg:p-6">
<div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6">
                        <div className="relative group">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0"> 
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'flex';
                                }}
                              />
                            ) : null}
                            <div className="w-full h-full bg-gradient-to-br from-[#FEF7D7] to-gray-100 flex items-center justify-center" style={{ display: item.image ? 'none' : 'flex' }}>
                              <Star className="w-8 h-8 text-[#9C0B13]" />
                            </div>
                          </div>
                          {item.energized && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#9C0B13] rounded-full flex items-center justify-center">
                              <Sparkles className="w-3 h-3 text-[#FEF7D7]" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
<h3 className="text-base sm:text-lg font-bold text-[#9C0B13] mb-1 break-words">{item.name}</h3>
{item.description && (
  <p className="text-xs sm:text-sm text-gray-500 mb-2 line-clamp-2 hidden sm:block">{item.description}</p>
)}
                          {item.energized && (
                            <span className="inline-block bg-[#FEF7D7] text-[#9C0B13] px-2 py-1 rounded-full text-xs font-semibold">
                              ✨ Spiritually Energized
                            </span>
                          )}

                          <div className="flex items-center space-x-2 mt-2 sm:mt-3 flex-wrap">
<span className="text-lg sm:text-xl font-bold text-[#9C0B13]">₹{item.price?.toLocaleString()}</span>
                            {item.originalPrice && item.originalPrice > item.price && (
                              <>
                                <span className="text-gray-500 line-through">₹{item.originalPrice?.toLocaleString()}</span>
                                <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-bold">
                                  {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start space-x-4 sm:space-x-0 sm:space-y-4 w-full sm:w-auto">
<div className="flex items-center space-x-2 sm:space-x-3 bg-[#FEF7D7] rounded-xl p-2">
  <button
    onClick={() => reduceQuantityByOne(item.id)}
    className="w-6 h-6 sm:w-8 sm:h-8 bg-[#9C0B13] text-white rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors"
  >
    <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
  </button>
  <span className="w-8 sm:w-12 text-center font-bold text-[#9C0B13] text-sm sm:text-base">{item.quantity}</span>
  <button
    onClick={() => updateQuantity(item.id, item.quantity + 1)}
    className="w-6 h-6 sm:w-8 sm:h-8 bg-[#9C0B13] text-white rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors"
  >
    <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
  </button>
</div>
                          <div className="flex space-x-2 sm:space-x-2">
                            <button
                              onClick={() => removeIndividualItem(item.productId)}
                              className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                              title="Remove Item"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>

                          <div className="text-right sm:text-left">
<p className="text-base sm:text-lg font-bold text-[#9C0B13]">
  ₹{(item.price * item.quantity)?.toLocaleString()}
</p>
</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Saved for Later */}
          {savedItems.length > 0 && (
            <div id="saved-items" className={`transition-all duration-1000 ${isVisible['saved-items'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h3 className="text-xl font-bold text-[#9C0B13] mb-4 flex items-center">
                <Heart className="w-5 h-5 mr-2" />
                Saved for Later
                <span className="ml-2 bg-[#9C0B13] text-white rounded-full px-2 py-1 text-sm">
                  {savedItems.length}
                </span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                {savedItems.map((item) => (
                  <div key={item.id} className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-lg"
                            loading="lazy"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div className="w-full h-full bg-gradient-to-br from-[#FEF7D7] to-gray-100 flex items-center justify-center rounded-lg" style={{ display: item.image ? 'none' : 'flex' }}>
                          <Star className="w-6 h-6 text-[#9C0B13]" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-[#9C0B13] line-clamp-1">{item.name}</h4>
                        <p className="text-[#9C0B13] font-bold">₹{item.price?.toLocaleString()}</p>
                      </div>
                      <button
                        onClick={() => moveToCart(item.id)}
                        className="bg-[#9C0B13] text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm"
                      >
                        Move to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Cart Summary Sidebar */}
        {cartItems.length > 0 && (
          <div className="xl:col-span-1">
<div id="cart-summary" className={`xl:sticky xl:top-24 transition-all duration-1000 ${isVisible['cart-summary'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 border border-[#9C0B13]/10">
                <h3 className="text-2xl font-bold text-[#9C0B13] mb-6 flex items-center">
                  <Package className="w-6 h-6 mr-2" />
                  Order Summary
                  <span className="ml-2 bg-[#9C0B13] text-white rounded-full px-2 py-1 text-sm">
                    {totalItemsCount}
                  </span>
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Subtotal ({totalItemsCount} items)</span>
                    <span className="font-semibold text-[#9C0B13]">₹{calculations.subtotal?.toLocaleString()}</span>
                  </div>

<div className="flex justify-between items-center">
  <span className="text-gray-700">Handling Fee</span>
  <div className="flex items-center space-x-2">
    <span className="text-gray-400 line-through text-sm">₹80</span>
    <span className="font-semibold text-green-600">₹0</span>
  </div>
</div>

<div className="flex justify-between items-center">
  <span className="text-gray-700">Packaging Fee</span>
  <div className="flex items-center space-x-2">
    <span className="text-gray-400 line-through text-sm">₹90</span>
    <span className="font-semibold text-green-600">₹0</span>
  </div>
</div>
<div className="flex justify-between items-center">
  <span className="text-gray-700">Shipping Fee</span>
  <div className="flex items-center space-x-2">
    <span className="text-gray-400 line-through text-sm">₹110</span>
    <span className="font-semibold text-green-600">₹0</span>
  </div>
</div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">Total</span>
                      <span className="text-2xl font-bold text-[#9C0B13]">₹{calculations.total?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>


                {/* Security Badges */}
                <div className="mb-6">
                  <h4 className="font-bold text-[#9C0B13] mb-4 flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Safe & Secure
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-2 gap-2 sm:gap-3">
                    <div className="bg-[#FEF7D7] p-3 rounded-lg text-center">
                      <Lock className="w-6 h-6 text-[#9C0B13] mx-auto mb-1" />
                      <div className="text-xs font-semibold text-[#9C0B13]">SSL Encrypted</div>
                    </div>
                    <div className="bg-[#FEF7D7] p-3 rounded-lg text-center">
                      <CreditCard className="w-6 h-6 text-[#9C0B13] mx-auto mb-1" />
                      <div className="text-xs font-semibold text-[#9C0B13]">Secure Payment</div>
                    </div>
                    <div className="bg-[#FEF7D7] p-3 rounded-lg text-center">
                      <Shield className="w-6 h-6 text-[#9C0B13] mx-auto mb-1" />
                      <div className="text-xs font-semibold text-[#9C0B13]">100% Authentic</div>
                    </div>
                    <div className="bg-[#FEF7D7] p-3 rounded-lg text-center">
                      <Truck className="w-6 h-6 text-[#9C0B13] mx-auto mb-1" />
                      <div className="text-xs font-semibold text-[#9C0B13]">Free Delivery</div>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
               <button
  onClick={() => {
    window.location.href = `/orders/${userId}`;
  }}
  className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-2 transform transition-all duration-300 shadow-lg hover:shadow-xl
  ${ submitting
    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
    : 'bg-gradient-to-r from-red-800 to-red-900 text-white hover:from-red-900 hover:to-red-800 hover:scale-105 cursor-pointer'
}`}
>
  <span>Proceed to Checkout</span>
  <ChevronRight className="w-5 h-5" />
</button>

              </div>

              {/* Shiprocket Integration Display */}
              <div className="bg-gradient-to-r from-[#9C0B13] to-red-600 text-white rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Truck className="w-6 h-6 mr-2 animate-pulse" />
                  Powered by Shiprocket
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-[#FEF7D7]" />
                    <span className="text-sm opacity-90">Real-time tracking available</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-[#FEF7D7]" />
                    <span className="text-sm opacity-90">Insured delivery guarantee</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Package className="w-5 h-5 text-[#FEF7D7]" />
                    <span className="text-sm opacity-90">Multiple courier partners</span>
                  </div>
                </div>

                {selectedShipping === 'standard' && (
                  <div className="mt-4 bg-[#FEF7D7]/20 p-3 rounded-lg">
                    <p className="text-sm">
                      Expected delivery: {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                    </p>
                  </div>
                )}

                {selectedShipping === 'express' && (
                  <div className="mt-4 bg-[#FEF7D7]/20 p-3 rounded-lg">
                    <p className="text-sm">
                      Expected delivery: {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                    </p>
                  </div>
                )}

                {selectedShipping === 'same-day' && (
                  <div className="mt-4 bg-[#FEF7D7]/20 p-3 rounded-lg">
                    <p className="text-sm">
                      Same day delivery: Order before 2 PM
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Empty Cart State */}
      {cartItems.length === 0 && !loading && (
        <div className="text-center py-20">
          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-[#FEF7D7] rounded-full mx-auto mb-6 sm:mb-8 flex items-center justify-center">
<ShoppingCart className="w-12 h-12 sm:w-16 sm:h-16 text-[#9C0B13] animate-bounce" />
</div>
<h2 className="text-2xl sm:text-3xl font-bold text-[#9C0B13] mb-4">Your Cart is Empty</h2>
<p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 px-4">Add some spiritual treasures to begin your sacred journey</p>
          <button
            onClick={() => window.location.href = '/products'}
            className="bg-gradient-to-r from-[#9C0B13] to-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-red-600 hover:to-[#9C0B13] transition-all duration-300 transform hover:scale-105"
          >
            Explore Products
          </button>
        </div>
      )}

      {/* Special Offers Banner */}
      {cartItems.length > 0 && (
        <div id="offers" className={`mt-12 transition-all duration-1000 ${isVisible.offers ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-r from-[#FEF7D7] to-white p-6 rounded-2xl shadow-lg border-2 border-[#9C0B13]/20">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3">
<div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#9C0B13] rounded-full flex items-center justify-center">
  <Star className="w-5 h-5 sm:w-6 sm:h-6 text-[#FEF7D7] animate-spin" />
</div>
<div>
  <div className="font-bold text-[#9C0B13] text-sm sm:text-base">Free Shipping</div>
</div>
</div>

              <div className="flex items-center justify-center space-x-3">
                <div className="w-12 h-12 bg-[#9C0B13] rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-[#FEF7D7] animate-pulse" />
                </div>
                <div>
                  <div className="font-bold text-[#9C0B13]">Temple Blessed Products</div>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-3">
                <div className="w-12 h-12 bg-[#9C0B13] rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-[#FEF7D7] animate-bounce" />
                </div>
                <div>
                  <div className="font-bold text-[#9C0B13]">Satisfaction guaranteed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
);
};

export default CartPage;