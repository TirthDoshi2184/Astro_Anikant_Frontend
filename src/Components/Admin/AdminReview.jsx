import { useEffect, useState } from "react";
import { Users, Package, ShoppingCart, Star, Moon, Sun, Home, BarChart3, LogOut, Trash2, Search, Filter, MessageSquare, ThumbsUp, Calendar, User, ShoppingBag } from "lucide-react";
import AdminSidebar from "./AdminSidePanel";

export const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRating, setFilterRating] = useState("all");
  const [activeMenuItem, setActiveMenuItem] = useState('reviews');
  const [deleteLoading, setDeleteLoading] = useState(null);

  const getAllReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:1921/review/all");
      const data = await response.json();
      setReviews(data.data);
      setFilteredReviews(data.data);
      console.log("Reviews", data.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteReview = async (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        setDeleteLoading(reviewId);
        const response = await fetch(`http://localhost:1921/review/delete/${reviewId}`, {
          method: 'DELETE'
        });
        const data = await response.json();
        
        if (data.success) {
          setReviews(reviews.filter(review => review._id !== reviewId));
          setFilteredReviews(filteredReviews.filter(review => review._id !== reviewId));
          alert("Review deleted successfully!");
        } else {
          alert("Failed to delete review");
        }
      } catch (error) {
        console.error("Error deleting review:", error);
        alert("Failed to delete review");
      } finally {
        setDeleteLoading(null);
      }
    }
  };

  useEffect(() => {
    getAllReviews();
  }, []);

  useEffect(() => {
    let filtered = reviews;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(review =>
        review.comment?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.product?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by rating
    if (filterRating !== "all") {
      filtered = filtered.filter(review => review.rating === parseInt(filterRating));
    }

    setFilteredReviews(filtered);
  }, [searchTerm, filterRating, reviews]);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, link: '/admindashboard' },
    { id: 'users', label: 'Users', icon: Users, link: '/adminusers' },
    { id: 'products', label: 'Products', icon: Star, link: '/adminproducts' },
    { id: 'inquiry', label: 'Visits', icon: Moon, link: '/adminvisits' },
    { id: 'orders', label: 'Orders Booked', icon: ShoppingBag, link: '/adminorders' },
    { id: 'reviews', label: 'Reviews', icon: MessageSquare, link: '/adminreviews' },
    { id: 'product-requests', label: 'Product Requests', icon: Package, link: '/adminproductrequest' },
    { id: 'logout', label: 'Logout', icon: LogOut, link: '/adminlogin' }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
      />
    ));
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating]++;
    });
    return distribution;
  };

  const CardSkeleton = () => (
    <div className="h-48 bg-gradient-to-br from-red-100 to-amber-100 animate-pulse rounded-2xl shadow-lg"></div>
  );

  return (
    <div className="flex h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100">
      {/* Sidebar */}
        <AdminSidebar activeMenuItem={activeMenuItem} />
      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col h-screen">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-900 via-red-800 to-red-900 shadow-2xl flex-shrink-0">
          <div className="px-6 py-8">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                  <MessageSquare className="w-6 h-6 text-red-900" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-amber-300 to-yellow-400 rounded-full opacity-30 blur-sm"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-amber-50">Reviews Management</h1>
                <p className="text-amber-200">Monitor and manage customer feedback</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 max-w-7xl mx-auto">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-red-800 to-red-900 rounded-2xl p-6 text-amber-50 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-amber-200 text-sm">Total Reviews</p>
                    <p className="text-3xl font-bold">{reviews.length}</p>
                  </div>
                  <MessageSquare className="w-8 h-8 text-amber-300" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl p-6 text-red-900 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-700 text-sm">Average Rating</p>
                    <p className="text-3xl font-bold">{getAverageRating()}</p>
                  </div>
                  <Star className="w-8 h-8 text-red-700 fill-red-700" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-700 to-red-800 rounded-2xl p-6 text-amber-50 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-amber-200 text-sm">5 Star Reviews</p>
                    <p className="text-3xl font-bold">{getRatingDistribution()[5]}</p>
                  </div>
                  <ThumbsUp className="w-8 h-8 text-amber-300" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-900 to-red-800 rounded-2xl p-6 text-amber-50 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-amber-200 text-sm">This Month</p>
                    <p className="text-3xl font-bold">
                      {reviews.filter(r => new Date(r.createdAt).getMonth() === new Date().getMonth()).length}
                    </p>
                  </div>
                  <Calendar className="w-8 h-8 text-amber-300" />
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl p-6 mb-6 border-2 border-red-900/20">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-700 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search reviews, users, or products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-red-200 rounded-xl focus:outline-none focus:border-red-500 text-red-900"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-700 w-5 h-5" />
                  <select
                    value={filterRating}
                    onChange={(e) => setFilterRating(e.target.value)}
                    className="pl-10 pr-8 py-3 border-2 border-red-200 rounded-xl focus:outline-none focus:border-red-500 text-red-900 bg-white appearance-none cursor-pointer"
                  >
                    <option value="all">All Ratings</option>
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Reviews List */}
            {loading ? (
              <div className="grid grid-cols-1 gap-6">
                {[...Array(3)].map((_, i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            ) : filteredReviews.length === 0 ? (
              <div className="bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl p-12 text-center border-2 border-red-900/20">
                <MessageSquare className="w-16 h-16 text-red-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-red-900 mb-2">No Reviews Found</h3>
                <p className="text-red-700">There are no reviews matching your criteria.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredReviews.map((review) => (
                  <div
                    key={review._id}
                    className="bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl p-6 border-2 border-red-900/20 hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-red-800 to-red-900 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-amber-300" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-red-900">
                              {review.user?.name || 'Anonymous User'}
                            </h3>
                            <p className="text-sm text-red-700">{review.user?.email}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                          {renderStars(review.rating)}
                          <span className="text-sm font-semibold text-red-900 ml-2">
                            {review.rating}.0
                          </span>
                        </div>

                        <div className="bg-amber-50 rounded-xl p-4 mb-3">
                          <p className="text-red-900 leading-relaxed">{review.comment}</p>
                        </div>

                        <div className="flex items-center gap-6 text-sm text-red-700">
                          <div className="flex items-center gap-2">
                            <Package className="w-4 h-4" />
                            <span className="font-medium">{review.product?.name || 'Product'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(review.createdAt)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <ThumbsUp className="w-4 h-4" />
                            <span>{review.helpful || 0} helpful</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => deleteReview(review._id)}
                        disabled={deleteLoading === review._id}
                        className="ml-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                        {deleteLoading === review._id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReviews;