import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Phone, Mail, Calendar, Users, Star, CheckCircle, AlertCircle, Home, User } from 'lucide-react';

const BookVisitPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    birthdate: '',
    message: ''
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // API Base URL - Update this to your actual backend URL
  const API_BASE_URL = 'https://astroanikantbackend-2.onrender.com/visit'; // Change this to your backend URL

  const createVisit = async (visitData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/createvisit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(visitData),
      });

      if (!response.ok) {
        throw new Error('Failed to create visit');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  };


  const getSingleVisit = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/getsinglevisit/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch visit');
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  const deleteVisit = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/deletevisit/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete visit');
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  // Load all visits on component mount
  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.birthdate || !formData.message) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      const visitData = {
        name: formData.name,
        phone: parseInt(formData.phone),
        email: formData.email,
        birthdate: formData.birthdate,
        message: formData.message,
      };

      const result = await createVisit(visitData);

      if (result.message === "Visit Added Successfully") {
        setBookingDetails(result.data);
        setShowConfirmation(true);

        // Refresh the visits list
      } else {
        setError('Failed to book visit. Please try again.');
      }
    } catch (error) {
      setError(error.message || 'An error occurred while booking the visit');
    } finally {
      setLoading(false);
    }
  };


  const FloatingElement = ({ children, delay = 0 }) => (
    <div
      className="animate-bounce"
      style={{ animationDelay: `${delay}s`, animationDuration: '3s' }}
    >
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEF7D7] via-white to-[#FEF7D7]">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#9C0B13] to-red-800 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-20 animate-ping"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-orange-400 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-pink-400 rounded-full opacity-25 animate-bounce"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            <FloatingElement>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Book Consultation
              </h1>
            </FloatingElement>
            <p className="text-xl md:text-2xl mb-8 text-yellow-100">
              Expert Astrologers at Your Fingertips
            </p>
            <div className="flex justify-center space-x-8 text-lg flex-wrap gap-4">
              <div className="flex items-center animate-fadeIn">
                <Home className="mr-2 text-yellow-400" />
                <span>Home Consultations</span>
              </div>
              <div className="flex items-center animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                <User className="mr-2 text-green-400" />
                <span>Expert Astrologers</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Form Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#9C0B13] mb-4">Book Your Consultation </h2>
              <p className="text-xl text-gray-600">Fill in your details and we'll bring the expertise</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            {!showConfirmation ? (
              <div className="space-y-8">
                {/* Personal Details */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl shadow-lg">
                  <h3 className="text-2xl font-bold text-[#9C0B13] mb-6">Personal Information</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[#9C0B13] font-bold mb-2">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-3 border-2 border-[#9C0B13] rounded-lg focus:ring-4 focus:ring-red-200 transition-all duration-300"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-[#9C0B13] font-bold mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full p-3 border-2 border-[#9C0B13] rounded-lg focus:ring-4 focus:ring-red-200 transition-all duration-300"
                        placeholder="Enter 10-digit phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-[#9C0B13] font-bold mb-2">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-3 border-2 border-[#9C0B13] rounded-lg focus:ring-4 focus:ring-red-200 transition-all duration-300"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-[#9C0B13] font-bold mb-2">Date of Birth *</label>
                      <input
                        type="date"
                        required
                        value={formData.birthdate}
                        onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
                        className="w-full p-3 border-2 border-[#9C0B13] rounded-lg focus:ring-4 focus:ring-red-200 transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Consultation Purpose */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl shadow-lg">
                  <h3 className="text-2xl font-bold text-[#9C0B13] mb-6 flex items-center">
                    <User className="mr-3 animate-pulse" />
                    Purpose of Consultation
                  </h3>
                  <div>
                    <label className="block text-[#9C0B13] font-bold mb-2">Tell us about your consultation needs *</label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({
                        ...formData,
                        message: e.target.value
                      })}
                      rows={4}
                      className="w-full p-3 border-2 border-[#9C0B13] rounded-lg focus:ring-4 focus:ring-red-200 transition-all duration-300"
                      placeholder="Describe what you'd like to discuss - career, relationships, health, business, etc."
                    />
                  </div>
                </div>



                {/* Payment Summary */}
                <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-2xl shadow-lg">
                  <h3 className="text-2xl font-bold text-[#9C0B13] mb-4">Payment Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Fee:</span>
                      <span className="font-bold text-[#9C0B13]">₹11</span>
                    </div>
                    <div className="border-t-2 border-[#9C0B13] pt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-[#9C0B13]">Total Amount:</span>
                        <span className="text-2xl font-bold text-[#9C0B13]">₹11</span>
                      </div>
                    </div>
                  </div>
                </div>
{/* Terms & Conditions */}
<div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-2xl shadow-lg">
  <h3 className="text-2xl font-bold text-[#9C0B13] mb-4 flex items-center">
    <AlertCircle className="mr-3 text-yellow-500" />
    Terms & Conditions
  </h3>
  <div className="space-y-3">
    <div className="flex items-start">
      <input
        type="checkbox"
        id="terms"
        checked={acceptedTerms}
        onChange={(e) => setAcceptedTerms(e.target.checked)}
        className="mt-1 mr-3 h-4 w-4 text-[#9C0B13] focus:ring-[#9C0B13] border-2 border-[#9C0B13] rounded"
        required
      />
      <label htmlFor="terms" className="text-gray-700 text-sm leading-relaxed">
        <span className="text-red-500">*</span> I agree to the{' '}
        <button
          type="button"
          className="text-[#9C0B13] underline hover:text-red-800 font-medium"
          onClick={() => {
            window.open('/terms', '_blank');
          }}
        >
          Terms & Conditions
        </button>
        {' '}and{' '}
        <button
          type="button"
          className="text-[#9C0B13] underline hover:text-red-800 font-medium"
          onClick={() => {
            window.open('/privacy', '_blank');
          }}
        >
          Privacy Policy
        </button>
      </label>
    </div>
  </div>
</div>
                {/* Submit Button */}
                <div className="text-center">
                 <button
  onClick={handleSubmit}
  disabled={loading || !formData.name || !formData.phone || !formData.email || !formData.birthdate || !formData.message || !acceptedTerms}
  className="bg-gradient-to-r from-[#9C0B13] to-red-800 text-white px-12 py-4 rounded-2xl font-bold text-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
>
  {loading ? 'Booking...' : 'Confirm Booking - ₹11'}
</button>
                </div>
              </div>
            ) : (
              /* Confirmation Section */
              <div className="text-center bg-gradient-to-r from-green-50 to-emerald-50 p-12 rounded-3xl shadow-2xl">
                <CheckCircle className="mx-auto text-green-600 mb-6 animate-bounce" size={80} />
                <h3 className="text-3xl font-bold text-green-800 mb-4">Consultation Confirmed!</h3>
                <p className="text-xl text-green-700 mb-6">Your booking has been successfully created</p>

                {bookingDetails && (
                  <div className="bg-white p-6 rounded-2xl shadow-lg inline-block text-left max-w-md">
                    <h4 className="font-bold text-[#9C0B13] mb-3">Booking Details:</h4>
                    <div className="space-y-2 text-gray-700">
                      <p><strong>Name:</strong> {bookingDetails.name}</p>
                      <p><strong>Phone:</strong> {bookingDetails.phone}</p>
                      <p><strong>Email:</strong> {bookingDetails.email}</p>
                      <p><strong>Date of Birth:</strong> {bookingDetails.birthdate}</p>
                      <p><strong>Message:</strong> {bookingDetails.message}</p>
                      <p><strong>Amount:</strong> ₹{bookingDetails.amount}</p>
                      <p><strong>Status:</strong> {bookingDetails.status}</p>
                      <p><strong>Booking ID:</strong> #{bookingDetails._id}</p>
                    </div>
                  </div>
                )}

                <div className="mt-8 text-gray-600 space-y-2">
                  <p>📧 Confirmation email sent to {formData.email}</p>
                  <p>📱 We will call you to confirm the appointment details</p>
                  <p>🏠 Please ensure someone is available at the given address</p>
                  <p>💼 Our astrologer will carry all necessary items for the consultation</p>
                </div>

                <div className="mt-8">
                  <button
                    onClick={() => {
                      setShowConfirmation(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        birthdate: '',
                        message: ''
                      });
                      setBookingDetails(null);
                    }}
                    className="bg-gradient-to-r from-[#9C0B13] to-red-800 text-white px-8 py-3 rounded-xl font-bold hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Book Another Consultation
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>


      {/* Service Guidelines Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#9C0B13] text-center mb-12">Important Guidelines</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-r from-[#FEF7D7] to-yellow-50 p-6 rounded-2xl shadow-lg">
                <div className="flex items-center mb-4">
                  <Home className="text-blue-500 mr-3" />
                  <h3 className="text-xl font-bold text-[#9C0B13]">Before the Visit</h3>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li>• Ensure clean and peaceful space for consultation</li>
                  <li>• Keep birth details ready (date, time, place)</li>
                  <li>• Prepare any specific questions or concerns</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-[#FEF7D7] p-6 rounded-2xl shadow-lg">
                <div className="flex items-center mb-4">
                  <Clock className="text-orange-500 mr-3" />
                  <h3 className="text-xl font-bold text-[#9C0B13]">Flexible Consultation</h3>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li>• Instant access from the comfort of your home</li>
                  <li>• Choose chat, audio, or video as per your preference</li>
                  <li>• We will get in touch with you as soon as possible</li>
                </ul>
              </div>

            </div>

            <div className="mt-12 text-center">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-[#9C0B13] mb-4">Contact Information</h3>
                <div className="">

                  <div className="flex items-center justify-center">
                    <span className="text-lg font-semibold">📧 astroanekant@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookVisitPage;