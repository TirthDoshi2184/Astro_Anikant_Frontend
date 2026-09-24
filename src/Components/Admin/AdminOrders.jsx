import axios from 'axios'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Search,
    Filter,
    Eye,
    CheckCircle,
    XCircle,
    Clock,
    Package,
    User,
    Phone,
    Calendar,
    ShoppingBag,
} from 'lucide-react'
import AdminSidebar from './AdminSidePanel'

const API_BASE = 'https://astroanikantbackend-2.onrender.com/order'
const ORDERS_PER_PAGE = 10

const STATUS_OPTIONS = [
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'processing', label: 'Processing' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
]

/* ---------- helpers ---------- */

const normalizeStatus = (status) => status?.toString().toLowerCase().trim() || 'unknown'

// Supports both shapes: cart.items[].product  and  cart.product
const getItems = (order) => {
    const cart = order?.cart
    if (Array.isArray(cart?.items) && cart.items.length > 0) return cart.items
    if (cart?.product) return [{ product: cart.product, quantity: cart.quantity }]
    return []
}

const getProductNames = (order) =>
    getItems(order)
        .map((item) => item?.product?.name)
        .filter(Boolean)

const getProductLabel = (order) => {
    const names = getProductNames(order)
    if (names.length === 0) return 'N/A'
    if (names.length === 1) return names[0]
    return `${names[0]} +${names.length - 1} more`
}

const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const d = new Date(dateString)
    if (isNaN(d.getTime())) return 'N/A'
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}

const STATUS_STYLES = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
    processing: 'bg-purple-100 text-purple-800 border-purple-200',
    completed: 'bg-green-100 text-green-800 border-green-200',
    cancelled: 'bg-red-100 text-red-800 border-red-200',
}

const StatusIcon = ({ status }) => {
    const cls = 'w-4 h-4'
    switch (normalizeStatus(status)) {
        case 'confirmed':
        case 'completed':
            return <CheckCircle className={cls} />
        case 'processing':
            return <Package className={cls} />
        case 'cancelled':
            return <XCircle className={cls} />
        default:
            return <Clock className={cls} />
    }
}

const StatusBadge = ({ status }) => (
    <span
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${
            STATUS_STYLES[normalizeStatus(status)] || 'bg-gray-100 text-gray-800 border-gray-200'
        }`}
    >
        <StatusIcon status={status} />
        <span className="capitalize">{status || 'Unknown'}</span>
    </span>
)

const StatusSelect = ({ order, onChange, disabled }) => (
    <select
        value={normalizeStatus(order?.status) === 'unknown' ? 'pending' : normalizeStatus(order?.status)}
        onChange={(e) => onChange(order?._id, e.target.value)}
        disabled={disabled}
        className="min-w-0 flex-1 px-3 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white text-sm disabled:opacity-60"
    >
        {STATUS_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>
                {s.label}
            </option>
        ))}
    </select>
)

const ViewButton = ({ id }) => (
    <Link
        to={`/adminorders/${id}`}
        aria-label="View order"
        className="shrink-0 px-3 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg shadow hover:from-red-700 hover:to-red-800 transition-colors"
    >
        <Eye className="w-4 h-4" />
    </Link>
)

const StatCard = ({ label, value, icon, tint }) => (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg border border-amber-200">
        <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
                <p className="text-red-700 text-xs sm:text-sm font-medium truncate">{label}</p>
                <p className="text-xl sm:text-2xl font-bold text-red-900">{value}</p>
            </div>
            <div className={`p-2 rounded-lg shrink-0 ${tint}`}>{icon}</div>
        </div>
    </div>
)

/* ---------- component ---------- */

export const AdminOrders = () => {
    const [orders, setOrders] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [updatingId, setUpdatingId] = useState(null)
    const [notice, setNotice] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)

    // silent = refresh without showing the full-table spinner
    const getAllOrders = useCallback(async (silent = false) => {
        try {
            if (!silent) setLoading(true)
            setError('')
            const response = await axios.get(`${API_BASE}/getallorder`)
            const data = Array.isArray(response.data?.data) ? response.data.data : []
            setOrders(data)
        } catch (err) {
            console.error('Error fetching orders:', err)
            setError('Could not load orders. Please try again.')
        } finally {
            if (!silent) setLoading(false)
        }
    }, [])

    useEffect(() => {
        getAllOrders()
    }, [getAllOrders])

    // auto-hide toast
    useEffect(() => {
        if (!notice) return
        const t = setTimeout(() => setNotice(null), 3000)
        return () => clearTimeout(t)
    }, [notice])

    // Newest first, then filter
    const filteredOrders = useMemo(() => {
        const q = searchTerm.trim().toLowerCase()
        return [...orders]
            .sort((a, b) => new Date(b?.order_dt || 0) - new Date(a?.order_dt || 0))
            .filter((order) => {
                const matchesStatus =
                    statusFilter === 'all' || normalizeStatus(order?.status) === statusFilter
                if (!matchesStatus) return false
                if (!q) return true

                const haystack = [
                    ...getProductNames(order),
                    order?.cart?.user?.name,
                    order?.cart?.user?.phone,
                    order?._id,
                ]
                    .filter(Boolean)
                    .join(' ')
                    .toLowerCase()
                return haystack.includes(q)
            })
    }, [orders, searchTerm, statusFilter])

    // reset to first page whenever filters change
    useEffect(() => {
        setCurrentPage(1)
    }, [searchTerm, statusFilter])

    const countByStatus = (target) =>
        orders.filter((o) => normalizeStatus(o?.status) === target).length

    // pagination
    const totalPages = Math.max(1, Math.ceil(filteredOrders.length / ORDERS_PER_PAGE))
    const safePage = Math.min(currentPage, totalPages)
    const indexOfFirst = (safePage - 1) * ORDERS_PER_PAGE
    const indexOfLast = indexOfFirst + ORDERS_PER_PAGE
    const currentOrders = filteredOrders.slice(indexOfFirst, indexOfLast)

    const handleStatusUpdate = async (orderId, newStatus) => {
        if (!orderId) return
        try {
            setUpdatingId(orderId)
            const response = await axios.put(
                `${API_BASE}/update-status/${orderId}`,
                { status: newStatus },
                { headers: { 'Content-Type': 'application/json' } }
            )
            if (response.status === 200) {
                // update instantly in the UI, then sync with server quietly
                setOrders((prev) =>
                    prev.map((o) => (o?._id === orderId ? { ...o, status: newStatus } : o))
                )
                setNotice({ type: 'success', text: 'Order status updated.' })
                getAllOrders(true)
            }
        } catch (err) {
            console.error('Status update failed:', err)
            setNotice({
                type: 'error',
                text: `Could not update status: ${err.response?.data?.message || err.message}`,
            })
        } finally {
            setUpdatingId(null)
        }
    }

    // page numbers with ellipsis
    const pageNumbers = []
    for (let p = 1; p <= totalPages; p++) {
        if (p === 1 || p === totalPages || Math.abs(p - safePage) <= 1) pageNumbers.push(p)
        else if (pageNumbers[pageNumbers.length - 1] !== '...') pageNumbers.push('...')
    }

    const pageBtn = (active) =>
        `px-3 py-2 rounded-lg border text-sm ${
            active
                ? 'bg-red-600 text-white border-red-600'
                : 'bg-white text-red-600 border-red-300 hover:bg-red-50'
        }`
    const navBtn = (disabled) =>
        `px-3 py-2 rounded-lg border text-sm ${
            disabled
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-red-600 border-red-300 hover:bg-red-50'
        }`

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100">
            {/* Sidebar (fixed). Keep the ml value below in sync with its width. */}
            <AdminSidebar activeMenuItem="orders" />

            {/* pt-16 on mobile leaves room for the sidebar's menu button / top bar */}
            <main className="min-h-screen px-4 pb-8 pt-16 sm:px-6 lg:ml-[17.5rem] lg:px-8 lg:pt-8">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg shrink-0">
                        <ShoppingBag className="w-6 h-6 text-white" />
                    </div>
                    <div className="min-w-0">
                        <h1 className="text-2xl sm:text-3xl font-bold text-red-900">Order Management</h1>
                        <p className="text-red-700 text-sm sm:text-base">Manage and track all customer orders</p>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6">
                    <StatCard
                        label="Total Orders"
                        value={orders.length}
                        tint="bg-blue-100"
                        icon={<ShoppingBag className="w-5 h-5 text-blue-600" />}
                    />
                    <StatCard
                        label="Pending"
                        value={countByStatus('pending')}
                        tint="bg-yellow-100"
                        icon={<Clock className="w-5 h-5 text-yellow-600" />}
                    />
                    <StatCard
                        label="Processing"
                        value={countByStatus('processing')}
                        tint="bg-purple-100"
                        icon={<Package className="w-5 h-5 text-purple-600" />}
                    />
                    <StatCard
                        label="Completed"
                        value={countByStatus('completed')}
                        tint="bg-green-100"
                        icon={<CheckCircle className="w-5 h-5 text-green-600" />}
                    />
                </div>

                {/* Filters */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg border border-amber-200 mb-6">
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-red-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search by product, customer or phone..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white/50"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Filter className="w-4 h-4 text-red-600 shrink-0" />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full sm:w-auto px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white/50"
                            >
                                <option value="all">All Status</option>
                                {STATUS_OPTIONS.map((s) => (
                                    <option key={s.value} value={s.value}>
                                        {s.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Toast */}
                {notice && (
                    <div
                        role="status"
                        className={`mb-4 px-4 py-3 rounded-lg text-sm border ${
                            notice.type === 'success'
                                ? 'bg-green-50 text-green-800 border-green-200'
                                : 'bg-red-50 text-red-800 border-red-200'
                        }`}
                    >
                        {notice.text}
                    </div>
                )}

                {/* Orders */}
                {loading ? (
                    <div className="flex justify-center items-center py-16 bg-white/80 rounded-xl border border-amber-200">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600" />
                        <span className="ml-3 text-red-700">Loading orders...</span>
                    </div>
                ) : error ? (
                    <div className="text-center py-12 bg-white/80 rounded-xl border border-amber-200">
                        <p className="text-red-700 mb-4">{error}</p>
                        <button
                            onClick={() => getAllOrders()}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                            Retry
                        </button>
                    </div>
                ) : filteredOrders.length === 0 ? (
                    <div className="text-center py-12 bg-white/80 rounded-xl border border-amber-200">
                        <ShoppingBag className="w-12 h-12 text-red-300 mx-auto mb-4" />
                        <p className="text-red-600 text-lg">No orders found</p>
                        <p className="text-red-400">Try adjusting your search or filters</p>
                    </div>
                ) : (
                    <>
                        {/* Mobile / tablet: cards */}
                        <div className="lg:hidden space-y-3">
                            {currentOrders.map((order, index) => (
                                <div
                                    key={order?._id || index}
                                    className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-amber-200"
                                >
                                    <div className="flex items-start justify-between gap-3 mb-3">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="p-2 bg-amber-100 rounded-lg shrink-0">
                                                <Package className="w-4 h-4 text-amber-600" />
                                            </div>
                                            <p className="font-medium text-red-900 break-words">
                                                {getProductLabel(order)}
                                            </p>
                                        </div>
                                        <StatusBadge status={order?.status} />
                                    </div>

                                    <dl className="space-y-2 text-sm mb-4">
                                        <div className="flex items-center gap-2 text-red-900">
                                            <User className="w-4 h-4 text-blue-600 shrink-0" />
                                            <span className="break-words">{order?.cart?.user?.name || 'N/A'}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-red-800">
                                            <Phone className="w-4 h-4 text-green-600 shrink-0" />
                                            <span>{order?.cart?.user?.phone || 'N/A'}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-red-800">
                                            <Calendar className="w-4 h-4 text-purple-600 shrink-0" />
                                            <span>{formatDate(order?.order_dt)}</span>
                                        </div>
                                    </dl>

                                    <div className="flex items-center gap-2">
                                        <StatusSelect
                                            order={order}
                                            onChange={handleStatusUpdate}
                                            disabled={updatingId === order?._id}
                                        />
                                        <ViewButton id={order?._id} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Desktop: table */}
                        <div className="hidden lg:block bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-amber-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gradient-to-r from-red-500 to-red-600 text-white">
                                        <tr>
                                            {['Product', 'Customer', 'Phone', 'Status', 'Order Date', 'Actions'].map((h) => (
                                                <th key={h} className="px-4 py-4 text-left text-sm font-semibold whitespace-nowrap">
                                                    {h}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-amber-200">
                                        {currentOrders.map((order, index) => (
                                            <tr
                                                key={order?._id || index}
                                                className="hover:bg-amber-50/50 transition-colors duration-200"
                                            >
                                                <td className="px-4 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-amber-100 rounded-lg shrink-0">
                                                            <Package className="w-4 h-4 text-amber-600" />
                                                        </div>
                                                        <p className="font-medium text-red-900 max-w-[14rem] break-words">
                                                            {getProductLabel(order)}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-blue-100 rounded-lg shrink-0">
                                                            <User className="w-4 h-4 text-blue-600" />
                                                        </div>
                                                        <span className="font-medium text-red-900">
                                                            {order?.cart?.user?.name || 'N/A'}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <Phone className="w-4 h-4 text-green-600 shrink-0" />
                                                        <span className="text-red-800 whitespace-nowrap">
                                                            {order?.cart?.user?.phone || 'N/A'}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <StatusBadge status={order?.status} />
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="w-4 h-4 text-purple-600 shrink-0" />
                                                        <span className="text-red-800 text-sm">
                                                            {formatDate(order?.order_dt)}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <StatusSelect
                                                            order={order}
                                                            onChange={handleStatusUpdate}
                                                            disabled={updatingId === order?._id}
                                                        />
                                                        <ViewButton id={order?._id} />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Pagination */}
                        <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-red-700 text-sm text-center md:text-left">
                                Showing {indexOfFirst + 1} to {Math.min(indexOfLast, filteredOrders.length)} of{' '}
                                {filteredOrders.length} orders
                                {orders.length !== filteredOrders.length && ` (filtered from ${orders.length} total)`}
                            </p>

                            {totalPages > 1 && (
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setCurrentPage(Math.max(1, safePage - 1))}
                                        disabled={safePage === 1}
                                        className={navBtn(safePage === 1)}
                                    >
                                        Previous
                                    </button>

                                    {/* page numbers on larger screens, "x / y" on phones */}
                                    <span className="sm:hidden text-sm text-red-700 px-2">
                                        {safePage} / {totalPages}
                                    </span>
                                    <div className="hidden sm:flex gap-1">
                                        {pageNumbers.map((p, i) =>
                                            p === '...' ? (
                                                <span key={`dots-${i}`} className="px-2 py-2 text-gray-500">
                                                    ...
                                                </span>
                                            ) : (
                                                <button
                                                    key={p}
                                                    onClick={() => setCurrentPage(p)}
                                                    className={pageBtn(p === safePage)}
                                                >
                                                    {p}
                                                </button>
                                            )
                                        )}
                                    </div>

                                    <button
                                        onClick={() => setCurrentPage(Math.min(totalPages, safePage + 1))}
                                        disabled={safePage === totalPages}
                                        className={navBtn(safePage === totalPages)}
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </main>
        </div>
    )
}