import React, { useState } from 'react';
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
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [visitId, setVisitId] = useState(null);
  const [upiTransactionId, setUpiTransactionId] = useState('');

  const API_BASE_URL = 'https://astroanikantbackend-2.onrender.com/visit';

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    if (!formData.name || !formData.email || !formData.phone || !formData.birthdate || !formData.message) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }
    if (!acceptedTerms) {
      setError('You must accept the terms and conditions');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/createvisit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          birthdate: formData.birthdate,
          message: formData.message,
          amount: 11,
          status: 'Pending'
        }),
      });

      const result = await response.json();
      
      if (result.message === "Visit Added Successfully") {
        setVisitId(result.data._id);
        setShowPaymentOptions(true);
      } else {
        setError('Failed to book visit. Please try again.');
      }
    } catch (error) {
      setError(error.message || 'An error occurred while booking the visit');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentComplete = async () => {
    if (!upiTransactionId.trim()) {
      setError('Please enter transaction ID');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/updatevisit/${visitId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'Paid',
          upiTransactionId: upiTransactionId
        }),
      });

      const result = await response.json();
      
      if (result.message === "Visit Updated Successfully") {
        setBookingDetails(result.data);
        setShowConfirmation(true);
        setShowPaymentOptions(false);
      } else {
        setError('Error confirming payment');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error confirming payment');
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

  if (showConfirmation && bookingDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white flex items-center justify-center p-6">
        <div className="max-w-2xl w-full">
          <div className="bg-white p-8 rounded-2xl shadow-2xl border-2 border-red-900/20">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6 animate-bounce" />
            <h2 className="text-3xl font-bold text-red-900 mb-4 text-center">Consultation Confirmed!</h2>
            <p className="text-gray-700 mb-6 text-center">
              Thank you for your booking. We will contact you shortly to confirm your consultation details.
            </p>
            
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl mb-6">
              <h3 className="font-bold text-red-900 mb-3 text-lg">Booking Details:</h3>
              <div className="space-y-2 text-gray-700">
                <p><strong>Name:</strong> {bookingDetails.name}</p>
                <p><strong>Phone:</strong> {bookingDetails.phone}</p>
                <p><strong>Email:</strong> {bookingDetails.email}</p>
                <p><strong>Date of Birth:</strong> {bookingDetails.birthdate}</p>
                <p><strong>Consultation Purpose:</strong> {bookingDetails.message}</p>
                <p><strong>Amount Paid:</strong> ₹{bookingDetails.amount}</p>
                <p><strong>Status:</strong> <span className="text-green-600 font-semibold">{bookingDetails.status}</span></p>
                <p><strong>Booking ID:</strong> #{bookingDetails._id}</p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h4 className="font-semibold text-red-900 mb-2">What's Next?</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>📧 Confirmation email sent to {bookingDetails.email}</li>
                <li>📱 We will call you to confirm consultation details</li>
                <li>🏠 Please ensure availability at scheduled time</li>
              </ul>
            </div>

            <div className="flex justify-center">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current animate-pulse" style={{animationDelay: `${i * 0.2}s`}} />
                ))}
              </div>
            </div>

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
                setVisitId(null);
                setUpiTransactionId('');
                setAcceptedTerms(false);
              }}
              className="mt-6 w-full bg-gradient-to-r from-red-900 to-red-700 text-white px-8 py-3 rounded-xl font-bold hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Book Another Consultation
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-red-900 to-red-700 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-20 animate-ping"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-orange-400 rounded-full opacity-30 animate-pulse"></div>

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
          </div>
        </div>
      </div>

      {/* Booking Form Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-red-900 mb-4">Book Your Consultation</h2>
              <p className="text-xl text-gray-600">Fill in your details for personalized guidance</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            <div className="space-y-8">
              {/* Personal Details */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-red-900 mb-6">Personal Information</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-red-900 font-bold mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-3 border-2 border-red-900 rounded-lg focus:ring-4 focus:ring-red-200 transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-red-900 font-bold mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-3 border-2 border-red-900 rounded-lg focus:ring-4 focus:ring-red-200 transition-all duration-300"
                      placeholder="Enter 10-digit phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-red-900 font-bold mb-2">Email Address *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-3 border-2 border-red-900 rounded-lg focus:ring-4 focus:ring-red-200 transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-red-900 font-bold mb-2">Date of Birth *</label>
                    <input
                      type="date"
                      value={formData.birthdate}
                      onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
                      className="w-full p-3 border-2 border-red-900 rounded-lg focus:ring-4 focus:ring-red-200 transition-all duration-300"
                    />
                  </div>
                </div>
              </div>

              {/* Consultation Purpose */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-red-900 mb-6 flex items-center">
                  <User className="mr-3 animate-pulse" />
                  Purpose of Consultation
                </h3>
                <div>
                  <label className="block text-red-900 font-bold mb-2">Tell us about your consultation needs *</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full p-3 border-2 border-red-900 rounded-lg focus:ring-4 focus:ring-red-200 transition-all duration-300"
                    placeholder="Describe what you'd like to discuss - career, relationships, health, business, etc."
                  />
                </div>
              </div>

              {/* Payment Summary */}
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-red-900 mb-4">Payment Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Consultation Fee:</span>
                    <span className="font-bold text-red-900">₹11</span>
                  </div>
                  <div className="border-t-2 border-red-900 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-red-900">Total Amount:</span>
                      <span className="text-2xl font-bold text-red-900">₹11</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Options (shown after form submission) */}
              {showPaymentOptions && (
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-8 rounded-xl border border-red-900/20">
                  <h3 className="text-2xl font-bold text-red-900 mb-6 text-center">Complete Your Payment</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* QR Code Section */}
                    <div className="text-center">
                      <h4 className="text-lg font-semibold text-red-900 mb-4">Scan QR Code</h4>
                      <div className="bg-white p-4 rounded-xl shadow-lg inline-block">
                        <img 
                          src="https://res.cloudinary.com/dnbfumeob/image/upload/v1760212975/Astro_Anekant_QR_qutlyf.jpg"
                          alt="UPI QR Code" 
                          className="w-150 h-150 mx-auto"
                        />
                      </div>
                      <p className="text-sm text-gray-600 mt-2">Scan with any UPI app</p>
                    </div>
                    
                    {/* UPI ID Section */}
                    <div className="text-center">
                      <h4 className="text-lg font-semibold text-red-900 mb-4">UPI ID</h4>
                      <div className="bg-white p-6 rounded-xl shadow-lg">
                        <p className="text-2xl font-bold text-red-900 mb-4">8239210022@yescred</p>
                        <p className="text-lg text-gray-700 mb-2">Amount: ₹11</p>
                        <button 
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText('823910022@yescred');
                            alert('UPI ID copied to clipboard!');
                          }}
                          className="bg-red-900 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                        >
                          Copy UPI ID
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Transaction ID Input */}
                  <div className="mt-6">
                    <label className="block text-lg font-semibold text-red-900 mb-2">
                      Enter Transaction ID (after payment) *
                    </label>
                    <input
                      type="text"
                      value={upiTransactionId}
                      onChange={(e) => setUpiTransactionId(e.target.value)}
                      placeholder="Enter UPI transaction ID"
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-red-900 focus:outline-none"
                    />
                  </div>
                  
                  <button
                    type="button"
                    onClick={handlePaymentComplete}
                    disabled={!upiTransactionId.trim()}
                    className="w-full mt-6 bg-green-600 text-white py-3 px-6 rounded-xl font-bold text-xl hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Confirm Payment Completion
                  </button>
                </div>
              )}

              {/* Terms & Conditions */}
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-red-900 mb-4 flex items-center">
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
                      className="mt-1 mr-3 h-4 w-4 text-red-900 focus:ring-red-900 border-2 border-red-900 rounded"
                    />
                    <label htmlFor="terms" className="text-gray-700 text-sm leading-relaxed">
                      <span className="text-red-500">*</span> I agree to the terms and conditions and privacy policy
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              {!showPaymentOptions && (
                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading || !acceptedTerms}
                    className="bg-gradient-to-r from-red-900 to-red-700 text-white px-12 py-4 rounded-2xl font-bold text-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Processing...' : 'Proceed to Payment - ₹11'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Service Guidelines Section */}
      <div className="py-16 bg-gradient-to-br from-red-900 to-red-700 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Important Guidelines</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
                <div className="flex items-center mb-4">
                  <Home className="text-yellow-300 mr-3" />
                  <h3 className="text-xl font-bold">Before the Consultation</h3>
                </div>
                <ul className="space-y-2 text-yellow-100">
                  <li>• Keep birth details ready (date, time, place)</li>
                  <li>• Prepare any specific questions or concerns</li>
                  <li>• Ensure a quiet environment for the call</li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
                <div className="flex items-center mb-4">
                  <Clock className="text-orange-300 mr-3" />
                  <h3 className="text-xl font-bold">Flexible Consultation</h3>
                </div>
                <ul className="space-y-2 text-yellow-100">
                  <li>• Access from the comfort of your home</li>
                  <li>• Choose chat, audio, or video preference</li>
                  <li>• We will contact you as soon as possible</li>
                </ul>
              </div>
            </div>

            <div className="mt-12 text-center bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
              <div className="flex items-center justify-center">
                <span className="text-lg font-semibold">📧 astroanekant@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookVisitPage;