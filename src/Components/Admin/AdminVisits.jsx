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
    Trash2,
    EyeIcon,
    Filter,
    Package,
    Check
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import AdminSidebar from './AdminSidePanel';

export const AdminVisits = () => {
    const location = useLocation();
    const [visits, setVisits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [updatingId, setUpdatingId] = useState(null);

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
        { id: 'logout', label: 'Logout', icon: LogOut, link: '/adminlogin' },

    ];

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        window.location.href = '/adminlogin';
    };

    const [activeMenuItem, setActiveMenuItem] = useState(getActiveMenuItem());

    useEffect(() => {
        setActiveMenuItem(getActiveMenuItem());
    }, [location.pathname]);

    const getAllVisits = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get("https://astroanikantbackend-2.onrender.com/visit/getallvisit");
            setVisits(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.error("Error fetching visits:", error);
            setError(error.response?.data?.message || 'Failed to fetch visits data. Please check if the server is running.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllVisits();
    }, []);

    // Filter visits based on search term
    const filteredVisits = visits.filter(visit => {
        const searchLower = searchTerm.toLowerCase();
        return (
            String(visit.name || '').toLowerCase().includes(searchLower) ||
            String(visit.email || '').toLowerCase().includes(searchLower) ||
            String(visit.phone || '').toLowerCase().includes(searchLower)
        );
    });

  const handleStatusChange = async (visitId, newStatus) => {
    const oldVisit = visits.find(v => v._id === visitId);
    
    if (newStatus === "Paid" && oldVisit.status !== "Paid") {
        const transactionId = prompt("Enter UPI Transaction ID:");
        if (!transactionId) {
            alert("Transaction ID is required to mark as paid");
            return;
        }
        
        try {
            setUpdatingId(visitId);
            await axios.put(
                `https://astroanikantbackend-2.onrender.com/visit/updatevisit/${visitId}`,
                {
                    status: newStatus,
                    upiTransactionId: transactionId
                }
            );
            await getAllVisits();
            alert("Status updated successfully!");
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Failed to update status. Please try again.");
        } finally {
            setUpdatingId(null);
        }
    } else {
        try {
            setUpdatingId(visitId);
            await axios.put(
                `https://astroanikantbackend-2.onrender.com/visit/updatevisit/${visitId}`,
                { status: newStatus }
            );
            await getAllVisits();
            alert("Status updated successfully!");
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Failed to update status. Please try again.");
        } finally {
            setUpdatingId(null);
        }
    }
};
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleView = (id) => {
        // Navigate to view visit details
        console.log('View visit:', id);
        // You can implement navigation to visit details page
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this visit?')) {
            try {
                await axios.delete(`https://astroanikantbackend-2.onrender.com/visit/deletevisit/${id}`);
                // Refresh the visits list
                getAllVisits();
                alert('Visit deleted successfully!');
            } catch (error) {
                console.error('Error deleting visit:', error);
                alert('Failed to delete visit. Please try again.');
            }
        }
    };

    return (
        <div className="flex h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100">
            {/* Sidebar - Fixed */}
            <AdminSidebar activeMenuItem='visits' />
            {/* Main Content - With left margin to account for fixed sidebar */}
            <div className="flex-1 ml-64 p-6 overflow-y-auto">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-red-900 to-red-800 rounded-t-2xl p-6 shadow-lg">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                                    <Moon className="w-8 h-8 text-red-900" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold text-amber-50 mb-1">Consultation Management</h2>
                                    <p className="text-amber-200">Manage and track all user consultation</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-amber-200 text-sm">Total Visits</p>
                                <p className="text-3xl font-bold text-amber-50">{visits.length}</p>
                            </div>
                        </div>
                    </div>

                    {/* Search and Filter Section */}
                    <div className="bg-white p-6 border-b border-gray-200">
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                            <div className="relative flex-1 max-w-md">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search by name, email, or phone..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200"
                                />
                            </div>
                            <button
                                onClick={getAllVisits}
                                className="flex items-center gap-2 bg-gradient-to-r from-red-900 to-red-800 text-amber-50 px-6 py-3 rounded-xl font-medium hover:from-red-800 hover:to-red-700 transition-all duration-200 transform hover:scale-105 shadow-lg shadow-red-900/30"
                            >
                                <Filter className="w-4 h-4" />
                                Refresh
                            </button>
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
                                    Loading visits data...
                                </div>
                            </div>
                        ) : error ? (
                            <div className="p-12 text-center">
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                                    <h3 className="font-bold mb-2">Error Loading Visits Data</h3>
                                    <p className="mb-4">{error}</p>
                                    <button
                                        onClick={getAllVisits}
                                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                                    >
                                        Retry
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                {filteredVisits.length === 0 ? (
                                    <div className="p-12 text-center">
                                        <Moon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold text-gray-600 mb-2">No Visits Found</h3>
                                        <p className="text-gray-500">
                                            {searchTerm ? 'No visits match your search criteria.' : 'No visits have been recorded yet.'}
                                        </p>
                                    </div>
                                ) : (
                                    <table className="w-full">
                                        <thead className="bg-gradient-to-r from-amber-100 to-yellow-100">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-xs font-medium text-red-900 uppercase tracking-wider">
                                                    <div className="flex items-center gap-2">
                                                        <User className="w-4 h-4" />
                                                        Name
                                                    </div>
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-medium text-red-900 uppercase tracking-wider">
                                                    <div className="flex items-center gap-2">
                                                        <Mail className="w-4 h-4" />
                                                        Email
                                                    </div>
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-medium text-red-900 uppercase tracking-wider">
                                                    <div className="flex items-center gap-2">
                                                        <Phone className="w-4 h-4" />
                                                        Phone
                                                    </div>
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-medium text-red-900 uppercase tracking-wider">
    <div className="flex items-center gap-2">
        <ToggleRight className="w-4 h-4" />
        Status
    </div>
</th>
                                                {/* <th className="px-6 py-4 text-left text-xs font-medium text-red-900 uppercase tracking-wider">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="w-4 h-4" />
                                                        Date
                                                    </div>
                                                </th> */}
                                                <th className="px-6 py-4 text-left text-xs font-medium text-red-900 uppercase tracking-wider">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {filteredVisits.map((visit, index) => (
                                                <tr key={visit._id || index} className="hover:bg-amber-50 transition-colors duration-200">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="w-10 h-10 bg-gradient-to-br from-red-100 to-amber-100 rounded-full flex items-center justify-center mr-3">
                                                                <User className="w-5 h-5 text-red-800" />
                                                            </div>
                                                            <div>
                                                                <div className="text-sm font-medium text-gray-900">
                                                                    {visit.name || 'N/A'}
                                                                </div>
                                                                <div className="text-sm text-gray-500">
                                                                    ID: {visit._id?.slice(-6) || 'N/A'}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{visit.email || 'N/A'}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{visit?.phone || 'N/A'}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
    <select
        value={visit?.status || 'Pending'}
        onChange={(e) => handleStatusChange(visit?._id, e.target.value)}
        disabled={updatingId === visit._id}
        className={`px-3 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white text-sm font-medium ${
            visit.status === "Paid" 
                ? "text-green-800" 
                : visit.status === "Confirmed"
                ? "text-blue-800"
                : visit.status === "Processing"
                ? "text-purple-800"
                : visit.status === "Cancelled"
                ? "text-red-800"
                : "text-yellow-800"
        } ${updatingId === visit._id ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
        <option value="Pending">Pending</option>
        <option value="Confirmed">Confirmed</option>
        <option value="Processing">Processing</option>
        <option value="Cancelled">Cancelled</option>
    </select>
</td>
                                                    {/* <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {formatDate(visit.createdAt || visit.visit_date)}
                                                        </div>
                                                    </td> */}
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <div className="flex items-center gap-2">
                                                            <Link

                                                                to={`/adminvisits/${visit?._id}`}

                                                                className="flex items-center gap-1 text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-lg transition-all duration-200"
                                                                title="View Details"
                                                            >
                                                                <EyeIcon className="w-4 h-4" />
                                                                View
                                                            </Link>

                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Footer Stats */}
                    {!loading && !error && filteredVisits.length > 0 && (
                        <div className="mt-6 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-xl p-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-red-800 font-medium">
                                    Showing {filteredVisits.length} of {visits.length} visits
                                </span>
                                <span className="text-red-700">
                                    {searchTerm && `Filtered by: "${searchTerm}"`}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};