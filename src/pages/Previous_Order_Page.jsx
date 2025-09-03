import React, { useEffect, useState } from "react";
import {
  Package,
  Calendar,
  Star,
  Eye,
  ShoppingBag,
  User,
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  Truck,
  AlertCircle,
  Filter,
  Search,
} from "lucide-react";
import axios from "axios";

const Previous_Order_Page = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");

  // Get user ID from localStorage
  // Get user ID from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user");
    const token = localStorage.getItem("authToken");
    // console.log(userData);
    

    if (userData) {
      try {
        const user = JSON.parse(userData);
        setCurrentUser(user);
        
      } catch (error) {
        console.error("Error parsing user data:", error);
        setCurrentUser(null);
      }
    } else if (token) {
      try {
        const tokenData = JSON.parse(token);
        setCurrentUser(tokenData);
      } catch (error) {
        console.error("Error parsing token:", error);
        setCurrentUser(null);
      }
    } else {
      setCurrentUser(null);
    }
    setLoading(false); // Add this line
  }, []);

  // Fetch all orders
  // Remove the getAllOrders function and replace with:
  const getUserOrders = async () => {
    if (!currentUser) return;

    try {
      setLoading(true);
      console.log('Current ...',currentUser);
      
      const userId = currentUser.userId || currentUser._id || currentUser.id;
      console.log("Current user:", currentUser);
      console.log("Using user ID:", userId);

      // Use the correct backend URL
      const response = await fetch(
        `https://astroanikantbackend-2.onrender.com/order/user/${userId}`
      );
      const data = await response.json();
      console.log("API Response:", data);

      if (response.ok) {
        console.log("Orders received:", data.data);
        setAllOrders(data.data);
        setUserOrders(data.data); // Add this line to populate userOrders
      } else {
        console.error("Failed to fetch orders:", data.message);
        setAllOrders([]);
        setUserOrders([]);
      }
    } catch (error) {
      console.error("Error fetching user orders:", error);
      setAllOrders([]);
      setUserOrders([]);
    } finally {
      setLoading(false);
    }
  };
  // Update the useEffect that calls the function:
  useEffect(() => {
  if (currentUser) {
    getUserOrders();
  }
}, [currentUser]);

// Keep the existing filter useEffect:
useEffect(() => {
  if (filterStatus === "all") {
    setUserOrders(allOrders);
  } else {
    const filtered = allOrders.filter(
      (order) => order.cart?.status === filterStatus
    );
    setUserOrders(filtered);
  }
}, [filterStatus, allOrders]);
  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-4 h-4" />;
      case "shipped":
        return <Truck className="w-4 h-4" />;
      case "processing":
        return <Clock className="w-4 h-4" />;
      case "cancelled":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FEF7D7] to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-[#9C0B13] to-red-600 rounded-full mx-auto mb-4 flex items-center justify-center animate-spin">
            <Package className="w-8 h-8 text-[#FEF7D7]" />
          </div>
          <p className="text-[#9C0B13] font-semibold">
            Loading your sacred orders...
          </p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FEF7D7] to-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <User className="w-20 h-20 text-[#9C0B13] mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-[#9C0B13] mb-4">
            Please Login
          </h2>
          <p className="text-gray-700 mb-6">
            You need to be logged in to view your previous orders.
          </p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="bg-gradient-to-r from-[#9C0B13] to-red-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-red-600 hover:to-[#9C0B13] transition-all duration-300"
          >
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
                <p className="text-gray-600">
                  Total Orders: {userOrders.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      {/* Filter Section */}
<section className="py-6">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="bg-white rounded-2xl p-4 shadow-md">
      <div className="flex items-center space-x-2 mb-4 sm:mb-0">
        <Filter className="w-5 h-5 text-[#9C0B13]" />
        <span className="font-semibold text-[#9C0B13]">Filter by Status:</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex gap-2 mt-4 sm:mt-0">
        {["all", "processing", "shipped", "delivered", "cancelled"].map(
          (status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-2 rounded-lg text-sm font-medium capitalize transition-colors duration-300 ${
                filterStatus === status
                  ? "bg-[#9C0B13] text-white"
                  : "bg-white text-gray-700 hover:bg-[#FEF7D7] border border-gray-200"
              }`}
            >
              {status}
            </button>
          )
        )}
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
              <h3 className="text-2xl font-bold text-gray-600 mb-4">
                No Orders Found
              </h3>
              <p className="text-gray-500 mb-8">
                {filterStatus === "all"
                  ? "You haven't placed any orders yet. Start your spiritual journey today!"
                  : `No ${filterStatus} orders found. Try a different filter.`}
              </p>
              <button
                className="bg-gradient-to-r from-[#9C0B13] to-red-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-red-600 hover:to-[#9C0B13] transition-all duration-300"
                onClick={() => (window.location.href = "/products")}
              >
                Explore Products
              </button>
            </div>
          ) : (
            <div className="grid gap-8">
              {userOrders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white rounded-2xl shadow-lg border border-[#9C0B13]/10 overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Order Header */}
                  <div className="bg-gradient-to-r from-[#9C0B13] to-red-600 text-white p-4 sm:p-6">
  <div className="flex flex-col gap-4">
    <div className="flex justify-between items-start">
      <h3 className="text-lg sm:text-xl font-bold">
        Order #{order._id.slice(-8)}
      </h3>
      <div
        className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(
          order.cart?.status || "processing"
        )}`}
      >
        {getStatusIcon(order.cart?.status || "processing")}
        <span className="capitalize">
          {order.cart?.status || "processing"}
        </span>
      </div>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs sm:text-sm opacity-90">
      <div className="flex items-center space-x-1">
        {/* <Calendar className="w-4 h-4 flex-shrink-0" /> */}
        {/* <span className="truncate">{formatDate(order.createdAt)}</span> */}
      </div>
      <div className="flex items-center space-x-1">
        <Package className="w-4 h-4 flex-shrink-0" />
        <span>{order.cart?.items?.length || 0} items</span>
      </div>
      <div className="flex items-center space-x-1">
        <span className="truncate">Payment: {order.typeOfPayment || "N/A"}</span>
      </div>
    </div>
    
    <div className="text-right">
      <div className="text-xl sm:text-2xl font-bold">
        ₹{order.cart?.items?.reduce(
          (total, item) =>
            total +
            (item.product?.discountedPrice ||
              item.product?.price ||
              0) *
              item.quantity,
          0
        )?.toLocaleString() || "0"}
      </div>
    </div>
  </div>
</div>

                  {/* Order Items */}
                  <div className="p-6">
                    <div className="grid gap-4">
                      {order.cart?.items?.map((item, index) => (
                        <div
                          key={item._id || index}
                          className="flex items-center space-x-4 p-4 bg-[#FEF7D7]/30 rounded-lg"
                        >
                          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                            {item.product?.images?.[0]?.url ||
                            item.product?.images?.[0] ? (
                              <img
                                src={
                                  item.product.images[0]?.url ||
                                  item.product.images[0]
                                }
                                alt={item.product.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.style.display = "none";
                                  e.target.nextSibling.style.display = "flex";
                                }}
                              />
                            ) : null}
                            <div
                              className="w-full h-full bg-gray-100 flex items-center justify-center"
                              style={{
                                display: item.product?.images?.[0]
                                  ? "none"
                                  : "flex",
                              }}
                            >
                              <Package className="w-8 h-8 text-gray-400" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-[#9C0B13]">
                              {item.product?.name || "Product Name"}
                            </h4>
                            <p className="text-gray-600">
                              Quantity: {item.quantity}
                            </p>
                            {item.product?.shortDescription && (
                              <p className="text-gray-500 text-sm">
                                {item.product.shortDescription}
                              </p>
                            )}
                            {item.product?.category && (
                              <p className="text-gray-500 text-sm">
                                Category: {item.product.category}
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-[#9C0B13]">
                              ₹
                              {(
                                item.product?.discountedPrice ||
                                item.product?.price ||
                                0
                              )?.toLocaleString()}
                            </p>
                            {item.product?.price &&
                              item.product?.discountedPrice &&
                              item.product.discountedPrice <
                                item.product.price && (
                                <p className="text-gray-500 line-through text-sm">
                                  ₹{item.product.price.toLocaleString()}
                                </p>
                              )}
                            {item.quantity > 1 && (
                              <p className="text-sm text-gray-600 mt-1">
                                Total: ₹
                                {(
                                  (item.product?.discountedPrice ||
                                    item.product?.price ||
                                    0) * item.quantity
                                ).toLocaleString()}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Shipping Address from user data */}
                    {order.cart?.user?.address && (
                      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <MapPin className="w-4 h-4 text-[#9C0B13]" />
                          <span className="font-semibold text-[#9C0B13]">
                            Delivery Address
                          </span>
                        </div>
                        <p className="text-gray-700">
                          <strong>{order.cart.user.name}</strong>
                          <br />
                          {/* {order.cart.user.address.street &&
                            `${order.cart.user.address.street}, `}
                          {order.cart.user.address.societyName &&
                            `${order.cart.user.address.societyName}, `}
                          {order.cart.user.address.city},{" "}
                          {order.cart.user.address.state} -{" "}
                          {order.cart.user.address.pincode} */}
                        </p>
                        {order.cart.user.phone && (
                          <p className="text-gray-600 mt-1 flex items-center">
                            <Phone className="w-4 h-4 mr-1" />
                            {order.cart.user.phone}
                          </p>
                        )}
                        {order.cart.user.email && (
                          <p className="text-gray-600 flex items-center">
                            <Mail className="w-4 h-4 mr-1" />
                            {order.cart.user.email}
                          </p>
                        )}
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
    <div>Order ID: {selectedOrder._id.slice(-8)}</div>
    {/* <div>Date: {formatDate(selectedOrder.createdAt)}</div> */}
    <div>Status: {selectedOrder.cart?.status || 'Processing'}</div>
    <div>Payment: {selectedOrder.typeOfPayment || 'N/A'}</div>
    <div className="col-span-2">
      Total: ₹{selectedOrder.cart?.items?.reduce((total, item) => total + ((item.product?.discountedPrice || item.product?.price || 0) * item.quantity), 0)?.toLocaleString() || '0'}
    </div>
  </div>
</div>

<div>
  <h4 className="font-semibold text-[#9C0B13] mb-2">Items Ordered</h4>
  <div className="space-y-2">
    {selectedOrder.cart?.items?.map((item, index) => (
      <div key={item._id || index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
        <div className="flex-1">
          <span className="font-medium">{item.product?.name || 'Product Name'}</span>
          <span className="text-gray-600"> (x{item.quantity})</span>
          {item.product?.shortDescription && (
            <p className="text-gray-500 text-sm">{item.product.shortDescription}</p>
          )}
        </div>
        <span className="font-semibold">
          ₹{((item.product?.discountedPrice || item.product?.price || 0) * item.quantity)?.toLocaleString()}
        </span>
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
