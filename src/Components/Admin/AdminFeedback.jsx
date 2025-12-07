import React, { useState, useEffect } from "react";
import {
  Mail,
  Eye,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle,
  Search,
  Filter,
  RefreshCw,
  Calendar,
  MessageSquare,
  TrendingUp,
  Users,
  Star,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import axios from "axios";
import AdminSidebar from "./AdminSidePanel";

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    reviewed: 0,
    resolved: 0,
    unread: 0,
  });

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [readFilter, setReadFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Modal states
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [feedbackToDelete, setFeedbackToDelete] = useState(null);

  // Update states
  const [updateData, setUpdateData] = useState({
    status: "",
    adminNotes: "",
    rating: null,
  });

  useEffect(() => {
    fetchFeedbackData();
    fetchStats();
  }, []);

  useEffect(() => {
    filterFeedbacks();
  }, [feedbacks, searchTerm, statusFilter, readFilter]);

  const fetchFeedbackData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://astroanikantbackend-2.onrender.com/feedback/all"
      );
      setFeedbacks(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching feedback:", error);
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(
        "https://astroanikantbackend-2.onrender.com/feedback/stats"
      );
      setStats(response.data.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const filterFeedbacks = () => {
    let filtered = [...feedbacks];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (fb) =>
          fb.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          fb.feedback.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((fb) => fb.status === statusFilter);
    }

    // Read filter
    if (readFilter !== "all") {
      filtered = filtered.filter((fb) =>
        readFilter === "read" ? fb.isRead : !fb.isRead
      );
    }

    setFilteredFeedbacks(filtered);
  };

  const handleViewDetails = async (feedback) => {
    setSelectedFeedback(feedback);
    setUpdateData({
      status: feedback.status,
      adminNotes: feedback.adminNotes || "",
      rating: feedback.rating || null,
    });
    setShowDetailModal(true);

    // Mark as read
    if (!feedback.isRead) {
      try {
        await axios.put(
          `https://astroanikantbackend-2.onrender.com/feedback/${feedback._id}`,
          { isRead: true }
        );
        fetchFeedbackData();
        fetchStats();
      } catch (error) {
        console.error("Error marking as read:", error);
      }
    }
  };

  const handleUpdateFeedback = async () => {
    try {
      await axios.put(
        `https://astroanikantbackend-2.onrender.com/feedback/${selectedFeedback._id}`,
        updateData
      );
      alert("Feedback updated successfully!");
      setShowDetailModal(false);
      fetchFeedbackData();
      fetchStats();
    } catch (error) {
      console.error("Error updating feedback:", error);
      alert("Failed to update feedback");
    }
  };

  const handleDeleteClick = (feedback) => {
    setFeedbackToDelete(feedback);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(
        `https://astroanikantbackend-2.onrender.com/feedback/${feedbackToDelete._id}`
      );
      alert("Feedback deleted successfully!");
      setShowDeleteConfirm(false);
      setFeedbackToDelete(null);
      fetchFeedbackData();
      fetchStats();
    } catch (error) {
      console.error("Error deleting feedback:", error);
      alert("Failed to delete feedback");
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        icon: Clock,
        label: "Pending",
      },
      reviewed: {
        bg: "bg-blue-100",
        text: "text-blue-800",
        icon: Eye,
        label: "Reviewed",
      },
      resolved: {
        bg: "bg-green-100",
        text: "text-green-800",
        icon: CheckCircle,
        label: "Resolved",
      },
    };
    const badge = badges[status] || badges.pending;
    const Icon = badge.icon;

    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${badge.bg} ${badge.text}`}
      >
        <Icon className="w-4 h-4 mr-1" />
        {badge.label}
      </span>
    );
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFeedbacks.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredFeedbacks.length / itemsPerPage);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#FEF7D7] to-yellow-50">
        <AdminSidebar activeMenuItem="feedback"/>
      <div className="ml-64 flex-1 p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-[#9C0B13] mb-2">
                Customer Feedback Management
              </h1>
              <p className="text-gray-600">
                Monitor and respond to customer feedback
              </p>
            </div>
            <button
              onClick={() => {
                fetchFeedbackData();
                fetchStats();
              }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#9C0B13] to-red-700 text-[#FEF7D7] rounded-xl font-semibold hover:from-red-700 hover:to-[#9C0B13] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <RefreshCw className="w-5 h-5" />
              Refresh
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#9C0B13]/10 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-1">
                    Total Feedback
                  </p>
                  <p className="text-3xl font-bold text-[#9C0B13]">
                    {stats.total}
                  </p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-[#9C0B13] to-red-700 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-7 h-7 text-[#FEF7D7]" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-yellow-500/20 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-1">
                    Pending
                  </p>
                  <p className="text-3xl font-bold text-yellow-600">
                    {stats.pending}
                  </p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center">
                  <Clock className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-500/20 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-1">
                    Reviewed
                  </p>
                  <p className="text-3xl font-bold text-blue-600">
                    {stats.reviewed}
                  </p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                  <Eye className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-500/20 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-1">
                    Resolved
                  </p>
                  <p className="text-3xl font-bold text-green-600">
                    {stats.resolved}
                  </p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-red-500/20 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-1">
                    Unread
                  </p>
                  <p className="text-3xl font-bold text-red-600">
                    {stats.unread}
                  </p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#9C0B13]/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by email or feedback..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-[#FEF7D7]/30 border-2 border-[#9C0B13]/20 rounded-xl text-[#9C0B13] placeholder-gray-500 focus:outline-none focus:border-[#9C0B13] transition-all duration-300"
                />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-[#FEF7D7]/30 border-2 border-[#9C0B13]/20 rounded-xl text-[#9C0B13] focus:outline-none focus:border-[#9C0B13] transition-all duration-300 appearance-none cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>

              {/* Read Filter */}
              <div className="relative">
                <Eye className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={readFilter}
                  onChange={(e) => setReadFilter(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-[#FEF7D7]/30 border-2 border-[#9C0B13]/20 rounded-xl text-[#9C0B13] focus:outline-none focus:border-[#9C0B13] transition-all duration-300 appearance-none cursor-pointer"
                >
                  <option value="all">All Feedback</option>
                  <option value="unread">Unread Only</option>
                  <option value="read">Read Only</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Table */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-[#9C0B13]/10 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#9C0B13] border-t-transparent"></div>
            </div>
          ) : currentItems.length === 0 ? (
            <div className="text-center py-20">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-xl text-gray-500">No feedback found</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-[#9C0B13] to-red-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-[#FEF7D7] uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-[#FEF7D7] uppercase tracking-wider">
                        Feedback
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-[#FEF7D7] uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-[#FEF7D7] uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-[#FEF7D7] uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {currentItems.map((feedback, index) => (
                      <tr
                        key={feedback._id}
                        className={`hover:bg-[#FEF7D7]/30 transition-colors duration-200 ${
                          !feedback.isRead ? "bg-yellow-50/50" : ""
                        }`}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <Mail className="w-5 h-5 text-[#9C0B13] mr-2" />
                            <span className="font-medium text-gray-900">
                              {feedback.email}
                            </span>
                            {!feedback.isRead && (
                              <span className="ml-2 w-2 h-2 bg-red-500 rounded-full"></span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-gray-700 line-clamp-2 max-w-md">
                            {feedback.feedback}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(feedback.status)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center text-gray-600 text-sm">
                            <Calendar className="w-4 h-4 mr-2" />
                            {formatDate(feedback.createdAt)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleViewDetails(feedback)}
                              className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors duration-200"
                              title="View Details"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(feedback)}
                              className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors duration-200"
                              title="Delete"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-4 bg-[#FEF7D7]/30 border-t-2 border-[#9C0B13]/10">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                      Showing {indexOfFirstItem + 1} to{" "}
                      {Math.min(indexOfLastItem, filteredFeedbacks.length)} of{" "}
                      {filteredFeedbacks.length} entries
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-white border-2 border-[#9C0B13]/20 rounded-lg text-[#9C0B13] font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FEF7D7]/50 transition-all duration-200"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      {[...Array(totalPages)].map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentPage(index + 1)}
                          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                            currentPage === index + 1
                              ? "bg-gradient-to-r from-[#9C0B13] to-red-700 text-[#FEF7D7]"
                              : "bg-white border-2 border-[#9C0B13]/20 text-[#9C0B13] hover:bg-[#FEF7D7]/50"
                          }`}
                        >
                          {index + 1}
                        </button>
                      ))}
                      <button
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                          )
                        }
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-white border-2 border-[#9C0B13]/20 rounded-lg text-[#9C0B13] font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FEF7D7]/50 transition-all duration-200"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedFeedback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-[#9C0B13] to-red-700 px-8 py-6 rounded-t-3xl flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#FEF7D7]">
                Feedback Details
              </h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="w-10 h-10 bg-[#FEF7D7]/20 rounded-full flex items-center justify-center hover:bg-[#FEF7D7]/30 transition-all duration-200"
              >
                <X className="w-6 h-6 text-[#FEF7D7]" />
              </button>
            </div>

            <div className="p-8 space-y-6">
              {/* Customer Info */}
              <div className="bg-[#FEF7D7]/30 rounded-2xl p-6 border-2 border-[#9C0B13]/10">
                <h3 className="text-lg font-bold text-[#9C0B13] mb-4 flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  Customer Information
                </h3>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <span className="font-semibold">Email:</span>{" "}
                    {selectedFeedback.email}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Submitted:</span>{" "}
                    {formatDate(selectedFeedback.createdAt)}
                  </p>
                  <p className="text-gray-700 flex items-center">
                    <span className="font-semibold mr-2">Status:</span>
                    {getStatusBadge(selectedFeedback.status)}
                  </p>
                </div>
              </div>

              {/* Feedback Content */}
              <div className="bg-white rounded-2xl p-6 border-2 border-[#9C0B13]/10">
                <h3 className="text-lg font-bold text-[#9C0B13] mb-4 flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Feedback Message
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {selectedFeedback.feedback}
                </p>
              </div>

              {/* Update Form */}
              <div className="bg-[#FEF7D7]/30 rounded-2xl p-6 border-2 border-[#9C0B13]/10">
                <h3 className="text-lg font-bold text-[#9C0B13] mb-4">
                  Update Feedback
                </h3>

                <div className="space-y-4">
                  {/* Status Update */}
                  <div>
                    <label className="block text-sm font-semibold text-[#9C0B13] mb-2">
                      Status
                    </label>
                    <select
                      value={updateData.status}
                      onChange={(e) =>
                        setUpdateData({ ...updateData, status: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white border-2 border-[#9C0B13]/20 rounded-xl text-[#9C0B13] focus:outline-none focus:border-[#9C0B13] transition-all duration-300"
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-semibold text-[#9C0B13] mb-2">
                      Rating (Optional)
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          onClick={() =>
                            setUpdateData({ ...updateData, rating })
                          }
                          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
                            updateData.rating >= rating
                              ? "bg-yellow-400 text-white"
                              : "bg-gray-200 text-gray-400 hover:bg-gray-300"
                          }`}
                        >
                          <Star
                            className={`w-6 h-6 ${
                              updateData.rating >= rating ? "fill-current" : ""
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Admin Notes */}
                  <div>
                    <label className="block text-sm font-semibold text-[#9C0B13] mb-2">
                      Admin Notes
                    </label>
                    <textarea
                      value={updateData.adminNotes}
                      onChange={(e) =>
                        setUpdateData({
                          ...updateData,
                          adminNotes: e.target.value,
                        })
                      }
                      rows="4"
                      placeholder="Add internal notes about this feedback..."
                      className="w-full px-4 py-3 bg-white border-2 border-[#9C0B13]/20 rounded-xl text-[#9C0B13] placeholder-gray-400 focus:outline-none focus:border-[#9C0B13] transition-all duration-300 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleUpdateFeedback}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-[#9C0B13] to-red-700 text-[#FEF7D7] rounded-xl font-bold hover:from-red-700 hover:to-[#9C0B13] transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="px-6 py-4 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && feedbackToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-[#9C0B13] mb-2">
                Delete Feedback?
              </h2>
              <p className="text-gray-600">
                Are you sure you want to delete this feedback? This action cannot be undone.
              </p>
            </div>
            <div className="bg-[#FEF7D7]/30 rounded-xl p-4 mb-6 border-2 border-[#9C0B13]/10">
          <p className="text-sm text-gray-700 mb-2">
            <span className="font-semibold">Email:</span>{" "}
            {feedbackToDelete.email}
          </p>
          <p className="text-sm text-gray-700 line-clamp-2">
            <span className="font-semibold">Feedback:</span>{" "}
            {feedbackToDelete.feedback}
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleDeleteConfirm}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Yes, Delete
          </button>
          <button
            onClick={() => {
              setShowDeleteConfirm(false);
              setFeedbackToDelete(null);
            }}
            className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-all duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )}
</div>
    );
};

export default AdminFeedback;