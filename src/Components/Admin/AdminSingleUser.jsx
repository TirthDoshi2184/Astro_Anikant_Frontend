import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

// Icons
import {
  User,
  Mail,
  Phone,
  ShoppingBag,
  Trash2,
  Edit,
  ArrowLeft,
  Search,
  UserPlus,
  Users,
  Settings,
  LogOut,
  BarChart3,
  Eye,
  Home,
  Star,
  Moon,
  Sun,
  CheckCheckIcon,
  MapPinIcon,
  MapPin,
  GalleryVerticalEnd,
  VenusAndMars
} from 'lucide-react';
import axios from 'axios';

export const AdminSingleUser = () => {
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  console.log("userId value:", id, typeof id);
  console.log(id, "dsknk");

  const getSingleUser = async () => {
    const response = await axios.get(`http://localhost:1921/user/getsingleuser/${id}`)
    setUser(response.data.data)
    console.log(response.data.data);
    console.log("user", user);
  }

  useEffect(() => {
    getSingleUser()
  }, [])

  console.log(user?.isActive);

  // Get current location to determine active menu item
  const location = useLocation();

  // Determine active menu item based on current path
  const getActiveMenuItem = () => {
    const path = location.pathname;
    if (path.includes('/adminusers')) return 'users';
    if (path.includes('/adminproducts')) return 'astrology';
    if (path.includes('/admininquiry')) return 'predictions';
    if (path.includes('/adminvisits')) return 'reports';
    if (path.includes('/adminsettings')) return 'settings';
    if (path.includes('/admindashboard')) return 'dashboard';
    return 'users'; // default for this component
  };

  const [activeMenuItem, setActiveMenuItem] = useState(getActiveMenuItem());

  // Mock data - replace with actual API calls in real implementation
  useEffect(() => {
    // Simulate loading
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // Update active menu item when location changes
  useEffect(() => {
    setActiveMenuItem(getActiveMenuItem());
  }, [location.pathname]);

  const deleteUser = async () => {
    // Mock delete function - replace with actual API call

    const response = await axios.delete(`http://localhost:1921/user/deleteuser/${id}`)
    navigate("/adminusers")
    alert('User deleted successfully');

    // In real implementation: navigate('/adminusers');
  };

  const userOrders = orders.filter(order => order?.user_id?._id === user?._id);
  const navigate = useNavigate()
  const handleDeleteClick = () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser();
    }
  };

  const handleLogout = () => {
    // Add your logout logic here
    localStorage.removeItem('adminToken');
    window.location.href = '/';
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, link: '/admindashboard' },
    { id: 'users', label: 'Users', icon: Users, link: '/adminusers' },
    { id: 'astrology', label: 'Products', icon: Star, link: '/adminproducts' },
    { id: 'predictions', label: 'Inquiry', icon: Moon, link: '/admin/inquiry' },
    { id: 'reports', label: 'Visits Booked', icon: Sun, link: '/admin/visits' },
    { id: 'settings', label: 'Settings', icon: Settings, link: '/admin/settings' },
    { id: 'logout', label: 'Logout', icon: LogOut, link: '/' }
  ];

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100">
      {/* Sidebar - Fixed */}
      <div className="w-64 bg-gradient-to-b from-red-900 via-red-800 to-red-900 shadow-2xl fixed h-full z-10">
        {/* Logo Section */}
        <div className="p-6 border-b border-red-700/50">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                <Home className="w-5 h-5 text-red-900" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-amber-300 to-yellow-400 rounded-full opacity-30 blur-sm"></div>
            </div>
            <div>
              <h2 className="text-lg font-bold text-amber-50">Astro Anekant</h2>
              <p className="text-xs text-amber-200">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => {
            const IconComponent = item.icon;

            // Special handling for logout
            if (item.id === 'logout') {
              return (
                <button
                  key={item.id}
                  onClick={handleLogout}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 text-amber-100 hover:text-red-900 hover:bg-amber-400/90`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            }

            // Regular navigation items
            return (
              <Link
                key={item.id}
                to={item.link}
                onClick={() => setActiveMenuItem(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${activeMenuItem === item.id
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-red-900 shadow-lg shadow-amber-500/30'
                  : 'text-amber-100 hover:text-red-900 hover:bg-amber-400/90'
                  }`}
              >
                <IconComponent className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex flex-col h-screen">
        {/* Header Section - Fixed */}
        <div className="bg-gradient-to-r from-red-900 via-red-800 to-red-900 shadow-2xl flex-shrink-0">
          <div className="px-8 py-6">
            <div className="flex items-center space-x-4">
              {/* <Link 
                to="/adminusers"
                className="flex items-center space-x-2 px-4 py-2 bg-amber-400/20 text-amber-100 rounded-xl hover:bg-amber-400/30 transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Users</span>
              </Link> */}
              <div>
                <h1 className="text-3xl font-bold text-amber-50">User Details</h1>
                <p className="text-amber-200">View and manage user information</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-red-900/20 overflow-hidden">
              {/* User Header */}
              <div className="px-6 py-8 bg-gradient-to-r from-red-800 to-red-900 text-amber-50">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="bg-amber-400/20 rounded-full p-6 mb-4 md:mb-0 md:mr-6">
                    <User size={48} className="text-amber-300" />
                  </div>
                  <div className="text-center md:text-left">
                    <h1 className="text-2xl font-bold text-amber-50">{user?.name || 'User Name'}</h1>
                    <p className="mt-1 text-amber-200">{user?.email || 'user@example.com'}</p>
                    <p className="mt-2 text-xs bg-amber-400/20 rounded-full px-3 py-1 inline-block text-amber-100">
                      ID: {user?._id?.slice(-8) || 'Unknown'}...
                    </p>
                  </div>
                </div>
              </div>

              {/* User Details */}
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4 text-red-900 flex items-center">
                  <User size={18} className="mr-2 text-red-600" />
                  User Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-3 p-4 bg-gradient-to-r from-red-50 to-amber-50 rounded-xl">
                    <User className="text-red-600 mt-1" size={18} />
                    <div>
                      <p className="text-sm text-red-600 font-medium">Full Name</p>
                      <p className="font-semibold text-red-900">{user?.name || 'Not provided'}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 bg-gradient-to-r from-red-50 to-amber-50 rounded-xl">
                    <Mail className="text-red-600 mt-1" size={18} />
                    <div>
                      <p className="text-sm text-red-600 font-medium">Email Address</p>
                      <p className="font-semibold text-red-900">{user?.email || 'Not provided'}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 bg-gradient-to-r from-red-50 to-amber-50 rounded-xl">
                    <Phone className="text-red-600 mt-1" size={18} />
                    <div>
                      <p className="text-sm text-red-600 font-medium">Mobile Number</p>
                      <p className="font-semibold text-red-900">{user?.phone || 'Not provided'}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-gradient-to-r from-red-50 to-amber-50 rounded-xl">
                    <VenusAndMars className="text-red-600 mt-1" size={18} />
                    <div>
                      <p className="text-sm text-red-600 font-medium">Gender</p>
                      <p className="font-semibold text-red-900">{user?.gender || 'Not provided'}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-gradient-to-r from-red-50 to-amber-50 rounded-xl">
                    <CheckCheckIcon className="text-red-600 mt-1" size={18} />
                    <div>
                      <p className="text-sm text-red-600 font-medium">isActive</p>
                      <p className="font-semibold text-red-900">{user?.isActive === true ? "Active" : "Inactive"}</p>
                    </div>
                  </div>


                  <div className="space-y-3">
                    {user?.address?.length > 0 ? (
                      user.address.map((addr, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-3 p-4 bg-gradient-to-r from-red-50 to-amber-50 rounded-xl"
                        >
                          <MapPin className="text-red-600 mt-1" size={18} />
                          <div>
                            <p className="text-sm text-red-600 font-medium">Address {index + 1}</p>
                            <p className="font-semibold text-red-900">
                              {addr.street}, {addr.city}, {addr.state},<br /> {addr.pincode}, {addr.country}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-start space-x-3 p-4 bg-gradient-to-r from-red-50 to-amber-50 rounded-xl">
                        <MapPin className="text-gray-400 mt-1" size={18} />
                        <p className="text-gray-500">No addresses provided</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Orders Section */}
                <div className="mt-8">
                  <h2 className="text-lg font-semibold mb-4 text-red-900 flex items-center">
                    <ShoppingBag size={18} className="mr-2 text-red-600" />
                    Order History ({userOrders.length})
                  </h2>

                  {userOrders.length > 0 ? (
                    <div className="bg-gradient-to-r from-red-50 to-amber-50 rounded-xl p-4">
                      <div className="space-y-4">
                        {userOrders.map((order, index) => (
                          <div key={index} className="bg-white p-4 rounded-xl border-2 border-red-100 hover:border-red-200 transition-colors">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-semibold text-red-900">Order #{order._id?.slice(-8) || 'N/A'}</p>
                                <p className="text-sm text-red-700">
                                  {order.product_id?.name || 'Product name unavailable'}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-red-600 font-medium">Amount</p>
                                <p className="text-xl font-bold text-red-900">₹{order.halfamount || 0}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gradient-to-r from-red-50 to-amber-50 rounded-xl p-8 text-center">
                      <ShoppingBag size={32} className="mx-auto text-red-400 mb-2" />
                      <p className="text-red-600 font-medium">No orders have been placed by this user</p>
                      <p className="text-red-500 text-sm mt-1">User hasn't made any purchases yet</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-6 py-4 bg-gradient-to-r from-red-50 to-amber-50 border-t-2 border-red-200 flex flex-col md:flex-row gap-3 md:justify-end">
                <button
                  onClick={handleDeleteClick}
                  className="flex items-center justify-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-600/40"
                >
                  <Trash2 size={18} className="mr-2" />
                  Delete User
                </button>

                <Link

                  to={`/adminupdateuser/${id}`}
                  // onClick={() => alert('Update user functionality (mock)')}
                  className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-red-800 to-red-900 text-amber-50 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-800/40"
                >
                  <Edit size={18} className="mr-2" />
                  Update User
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};