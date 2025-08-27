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
    ShoppingBag
} from 'lucide-react';
import { Link, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';

export const AdminUpdateUser = () => {
    const location = useLocation();
    const { id } = useParams();
    console.log("id", id);

    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState(null);

    // Watch for isActive field to control toggle
    const isActiveValue = watch('isActive');

    const getActiveMenuItem = () => {
        const path = location.pathname;
        if (path.includes('/adminusers')) return 'users';
        if (path.includes('/adminproducts')) return 'astrology';
        if (path.includes('/admininquiry')) return 'predictions';
        if (path.includes('/adminvisits')) return 'reports';
        if (path.includes('/adminsettings')) return 'settings';
        if (path.includes('/admindashboard')) return 'dashboard';
        return 'users';
    };

    const sidebarItems = [
        { id: 'dashboard', label: 'Dashboard', icon: BarChart3, link: '/admindashboard' },
        { id: 'users', label: 'Users', icon: Users, link: '/adminusers' },
        { id: 'astrology', label: 'Products', icon: Star, link: '/adminproducts' },
        { id: 'predictions', label: 'Visits', icon: Moon, link: '/adminvisits' },
        { id: 'orders', label: 'Orders Booked', icon: ShoppingBag, link: '/adminorders' },
    
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

    useEffect(() => {
        const getUserData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Updated URL to match your backend
                const response = await axios.get(`https://astroanikantbackend-2.onrender.com/user/getsingleuser/${id}`);

                const user = response.data.data;

                // If address is an array, take the first item
                const address = user.address?.[0] || {};

                setValue('name', user.name || '');
                setValue('email', user.email || '');
                setValue('mobileNo', user.phone || '');
                setValue('gender', user.gender || '');
                setValue('isActive', user.isActive ? 'true' : 'false');
                setValue('street', address.street || '');
                setValue('societyName', address.societyName || '');
                setValue('city', address.city || '');
                setValue('state', address.state || '');
                setValue('pincode', address.pincode || '');
                setValue('country', address.country || '');

            } catch (error) {
                console.error("Error fetching user data:", error);
                setError(error.response?.data?.message || 'Failed to fetch user data. Please check if the server is running and the user ID is valid.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            getUserData();
        }
    }, [id, setValue]);

    const onSubmit = async (data) => {
        try {
            setUpdating(true);
            setError(null);

            // Prepare the data for submission
            const updateData = {
                name: data.name,
                email: data.email,
                phone: data.mobileNo,
                gender: data.gender,
                isActive: data.isActive === 'true',
                address: [{
                    street: data.street,
                    societyName: data.societyName,
                    city: data.city,
                    state: data.state,
                    pincode: data.pincode,
                    country: data.country
                }]
            };

            const response = await axios.put(`https://astroanikantbackend-2.onrender.com/user/updateuser/${id}`, updateData);

            if (response.status === 200 || response.status === 201) {
                alert('User updated successfully!');
                // Optionally redirect back to users list
                window.location.href = '/adminusers';
            }
        } catch (error) {
            console.error("Error updating user:", error);
            setError(error.response?.data?.message || 'Failed to update user. Please try again.');
        } finally {
            setUpdating(false);
        }
    };

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

            {/* Main Content - With left margin to account for fixed sidebar */}
            <div className="flex-1 ml-64 p-6 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-red-900 to-red-800 rounded-t-2xl p-6 text-center shadow-lg">
                        <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <Edit className="w-8 h-8 text-red-900" />
                        </div>
                        <h2 className="text-3xl font-bold text-amber-50 mb-2">Update User Profile</h2>
                        <p className="text-amber-200">Edit user information and address details</p>
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
                                    Loading user data...
                                </div>
                            </div>
                        ) : error ? (
                            <div className="p-12 text-center">
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                                    <h3 className="font-bold mb-2">Error Loading User Data</h3>
                                    <p className="mb-4">{error}</p>
                                    <button
                                        onClick={() => window.location.reload()}
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
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Full Name
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <User className="h-5 w-5 text-red-800" />
                                                    </div>
                                                    <input
                                                        {...register('name', { required: 'Name is required' })}
                                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200"
                                                        placeholder="Enter full name"
                                                    />
                                                </div>
                                                {errors.name && (
                                                    <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                                                )}
                                            </div>

                                            {/* Email */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Email Address
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <Mail className="h-5 w-5 text-red-800" />
                                                    </div>
                                                    <input
                                                        type="email"
                                                        {...register('email', {
                                                            required: 'Email is required',
                                                            pattern: {
                                                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                                                                message: 'Please enter a valid email address'
                                                            }
                                                        })}
                                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200"
                                                        placeholder="Enter email address"
                                                    />
                                                </div>
                                                {errors.email && (
                                                    <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                                                )}
                                            </div>

                                            {/* Phone */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Mobile Number
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <Phone className="h-5 w-5 text-red-800" />
                                                    </div>
                                                    <input
                                                        type="tel"
                                                        {...register('mobileNo', {
                                                            required: 'Mobile number is required',
                                                            pattern: {
                                                                value: /^[0-9]{10}$/,
                                                                message: 'Mobile number must be 10 digits'
                                                            }
                                                        })}
                                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200"
                                                        placeholder="Enter mobile number"
                                                    />
                                                </div>
                                                {errors.mobileNo && (
                                                    <p className="mt-1 text-sm text-red-500">{errors.mobileNo.message}</p>
                                                )}
                                            </div>

                                            {/* Gender */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Gender
                                                </label>
                                                <select
                                                    {...register('gender', { required: 'Please select gender' })}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200"
                                                >
                                                    <option value="">Select Gender</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                                {errors.gender && (
                                                    <p className="mt-1 text-sm text-red-500">{errors.gender.message}</p>
                                                )}
                                            </div>

                                            {/* Is Active Toggle */}
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Account Status
                                                </label>
                                                <div className="flex items-center space-x-3">
                                                    <button
                                                        type="button"
                                                        onClick={() => setValue('isActive', isActiveValue === 'true' ? 'false' : 'true')}
                                                        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none ${isActiveValue === 'true' ? 'bg-green-500' : 'bg-gray-400'
                                                            }`}
                                                    >
                                                        <span
                                                            className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${isActiveValue === 'true' ? 'translate-x-6' : 'translate-x-1'
                                                                }`}
                                                        />
                                                    </button>
                                                    <span className={`text-sm font-medium ${isActiveValue === 'true' ? 'text-green-600' : 'text-gray-600'}`}>
                                                        {isActiveValue === 'true' ? 'Active' : 'Inactive'}
                                                    </span>
                                                    <input type="hidden" {...register('isActive')} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Address Information Section */}
                                    <div>
                                        <h3 className="text-xl font-bold text-red-900 mb-4 pb-2 border-b-2 border-amber-200">
                                            Address Information
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Street */}
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Street Address
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <MapPin className="h-5 w-5 text-red-800" />
                                                    </div>
                                                    <input
                                                        {...register('street')}
                                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200"
                                                        placeholder="Enter street address"
                                                    />
                                                </div>
                                            </div>

                                            {/* Society Name */}
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Society Name
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <Building className="h-5 w-5 text-red-800" />
                                                    </div>
                                                    <input
                                                        {...register('societyName')}
                                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200"
                                                        placeholder="Enter society/apartment name"
                                                    />
                                                </div>
                                            </div>

                                            {/* City */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    City
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <Building className="h-5 w-5 text-red-800" />
                                                    </div>
                                                    <input
                                                        {...register('city')}
                                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200"
                                                        placeholder="Enter city"
                                                    />
                                                </div>
                                            </div>

                                            {/* State */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    State
                                                </label>
                                                <input
                                                    {...register('state')}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200"
                                                    placeholder="Enter state"
                                                />
                                            </div>

                                            {/* Pincode */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Pincode
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <Hash className="h-5 w-5 text-red-800" />
                                                    </div>
                                                    <input
                                                        {...register('pincode')}
                                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200"
                                                        placeholder="Enter pincode"
                                                    />
                                                </div>
                                            </div>

                                            {/* Country */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Country
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <Globe className="h-5 w-5 text-red-800" />
                                                    </div>
                                                    <input
                                                        {...register('country')}
                                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200"
                                                        placeholder="Enter country"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-4 pt-6 border-t border-amber-200">
                                        <button
                                            type="button"
                                            onClick={() => window.history.back()}
                                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-red-800 text-red-800 rounded-xl font-medium hover:bg-red-50 transition-all duration-200 transform hover:scale-105"
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                            Cancel
                                        </button>

                                        <button
                                            type="button"
                                            onClick={handleSubmit(onSubmit)}
                                            disabled={updating}
                                            className="flex-1 bg-gradient-to-r from-red-900 to-red-800 text-amber-50 px-6 py-3 rounded-xl font-medium hover:from-red-800 hover:to-red-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-red-900/30"
                                        >
                                            {updating ? 'Updating...' : 'Update Profile'}
                                        </button>
                                    </div>
                                </div>

                                {/* Display error message if any */}
                                {error && (
                                    <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                                        <p>{error}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};