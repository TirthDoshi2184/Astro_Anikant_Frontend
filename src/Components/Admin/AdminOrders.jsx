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

    const getAllOrders = async () => {
        try {
            setLoading(true)
            const response = await axios.get("http://localhost:1921/order/getallorder")
            console.log(response.data.data);
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
            const matchesSearch = 
                order?.cart?.product?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order?.cart?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order?.cart?.user?.phone?.includes(searchTerm)
            
            const matchesStatus = statusFilter === 'all' || order?.status === statusFilter
            
            return matchesSearch && matchesStatus
        })
        setFilteredOrders(filtered)
    }, [searchTerm, statusFilter, orders])

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            // Add your API call to update order status
            console.log(`Updating order ${orderId} to status: ${newStatus}`)
            // await axios.put(`http://localhost:1921/order/update/${orderId}`, { status: newStatus })
            // Refresh orders after update
            getAllOrders()
        } catch (error) {
            console.error('Error updating order status:', error)
        }
    }

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
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
        switch (status?.toLowerCase()) {
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
                                        {orders.filter(o => o.status === 'pending').length}
                                    </p>
                                </div>
                                <div className="p-2 bg-yellow-100 rounded-lg">
                                    <Clock className="w-5 h-5 text-yellow-600" />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-amber-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-red-700 text-sm font-medium">Completed</p>
                                    <p className="text-2xl font-bold text-red-900">
                                        {orders.filter(o => o.status === 'completed').length}
                                    </p>
                                </div>
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-amber-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-red-700 text-sm font-medium">Processing</p>
                                    <p className="text-2xl font-bold text-red-900">
                                        {orders.filter(o => o.status === 'processing').length}
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

                        {/* Export Button */}
                        <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg">
                            <Download className="w-4 h-4" />
                            <span>Export</span>
                        </button>
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
                                    {filteredOrders.map((order, index) => (
                                        <tr key={index} className="hover:bg-amber-50/50 transition-colors duration-200">
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

                {/* Pagination would go here if needed */}
                {filteredOrders.length > 0 && (
                    <div className="mt-6 flex justify-between items-center">
                        <p className="text-red-700">
                            Showing {filteredOrders.length} of {orders.length} orders
                        </p>
                        {/* Add pagination controls here if needed */}
                    </div>
                )}
            </div>
        </div>
    )
}