import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AdminSideNav } from './AdminSideNav' // Adjust path as needed
import {
    Search,
    Filter,
    Eye,
    Edit,
    Trash2,
    CheckCircle,
    XCircle,
    Clock,
    Package,
    User,
    Phone,
    Calendar,
    ShoppingBag,
    Download
} from 'lucide-react'
import { Link } from 'react-router-dom'

export const AdminOrders = () => {
    const [orders, setOrders] = useState([])
    const [filteredOrders, setFilteredOrders] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [loading, setLoading] = useState(true)
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1)
    const [ordersPerPage] = useState(3) // Show 3 orders per page

    const getAllOrders = async () => {
        try {
            setLoading(true)
            const response = await axios.get("https://astroanikantbackend-2.onrender.com/order/getallorder")
            console.log('Raw API response:', response.data.data);
            
            // Add debugging to see the actual status values
            response.data.data.forEach((order, index) => {
                console.log(`Order ${index + 1}:`, {
                    status: order?.status,
                    statusType: typeof order?.status,
                    statusLength: order?.status?.length,
                    product: order?.cart?.product?.name,
                    user: order?.cart?.user?.name
                });
            });
            
            setOrders(response.data.data)
            setFilteredOrders(response.data.data)
        } catch (error) {
            console.error('Error fetching orders:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getAllOrders()
    }, [])

    // Filter orders based on search and status
    useEffect(() => {
        let filtered = orders.filter(order => {
            // More detailed search matching
            const productName = order?.cart?.product?.name?.toLowerCase() || ''
            const userName = order?.cart?.user?.name?.toLowerCase() || ''
            const userPhone = order?.cart?.user?.phone?.toString() || ''
            const searchLower = searchTerm.toLowerCase()
            
            const matchesSearch = searchTerm === '' || 
                productName.includes(searchLower) ||
                userName.includes(searchLower) ||
                userPhone.includes(searchLower)
            
            const matchesStatus = statusFilter === 'all' || 
                normalizeStatus(order?.status) === statusFilter.toLowerCase()
            
            console.log('Filtering order:', {
                order: order,
                productName,
                userName,
                userPhone,
                status: order?.status,
                normalizedStatus: normalizeStatus(order?.status),
                searchTerm,
                statusFilter,
                matchesSearch,
                matchesStatus,
                included: matchesSearch && matchesStatus
            });
            
            return matchesSearch && matchesStatus
        })
        
        console.log('Original orders:', orders.length, 'Filtered orders:', filtered.length);
        setFilteredOrders(filtered)
        setCurrentPage(1) // Reset to first page when filters change
    }, [searchTerm, statusFilter, orders])

    // Helper function to normalize status for comparison
    const normalizeStatus = (status) => {
        return status?.toLowerCase().trim() || 'unknown'
    }

    // Helper function to get order count by status
    const getOrderCountByStatus = (targetStatus) => {
        return orders.filter(order => 
            normalizeStatus(order?.status) === targetStatus.toLowerCase()
        ).length
    }

    // Pagination calculations
    const indexOfLastOrder = currentPage * ordersPerPage
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder)
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            // Add your API call to update order status
            console.log(`Updating order ${orderId} to status: ${newStatus}`)
            // await axios.put(`https://astroanikantbackend-2.onrender.com/order/update/${orderId}`, { status: newStatus })
            // Refresh orders after update
            getAllOrders()
        } catch (error) {
            console.error('Error updating order status:', error)
        }
    }

    const getStatusColor = (status) => {
        switch (normalizeStatus(status)) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200'
            case 'confirmed':
                return 'bg-blue-100 text-blue-800 border-blue-200'
            case 'processing':
                return 'bg-purple-100 text-purple-800 border-purple-200'
            case 'completed':
                return 'bg-green-100 text-green-800 border-green-200'
            case 'cancelled':
                return 'bg-red-100 text-red-800 border-red-200'
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200'
        }
    }

    const getStatusIcon = (status) => {
        switch (normalizeStatus(status)) {
            case 'pending':
                return <Clock className="w-4 h-4" />
            case 'confirmed':
                return <CheckCircle className="w-4 h-4" />
            case 'processing':
                return <Package className="w-4 h-4" />
            case 'completed':
                return <CheckCircle className="w-4 h-4" />
            case 'cancelled':
                return <XCircle className="w-4 h-4" />
            default:
                return <Clock className="w-4 h-4" />
        }
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100">
            {/* Fixed Sidebar */}
            <AdminSideNav />
            
            {/* Main Content */}
            <div className="flex-1 p-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg">
                            <ShoppingBag className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-red-900">Order Management</h1>
                            <p className="text-red-700">Manage and track all customer orders</p>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-amber-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-red-700 text-sm font-medium">Total Orders</p>
                                    <p className="text-2xl font-bold text-red-900">{orders.length}</p>
                                </div>
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <ShoppingBag className="w-5 h-5 text-blue-600" />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-amber-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-red-700 text-sm font-medium">Pending</p>
                                    <p className="text-2xl font-bold text-red-900">
                                        {getOrderCountByStatus('pending')}
                                    </p>
                                </div>
                                <div className="p-2 bg-yellow-100 rounded-lg">
                                    <Clock className="w-5 h-5 text-yellow-600" />
                                </div>
                            </div>
                        </div>
                        {/* <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-amber-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-red-700 text-sm font-medium">Completed</p>
                                    <p className="text-2xl font-bold text-red-900">
                                        {getOrderCountByStatus('completed')}
                                    </p>
                                </div>
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                </div>
                            </div>
                        </div> */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-amber-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-red-700 text-sm font-medium">Processing</p>
                                    <p className="text-2xl font-bold text-red-900">
                                        {getOrderCountByStatus('processing')}
                                    </p>
                                </div>
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <Package className="w-5 h-5 text-purple-600" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-amber-200 mb-8">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="flex flex-col md:flex-row gap-4 items-center flex-1">
                            {/* Search */}
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search orders, customers, products..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white/50"
                                />
                            </div>

                            {/* Status Filter */}
                            <div className="flex items-center space-x-2">
                                <Filter className="w-4 h-4 text-red-600" />
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white/50"
                                >
                                    <option value="all">All Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="confirmed">Confirmed</option>
                                    <option value="processing">Processing</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>
                        </div>

                      
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-amber-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        {loading ? (
                            <div className="flex justify-center items-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                                <span className="ml-3 text-red-700">Loading orders...</span>
                            </div>
                        ) : filteredOrders.length === 0 ? (
                            <div className="text-center py-12">
                                <ShoppingBag className="w-12 h-12 text-red-300 mx-auto mb-4" />
                                <p className="text-red-600 text-lg">No orders found</p>
                                <p className="text-red-400">Try adjusting your search or filters</p>
                                <div className="mt-4 p-4 bg-gray-100 rounded-lg text-left">
                                    <p className="font-semibold text-gray-700">Debug Info:</p>
                                    <p className="text-sm text-gray-600">Total orders: {orders.length}</p>
                                    <p className="text-sm text-gray-600">Search term: "{searchTerm}"</p>
                                    <p className="text-sm text-gray-600">Status filter: "{statusFilter}"</p>
                                    <p className="text-sm text-gray-600">Check console for detailed filtering info</p>
                                </div>
                            </div>
                        ) : (
                            <table className="w-full">
                                <thead className="bg-gradient-to-r from-red-500 to-red-600 text-white">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Product</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Customer</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Phone</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Order Date</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-amber-200">
                                    {currentOrders.map((order, index) => (
                                        <tr key={order?._id || index} className="hover:bg-amber-50/50 transition-colors duration-200">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-3">
                                                    <div className="p-2 bg-amber-100 rounded-lg">
                                                        <Package className="w-4 h-4 text-amber-600" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-red-900">
                                                            {order?.cart?.product?.name || 'N/A'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-3">
                                                    <div className="p-2 bg-blue-100 rounded-lg">
                                                        <User className="w-4 h-4 text-blue-600" />
                                                    </div>
                                                    <span className="font-medium text-red-900">
                                                        {order?.cart?.user?.name || 'N/A'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-2">
                                                    <Phone className="w-4 h-4 text-green-600" />
                                                    <span className="text-red-800">
                                                        {order?.cart?.user?.phone || 'N/A'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order?.status)}`}>
                                                    {getStatusIcon(order?.status)}
                                                    <span className="capitalize">{order?.status || 'Unknown'}</span>
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-2">
                                                    <Calendar className="w-4 h-4 text-purple-600" />
                                                    <span className="text-red-800 text-sm">
                                                        {order?.order_dt ? formatDate(order.order_dt) : 'N/A'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-2">
                                                    <Link
                                                        to={`/adminorders/${order?._id}`}
                                                        className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 hover:from-red-700 hover:to-red-800"
                                                    >
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
                </div>

                {/* Pagination */}
                {filteredOrders.length > 0 && (
                    <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-red-700">
                            Showing {indexOfFirstOrder + 1} to {Math.min(indexOfLastOrder, filteredOrders.length)} of {filteredOrders.length} orders
                            {orders.length !== filteredOrders.length && ` (filtered from ${orders.length} total)`}
                        </div>
                        
                        {totalPages > 1 && (
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={prevPage}
                                    disabled={currentPage === 1}
                                    className={`px-3 py-2 rounded-lg border ${
                                        currentPage === 1
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-white text-red-600 border-red-300 hover:bg-red-50'
                                    }`}
                                >
                                    Previous
                                </button>
                                
                                <div className="flex space-x-1">
                                    {[...Array(totalPages)].map((_, index) => {
                                        const pageNumber = index + 1
                                        const isCurrentPage = pageNumber === currentPage
                                        
                                        // Show first page, last page, current page and adjacent pages
                                        if (
                                            pageNumber === 1 ||
                                            pageNumber === totalPages ||
                                            (pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2)
                                        ) {
                                            return (
                                                <button
                                                    key={pageNumber}
                                                    onClick={() => paginate(pageNumber)}
                                                    className={`px-3 py-2 rounded-lg border ${
                                                        isCurrentPage
                                                            ? 'bg-red-600 text-white border-red-600'
                                                            : 'bg-white text-red-600 border-red-300 hover:bg-red-50'
                                                    }`}
                                                >
                                                    {pageNumber}
                                                </button>
                                            )
                                        } else if (
                                            pageNumber === currentPage - 3 ||
                                            pageNumber === currentPage + 3
                                        ) {
                                            return (
                                                <span key={pageNumber} className="px-2 py-2 text-gray-500">
                                                    ...
                                                </span>
                                            )
                                        }
                                        return null
                                    })}
                                </div>
                                
                                <button
                                    onClick={nextPage}
                                    disabled={currentPage === totalPages}
                                    className={`px-3 py-2 rounded-lg border ${
                                        currentPage === totalPages
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-white text-red-600 border-red-300 hover:bg-red-50'
                                    }`}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}