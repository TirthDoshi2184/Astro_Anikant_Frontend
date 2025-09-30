import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AdminSideNav } from './AdminSideNav' // Adjust path as needed
import {
    ArrowLeft,
    User,
    Phone,
    Mail,
    MapPin,
    Package,
    Star,
    Eye,
    ShoppingCart,
    Calendar,
    Clock,
    CheckCircle,
    XCircle,
    Gem,
    Scale,
    Ruler,
    Award,
    Tag,
    DollarSign,
    Warehouse,
    Image as ImageIcon
} from 'lucide-react'

export const AdminSingleOrder = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(true)

    const getOrder = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`https://astroanikantbackend-2.onrender.com/order/getsingleorder/${id}`)
            console.log("...",response.data.data);
            setOrder(response.data.data)
        } catch (error) {
            console.error('Error fetching order:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getOrder()
    }, [id])

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
        if (!dateString) return 'N/A'
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(amount)
    }

    if (loading) {
        return (
            <div className="flex min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100">
                <div className="fixed left-0 top-0 h-full z-10">
                    <AdminSideNav />
                </div>
                <div className="flex-1 ml-64 flex items-center justify-center">
                    <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mb-4"></div>
                        <span className="text-red-700 text-lg">Loading order details...</span>
                    </div>
                </div>
            </div>
        )
    }

    if (!order) {
        return (
            <div className="flex min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100">
                <div className="fixed left-0 top-0 h-full z-10">
                    <AdminSideNav />
                </div>
                <div className="flex-1 ml-64 flex items-center justify-center">
                    <div className="text-center">
                        <Package className="w-16 h-16 text-red-300 mx-auto mb-4" />
                        <p className="text-red-600 text-xl mb-2">Order not found</p>
                        <p className="text-red-400">The order you're looking for doesn't exist</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100">
            {/* Fixed Sidebar */}
            <div className="fixed left-0 top-0 h-full z-10">
                <AdminSideNav />
            </div>
            
            {/* Main Content */}
            <div className="flex-1 ml-64 p-8 overflow-y-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center space-x-4 mb-6">
                        <button 
                            onClick={() => navigate('/adminorders')}
                            className="p-2 bg-white/80 backdrop-blur-sm rounded-lg border border-amber-200 hover:bg-white transition-all duration-300 shadow-lg"
                        >
                            <ArrowLeft className="w-5 h-5 text-red-600" />
                        </button>
                        <div className="flex items-center space-x-3">
                            <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg">
                                <ShoppingCart className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-red-900">Order Details</h1>
                                <p className="text-red-700">Order ID: {order?._id}</p>
                            </div>
                        </div>
                    </div>

                    {/* Order Status Card */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-amber-200 mb-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <span className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(order?.status)}`}>
                                    {getStatusIcon(order?.status)}
                                    <span className="capitalize">{order?.status || 'Unknown'}</span>
                                </span>
                                <div className="flex items-center space-x-2 text-red-700">
                                    <Calendar className="w-4 h-4" />
                                    <span>Order Date: {formatDate(order?.order_dt)}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-red-600">Total Amount</p>
                                <p className="text-2xl font-bold text-red-900">
                                   {formatCurrency(
  order?.cart?.items?.[0]?.product?.discountedPrice || 
  order?.cart?.items?.[0]?.product?.price || 
  0
)}

                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Customer Details */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-amber-200">
                        <div className="p-6 border-b border-amber-200">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <User className="w-5 h-5 text-blue-600" />
                                </div>
                                <h2 className="text-xl font-bold text-red-900">Customer Information</h2>
                            </div>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex items-center space-x-3">
                                <User className="w-4 h-4 text-red-600" />
                                <div>
                                    <p className="text-sm text-red-600">Name</p>
                                    <p className="font-semibold text-red-900">{order?.cart?.user?.name || 'N/A'}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="w-4 h-4 text-red-600" />
                                <div>
                                    <p className="text-sm text-red-600">Email</p>
                                    <p className="font-semibold text-red-900">{order?.cart?.user?.email || 'N/A'}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="w-4 h-4 text-red-600" />
                                <div>
                                    <p className="text-sm text-red-600">Phone</p>
                                    <p className="font-semibold text-red-900">{order?.cart?.user?.phone || 'N/A'}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Tag className="w-4 h-4 text-red-600" />
                                <div>
                                    <p className="text-sm text-red-600">Gender</p>
                                    <p className="font-semibold text-red-900 capitalize">{order?.cart?.user?.gender || 'N/A'}</p>
                                </div>
                            </div>

                            {/* Address */}
                            <div className="border-t border-amber-200 pt-4">
                                <div className="flex items-center space-x-3 mb-3">
                                    <MapPin className="w-4 h-4 text-red-600" />
                                    <p className="font-semibold text-red-900">Delivery Address</p>
                                </div>
                                {order?.cart?.user?.address?.map((address, index) => (
                                    <div key={index} className="bg-amber-50 rounded-lg p-4 space-y-2">
                                        <p className="text-red-800">{address.street}</p>
                                        <p className="text-red-700">
                                            {address.city}, {address.state} - {address.pincode}
                                        </p>
                                        <p className="text-red-600">{address.country}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-amber-200">
                        <div className="p-6 border-b border-amber-200">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <Gem className="w-5 h-5 text-purple-600" />
                                </div>
                                <h2 className="text-xl font-bold text-red-900">Product Details</h2>
                            </div>
                        </div>
                        <div className="p-6">
                            {/* Product Images */}
                            {order?.cart?.items?.product?.images && order.cart.product.images.length > 0 && (
                                <div className="mb-6">
                                    <div className="flex items-center space-x-2 mb-3">
                                        <ImageIcon className="w-4 h-4 text-red-600" />
                                        <p className="font-semibold text-red-900">Product Images</p>
                                    </div>
                                    <div className="flex space-x-3 overflow-x-auto">
                                        {order.cart.items.product.images.map((image, index) => (
                                            <div key={index} className="flex-shrink-0">
                                                <img 
                                                    src={image.url} 
                                                    alt={image.alt || `Product image ${index + 1}`}
                                                    className="w-20 h-20 object-cover rounded-lg border-2 border-amber-200"
                                                />
                                                {image.isPrimary && (
                                                    <p className="text-xs text-center text-red-600 mt-1">Primary</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-red-600">Product Name</p>
                                    <p className="text-lg font-bold text-red-900">{order?.cart?.items?.[0]?.product?.name || 'N/A'}</p>
                                </div>
                                
                                <div>
                                    <p className="text-sm text-red-600">Description</p>
                                    <p className="text-red-800">{order?.cart?.items?.[0]?.product?.description || 'N/A'}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center space-x-2">
                                        <DollarSign className="w-4 h-4 text-green-600" />
                                        <div>
                                            <p className="text-sm text-red-600">Price</p>
                                            <p className="font-semibold text-red-900">
                                                {formatCurrency(order?.cart?.items?.[0]?.product?.price || 0)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Tag className="w-4 h-4 text-red-600" />
                                        <div>
                                            <p className="text-sm text-red-600">Discounted Price</p>
                                            <p className="font-semibold text-green-700">
                                                {formatCurrency(order?.cart?.items?.[0]?.product?.discountedPrice || 0)}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center space-x-2">
                                        <Warehouse className="w-4 h-4 text-blue-600" />
                                        <div>
                                            <p className="text-sm text-red-600">Stock</p>
                                            <p className="font-semibold text-red-900">{order?.cart?.items?.[0]?.product?.stock || 0}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Package className="w-4 h-4 text-purple-600" />
                                        <div>
                                            <p className="text-sm text-red-600">SKU</p>
                                            <p className="font-semibold text-red-900">{order?.cart?.items?.[0]?.product?.sku || 'N/A'}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-amber-200 pt-4">
                                    <h3 className="font-semibold text-red-900 mb-3">Gemstone Specifications</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center space-x-2">
                                            <Gem className="w-4 h-4 text-purple-600" />
                                            <div>
                                                <p className="text-sm text-red-600">Stone Type</p>
                                                <p className="font-semibold text-red-900">{order?.cart?.items?.[0]?.product?.stoneType || 'N/A'}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center space-x-2">
  <Scale className="w-4 h-4 text-amber-600" />
  <div>
    <p className="text-sm text-red-600">Weight</p>
    <p className="font-semibold text-red-900">
      {order?.cart?.items?.[0]?.product?.weight?.value || 'N/A'}{" "}
      {order?.cart?.items?.[0]?.product?.weight?.unit || ''}
    </p>
  </div>
</div>

{/* Dimensions */}
{order?.cart?.items?.[0]?.product?.dimensions && (
  <div className="flex items-center space-x-2">
    <Ruler className="w-4 h-4 text-blue-600" />
    <div>
      <p className="text-sm text-red-600">Dimensions</p>
      <p className="font-semibold text-red-900">
        {order?.cart?.items?.[0]?.product?.dimensions?.length} ×{" "}
        {order?.cart?.items?.[0]?.product?.dimensions?.width} ×{" "}
        {order?.cart?.items?.[0]?.product?.dimensions?.height}{" "}
        {order?.cart?.items?.[0]?.product?.dimensions?.unit}
      </p>
    </div>
  </div>
)}

{/* Certification */}
<div className="flex items-center space-x-2">
  <Award className="w-4 h-4 text-yellow-600" />
  <div>
    <p className="text-sm text-red-600">Certification</p>
    <p className="font-semibold text-red-900">
      {order?.cart?.items?.[0]?.product?.certification || 'N/A'}
    </p>
  </div>
</div>

{/* Usage */}
<div>
  <p className="text-sm text-red-600">Usage Instructions</p>
  <p className="text-red-800">
    {order?.cart?.items?.[0]?.product?.usage || 'N/A'}
  </p>
</div>

{/* Astrological Benefits */}
{order?.cart?.items?.[0]?.product?.astrologicalBenefits?.length > 0 && (
  <div>
    <p className="text-sm text-red-600">Astrological Benefits</p>
    <div className="flex flex-wrap gap-2 mt-1">
      {order.cart.items[0].product.astrologicalBenefits.map((benefit, index) => (
        <span
          key={index}
          className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs"
        >
          {benefit}
        </span>
      ))}
    </div>
  </div>
)}
                                   </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}