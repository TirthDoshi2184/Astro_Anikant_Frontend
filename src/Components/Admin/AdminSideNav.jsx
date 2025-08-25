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
    Sun,
    ShoppingBag
} from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const AdminSideNav = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [activeMenuItem, setActiveMenuItem] = useState('users');


    const getAllUsers = async () => {

        const response = await axios.get("http://localhost:1921/user/getalluser")
        setUsers(response.data.data)
        console.log(response.data.data);
    }

    useEffect(() => {
        getAllUsers();
    }, []);

    // Filter users by search term
    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    const sidebarItems = [
        { id: 'dashboard', label: 'Dashboard', icon: BarChart3, link: '/admindashboard' },
        { id: 'users', label: 'Users', icon: Users, link: '/adminusers' },
        { id: 'astrology', label: 'Products', icon: Star, link: '/admin/products' },
        { id: 'predictions', label: 'Inquiry', icon: Moon, link: '/admin/inquiry' },
        { id: 'orders', label: 'Orders Booked', icon: ShoppingBag, link: '/adminorders' },

        { id: 'settings', label: 'Settings', icon: Settings, link: '/admin/settings' },
        { id: 'logout', label: 'Logout', icon: LogOut, link: '/adminlogin' }
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


        </div>
    );
};

export default AdminSideNav;