import { useState, useEffect } from 'react';
import { CreditCard, Truck, MapPin, User, Phone, Mail, Package, Shield, Gift, AlertCircle, CheckCircle } from 'lucide-react';

const OrderCheckoutPage = () => {
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [cartData, setCartData] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    deliveryInstructions: '',
    orderNotes: '',
    deliveryPreference: 'standard'
  });

  // Get cart_id from URL params or use demo ID
  const getCartIdFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const pathSegments = window.location.pathname.split('/');
    // Try to get ID from path (like /checkout/cartId) or query params
    return pathSegments[pathSegments.length - 1] || urlParams.get('cart_id') || '64a1b2c3d4e5f6789012345';
  };

  const cartId = getCartIdFromUrl();

  // Fetch cart details on component mount
  useEffect(() => {
    fetchCartDetails(cartId);
  }, [cartId]);

  const fetchCartDetails = async (cartId) => {
    try {
      setLoading(true);
      setError('');
      
      // Fetch cart data from your actual API
      const response = await fetch(`https://astroanikantbackend-2.onrender.com/cart/getsinglecart/${cartId}`);
      const result = await response.json();
      
      if (response.ok && result.data) {
        setCartData(result.data);
        
        // Pre-fill form with user data if available
        if (result.data.user) {
          const user = result.data.user;
          setFormData(prev => ({
            ...prev,
            firstName: user.name ? user.name.split(' ')[0] : '',
            lastName: user.name ? user.name.split(' ').slice(1).join(' ') : '',
            email: user.email || '',
            phone: user.phone || '',
            address: user.address?.street || user.address?.societyName || '',
            city: user.address?.city || '',
            state: user.address?.state || '',
            pincode: user.address?.pincode || ''
          }));
        }
      } else {
        // If cart not found or error, show fallback message
        setError(result.message || 'Cart not found or has expired');
        setCartData(null);
      }
      
    } catch (err) {
      console.error('Error fetching cart:', err);
      setError('Network error. Please check your connection and try again.');
      setCartData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const required = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'pincode'];

    for (let field of required) {
      if (!formData[field].trim()) {
        setError(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    // Phone validation
    if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      setError('Please enter a valid phone number');
      return false;
    }

    // PIN code validation
    if (!/^\d{6}$/.test(formData.pincode)) {
      setError('Please enter a valid 6-digit PIN code');
      return false;
    }

    return true;
  };

  const handleSubmitOrder = async () => {
    if (!validateForm()) return;
    if (!cartData) {
      setError('Cart data not available');
      return;
    }

    try {
      setSubmitting(true);
      setError('');

      // Create order payload matching your backend structure
      const orderPayload = {
        cart: cartId, // This should match the cart ID
        typeOfPayment: paymentMethod
      };

      console.log('Submitting order:', orderPayload);

      const response = await fetch('https://astroanikantbackend-2.onrender.com/order/createorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderPayload)
      });

      const result = await response.json();
      console.log('Order response:', result);

      if (response.ok && result.data) {
        setSuccess('Order placed successfully! Redirecting to confirmation...');
        
        // Clear form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: '',
          city: '',
          state: '',
          pincode: '',
          deliveryInstructions: '',
          orderNotes: '',
          deliveryPreference: 'standard'
        });

        // Redirect after success
        setTimeout(() => {
          // You can navigate to order confirmation page
          window.location.href = `/order-confirmation/${result.data._id}`;
        }, 2000);
        
      } else {
        setError(result.message || 'Failed to place order. Please try again.');
      }
    } catch (err) {
      console.error('Order submission error:', err);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const calculateSubtotal = () => {
    if (!cartData) return 0;
    // Calculate based on product price and quantity
    const price = cartData.product?.price || 0;
    const quantity = cartData.quantity || 1;
    return price * quantity;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shipping = subtotal >= 2000 ? 0 : 150; // Free shipping above ₹2000
    return subtotal + shipping;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-800 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading your cart details...</p>
        </div>
      </div>
    );
  }

  if (!cartData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Cart Not Found</h2>
          <p className="text-gray-600 mb-4">The cart you're looking for doesn't exist or has expired.</p>
          <button 
            onClick={() => window.location.href = '/cart'} 
            className="bg-red-800 text-white px-6 py-3 rounded-lg hover:bg-red-900 transition-colors"
          >
            Go to Cart
          </button>
        </div>
      </div>
    );
  }

  const subtotal = calculateSubtotal();
  const shippingCost = subtotal >= 2000 ? 0 : 150;
  const total = calculateTotal();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-800 to-red-900 rounded-full mb-4 animate-pulse">
            <Package className="w-8 h-8 text-amber-100" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Complete Your Order</h1>
          <p className="text-lg text-gray-600">Sacred treasures await your spiritual journey</p>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="max-w-4xl mx-auto mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center">
            <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {success && (
          <div className="max-w-4xl mx-auto mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
            <p className="text-green-700">{success}</p>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Billing Information */}
            <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-[1.01] transition-all duration-300 border border-red-100">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-red-800 to-red-900 p-3 rounded-full mr-4 animate-bounce">
                  <User className="w-6 h-6 text-amber-100" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Billing Information</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-800 focus:ring-4 focus:ring-red-100 transition-all duration-300 group-hover:border-red-400"
                    placeholder="Enter first name"
                    required
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-800 focus:ring-4 focus:ring-red-100 transition-all duration-300 group-hover:border-red-400"
                    placeholder="Enter last name"
                    required
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-800 focus:ring-4 focus:ring-red-100 transition-all duration-300 group-hover:border-red-400"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-800 focus:ring-4 focus:ring-red-100 transition-all duration-300 group-hover:border-red-400"
                      placeholder="+91 9876543210"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-[1.01] transition-all duration-300 border border-red-100">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-red-800 to-red-900 p-3 rounded-full mr-4 animate-pulse">
                  <Truck className="w-6 h-6 text-amber-100" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Shipping Information</h2>
              </div>

              <div className="space-y-6">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Address *</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-800 focus:ring-4 focus:ring-red-100 transition-all duration-300 group-hover:border-red-400"
                      placeholder="Street address, apartment, suite, etc."
                      required
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-800 focus:ring-4 focus:ring-red-100 transition-all duration-300 group-hover:border-red-400"
                      placeholder="City"
                      required
                    />
                  </div>
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">State *</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-800 focus:ring-4 focus:ring-red-100 transition-all duration-300 group-hover:border-red-400"
                      placeholder="State"
                      required
                    />
                  </div>
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">PIN Code *</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-800 focus:ring-4 focus:ring-red-100 transition-all duration-300 group-hover:border-red-400"
                      placeholder="400001"
                      maxLength="6"
                      required
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Delivery Instructions</label>
                  <textarea
                    name="deliveryInstructions"
                    value={formData.deliveryInstructions}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-800 focus:ring-4 focus:ring-red-100 transition-all duration-300 group-hover:border-red-400"
                    rows="3"
                    placeholder="Any special delivery instructions..."
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-[1.01] transition-all duration-300 border border-red-100">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-red-800 to-red-900 p-3 rounded-full mr-4 animate-bounce">
                  <CreditCard className="w-6 h-6 text-amber-100" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Payment Options</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {[
                  { id: 'card', label: 'Credit/Debit Card', icon: '💳' },
                  { id: 'upi', label: 'UPI Payment', icon: '📱' },
                  { id: 'netbanking', label: 'Net Banking', icon: '🏦' }
                ].map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                      paymentMethod === method.id
                        ? 'border-red-800 bg-red-50 shadow-lg'
                        : 'border-gray-200 hover:border-red-400 hover:bg-red-50'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">{method.icon}</div>
                      <p className="font-semibold text-gray-700">{method.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Notes */}
            <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-[1.01] transition-all duration-300 border border-red-100">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-red-800 to-red-900 p-3 rounded-full mr-4 animate-pulse">
                  <Gift className="w-6 h-6 text-amber-100" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Order Notes</h2>
              </div>

              <div className="space-y-4">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Special Instructions</label>
                  <textarea
                    name="orderNotes"
                    value={formData.orderNotes}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-800 focus:ring-4 focus:ring-red-100 transition-all duration-300 group-hover:border-red-400"
                    rows="4"
                    placeholder="Any special requests or instructions for your spiritual items..."
                  ></textarea>
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Delivery Preferences</label>
                  <select 
                    name="deliveryPreference"
                    value={formData.deliveryPreference}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-800 focus:ring-4 focus:ring-red-100 transition-all duration-300 group-hover:border-red-400"
                  >
                    <option value="standard">Standard Delivery (3-5 days)</option>
                    <option value="express">Express Delivery (1-2 days)</option>
                    <option value="weekend">Weekend Delivery</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="bg-gradient-to-r from-red-50 to-amber-50 rounded-2xl p-6 border border-red-200">
              <div className="flex items-center mb-4">
                <Shield className="w-6 h-6 text-red-800 mr-3" />
                <h3 className="text-lg font-bold text-gray-800">Terms & Conditions</h3>
              </div>
              
              <div className="space-y-3">
                <label className="flex items-start cursor-pointer group">
                  <input type="checkbox" className="mt-1 mr-3 w-4 h-4 text-red-800 border-2 border-gray-300 rounded focus:ring-red-500" required />
                  <span className="text-sm text-gray-700">I agree to the <a href="#" className="text-red-800 hover:underline font-semibold">Terms & Conditions</a> and have read the return policy</span>
                </label>
                
                <label className="flex items-start cursor-pointer group">
                  <input type="checkbox" className="mt-1 mr-3 w-4 h-4 text-red-800 border-2 border-gray-300 rounded focus:ring-red-500" required />
                  <span className="text-sm text-gray-700">I accept the <a href="#" className="text-red-800 hover:underline font-semibold">Privacy Policy</a> and consent to data processing</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-8 border border-red-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Order Review</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300">
                  <img 
                    src={cartData.product?.image || 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=60&h=60&fit=crop'} 
                    alt={cartData.product?.name || 'Product'} 
                    className="w-16 h-16 rounded-lg object-cover shadow-md" 
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-sm">{cartData.product?.name}</p>
                    <p className="text-xs text-gray-600">Qty: {cartData.quantity || 1}</p>
                    {cartData.product?.weight && (
                      <p className="text-xs text-gray-500">
                        {typeof cartData.product.weight === 'object' 
                          ? `${cartData.product.weight.value}${cartData.product.weight.unit}` 
                          : `${cartData.product.weight}g`}
                      </p>
                    )}
                    {cartData.product?.category && (
                      <p className="text-xs text-gray-500">Category: {cartData.product.category}</p>
                    )}
                    <p className="text-xs text-gray-400">Status: {cartData.status}</p>
                  </div>
                  <div className="text-right">
                    {cartData.product?.originalPrice > cartData.product?.price && (
                      <p className="text-xs text-gray-400 line-through">₹{cartData.product.originalPrice}</p>
                    )}
                    <p className="font-bold text-red-800">₹{cartData.product?.price}</p>
                    {cartData.quantity > 1 && (
                      <p className="text-xs text-gray-600">₹{cartData.product?.price * cartData.quantity} total</p>
                    )}
                  </div>
                </div>
              </div>

              {subtotal >= 2000 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-green-700 font-semibold text-center">
                    🎉 Free Shipping Applied!
                  </p>
                </div>
              )}

              <div className="border-t pt-6 space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal:</span>
                  <span className="font-semibold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping:</span>
                  <span className="font-semibold">
                    {shippingCost === 0 ? 'Free' : `₹${shippingCost}`}
                  </span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-800 pt-3 border-t">
                  <span>Total:</span>
                  <span className="text-red-800">₹{total}</span>
                </div>
              </div>

              <button 
                onClick={handleSubmitOrder}
                disabled={submitting}
                className={`w-full mt-8 py-4 rounded-xl font-bold text-lg transform transition-all duration-300 shadow-lg hover:shadow-xl ${
                  submitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-red-800 to-red-900 text-white hover:from-red-900 hover:to-red-800 hover:scale-105'
                }`}
              >
                {submitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Processing Order...
                  </div>
                ) : (
                  `Place Order ₹${total} ✨`
                )}
              </button>

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">Secure checkout powered by SSL encryption</p>
                <p className="text-xs text-gray-500 mt-1">Cart ID: {cartId}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCheckoutPage;