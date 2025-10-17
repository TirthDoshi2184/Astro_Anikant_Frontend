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
    Edit,
    Mail,
    Phone,
    User,
    ChevronLeft,
    MapPin,
    Building,
    Globe,
    Hash,
    ToggleLeft,
    ToggleRight,
    ShoppingBag,
    Calendar,
    Clock,
    CheckCircle,
    AlertCircle,
    XCircle,
    Users as UsersIcon,
    Package
} from 'lucide-react';
import { Link, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

export const AdminSingleVisit = () => {
    const location = useLocation();
    const { id } = useParams();
    const [visit, setVisit] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log("Visit ID:", id);

    const getActiveMenuItem = () => {
        const path = location.pathname;
        if (path.includes('/adminusers')) return 'users';
        if (path.includes('/adminproducts')) return 'astrology';
        if (path.includes('/admininquiry')) return 'predictions';
        if (path.includes('/adminvisits')) return 'predictions';
        if (path.includes('/adminsettings')) return 'settings';
        if (path.includes('/admindashboard')) return 'dashboard';
        return 'predictions';
    };

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
        localStorage.removeItem('adminToken');
        window.location.href = '/adminlogin';
    };

    const [activeMenuItem, setActiveMenuItem] = useState(getActiveMenuItem());

    useEffect(() => {
        setActiveMenuItem(getActiveMenuItem());
    }, [location.pathname]);

    const getSingleVisit = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`https://astroanikantbackend-2.onrender.com/visit/getsinglevisit/${id}`);
            setVisit(response.data.data);
            console.log("Visit data:", response.data.data);
        } catch (error) {
            console.error("Error fetching visit:", error);
            setError(error.response?.data?.message || 'Failed to fetch visit details. Please check if the server is running.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            getSingleVisit();
        }
    }, [id]);

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (timeString) => {
        if (!timeString) return 'N/A';
        return timeString;
    };

    const getStatusIcon = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed':
                return <CheckCircle className="w-5 h-5 text-green-600" />;
            case 'pending':
                return <AlertCircle className="w-5 h-5 text-yellow-600" />;
            case 'cancelled':
                return <XCircle className="w-5 h-5 text-red-600" />;
            default:
                return <AlertCircle className="w-5 h-5 text-gray-600" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'cancelled':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <div className="flex h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100">
            {/* Sidebar - Fixed */}
            <AdminSidebar activeMenuItem={activeMenuItem} />
            {/* Main Content - With left margin to account for fixed sidebar */}
            <div className="flex-1 ml-64 p-6 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-red-900 to-red-800 rounded-t-2xl p-6 shadow-lg">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <Link
                                    to="/adminvisits"
                                    className="p-2 bg-amber-400/20 rounded-full hover:bg-amber-400/30 transition-all duration-200"
                                >
                                    <ChevronLeft className="w-6 h-6 text-amber-100" />
                                </Link>
                                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                                    <Eye className="w-8 h-8 text-red-900" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold text-amber-50 mb-1">Visit Details</h2>
                                    <p className="text-amber-200">View complete visit information</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="bg-white rounded-b-2xl shadow-lg">
                        {loading ? (
                            <div className="p-12 text-center">
                                <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-red-800 bg-amber-100">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-red-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Loading visit details...
                                </div>
                            </div>
                        ) : error ? (
                            <div className="p-12 text-center">
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                                    <h3 className="font-bold mb-2">Error Loading Visit Details</h3>
                                    <p className="mb-4">{error}</p>
                                    <button
                                        onClick={getSingleVisit}
                                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                                    >
                                        Retry
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="p-6">
                                <div className="space-y-8">
                                    {/* Personal Information Section */}
                                    <div>
                                        <h3 className="text-xl font-bold text-red-900 mb-4 pb-2 border-b-2 border-amber-200">
                                            Personal Information
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Name */}
                                            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-xl border border-amber-200">
                                                <div className="flex items-center space-x-3">
                                                    <div className="p-2 bg-red-100 rounded-lg">
                                                        <User className="w-5 h-5 text-red-800" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-600 font-medium">Full Name</p>
                                                        <p className="text-lg font-semibold text-gray-900">{visit.name || 'N/A'}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Email */}
                                            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-xl border border-amber-200">
                                                <div className="flex items-center space-x-3">
                                                    <div className="p-2 bg-red-100 rounded-lg">
                                                        <Mail className="w-5 h-5 text-red-800" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-600 font-medium">Email Address</p>
                                                        <p className="text-lg font-semibold text-gray-900">{visit.email || 'N/A'}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Phone */}
                                            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-xl border border-amber-200">
                                                <div className="flex items-center space-x-3">
                                                    <div className="p-2 bg-red-100 rounded-lg">
                                                        <Phone className="w-5 h-5 text-red-800" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-600 font-medium">Phone Number</p>
                                                        <p className="text-lg font-semibold text-gray-900">{visit.phone || 'N/A'}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Status */}
                                            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-xl border border-amber-200">
                                                <div className="flex items-center space-x-3">
                                                    <div className="p-2 bg-red-100 rounded-lg">
                                                        {getStatusIcon(visit.status)}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-600 font-medium">Status</p>
                                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(visit.status)}`}>
                                                            {visit.status || 'N/A'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Visit Information Section */}
                                    {/* <div>
                                        <h3 className="text-xl font-bold text-red-900 mb-4 pb-2 border-b-2 border-amber-200">
                                            Visit Information
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> */}
                                            {/* Visit Date */}
                                            {/* <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                                                <div className="flex items-center space-x-3">
                                                    <div className="p-2 bg-blue-100 rounded-lg">
                                                        <Calendar className="w-5 h-5 text-blue-800" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-600 font-medium">Visit Date</p>
                                                        <p className="text-lg font-semibold text-gray-900">{formatDate(visit.visit_date)}</p>
                                                    </div>
                                                </div>
                                            </div> */}

                                            {/* Time */}
                                            {/* <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                                                <div className="flex items-center space-x-3">
                                                    <div className="p-2 bg-blue-100 rounded-lg">
                                                        <Clock className="w-5 h-5 text-blue-800" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-600 font-medium">Time</p>
                                                        <p className="text-lg font-semibold text-gray-900">{formatTime(visit.time)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}

                                    {/* Address Information Section */}
                                    {visit?.address && visit.address.length > 0 && (
                                        <div>
                                            <h3 className="text-xl font-bold text-red-900 mb-4 pb-2 border-b-2 border-amber-200">
                                                Address Information
                                            </h3>
                                            {visit.address.map((address, index) => (
                                                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                                                    {/* Society Name */}
                                                    <div className="md:col-span-2">
                                                        <div className="flex items-center space-x-3">
                                                            <div className="p-2 bg-green-100 rounded-lg">
                                                                <Building className="w-5 h-5 text-green-800" />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm text-gray-600 font-medium">Society Name</p>
                                                                <p className="text-lg font-semibold text-gray-900">{address.societyName || 'N/A'}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Street */}
                                                    <div className="md:col-span-2">
                                                        <div className="flex items-center space-x-3">
                                                            <div className="p-2 bg-green-100 rounded-lg">
                                                                <MapPin className="w-5 h-5 text-green-800" />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm text-gray-600 font-medium">Street Address</p>
                                                                <p className="text-lg font-semibold text-gray-900">{address.street || 'N/A'}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* City */}
                                                    <div>
                                                        <div className="flex items-center space-x-3">
                                                            <div className="p-2 bg-green-100 rounded-lg">
                                                                <Building className="w-5 h-5 text-green-800" />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm text-gray-600 font-medium">City</p>
                                                                <p className="text-lg font-semibold text-gray-900">{address.city || 'N/A'}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* State */}
                                                    <div>
                                                        <div className="flex items-center space-x-3">
                                                            <div className="p-2 bg-green-100 rounded-lg">
                                                                <Globe className="w-5 h-5 text-green-800" />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm text-gray-600 font-medium">State</p>
                                                                <p className="text-lg font-semibold text-gray-900">{address.state || 'N/A'}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Pincode */}
                                                    <div className="md:col-span-2">
                                                        <div className="flex items-center space-x-3">
                                                            <div className="p-2 bg-green-100 rounded-lg">
                                                                <Hash className="w-5 h-5 text-green-800" />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm text-gray-600 font-medium">Pincode</p>
                                                                <p className="text-lg font-semibold text-gray-900">{address.pincode || 'N/A'}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex gap-4 pt-6 border-t border-amber-200">
                                        <Link
                                            to="/adminvisits"
                                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-red-800 text-red-800 rounded-xl font-medium hover:bg-red-50 transition-all duration-200 transform hover:scale-105"
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                            Back to Visits
                                        </Link>

                                        <button
                                            onClick={() => window.print()}
                                            className="flex-1 bg-gradient-to-r from-red-900 to-red-800 text-amber-50 px-6 py-3 rounded-xl font-medium hover:from-red-800 hover:to-red-700 transition-all duration-200 transform hover:scale-105 shadow-lg shadow-red-900/30"
                                        >
                                            Print Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};