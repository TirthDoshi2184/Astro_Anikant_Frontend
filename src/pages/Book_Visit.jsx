import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Phone, Mail, Calendar, Users, Star, CheckCircle, AlertCircle, Home, User } from 'lucide-react';

const BookVisitPage = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedAstrologer, setSelectedAstrologer] = useState('');
  const [visitPurpose, setVisitPurpose] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    landmark: '',
    specialRequirements: ''
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [animationClass, setAnimationClass] = useState('');
  const [visitFee, setVisitFee] = useState(0);

  const consultationTypes = [
    { name: 'Gemstone Consultation', duration: '45 mins', price: 800, description: 'Personal gemstone recommendations at your home' },
    { name: 'Vastu Consultation', duration: '60 mins', price: 1200, description: 'Complete home Vastu analysis and remedies' },
    { name: 'Numerology Reading', duration: '40 mins', price: 700, description: 'Name and number analysis for family members' },
    { name: 'Palmistry Session', duration: '35 mins', price: 600, description: 'Palm reading for multiple family members' },
    { name: 'Puja & Rituals', duration: '90 mins', price: 1500, description: 'Sacred rituals and ceremonies at your home' },
    { name: 'Kundli Matching', duration: '50 mins', price: 900, description: 'Marriage compatibility analysis' }
  ];

  const astrologers = [
    { 
      id: 'pandit-rajesh', 
      name: 'Pandit Rajesh Sharma', 
      experience: '15 years', 
      speciality: 'Vedic Astrology & Gemstones', 
      rating: 4.9,
      travelFee: 200,
      availability: ['10:00 AM', '2:00 PM', '5:00 PM']
    },
    { 
      id: 'dr-priya', 
      name: 'Dr. Priya Gupta', 
      experience: '12 years', 
      speciality: 'Numerology & Vastu', 
      rating: 4.8,
      travelFee: 150,
      availability: ['11:00 AM', '3:00 PM', '6:00 PM']
    },
    { 
      id: 'guru-vikash', 
      name: 'Guru Vikash Joshi', 
      experience: '20 years', 
      speciality: 'Palmistry & Puja Rituals', 
      rating: 4.9,
      travelFee: 250,
      availability: ['9:00 AM', '1:00 PM', '4:00 PM', '7:00 PM']
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationClass(prev => prev === 'animate-pulse' ? '' : 'animate-pulse');
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Calculate total fee when consultation type or astrologer changes
    const selectedConsultation = consultationTypes.find(service => service.name === visitPurpose);
    const selectedAstrologerData = astrologers.find(ast => ast.id === selectedAstrologer);
    
    if (selectedConsultation && selectedAstrologerData) {
      setVisitFee(selectedConsultation.price + selectedAstrologerData.travelFee + 99); // 99 is booking fee
    } else {
      setVisitFee(99); // Only booking fee
    }
  }, [visitPurpose, selectedAstrologer]);

  const handleSubmit = () => {
    setShowConfirmation(true);
  };

  const getAvailableTimeSlots = () => {
    const selectedAstrologerData = astrologers.find(ast => ast.id === selectedAstrologer);
    return selectedAstrologerData ? selectedAstrologerData.availability : [];
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
      {/* Hero Section with Animated Background */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#9C0B13] to-red-800 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-20 animate-ping"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-orange-400 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-pink-400 rounded-full opacity-25 animate-bounce"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            <FloatingElement>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Book Home Visit
              </h1>
            </FloatingElement>
            <p className="text-xl md:text-2xl mb-8 text-yellow-100">
              Expert Astrologers Come to Your Doorstep
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
              <div className="flex items-center animate-fadeIn" style={{ animationDelay: '0.4s' }}>
                <Calendar className="mr-2 text-blue-400" />
                <span>Flexible Timing</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Benefits Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#9C0B13] mb-6">Why Choose Home Consultations?</h2>
            <p className="text-xl text-gray-600">Experience personalized spiritual guidance in the comfort of your home</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center bg-gradient-to-br from-[#FEF7D7] to-yellow-50 p-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-r from-[#9C0B13] to-red-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Home className="text-white animate-pulse" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-[#9C0B13] mb-4">Comfort & Privacy</h3>
              <p className="text-gray-700">Enjoy consultations in your familiar environment without any distractions or travel hassles.</p>
            </div>

            <div className="text-center bg-gradient-to-br from-orange-50 to-[#FEF7D7] p-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300" style={{ animationDelay: '0.1s' }}>
              <div className="w-20 h-20 bg-gradient-to-r from-[#9C0B13] to-red-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="text-white animate-pulse" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-[#9C0B13] mb-4">Family Sessions</h3>
              <p className="text-gray-700">Include multiple family members in consultations for comprehensive guidance and solutions.</p>
            </div>

            <div className="text-center bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300" style={{ animationDelay: '0.2s' }}>
              <div className="w-20 h-20 bg-gradient-to-r from-[#9C0B13] to-red-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="text-white animate-pulse" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-[#9C0B13] mb-4">Authentic Rituals</h3>
              <p className="text-gray-700">Experience traditional pujas and ceremonies performed with proper rituals at your sacred space.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Consultation Services Section */}
      <div className="py-16 bg-gradient-to-r from-[#FEF7D7] to-yellow-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#9C0B13] mb-4">Home Consultation Services</h2>
            <p className="text-xl text-gray-600">Choose from our comprehensive range of home visit services</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {consultationTypes.map((service, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 hover:rotate-1"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#9C0B13] to-red-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="text-white animate-pulse" />
                  </div>
                  <h3 className="text-xl font-bold text-[#9C0B13] mb-2">{service.name}</h3>
                  <p className="text-gray-600 mb-3 text-sm">{service.description}</p>
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="bg-[#FEF7D7] px-3 py-1 rounded-full">{service.duration}</span>
                    <span className="text-[#9C0B13] font-bold text-lg">₹{service.price}</span>
                  </div>
                  <p className="text-xs text-gray-500">+ Travel charges apply</p>
                </div>
              </div>
            ))}
          </div>

          {/* Astrologer Profiles */}
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-[#9C0B13] mb-4">Meet Our Home Visit Experts</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {astrologers.map((astrologer, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-[#9C0B13] to-red-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-bold">{astrologer.name.charAt(0)}</span>
                  </div>
                  <h4 className="text-xl font-bold text-[#9C0B13] mb-2">{astrologer.name}</h4>
                  <p className="text-gray-600 mb-2">{astrologer.experience} Experience</p>
                  <p className="text-sm text-gray-700 mb-3">{astrologer.speciality}</p>
                  <div className="flex justify-center items-center mb-2">
                    <Star className="text-yellow-400 fill-current" size={16} />
                    <span className="text-[#9C0B13] font-bold ml-1">{astrologer.rating}</span>
                  </div>
                  <p className="text-sm text-orange-600 font-semibold">Travel Fee: ₹{astrologer.travelFee}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Form Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#9C0B13] mb-4">Book Your Home Visit</h2>
              <p className="text-xl text-gray-600">Fill in your details and we'll bring the expertise to your doorstep</p>
            </div>

            {!showConfirmation ? (
              <div className="space-y-8">
                {/* Service and Astrologer Selection */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-r from-[#FEF7D7] to-yellow-50 p-6 rounded-2xl shadow-lg">
                    <label className="block text-[#9C0B13] font-bold mb-3">Select Service</label>
                    <select
                      required
                      value={visitPurpose}
                      onChange={(e) => setVisitPurpose(e.target.value)}
                      className="w-full p-3 border-2 border-[#9C0B13] rounded-lg focus:ring-4 focus:ring-red-200 transition-all duration-300"
                    >
                      <option value="">Choose consultation type</option>
                      {consultationTypes.map((service) => (
                        <option key={service.name} value={service.name}>
                          {service.name} - ₹{service.price} ({service.duration})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="bg-gradient-to-r from-[#FEF7D7] to-yellow-50 p-6 rounded-2xl shadow-lg">
                    <label className="block text-[#9C0B13] font-bold mb-3">Select Astrologer</label>
                    <select
                      required
                      value={selectedAstrologer}
                      onChange={(e) => setSelectedAstrologer(e.target.value)}
                      className="w-full p-3 border-2 border-[#9C0B13] rounded-lg focus:ring-4 focus:ring-red-200 transition-all duration-300"
                    >
                      <option value="">Choose your astrologer</option>
                      {astrologers.map((astrologer) => (
                        <option key={astrologer.id} value={astrologer.id}>
                          {astrologer.name} - ₹{astrologer.travelFee} travel fee
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Date and Time Selection */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-r from-orange-50 to-[#FEF7D7] p-6 rounded-2xl shadow-lg">
                    <label className="block text-[#9C0B13] font-bold mb-3 flex items-center">
                      <Calendar className="mr-2 animate-pulse" />
                      Select Date
                    </label>
                    <input
                      type="date"
                      required
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full p-3 border-2 border-[#9C0B13] rounded-lg focus:ring-4 focus:ring-red-200 transition-all duration-300"
                    />
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-[#FEF7D7] p-6 rounded-2xl shadow-lg">
                    <label className="block text-[#9C0B13] font-bold mb-3 flex items-center">
                      <Clock className="mr-2 animate-pulse" />
                      Select Time
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {getAvailableTimeSlots().map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`p-2 rounded-lg border-2 transition-all duration-300 text-sm ${
                            selectedTime === time
                              ? 'bg-[#9C0B13] text-white border-[#9C0B13]'
                              : 'border-[#9C0B13] text-[#9C0B13] hover:bg-[#9C0B13] hover:text-white'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                    {selectedAstrologer === '' && (
                      <p className="text-sm text-gray-500 mt-2">Please select an astrologer first</p>
                    )}
                  </div>
                </div>

                {/* Personal Details */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl shadow-lg">
                  <h3 className="text-2xl font-bold text-[#9C0B13] mb-6">Personal Information</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[#9C0B13] font-bold mb-2">Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full p-3 border-2 border-[#9C0B13] rounded-lg focus:ring-4 focus:ring-red-200 transition-all duration-300"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-[#9C0B13] font-bold mb-2">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full p-3 border-2 border-[#9C0B13] rounded-lg focus:ring-4 focus:ring-red-200 transition-all duration-300"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                    <div>
                      <label className="block text-[#9C0B13] font-bold mb-2">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full p-3 border-2 border-[#9C0B13] rounded-lg focus:ring-4 focus:ring-red-200 transition-all duration-300"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-[#9C0B13] font-bold mb-2 flex items-center">
                        <Users className="mr-2" />
                        Number of People
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        required
                        value={numberOfPeople}
                        onChange={(e) => setNumberOfPeople(parseInt(e.target.value))}
                        className="w-full p-3 border-2 border-[#9C0B13] rounded-lg focus:ring-4 focus:ring-red-200 transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Address Details */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl shadow-lg">
                  <h3 className="text-2xl font-bold text-[#9C0B13] mb-6 flex items-center">
                    <MapPin className="mr-3 animate-pulse" />
                    Home Address
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-[#9C0B13] font-bold mb-2">Complete Address</label>
                      <textarea
                        rows="3"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        className="w-full p-3 border-2 border-[#9C0B13] rounded-lg focus:ring-4 focus:ring-red-200 transition-all duration-300"
                        placeholder="House/Flat No., Street, Area, Locality..."
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-[#9C0B13] font-bold mb-2">City</label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                        className="w-full p-3 border-2 border-[#9C0B13] rounded-lg focus:ring-4 focus:ring-red-200 transition-all duration-300"
                        placeholder="Your city"
                      />
                    </div>
                    <div>
                      <label className="block text-[#9C0B13] font-bold mb-2">PIN Code</label>
                      <input
                        type="text"
                        required
                        value={formData.pincode}
                        onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                        className="w-full p-3 border-2 border-[#9C0B13] rounded-lg focus:ring-4 focus:ring-red-200 transition-all duration-300"
                        placeholder="6-digit PIN code"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[#9C0B13] font-bold mb-2">Landmark (Optional)</label>
                      <input
                        type="text"
                        value={formData.landmark}
                        onChange={(e) => setFormData({...formData, landmark: e.target.value})}
                        className="w-full p-3 border-2 border-[#9C0B13] rounded-lg focus:ring-4 focus:ring-red-200 transition-all duration-300"
                        placeholder="Nearby landmark for easy location"
                      />
                    </div>
                  </div>
                </div>

                {/* Special Requirements */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl shadow-lg">
                  <label className="block text-[#9C0B13] font-bold mb-3">Special Requirements / Questions</label>
                  <textarea
                    rows="4"
                    value={formData.specialRequirements}
                    onChange={(e) => setFormData({...formData, specialRequirements: e.target.value})}
                    className="w-full p-3 border-2 border-[#9C0B13] rounded-lg focus:ring-4 focus:ring-red-200 transition-all duration-300"
                    placeholder="Any specific questions, requirements, or topics you'd like to discuss during the consultation..."
                  ></textarea>
                </div>

                {/* Payment Summary */}
                <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-2xl shadow-lg">
                  <h3 className="text-2xl font-bold text-[#9C0B13] mb-4">Payment Summary</h3>
                  <div className="space-y-3">
                    {visitPurpose && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Consultation Fee:</span>
                        <span className="font-bold text-[#9C0B13]">
                          ₹{consultationTypes.find(s => s.name === visitPurpose)?.price || 0}
                        </span>
                      </div>
                    )}
                    {selectedAstrologer && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Travel Fee:</span>
                        <span className="font-bold text-[#9C0B13]">
                          ₹{astrologers.find(a => a.id === selectedAstrologer)?.travelFee || 0}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Booking Fee:</span>
                      <span className="font-bold text-[#9C0B13]">₹99</span>
                    </div>
                    <div className="border-t-2 border-[#9C0B13] pt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-[#9C0B13]">Total Amount:</span>
                        <span className="text-2xl font-bold text-[#9C0B13]">₹{visitFee}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    onClick={handleSubmit}
                    disabled={!selectedDate || !selectedTime || !visitPurpose || !selectedAstrologer || !formData.name || !formData.phone || !formData.email || !formData.address}
                    className="bg-gradient-to-r from-[#9C0B13] to-red-800 text-white px-12 py-4 rounded-2xl font-bold text-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-pulse disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Confirm Home Visit - ₹{visitFee}
                  </button>
                </div>
              </div>
            ) : (
              /* Confirmation Section */
              <div className="text-center bg-gradient-to-r from-green-50 to-emerald-50 p-12 rounded-3xl shadow-2xl">
                <CheckCircle className="mx-auto text-green-600 mb-6 animate-bounce" size={80} />
                <h3 className="text-3xl font-bold text-green-800 mb-4">Home Visit Confirmed!</h3>
                <p className="text-xl text-green-700 mb-6">Your astrologer will visit you at your home</p>
                
                <div className="bg-white p-6 rounded-2xl shadow-lg inline-block text-left max-w-md">
                  <h4 className="font-bold text-[#9C0B13] mb-3">Booking Details:</h4>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Service:</strong> {visitPurpose}</p>
                    <p><strong>Astrologer:</strong> {astrologers.find(a => a.id === selectedAstrologer)?.name}</p>
                    <p><strong>Date:</strong> {selectedDate}</p>
                    <p><strong>Time:</strong> {selectedTime}</p>
                    <p><strong>People:</strong> {numberOfPeople}</p>
                    <p><strong>Total Paid:</strong> ₹{visitFee}</p>
                    <p><strong>Booking ID:</strong> #HV{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                  </div>
                </div>

                <div className="mt-8 text-gray-600 space-y-2">
                  <p>📧 Confirmation email sent to {formData.email}</p>
                  <p>📱 Astrologer will call 30 minutes before arrival</p>
                  <p>🏠 Please ensure someone is available at the given address</p>
                  <p>💼 Astrologer will carry all necessary items for the consultation</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Service Guidelines Section */}
      <div className="py-16 bg-gradient-to-r from-[#FEF7D7] to-yellow-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#9C0B13] text-center mb-12">Important Guidelines & Policies</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center mb-4">
                  <Home className="text-blue-500 mr-3 animate-pulse" />
                  <h3 className="text-xl font-bold text-[#9C0B13]">Before the Visit</h3>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li>• Ensure clean and peaceful space for consultation</li>
                  <li>• Keep birth details ready (date, time, place)</li>
                  <li>• Prepare any specific questions or concerns</li>
                  <li>• Arrange seating for all participants</li>
                  <li>• Keep water available for the astrologer</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center mb-4">
                  <Clock className="text-orange-500 mr-3 animate-pulse" />
                  <h3 className="text-xl font-bold text-[#9C0B13]">Timing & Duration</h3>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li>• Astrologer will arrive within 15 minutes of scheduled time</li>
                  <li>• Session duration as per selected service</li>
                  <li>• Additional time charged at ₹200 per 15 minutes</li>
                  <li>• Please be available for the entire duration</li>
                  <li>• Allow buffer time for travel delays</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center mb-4">
                  <AlertCircle className="text-red-500 mr-3 animate-pulse" />
                  <h3 className="text-xl font-bold text-[#9C0B13]">Cancellation Policy</h3>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li>• Free cancellation up to 4 hours before visit</li>
                  <li>• 50% refund for cancellations within 4 hours</li>
                  <li>• No refund for no-shows or last-minute cancellations</li>
                  <li>• Rescheduling allowed up to 2 times per booking</li>
                  <li>• Weather-related cancellations fully refundable</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center mb-4">
                  <CheckCircle className="text-green-500 mr-3 animate-pulse" />
                  <h3 className="text-xl font-bold text-[#9C0B13]">What We Provide</h3>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li>• Experienced and verified astrologers</li>
                  <li>• All necessary charts and calculation tools</li>
                  <li>• Remedial suggestions and solutions</li>
                  <li>• Written summary of key points (on request)</li>
                  <li>• Follow-up support via phone for 7 days</li>
                </ul>
              </div>
            </div>



            {/* Trust Indicators */}
            <div className="mt-12 text-center">
              <h3 className="text-2xl font-bold text-[#9C0B13] mb-6">Why Trust Our Home Visits?</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="text-green-600" size={32} />
                  </div>
                  <h4 className="font-bold text-[#9C0B13] mb-2">Verified Astrologers</h4>
                  <p className="text-sm text-gray-600">All our astrologers are background verified</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="text-blue-600" size={32} />
                  </div>
                  <h4 className="font-bold text-[#9C0B13] mb-2">5000+ Happy Clients</h4>
                  <p className="text-sm text-gray-600">Trusted by thousands of families</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="text-purple-600" size={32} />
                  </div>
                  <h4 className="font-bold text-[#9C0B13] mb-2">Professional Service</h4>
                  <p className="text-sm text-gray-600">Punctual and respectful consultations</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Home className="text-yellow-600" size={32} />
                  </div>
                  <h4 className="font-bold text-[#9C0B13] mb-2">Safe & Secure</h4>
                  <p className="text-sm text-gray-600">Your privacy and safety is our priority</p>
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