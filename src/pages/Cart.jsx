import React, { useState, useEffect } from 'react';
import { Star, Plus, Minus, Trash2, Heart, ShoppingCart, Truck, Shield, Lock, CreditCard, Package, Clock, ArrowLeft, ChevronRight, Sparkles } from 'lucide-react';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Natural Ruby Gemstone Ring",
      price: 2500,
      originalPrice: 3000,
      quantity: 1,
      image: "/api/placeholder/150/150",
      category: "Gemstones",
      energized: true
    },
    {
      id: 2,
      name: "Sri Yantra - Brass (6 inch)",
      price: 1200,
      originalPrice: 1200,
      quantity: 2,
      image: "/api/placeholder/150/150",
      category: "Yantras",
      energized: true
    },
    {
      id: 3,
      name: "Rudraksha Mala (108 Beads)",
      price: 800,
      originalPrice: 1000,
      quantity: 1,
      image: "/api/placeholder/150/150",
      category: "Malas",
      energized: true
    }
  ]);

  const [savedItems, setSavedItems] = useState([]);
  const [selectedShipping, setSelectedShipping] = useState('standard');
  const [isVisible, setIsVisible] = useState({});

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

    document.querySelectorAll('[id]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const saveForLater = (id) => {
    const item = cartItems.find(item => item.id === id);
    setSavedItems(prev => [...prev, item]);
    removeItem(id);
  };

  const moveToCart = (id) => {
    const item = savedItems.find(item => item.id === id);
    setCartItems(prev => [...prev, item]);
    setSavedItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = selectedShipping === 'express' ? 200 : selectedShipping === 'same-day' ? 500 : 100;
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + gst;

  const recommendedProducts = [
    { id: 101, name: "Crystal Pyramid", price: 600, image: "/api/placeholder/100/100" },
    { id: 102, name: "Ganesha Pendant", price: 400, image: "/api/placeholder/100/100" },
    { id: 103, name: "Tulsi Mala", price: 300, image: "/api/placeholder/100/100" },
    { id: 104, name: "Shiva Locket", price: 500, image: "/api/placeholder/100/100" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEF7D7] to-white">
      {/* Header */}
      <section className="py-12 bg-gradient-to-r from-[#9C0B13] to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center">
                <ShoppingCart className="w-10 h-10 mr-4 animate-pulse" />
                Your Sacred Cart
              </h1>
              <p className="text-xl opacity-90">
                {cartItems.length} spiritual treasures awaiting your blessing
              </p>
            </div>
            <button className="flex items-center space-x-2 bg-[#FEF7D7] text-[#9C0B13] px-6 py-3 rounded-xl font-semibold hover:bg-white transition-all duration-300 transform hover:scale-105"
              onClick={() => window.location.href = '/products'}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Continue Shopping</span>
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cart Items List */}
            <div id="cart-items" className={`transition-all duration-1000 ${isVisible['cart-items'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h2 className="text-2xl font-bold text-[#9C0B13] mb-6 flex items-center">
                <Package className="w-6 h-6 mr-2" />
                Your Selected Items
              </h2>
              
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <div key={item.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-[#9C0B13]/10">
                    <div className="p-6">
                      <div className="flex items-center space-x-6">
                        <div className="relative group">
                          <div className="w-24 h-24 bg-gray-200 rounded-xl overflow-hidden">
                            <div className="w-full h-full bg-gradient-to-br from-[#FEF7D7] to-gray-100 flex items-center justify-center">
                              <Star className="w-8 h-8 text-[#9C0B13]" />
                            </div>
                          </div>
                          {item.energized && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#9C0B13] rounded-full flex items-center justify-center">
                              <Sparkles className="w-3 h-3 text-[#FEF7D7]" />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-[#9C0B13] mb-1">{item.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">Category: {item.category}</p>
                          {item.energized && (
                            <span className="inline-block bg-[#FEF7D7] text-[#9C0B13] px-2 py-1 rounded-full text-xs font-semibold">
                              ✨ Spiritually Energized
                            </span>
                          )}
                          
                          <div className="flex items-center space-x-2 mt-3">
                            <span className="text-xl font-bold text-[#9C0B13]">₹{item.price}</span>
                            {item.originalPrice > item.price && (
                              <span className="text-gray-500 line-through">₹{item.originalPrice}</span>
                            )}
                            {item.originalPrice > item.price && (
                              <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-bold">
                                {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end space-y-4">
                          <div className="flex items-center space-x-3 bg-[#FEF7D7] rounded-xl p-2">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 bg-[#9C0B13] text-white rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-12 text-center font-bold text-[#9C0B13]">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 bg-[#9C0B13] text-white rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => saveForLater(item.id)}
                              className="p-2 text-gray-500 hover:text-[#9C0B13] transition-colors"
                              title="Save for Later"
                            >
                              <Heart className="w-5 h-5" />
                            </button>
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                              title="Remove Item"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-lg font-bold text-[#9C0B13]">
                              ₹{item.price * item.quantity}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Saved for Later */}
            {savedItems.length > 0 && (
              <div id="saved-items" className={`transition-all duration-1000 ${isVisible['saved-items'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h3 className="text-xl font-bold text-[#9C0B13] mb-4 flex items-center">
                  <Heart className="w-5 h-5 mr-2" />
                  Saved for Later ({savedItems.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {savedItems.map((item) => (
                    <div key={item.id} className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                          <Star className="w-6 h-6 text-[#9C0B13]" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-[#9C0B13]">{item.name}</h4>
                          <p className="text-[#9C0B13] font-bold">₹{item.price}</p>
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

            {/* Recommended Products */}
            <div id="recommended" className={`transition-all duration-1000 ${isVisible.recommended ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h3 className="text-xl font-bold text-[#9C0B13] mb-6 flex items-center">
                <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
                Recommended for You
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {recommendedProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 group">
                    <div className="p-4 text-center">
                      <div className="w-20 h-20 bg-gray-200 rounded-lg mx-auto mb-3 flex items-center justify-center group-hover:bg-[#FEF7D7] transition-colors">
                        <Star className="w-8 h-8 text-[#9C0B13]" />
                      </div>
                      <h4 className="font-semibold text-[#9C0B13] text-sm mb-2">{product.name}</h4>
                      <p className="text-[#9C0B13] font-bold mb-3">₹{product.price}</p>
                      <button className="w-full bg-[#9C0B13] text-white py-2 rounded-lg text-sm hover:bg-red-600 transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cart Summary Sidebar */}
          <div className="lg:col-span-1">
            <div id="cart-summary" className={`sticky top-24 transition-all duration-1000 ${isVisible['cart-summary'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {/* Cart Summary */}
              <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 border border-[#9C0B13]/10">
                <h3 className="text-2xl font-bold text-[#9C0B13] mb-6 flex items-center">
                  <Package className="w-6 h-6 mr-2" />
                  Order Summary
                </h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Subtotal ({cartItems.length} items)</span>
                    <span className="font-semibold text-[#9C0B13]">₹{subtotal}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Shipping</span>
                    <span className="font-semibold text-[#9C0B13]">₹{shipping}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">GST (18%)</span>
                    <span className="font-semibold text-[#9C0B13]">₹{gst}</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">Total</span>
                      <span className="text-2xl font-bold text-[#9C0B13]">₹{total}</span>
                    </div>
                  </div>
                </div>

                {/* Shipping Options */}
                <div className="mb-6">
                  <h4 className="font-bold text-[#9C0B13] mb-4 flex items-center">
                    <Truck className="w-5 h-5 mr-2" />
                    Delivery Options
                  </h4>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input 
                        type="radio" 
                        name="shipping" 
                        value="standard" 
                        checked={selectedShipping === 'standard'}
                        onChange={(e) => setSelectedShipping(e.target.value)}
                        className="text-[#9C0B13]" 
                      />
                      <div className="flex-1">
                        <div className="font-semibold">Standard Delivery</div>
                        <div className="text-sm text-gray-600">5-7 business days • ₹100</div>
                      </div>
                    </label>
                    
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input 
                        type="radio" 
                        name="shipping" 
                        value="express" 
                        checked={selectedShipping === 'express'}
                        onChange={(e) => setSelectedShipping(e.target.value)}
                        className="text-[#9C0B13]" 
                      />
                      <div className="flex-1">
                        <div className="font-semibold">Express Delivery</div>
                        <div className="text-sm text-gray-600">2-3 business days • ₹200</div>
                      </div>
                    </label>
                    
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input 
                        type="radio" 
                        name="shipping" 
                        value="same-day" 
                        checked={selectedShipping === 'same-day'}
                        onChange={(e) => setSelectedShipping(e.target.value)}
                        className="text-[#9C0B13]" 
                      />
                      <div className="flex-1">
                        <div className="font-semibold">Same Day Delivery</div>
                        <div className="text-sm text-gray-600">Within Ahmedabad • ₹500</div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Security Badges */}
                <div className="mb-6">
                  <h4 className="font-bold text-[#9C0B13] mb-4 flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Safe & Secure
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
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
                      <div className="text-xs font-semibold text-[#9C0B13]">Shiprocket</div>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <button className="w-full bg-gradient-to-r from-[#9C0B13] to-red-600 text-white py-4 rounded-xl font-bold text-lg hover:from-red-600 hover:to-[#9C0B13] transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                  <span>Proceed to Checkout</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
                
                <p className="text-center text-sm text-gray-600 mt-4">
                  Free shipping on orders above ₹2,000
                </p>
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
                      📅 Expected delivery: {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                    </p>
                  </div>
                )}
                
                {selectedShipping === 'express' && (
                  <div className="mt-4 bg-[#FEF7D7]/20 p-3 rounded-lg">
                    <p className="text-sm">
                      ⚡ Expected delivery: {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                    </p>
                  </div>
                )}
                
                {selectedShipping === 'same-day' && (
                  <div className="mt-4 bg-[#FEF7D7]/20 p-3 rounded-lg">
                    <p className="text-sm">
                      🚀 Same day delivery: Order before 2 PM
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Empty Cart State */}
        {cartItems.length === 0 && (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-[#FEF7D7] rounded-full mx-auto mb-8 flex items-center justify-center">
              <ShoppingCart className="w-16 h-16 text-[#9C0B13] animate-bounce" />
            </div>
            <h2 className="text-3xl font-bold text-[#9C0B13] mb-4">Your Cart is Empty</h2>
            <p className="text-xl text-gray-600 mb-8">Add some spiritual treasures to begin your sacred journey</p>
            <button className="bg-gradient-to-r from-[#9C0B13] to-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-red-600 hover:to-[#9C0B13] transition-all duration-300 transform hover:scale-105">
              Explore Products
            </button>
          </div>
        )}

        {/* Special Offers Banner */}
        <div id="offers" className={`mt-12 transition-all duration-1000 ${isVisible.offers ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-r from-[#FEF7D7] to-white p-6 rounded-2xl shadow-lg border-2 border-[#9C0B13]/20">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="flex items-center justify-center space-x-3">
                <div className="w-12 h-12 bg-[#9C0B13] rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-[#FEF7D7] animate-spin" />
                </div>
                <div>
                  <div className="font-bold text-[#9C0B13]">Free Shipping</div>
                  <div className="text-sm text-gray-600">Orders above ₹2,000</div>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-3">
                <div className="w-12 h-12 bg-[#9C0B13] rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-[#FEF7D7] animate-pulse" />
                </div>
                <div>
                  <div className="font-bold text-[#9C0B13]">Free Energizing</div>
                  <div className="text-sm text-gray-600">All products blessed</div>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-3">
                <div className="w-12 h-12 bg-[#9C0B13] rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-[#FEF7D7] animate-bounce" />
                </div>
                <div>
                  <div className="font-bold text-[#9C0B13]">30-Day Return</div>
                  <div className="text-sm text-gray-600">Satisfaction guaranteed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CartPage;