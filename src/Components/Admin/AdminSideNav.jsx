import React, { useEffect, useState } from 'react';
import {
    Users,
    Settings,
    LogOut,
    BarChart3,
    Home,
    Star,
    Moon,
    ShoppingBag
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

export const AdminSideNav = () => {
    const [users, setUsers] = useState([]);
    const location = useLocation();
    
    // Determine active menu item based on current path
    const getActiveMenuItem = (pathname) => {
        if (pathname.includes('/admindashboard')) return 'dashboard';
        if (pathname.includes('/adminusers')) return 'users';
        if (pathname.includes('/adminproducts')) return 'astrology';
        if (pathname.includes('/adminvisits')) return 'predictions';
        if (pathname.includes('/adminorders')) return 'orders';
        
        return 'dashboard'; // Default fallback
    };
    
    const [activeMenuItem, setActiveMenuItem] = useState(getActiveMenuItem(location.pathname));

    useEffect(() => {
        setActiveMenuItem(getActiveMenuItem(location.pathname));
    }, [location.pathname]);

    const getAllUsers = async () => {
        try {
            const response = await axios.get("https://astroanikantbackend-2.onrender.com/user/getalluser");
            setUsers(response.data.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    useEffect(() => {
        getAllUsers();
    }, []);

    const sidebarItems = [
        { id: 'dashboard', label: 'Dashboard', icon: BarChart3, link: '/admindashboard' },
        { id: 'users', label: 'Users', icon: Users, link: '/adminusers' },
        { id: 'astrology', label: 'Products', icon: Star, link: '/adminproducts' },
        { id: 'predictions', label: 'Visits', icon: Moon, link: '/adminvisits' },
        { id: 'orders', label: 'Orders Booked', icon: ShoppingBag, link: '/adminorders' },
        
        { id: 'logout', label: 'Logout', icon: LogOut, link: '/adminlogin' }
    ];

    return (
        <div className="w-64 h-190 bg-gradient-to-b from-red-900 via-red-800 to-red-900 shadow-2xl flex flex-col">
            {/* Logo Section (fixed at top) */}
            <div className="p-6 border-b border-red-700/50 shrink-0">
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

            {/* Navigation Menu (scrollable part) */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                {sidebarItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                        <Link
                            key={item.id}
                            to={item.link}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                                activeMenuItem === item.id
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
    );
};

export default AdminSideNav;
