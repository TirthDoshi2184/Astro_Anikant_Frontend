import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { useEffect, useState } from "react";
import { Users, Package, ShoppingCart, Star, Moon, Sun, Home, BarChart3, Settings, LogOut, Search, UserPlus, Eye } from "lucide-react";
import axios from "axios";

export const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [custom, setCustoms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeMenuItem, setActiveMenuItem] = useState('dashboard');

  const getAllproducts = async () => {
    try {
      const response = await axios.get("http://localhost:1921/product/getallproducts");
      setProducts(response.data.data);
      console.log("Products", response.data.data);
      console.log("Products Length", response.data.data.length);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  const getAllUsers = async () => {
    try {
      const response = await axios.get("http://localhost:1921/user/getalluser");
      setUsers(response.data.data);
      console.log("Users", response.data.data);
      console.log("Users Length", response.data.data.length);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  const getAllOrder = async () => {
    try {
      const response = await axios.get("http://localhost:1921/order/getallorder");
      setOrders(response.data.data); // Fixed: was setting products instead of orders
      console.log("Order", response.data.data);
      console.log("Order Length", response.data.data.length);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          getAllOrder(),
          getAllUsers(),
          getAllproducts()
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAllData();
  }, []);

  // Calculate totals safely
  const usersCount = users.length || 0;
  const productsCount = products.length || 0;
  const ordersCount = orders.length || 0;
  
  
  const total = usersCount + productsCount + ordersCount  || 1;

  const data = [
    { name: "Users", count: usersCount },
    { name: "Products", count: productsCount },
    { name: "Orders", count: ordersCount },
    
  ];

  const pieData = [
    { name: "Users", value: (usersCount / total) * 100 },
    { name: "Products", value: (productsCount / total) * 100 },
    { name: "Orders", value: (ordersCount / total) * 100 },
    
  ];

  // Astrology theme colors - red and amber palette
  const COLORS = ["#B91C1C", "#D97706", "#DC2626", "#F59E0B"];
  const STAT_COLORS = ["#7F1D1D", "#92400E", "#991B1B", "#B45309"];

  // Skeleton loader for cards with astrology theme
  const CardSkeleton = () => (
    <div className="h-36 bg-gradient-to-br from-red-100 to-amber-100 animate-pulse rounded-2xl shadow-lg"></div>
  );

  const cardIcons = [Users, Package, ShoppingCart, Star];
  const cardLabels = ["Users", "Products", "Orders", "Custom Requests"];

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, link: '/admindashboard' },
    { id: 'users', label: 'Users', icon: Users, link: '/adminusers' },
    { id: 'products', label: 'Products', icon: Star, link: '/adminproducts' },
    { id: 'inquiry', label: 'Inquiry', icon: Moon, link: '/admin/inquiry' },
    { id: 'visits', label: 'Visits Booked', icon: Sun, link: '/admin/visits' },
    { id: 'settings', label: 'Settings', icon: Settings, link: '/admin/settings' },
    { id: 'logout', label: 'Logout', icon: LogOut, link: '/' }
  ];

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
            const handleNavigation = () => {
              setActiveMenuItem(item.id);
              if (item.link) {
                // For React Router navigation, you would use navigate(item.link)
                // For now, we'll use window.location for demonstration
                window.location.href = item.link;
              }
            };

            return (
              <button
                key={item.id}
                onClick={handleNavigation}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${activeMenuItem === item.id
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

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex flex-col h-screen">
        {/* Header Section - Fixed */}
        <div className="bg-gradient-to-r from-red-900 via-red-800 to-red-900 shadow-2xl flex-shrink-0">
          <div className="px-6 py-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                  <BarChart3 className="w-6 h-6 text-red-900" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-amber-300 to-yellow-400 rounded-full opacity-30 blur-sm"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-amber-50">Dashboard Overview</h1>
                <p className="text-amber-200">Monitor your astrology platform's performance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <BarChart3 className="w-8 h-8 text-red-800" />
              <h2 className="text-3xl font-bold text-red-900">Analytics & Insights</h2>
            </div>
            <p className="text-red-700 text-lg">Real-time data and performance metrics</p>
          </div>

          {/* Stats Cards */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {data.map((item, index) => {
                const IconComponent = cardIcons[index];
                return (
                  <div
                    key={index}
                    className="relative group cursor-pointer transform hover:scale-105 transition-all duration-300"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-amber-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                    <div
                      className="relative h-36 p-6 flex flex-col justify-between rounded-2xl shadow-xl border-2 border-red-900/20"
                      style={{
                        background: `linear-gradient(135deg, ${STAT_COLORS[index]} 0%, ${STAT_COLORS[index]}dd 100%)`,
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-amber-100 text-lg font-medium">
                          {cardLabels[index]}
                        </h3>
                        <div className="bg-amber-400/20 p-3 rounded-xl">
                          <IconComponent className="w-6 h-6 text-amber-300" />
                        </div>
                      </div>
                      <div className="flex items-end justify-between">
                        <span className="text-4xl font-bold text-amber-50">
                          {item.count}
                        </span>
                        <div className="text-amber-200 text-sm font-medium">
                          Total {item.name}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Bar Chart */}
            <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl p-6 border-2 border-red-900/20">
              <div className="bg-gradient-to-r from-red-800 to-red-900 -mx-6 -mt-6 mb-6 px-6 py-4 rounded-t-2xl">
                <h3 className="text-xl font-semibold text-amber-50">
                  Data Overview
                </h3>
                <p className="text-amber-200 text-sm">Distribution across categories</p>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#FDE68A" opacity={0.3} />
                    <XAxis
                      dataKey="name"
                      stroke="#7F1D1D"
                      fontSize={12}
                      fontWeight="600"
                    />
                    <YAxis
                      stroke="#7F1D1D"
                      fontSize={12}
                      fontWeight="600"
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        borderColor: "#DC2626",
                        borderRadius: "12px",
                        border: "2px solid #DC2626"
                      }}
                      itemStyle={{ color: "#7F1D1D", fontWeight: "600" }}
                      labelStyle={{ color: "#7F1D1D", fontWeight: "700" }}
                    />
                    <Bar
                      dataKey="count"
                      barSize={60}
                      fill="url(#barGradient)"
                      radius={[8, 8, 0, 0]}
                    />
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#DC2626" />
                        <stop offset="100%" stopColor="#7F1D1D" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Pie Chart */}
            <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl p-6 border-2 border-red-900/20">
              <div className="bg-gradient-to-r from-red-800 to-red-900 -mx-6 -mt-6 mb-6 px-6 py-4 rounded-t-2xl">
                <h3 className="text-xl font-semibold text-amber-50">
                  Distribution Analysis
                </h3>
                <p className="text-amber-200 text-sm">Percentage breakdown</p>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData.map(item => ({ ...item, value: Math.round(item.value * 10) / 10 }))}
                      cx="50%"
                      cy="40%"
                      outerRadius={70}
                      innerRadius={25}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ value }) => `${value.toFixed(1)}%`}
                      labelLine={false}
                      fontSize={11}
                      fontWeight="600"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name) => [`${value.toFixed(1)}%`, name]}
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        borderColor: "#DC2626",
                        borderRadius: "12px",
                        border: "2px solid #DC2626"
                      }}
                      itemStyle={{ color: "#7F1D1D", fontWeight: "600" }}
                    />
                    <Legend
                      layout="horizontal"
                      verticalAlign="bottom"
                      align="center"
                      fontSize={12}
                      iconSize={12}
                      wrapperStyle={{ paddingTop: '10px', color: '#7F1D1D', fontWeight: '600' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Additional Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-gradient-to-br from-red-800 to-red-900 rounded-2xl p-6 text-amber-50 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-200 text-sm">Active Sessions</p>
                  <p className="text-3xl font-bold">24</p>
                  <p className="text-amber-300 text-xs mt-1">+12% from yesterday</p>
                </div>
                <Moon className="w-8 h-8 text-amber-300" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl p-6 text-red-900 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-700 text-sm">Revenue Today</p>
                  <p className="text-3xl font-bold">₹12.5k</p>
                  <p className="text-red-700 text-xs mt-1">+8% from last week</p>
                </div>
                <Sun className="w-8 h-8 text-red-700" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-700 to-red-800 rounded-2xl p-6 text-amber-50 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-200 text-sm">Satisfaction Rate</p>
                  <p className="text-3xl font-bold">98.5%</p>
                  <p className="text-amber-300 text-xs mt-1">+2.1% this month</p>
                </div>
                <Star className="w-8 h-8 text-amber-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AdminDashboard;