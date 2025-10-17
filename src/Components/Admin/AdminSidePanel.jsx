import { Users, Package, ShoppingCart, Star, Moon, Home, BarChart3, LogOut, MessageSquare, ShoppingBag } from "lucide-react";

export const AdminSidebar = ({ activeMenuItem = 'dashboard' }) => {
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, link: '/admindashboard' },
    { id: 'users', label: 'Users', icon: Users, link: '/adminusers' },
    { id: 'products', label: 'Products', icon: Star, link: '/adminproducts' },
    { id: 'inquiry', label: 'Visits', icon: Moon, link: '/adminvisits' },
    { id: 'orders', label: 'Orders Booked', icon: ShoppingBag, link: '/adminorders' },
    { id: 'reviews', label: 'Reviews', icon: MessageSquare, link: '/adminReview' },
    { id: 'product-requests', label: 'Product Requests', icon: Package, link: '/adminproductrequest' },
    { id: 'logout', label: 'Logout', icon: LogOut, link: '/adminlogin' }
  ];

  const handleNavigation = (item) => {
    if (item.link) {
      window.location.href = item.link;
    }
  };

  return (
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
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item)}
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
  );
};

export default AdminSidebar;