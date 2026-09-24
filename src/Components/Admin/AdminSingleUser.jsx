import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import {
  User,
  Mail,
  Phone,
  ShoppingBag,
  Trash2,
  Edit,
  CheckCheckIcon,
  MapPin,
  VenusAndMars,
  Package,
} from 'lucide-react'
import AdminSidebar from './AdminSidePanel'

const API = 'https://astroanikantbackend-2.onrender.com'

const STATUS_STYLES = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
  processing: 'bg-purple-100 text-purple-800 border-purple-200',
  shipped: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  completed: 'bg-green-100 text-green-800 border-green-200',
  delivered: 'bg-green-100 text-green-800 border-green-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
}

const normalizeStatus = (s) => s?.toString().toLowerCase().trim() || 'unknown'

const formatDate = (d) => {
  if (!d) return 'N/A'
  const date = new Date(d)
  if (isNaN(date.getTime())) return 'N/A'
  return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })
}

// Orders don't reliably store `amount`, so fall back to summing the cart items
const getOrderTotal = (order) => {
  if (Number(order?.amount) > 0) return Number(order.amount)
  const items = order?.cart?.items || []
  return items.reduce((sum, item) => {
    const p = item?.product
    const price = Number(p?.discountedPrice) > 0 ? Number(p.discountedPrice) : Number(p?.price) || 0
    return sum + price * (item?.quantity || 1)
  }, 0)
}

const InfoTile = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-red-50 to-amber-50 rounded-xl">
    <Icon className="text-red-600 mt-1 shrink-0" size={18} />
    <div className="min-w-0">
      <p className="text-sm text-red-600 font-medium">{label}</p>
      <p className="font-semibold text-red-900 break-words">{value}</p>
    </div>
  </div>
)

export const AdminSingleUser = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [user, setUser] = useState(null)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [ordersError, setOrdersError] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      setLoading(true)
      setError('')
      setOrdersError('')

      // Load user and orders independently so one failing doesn't hide the other
      const [userRes, ordersRes] = await Promise.allSettled([
        axios.get(`${API}/user/getsingleuser/${id}`),
        axios.get(`${API}/order/user/${id}`),
      ])
      if (cancelled) return

      if (userRes.status === 'fulfilled') {
        setUser(userRes.value.data?.data || null)
      } else {
        console.error('User fetch failed:', userRes.reason)
        setError('Could not load this user.')
      }

      if (ordersRes.status === 'fulfilled') {
        setOrders(Array.isArray(ordersRes.value.data?.data) ? ordersRes.value.data.data : [])
      } else {
        console.error('Orders fetch failed:', ordersRes.reason)
        setOrdersError('Could not load order history.')
      }

      setLoading(false)
    }

    load()
    return () => {
      cancelled = true
    }
  }, [id])

  const handleDeleteClick = async () => {
    if (!window.confirm('Are you sure you want to delete this user?')) return
    try {
      await axios.delete(`${API}/user/deleteuser/${id}`)
      navigate('/adminusers')
    } catch (err) {
      console.error(err)
      alert(`Failed to delete user: ${err.response?.data?.message || err.message}`)
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600" />
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100">
      <AdminSidebar activeMenuItem="users" />

      {/* Main area: offset for the fixed sidebar only on large screens */}
      <div className="flex-1 lg:ml-64 flex flex-col h-screen min-w-0">
        {/* Header (pt-16 on mobile leaves room for the sidebar's menu button) */}
        <div className="bg-gradient-to-r from-red-900 via-red-800 to-red-900 shadow-2xl flex-shrink-0">
          <div className="px-4 sm:px-8 pt-16 pb-5 lg:py-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-amber-50">User Details</h1>
            <p className="text-amber-200 text-sm sm:text-base">View and manage user information</p>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8">
            {error || !user ? (
              <div className="bg-white/80 rounded-2xl border-2 border-red-900/20 p-10 text-center">
                <p className="text-red-700">{error || 'User not found.'}</p>
              </div>
            ) : (
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-red-900/20 overflow-hidden">
                {/* User header */}
                <div className="px-4 sm:px-6 py-6 sm:py-8 bg-gradient-to-r from-red-800 to-red-900 text-amber-50">
                  <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                    <div className="bg-amber-400/20 rounded-full p-5 shrink-0">
                      <User size={40} className="text-amber-300" />
                    </div>
                    <div className="text-center sm:text-left min-w-0">
                      <h2 className="text-xl sm:text-2xl font-bold text-amber-50 break-words">
                        {user.name || 'User Name'}
                      </h2>
                      <p className="mt-1 text-amber-200 break-all">{user.email || 'user@example.com'}</p>
                      <p className="mt-2 text-xs bg-amber-400/20 rounded-full px-3 py-1 inline-block text-amber-100">
                        ID: {user._id?.slice(-8) || 'Unknown'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  {/* User information */}
                  <h3 className="text-lg font-semibold mb-4 text-red-900 flex items-center">
                    <User size={18} className="mr-2 text-red-600" />
                    User Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <InfoTile icon={User} label="Full Name" value={user.name || 'Not provided'} />
                    <InfoTile icon={Mail} label="Email Address" value={user.email || 'Not provided'} />
                    <InfoTile icon={Phone} label="Mobile Number" value={user.phone || 'Not provided'} />
                    <InfoTile icon={VenusAndMars} label="Gender" value={user.gender || 'Not provided'} />
                    <InfoTile
                      icon={CheckCheckIcon}
                      label="Status"
                      value={user.isActive === true ? 'Active' : 'Inactive'}
                    />

                    <div className="space-y-3">
                      {user.address?.length > 0 ? (
                        user.address.map((addr, index) => (
                          <InfoTile
                            key={index}
                            icon={MapPin}
                            label={`Address ${index + 1}`}
                            value={[addr.societyName, addr.street, addr.city, addr.state, addr.pincode, addr.country]
                              .filter(Boolean)
                              .join(', ')}
                          />
                        ))
                      ) : (
                        <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-red-50 to-amber-50 rounded-xl">
                          <MapPin className="text-gray-400 mt-1" size={18} />
                          <p className="text-gray-500">No addresses provided</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Order history */}
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4 text-red-900 flex items-center">
                      <ShoppingBag size={18} className="mr-2 text-red-600" />
                      Order History ({orders.length})
                    </h3>

                    {ordersError ? (
                      <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
                        {ordersError}
                      </div>
                    ) : orders.length > 0 ? (
                      <div className="bg-gradient-to-r from-red-50 to-amber-50 rounded-xl p-3 sm:p-4 space-y-4">
                        {orders.map((order) => {
                          const items = order?.cart?.items || []
                          return (
                            <div
                              key={order._id}
                              className="bg-white p-4 rounded-xl border-2 border-red-100 hover:border-red-200 transition-colors"
                            >
                              <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                                <div>
                                  <p className="font-semibold text-red-900">
                                    Order #{order._id?.slice(-8) || 'N/A'}
                                  </p>
                                  <p className="text-xs text-red-600">{formatDate(order.order_dt)}</p>
                                </div>
                                <span
                                  className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border capitalize ${
                                    STATUS_STYLES[normalizeStatus(order.status)] ||
                                    'bg-gray-100 text-gray-800 border-gray-200'
                                  }`}
                                >
                                  {order.status || 'Unknown'}
                                </span>
                              </div>

                              <ul className="space-y-1 mb-3">
                                {items.length > 0 ? (
                                  items.map((item, i) => (
                                    <li key={item._id || i} className="flex items-center gap-2 text-sm text-red-800">
                                      <Package className="w-4 h-4 text-amber-600 shrink-0" />
                                      <span className="min-w-0 break-words">
                                        {item?.product?.name || 'Product unavailable'}
                                      </span>
                                      <span className="text-red-500 shrink-0">× {item?.quantity || 1}</span>
                                    </li>
                                  ))
                                ) : (
                                  <li className="text-sm text-red-500">No items found for this order</li>
                                )}
                              </ul>

                              <div className="flex items-center justify-between gap-3 pt-3 border-t border-red-100">
                                <Link
                                  to={`/adminorders/${order._id}`}
                                  className="text-sm font-medium text-red-700 hover:text-red-900 underline"
                                >
                                  View order
                                </Link>
                                <div className="text-right">
                                  <p className="text-xs text-red-600 font-medium">Total</p>
                                  <p className="text-lg sm:text-xl font-bold text-red-900">
                                    ₹{getOrderTotal(order).toLocaleString('en-IN')}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    ) : (
                      <div className="bg-gradient-to-r from-red-50 to-amber-50 rounded-xl p-8 text-center">
                        <ShoppingBag size={32} className="mx-auto text-red-400 mb-2" />
                        <p className="text-red-600 font-medium">No orders have been placed by this user</p>
                        <p className="text-red-500 text-sm mt-1">User hasn't made any purchases yet</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="px-4 sm:px-6 py-4 bg-gradient-to-r from-red-50 to-amber-50 border-t-2 border-red-200 flex flex-col sm:flex-row gap-3 sm:justify-end">
                  <button
                    onClick={handleDeleteClick}
                    className="flex items-center justify-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors shadow-lg"
                  >
                    <Trash2 size={18} className="mr-2" />
                    Delete User
                  </button>
                  <Link
                    to={`/adminupdateuser/${id}`}
                    className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-red-800 to-red-900 text-amber-50 rounded-xl shadow-lg"
                  >
                    <Edit size={18} className="mr-2" />
                    Update User
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}