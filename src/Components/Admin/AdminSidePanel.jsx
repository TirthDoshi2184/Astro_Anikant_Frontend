import React, { useEffect, useState } from 'react';
import { 
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
  Sun
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminSidePanel = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [activeMenuItem, setActiveMenuItem] = useState('users');

  // Mock data for demonstration
  const mockUsers = [
    {
      _id: '507f1f77bcf86cd799439011',
      name: 'John Doe',
      email: 'john.doe@example.com',
      mobileNo: '+1-234-567-8900',
      gender: 'Male'
    },
    {
      _id: '507f1f77bcf86cd799439012',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      mobileNo: '+1-234-567-8901',
      gender: 'Female'
    },
    {
      _id: '507f1f77bcf86cd799439013',
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      mobileNo: '+1-234-567-8902',
      gender: 'Male'
    },
    {
      _id: '507f1f77bcf86cd799439014',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      mobileNo: '+1-234-567-8903',
      gender: 'Female'
    },
    {
      _id: '507f1f77bcf86cd799439015',
      name: 'David Brown',
      email: 'david.brown@example.com',
      mobileNo: '+1-234-567-8904',
      gender: 'Male'
    }
  ];

  // Simulate API call
  const getAllUsers = async () => {
    try {
      // Simulating API delay
      setTimeout(() => {
        setUsers(mockUsers);
      }, 500);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  // Filter users by search term
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, link: '/admin/dashboard' },
    { id: 'users', label: 'Users', icon: Users, link: '/admin/users' },
    { id: 'astrology', label: 'Products', icon: Star, link: '/admin/products' },
    { id: 'predictions', label: 'Inquiry', icon: Moon, link: '/admin/inquiry' },
    { id: 'reports', label: 'Visits Booked', icon: Sun, link: '/admin/Visits' },
    { id: 'settings', label: 'Settings', icon: Settings, link: '/admin/settings' },
    { id: 'logout', label: 'Logout', icon: LogOut, link: '/' }
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-red-900 via-red-800 to-red-900 shadow-2xl">
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
            return (
              <button
                key={item.id}
                onClick={() => setActiveMenuItem(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeMenuItem === item.id
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-red-900 shadow-lg shadow-amber-500/30'
                    : 'text-amber-100 hover:text-red-900 hover:bg-amber-400/90'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold text-red-900 mb-2">Registered Users</h1>
              <p className="text-red-700">Manage your astrology community members</p>
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
                  placeholder="Search users..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-80 pl-10 pr-4 py-3 border-2 border-red-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white text-red-900 placeholder-red-500"
                />
              </div>
              
              {/* Add User Button */}
              <Link to="/admin/add-user">
                <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-800 to-red-900 text-amber-50 rounded-xl shadow-lg hover:shadow-red-900/40 transition-all duration-300 transform hover:scale-105">
                  <UserPlus className="w-5 h-5" />
                  <span>Add User</span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-red-900/20 overflow-hidden">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-red-800 to-red-900 px-6 py-4">
            <h3 className="text-xl font-semibold text-amber-50">User Directory</h3>
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
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-amber-50 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-amber-50 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-amber-50 uppercase tracking-wider">
                    Gender
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-amber-50 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-red-200/50">
                {filteredUsers.map((user, index) => (
                  <tr
                    key={user._id}
                    className={`hover:bg-gradient-to-r hover:from-amber-100/50 hover:to-yellow-100/50 transition-all duration-300 ${
                      index % 2 === 0 ? 'bg-white/50' : 'bg-amber-50/30'
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-800 font-mono">
                      {user._id.slice(-8)}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-br from-red-800 to-red-900 rounded-full flex items-center justify-center mr-3">
                          <span className="text-amber-50 font-semibold text-sm">
                            {user.name.charAt(0)}
                          </span>
                        </div>
                        <div className="text-sm font-medium text-red-900">{user.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-700">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-700">
                      {user.mobileNo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.gender === 'Male' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-pink-100 text-pink-800'
                      }`}>
                        {user.gender}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/admin/users/${user._id}`}>
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
          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-red-400" />
              <h3 className="mt-2 text-lg font-medium text-red-900">No users found</h3>
              <p className="mt-1 text-red-600">Try adjusting your search criteria.</p>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-gradient-to-br from-red-800 to-red-900 rounded-2xl p-6 text-amber-50 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-200 text-sm">Total Users</p>
                <p className="text-3xl font-bold">{users.length}</p>
              </div>
              <Users className="w-8 h-8 text-amber-300" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl p-6 text-red-900 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-700 text-sm">Active Today</p>
                <p className="text-3xl font-bold">24</p>
              </div>
              <Star className="w-8 h-8 text-red-700" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-red-700 to-red-800 rounded-2xl p-6 text-amber-50 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-200 text-sm">Consultations</p>
                <p className="text-3xl font-bold">156</p>
              </div>
              <Moon className="w-8 h-8 text-amber-300" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl p-6 text-red-900 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-700 text-sm">Revenue</p>
                <p className="text-3xl font-bold">₹12.5k</p>
              </div>
              <Sun className="w-8 h-8 text-red-700" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidePanel;