import React, { useEffect, useState } from "react";
import { Package, Calendar, Star, Eye, ShoppingBag, User, MapPin, Phone, Mail, Clock, CheckCircle, Truck, AlertCircle, Filter, Search } from 'lucide-react';

const Previous_Order_Page = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  // Get user ID from localStorage
  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setCurrentUser(user);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    } else if (token) {
      try {
        const tokenData = JSON.parse(token);
        setCurrentUser(tokenData);
      } catch (error) {
        console.error('Error parsing token:', error);
      }
    }
  }, []);

  // Fetch all orders
  const getAllOrders = async () => {
    try {
      setLoading(true);
      // Note: Replace with actual axios call when available
      // const response = await axios.get("http://localhost:1921/order/getallorder");
      // setAllOrders(response.data.data);
      
      // Mock data for demonstration
      const mockOrders = [
        {
          _id: '1',
          orderNumber: 'AST-2024-001',
          createdAt: '2024-01-15T10:30:00Z',
          status: 'delivered',
          totalAmount: 2501,
          cart: {
            user: {
              _id: 'user123',
              name: 'John Doe',
              email: 'john@example.com',
              phone: '+91 98765 43210'
            },
            items: [
              {
                _id: '1',
                name: 'Sacred Rudraksha Mala',
                price: 1501,
                quantity: 1,
                image: '/api/placeholder/100/100'
              },
              {
                _id: '2',
                name: 'Blessed Yantra',
                price: 1000,
                quantity: 1,
                image: '/api/placeholder/100/100'
              }
            ]
          },
          shippingAddress: {
            street: '123 Temple Street',
            city: 'Ahmedabad',
            state: 'Gujarat',
            pincode: '380001'
          }
        },
        {
          _id: '2',
          orderNumber: 'AST-2024-002',
          createdAt: '2024-01-20T14:15:00Z',
          status: 'shipped',
          totalAmount: 5001,
          cart: {
            user: {
              _id: 'user456',
              name: 'Jane Smith',
              email: 'jane@example.com',
              phone: '+91 87654 32109'
            },
            items: [
              {
                _id: '3',
                name: 'Crystal Healing Set',
                price: 3001,
                quantity: 1,
                image: '/api/placeholder/100/100'
              },
              {
                _id: '4',
                name: 'Gemstone Ring',
                price: 2000,
                quantity: 1,
                image: '/api/placeholder/100/100'
              }
            ]
          },
          shippingAddress: {
            street: '456 Sacred Avenue',
            city: 'Mumbai',
            state: 'Maharashtra',
            pincode: '400001'
          }
        }
      ];
      
      setAllOrders(mockOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter orders for current user
  useEffect(() => {
    if (currentUser && allOrders.length > 0) {
      const filteredOrders = allOrders.filter(order => {
        const orderUserId = order?.cart?.user?._id;
        const currentUserId = currentUser._id || currentUser.id;
        return orderUserId === currentUserId;
      });
      
      // Apply status filter
      const statusFilteredOrders = filterStatus === 'all' 
        ? filteredOrders 
        : filteredOrders.filter(order => order.status === filterStatus);
        
      setUserOrders(statusFilteredOrders);
    }
  }, [currentUser, allOrders, filterStatus]);

  useEffect(() => {
    getAllOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />;
      case 'shipped':
        return <Truck className="w-4 h-4" />;
      case 'processing':
        return <Clock className="w-4 h-4" />;
      case 'cancelled':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FEF7D7] to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-[#9C0B13] to-red-600 rounded-full mx-auto mb-4 flex items-center justify-center animate-spin">
            <Package className="w-8 h-8 text-[#FEF7D7]" />
          </div>
          <p className="text-[#9C0B13] font-semibold">Loading your sacred orders...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FEF7D7] to-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <User className="w-20 h-20 text-[#9C0B13] mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-[#9C0B13] mb-4">Please Login</h2>
          <p className="text-gray-700 mb-6">You need to be logged in to view your previous orders.</p>
          <button className="bg-gradient-to-r from-[#9C0B13] to-red-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-red-600 hover:to-[#9C0B13] transition-all duration-300">
            Login Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEF7D7] to-white">
      {/* Header Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#9C0B13]/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-[#9C0B13] to-red-600 rounded-full flex items-center justify-center animate-pulse">
                <ShoppingBag className="w-10 h-10 text-[#FEF7D7]" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-[#9C0B13] mb-6">
              Your Sacred Orders
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Track your spiritual journey through your previous purchases
            </p>
            <div className="mt-8 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-[#9C0B13] to-red-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* User Info */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#FEF7D7] to-[#FEF7D7]/50 p-6 rounded-2xl">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-[#9C0B13] rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-[#FEF7D7]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#9C0B13]">
                  Welcome, {currentUser.name || currentUser.email}
                </h3>
                <p className="text-gray-600">Total Orders: {userOrders.length}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-[#9C0B13]" />
              <span className="font-semibold text-[#9C0B13]">Filter by Status:</span>
            </div>
            <div className="flex space-x-2">
              {['all', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors duration-300 ${
                    filterStatus === status
                      ? 'bg-[#9C0B13] text-white'
                      : 'bg-white text-gray-700 hover:bg-[#FEF7D7]'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Orders List */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {userOrders.length === 0 ? (
            <div className="text-center py-16">
              <Package className="w-24 h-24 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-600 mb-4">No Orders Found</h3>
              <p className="text-gray-500 mb-8">
                {filterStatus === 'all' 
                  ? "You haven't placed any orders yet. Start your spiritual journey today!"
                  : `No ${filterStatus} orders found. Try a different filter.`
                }
              </p>
              <button className="bg-gradient-to-r from-[#9C0B13] to-red-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-red-600 hover:to-[#9C0B13] transition-all duration-300">
                Explore Products
              </button>
            </div>
          ) : (
            <div className="grid gap-8">
              {userOrders.map((order) => (
                <div key={order._id} className="bg-white rounded-2xl shadow-lg border border-[#9C0B13]/10 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  {/* Order Header */}
                  <div className="bg-gradient-to-r from-[#9C0B13] to-red-600 text-white p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <h3 className="text-xl font-bold mb-2">Order #{order.orderNumber}</h3>
                        <div className="flex items-center space-x-4 text-sm opacity-90">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(order.createdAt)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Package className="w-4 h-4" />
                            <span>{order.cart?.items?.length || 0} items</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          <span className="capitalize">{order.status}</span>
                        </div>
                        <div className="text-2xl font-bold mt-2">₹{order.totalAmount?.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-6">
                    <div className="grid gap-4">
                      {order.cart?.items?.map((item) => (
                        <div key={item._id} className="flex items-center space-x-4 p-4 bg-[#FEF7D7]/30 rounded-lg">
                          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                            <Package className="w-8 h-8 text-gray-400" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-[#9C0B13]">{item.name}</h4>
                            <p className="text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-[#9C0B13]">₹{item.price?.toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Shipping Address */}
                    {order.shippingAddress && (
                      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <MapPin className="w-4 h-4 text-[#9C0B13]" />
                          <span className="font-semibold text-[#9C0B13]">Shipping Address</span>
                        </div>
                        <p className="text-gray-700">
                          {order.shippingAddress.street}, {order.shippingAddress.city}, 
                          {order.shippingAddress.state} - {order.shippingAddress.pincode}
                        </p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="mt-6 flex space-x-4">
                      <button 
                        onClick={() => setSelectedOrder(order)}
                        className="flex items-center space-x-2 bg-[#9C0B13] text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Details</span>
                      </button>
                      <button className="flex items-center space-x-2 border border-[#9C0B13] text-[#9C0B13] px-4 py-2 rounded-lg hover:bg-[#FEF7D7] transition-colors duration-300">
                        <Package className="w-4 h-4" />
                        <span>Track Order</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-[#9C0B13] to-red-600 text-white p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold">Order Details</h3>
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="text-white hover:text-gray-200 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-[#9C0B13] mb-2">Order Information</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>Order Number: {selectedOrder.orderNumber}</div>
                    <div>Date: {formatDate(selectedOrder.createdAt)}</div>
                    <div>Status: {selectedOrder.status}</div>
                    <div>Total: ₹{selectedOrder.totalAmount?.toLocaleString()}</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-[#9C0B13] mb-2">Items Ordered</h4>
                  <div className="space-y-2">
                    {selectedOrder.cart?.items?.map((item) => (
                      <div key={item._id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span>{item.name} (x{item.quantity})</span>
                        <span className="font-semibold">₹{item.price?.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Previous_Order_Page;