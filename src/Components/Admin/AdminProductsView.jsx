import React, { useEffect, useState } from 'react';
import {
  Search,
  Users,
  Settings,
  LogOut,
  BarChart3,
  Eye,
  Home,
  Star,
  Moon,
  Sun,
  ShoppingBag,
  Package
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import AdminSidebar from './AdminSidePanel';

export const AdminProductsView = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage] = useState(25);
  
  // Get current location to determine active menu item
  const location = useLocation();
  
  // Determine active menu item based on current path
  const getActiveMenuItem = () => {
    const path = location.pathname;
    if (path.includes('/adminusers')) return 'users';
    if (path.includes('/adminproducts')) return 'astrology';
    if (path.includes('/admininquiry')) return 'predictions';
    if (path.includes('/adminproductrequest')) return 'product-requests';

    if (path.includes('/adminvisits')) return 'reports';
    if (path.includes('/adminsettings')) return 'settings';
    if (path.includes('/admindashboard')) return 'dashboard';
    return 'users'; // default for this component
  };

  const [activeMenuItem, setActiveMenuItem] = useState(getActiveMenuItem());

  const getallproducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("https://astroanikantbackend-2.onrender.com/product/getallproducts");
      setProducts(response.data.data);
      console.log(response.data.data);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to fetch users. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getallproducts();
  }, []);

  // Update active menu item when location changes
  useEffect(() => {
    setActiveMenuItem(getActiveMenuItem());
  }, [location.pathname]);

  useEffect(() => {
  setCurrentPage(1); // Reset to first page when search changes
}, [search]);

  // Filter users by search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  // ADD THIS - Pagination logic
const indexOfLastProduct = currentPage * itemsPerPage;
const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, link: '/admindashboard' },
    { id: 'users', label: 'Users', icon: Users, link: '/adminusers' },
    { id: 'astrology', label: 'Products', icon: Star, link: '/adminproducts' },
    { id: 'predictions', label: 'Visits', icon: Moon, link: '/adminvisits' },
    { id: 'orders', label: 'Orders Booked', icon: ShoppingBag, link: '/adminorders' },
    { id: 'product-requests', label: 'Product Requests', icon: Package, link: '/adminproductrequest' },
    { id: 'logout', label: 'Logout', icon: LogOut, link: '/adminlogin' }
  ];

  const handleLogout = () => {
    // Add your logout logic here
    // For example: clear localStorage, redirect to login, etc.
    localStorage.removeItem('adminToken'); // if you're using tokens
    window.location.href = '/adminlogin'; // or use navigate from useNavigate hook
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100">
      {/* Sidebar */}
      <AdminSidebar activeMenuItem='products'/>
      {/* Main Content */}
      <div className="flex-1 ml-64 p-6">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold text-red-900 mb-2">Registered Products</h1>
              <p className="text-red-700">Manage your astrology items</p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-red-600" />
                </div>
                <input
                  type="text"
                  placeholder="Search product..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-80 pl-10 pr-4 py-3 border-2 border-red-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white text-red-900 placeholder-red-500"
                />
              </div>

              {/* Add User Button */}
              
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-800"></div>
            <span className="ml-3 text-red-800">Loading users...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-6">
            <div className="flex items-center justify-between">
              <span>{error}</span>
              <button 
                onClick={getallproducts}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Users Table */}
        {!loading && !error && (
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-red-900/20 overflow-hidden">
            {/* Table Header */}
            <div className="bg-gradient-to-r from-red-800 to-red-900 px-6 py-4">
              <h3 className="text-xl font-semibold text-amber-50">Product Directory</h3>
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-red-700 to-red-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-amber-50 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-amber-50 uppercase tracking-wider">
                    Product Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-amber-50 uppercase tracking-wider">
                      Cerification
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-amber-50 uppercase tracking-wider">
                      price
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-amber-50 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-amber-50 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-red-200/50">
                  {currentProducts.map((product, index) => (
                    <tr
                      key={product._id}
                      className={`hover:bg-gradient-to-r hover:from-amber-100/50 hover:to-yellow-100/50 transition-all duration-300 ${
                        index % 2 === 0 ? 'bg-white/50' : 'bg-amber-50/30'
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-800 font-mono">
                        {product._id ? product._id.slice(-8) + '...' : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gradient-to-br from-red-800 to-red-900 rounded-full flex items-center justify-center mr-3">
                            <span className="text-amber-50 font-semibold text-sm">
                              {product.name ? product.name.charAt(0) : 'U'}
                            </span>
                          </div>
                          <div className="text-sm font-medium text-red-900">{product.name || 'N/A'}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-700">
                        {product.certification || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-700">
                        {product.price || 'N/A'}
                      </td>
                       <td className="px-6 py-4 whitespace-nowrap text-sm text-red-700">
                        {product.stock || 'N/A'}
                      </td>
                    
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link to={`/adminsingleproductview/${product._id}`}>
                          <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-red-900 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                            <Eye className="w-4 h-4" />
                            <span className="font-medium">View</span>
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {currentProducts.length === 0 && (
              <div className="text-center py-12">
                <Users className="mx-auto h-12 w-12 text-red-400" />
                <h3 className="mt-2 text-lg font-medium text-red-900">No Products found</h3>
                <p className="mt-1 text-red-600">
                  {search ? 'Try adjusting your search criteria.' : 'No users have been registered yet.'}
                </p>
              </div>
            )}


          </div>
          
        )}
{/* Pagination Controls */}
{filteredProducts.length > itemsPerPage && (
  <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border-2 border-red-900/20 p-6 mt-6">
    <div className="flex items-center justify-between">
      <div className="text-sm text-red-700">
        Showing <span className="font-semibold text-red-900">{indexOfFirstProduct + 1}</span> to{' '}
        <span className="font-semibold text-red-900">
          {Math.min(indexOfLastProduct, filteredProducts.length)}
        </span>{' '}
        of <span className="font-semibold text-red-900">{filteredProducts.length}</span> products
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gradient-to-r from-red-800 to-red-900 text-amber-50 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300"
        >
          Previous
        </button>
        
        <div className="flex items-center space-x-1">
          {[...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1;
            // Show first page, last page, current page, and pages around current
            if (
              pageNumber === 1 ||
              pageNumber === totalPages ||
              (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
            ) {
              return (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    currentPage === pageNumber
                      ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-red-900 shadow-lg'
                      : 'bg-white text-red-900 hover:bg-amber-100'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            } else if (
              pageNumber === currentPage - 2 ||
              pageNumber === currentPage + 2
            ) {
              return <span key={pageNumber} className="text-red-700">...</span>;
            }
            return null;
          })}
        </div>
        
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gradient-to-r from-red-800 to-red-900 text-amber-50 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300"
        >
          Next
        </button>
      </div>
    </div>
  </div>
)}

        {/* Stats Cards */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <div className="bg-gradient-to-br from-red-800 to-red-900 rounded-2xl p-6 text-amber-50 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-200 text-sm">Total Products</p>
                  <p className="text-3xl font-bold">{products.length}</p>
                </div>
                <Users className="w-8 h-8 text-amber-300" />
              </div>
            </div>

           
            <div className="bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl p-6 text-red-900 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-700 text-sm">New This Month</p>
                  <p className="text-3xl font-bold">
                    {products.filter(user => {
                      if (!user.createdAt) return false;
                      const userDate = new Date(user.createdAt);
                      const currentDate = new Date();
                      return userDate.getMonth() === currentDate.getMonth() && 
                             userDate.getFullYear() === currentDate.getFullYear();
                    }).length}
                  </p>
                </div>
                <Sun className="w-8 h-8 text-red-700" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProductsView;