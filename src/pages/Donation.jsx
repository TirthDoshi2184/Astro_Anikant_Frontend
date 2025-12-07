  import React, { useState } from 'react';
  import { Heart, Star, Sparkles, Gift, Users, Shield, Phone, Mail, User, DollarSign, CheckCircle, IndianRupee } from 'lucide-react';

  const Donation = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      amount: '',
      customAmount: ''
    });
    
    const [selectedAmount, setSelectedAmount] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
// Add these states
const [showPaymentOptions, setShowPaymentOptions] = useState(false);
const [donationId, setDonationId] = useState(null);
const [upiTransactionId, setUpiTransactionId] = useState('');

// Replace handleSubmit function

// Add this function for payment completion
const handlePaymentComplete = async () => {
    try {
        const response = await fetch(`YOUR_BACKEND_URL/api/donations/${donationId}/payment-status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                paymentStatus: 'completed',
                upiTransactionId: upiTransactionId
            }),
        });

        const result = await response.json();
        
        if (result.success) {
            setIsSubmitted(true);
            setShowPaymentOptions(false);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error confirming payment');
    }
};

    const predefinedAmounts = [
      { value: '501', label: '₹501', description: 'Sacred Beginning' },
      { value: '1111', label: '₹1,111', description: 'Spiritual Blessing' },
      { value: '2121', label: '₹2,121', description: 'Divine Grace' },
      { value: '5151', label: '₹5,151', description: 'Sacred Abundance' },
      { value: '11111', label: '₹11,111', description: 'Auspicious Offering' },
      { value: 'custom', label: 'Custom', description: 'Your Sacred Choice' }
    ];

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAmountSelect = (amount) => {
      setSelectedAmount(amount);
      if (amount !== 'custom') {
        setFormData(prev => ({ ...prev, amount: amount, customAmount: '' }));
      } else {
        setFormData(prev => ({ ...prev, amount: '' }));
      }
    };

   const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        const response = await fetch('https://astroanikantbackend-2.onrender.com/donation/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                amount: finalAmount,
                paymentMethod: 'upi'
            }),
        });

        const result = await response.json();
        
        if (result.success) {
            setDonationId(result.data._id);
            setShowPaymentOptions(true);
        } else {
            alert('Error: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to process donation. Please try again.');
    }
};

    const finalAmount = selectedAmount === 'custom' ? formData.customAmount : formData.amount;

    if (isSubmitted) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-[#FEF7D7] to-white flex items-center justify-center">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-white p-8 rounded-2xl shadow-2xl border-2 border-[#9C0B13]/20">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6 animate-bounce" />
              <h2 className="text-3xl font-bold text-[#9C0B13] mb-4">Support Us Received!</h2>
              <p className="text-gray-700 mb-6">
                Thank you for your sacred contribution of ₹{finalAmount}. Your generosity supports our spiritual mission.
              </p>
              <div className="flex justify-center">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current animate-pulse" style={{animationDelay: `${i * 0.2}s`}} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FEF7D7] to-white">
        {/* Hero Section */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#9C0B13]/10 to-transparent"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-[#9C0B13] to-red-600 rounded-full flex items-center justify-center animate-pulse">
                  <Heart className="w-10 h-10 text-[#FEF7D7]" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-[#9C0B13] mb-6">
     Support Us
  </h1>
  <div className="mb-6 p-4 bg-gradient-to-r from-[#9C0B13]/10 to-red-600/10 rounded-2xl border-2 border-[#9C0B13]/20 max-w-4xl mx-auto">
    <p className="text-lg md:text-xl font-bold text-[#9C0B13] mb-2">
      अनेकांत ज्योतिष एवं वास्तु शोध केंद्र
    </p>
    <p className="text-base md:text-lg font-semibold text-gray-700">
      Anekant Astrology and Vastu Research Center
    </p>
    <p className="text-sm md:text-base text-gray-600 italic mt-1">
      "An institute dedicated to Astrology, Vastu, Yantra, and Gemstone Science."
      <br />
    </p>
  <p className="text-base md:text-2xl font-bold  text-[#9C0B13]">

    [Anekant Seva Sansthan]
  </p>
  </div>
  <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
    Support Our Spiritual Mission & Help Us Spread Ancient Wisdom
  </p>
              <div className="mt-8 flex justify-center">
                <div className="w-24 h-1 bg-gradient-to-r from-[#9C0B13] to-red-600 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="absolute top-10 left-10 w-16 h-16 bg-[#FEF7D7] rounded-full opacity-60 animate-bounce"></div>
          <div className="absolute bottom-10 right-10 w-12 h-12 bg-[#9C0B13]/20 rounded-full animate-pulse"></div>
        </section>

        {/* Impact Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#9C0B13] to-red-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-8 h-8 text-[#FEF7D7]" />
                </div>
                <h3 className="text-2xl font-bold text-[#9C0B13] mb-2">20,000+</h3>
                <p className="text-gray-600">Lives Touched Through Spiritual Guidance</p>
              </div>
              <div className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#9C0B13] to-red-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Gift className="w-8 h-8 text-[#FEF7D7]" />
                </div>
                <h3 className="text-2xl font-bold text-[#9C0B13] mb-2">5,000+</h3>
                <p className="text-gray-600">Free Spiritual Products Distributed</p>
              </div>
              <div className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#9C0B13] to-red-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-[#FEF7D7]" />
                </div>
                <h3 className="text-2xl font-bold text-[#9C0B13] mb-2">35+</h3>
                <p className="text-gray-600">Years of Spiritual Service & Dedication</p>
              </div>
            </div>
          </div>
        </section>

        {/* Support Us Form Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#9C0B13]/10">
              <div className="bg-gradient-to-r from-[#9C0B13] to-red-600 p-8 text-white text-center">
                <Heart className="w-12 h-12 mx-auto mb-4 animate-pulse" />
                <h2 className="text-3xl font-bold mb-2">Support Us</h2>
                <p className="text-lg opacity-90">Your contribution helps us continue our spiritual mission</p>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-8">
                {/* Amount Selection */}
                <div>
                  <label className="block text-lg font-semibold text-[#9C0B13] mb-4">
                    Choose Your Sacred Offering Amount
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    {predefinedAmounts.map((amount) => (
                      <button
                        key={amount.value}
                        type="button"
                        onClick={() => handleAmountSelect(amount.value)}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 text-center ${
                          selectedAmount === amount.value
                            ? 'border-[#9C0B13] bg-[#FEF7D7] text-[#9C0B13] transform scale-105 shadow-lg'
                            : 'border-gray-200 hover:border-[#9C0B13]/50 hover:bg-[#FEF7D7]/30'
                        }`}
                      >
                        <div className="font-bold text-lg">{amount.label}</div>
                        <div className="text-sm text-gray-600 mt-1">{amount.description}</div>
                      </button>
                    ))}
                  </div>

                  {selectedAmount === 'custom' && (
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#9C0B13]" />
                      <input
                        type="number"
                        name="customAmount"
                        placeholder="Enter custom amount"
                        value={formData.customAmount}
                        onChange={handleInputChange}
                        required={selectedAmount === 'custom'}
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#9C0B13] focus:outline-none transition-colors duration-300 text-lg"
                      />
                    </div>
                  )}
                </div>
                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-semibold text-[#9C0B13] mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#9C0B13]" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your full name"
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#9C0B13] focus:outline-none transition-colors duration-300 text-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-lg font-semibold text-[#9C0B13] mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#9C0B13]" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your email"
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#9C0B13] focus:outline-none transition-colors duration-300 text-lg"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-[#9C0B13] mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#9C0B13]" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your phone number"
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#9C0B13] focus:outline-none transition-colors duration-300 text-lg"
                    />
                  </div>
                </div>

                {/* Support Us Summary */}
                {finalAmount && (
                  <div className="bg-gradient-to-r from-[#FEF7D7] to-[#FEF7D7]/50 p-6 rounded-xl border border-[#9C0B13]/20">
                    <h3 className="text-xl font-bold text-[#9C0B13] mb-2">Support Us Summary</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-lg text-gray-700">Amount:</span>
                      <span className="text-2xl font-bold text-[#9C0B13]">₹{finalAmount}</span>
                    </div>
                  </div>
                )}

{showPaymentOptions && (
    <div className="bg-gradient-to-r from-[#FEF7D7] to-[#FEF7D7]/50 p-8 rounded-xl border border-[#9C0B13]/20 mb-6">
        <h3 className="text-2xl font-bold text-[#9C0B13] mb-6 text-center">Complete Your  Offering</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
            {/* QR Code Section */}
            <div className="text-center">
                <h4 className="text-lg font-semibold text-[#9C0B13] mb-4">Scan QR Code</h4>
                <div className="bg-white p-4 rounded-xl shadow-lg inline-block">
                    <img 
                        src="https://res.cloudinary.com/dnbfumeob/image/upload/v1761578537/Screenshot_2025-10-27_205150_qwu2mg.png" // Replace with your actual QR code
                        alt="UPI QR Code" 
                        className="w-80 h-80 mx-auto"
                    />
                </div>
                <p className="text-sm text-gray-600 mt-2">Scan with any UPI app</p>
            </div>
            
            {/* UPI ID Section */}
            <div className="text-center">
                <h4 className="text-lg font-semibold text-[#9C0B13] mb-4">UPI ID</h4>
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <p className="text-2xl font-bold text-[#9C0B13] mb-4">anekantseva@sbi</p>
                    <p className="text-lg text-gray-700 mb-2">Amount: ₹{finalAmount}</p>
                    <button 
                        onClick={() => navigator.clipboard.writeText('anekantseva@sbi')}
                        className="bg-[#9C0B13] text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Copy UPI ID
                    </button>
                </div>
            </div>
        </div>
        
        {/* Transaction ID Input */}
        <div className="mt-6">
            <label className="block text-lg font-semibold text-[#9C0B13] mb-2">
                Enter Transaction ID (after payment)
            </label>
            <input
                type="text"
                value={upiTransactionId}
                onChange={(e) => setUpiTransactionId(e.target.value)}
                placeholder="Enter UPI transaction ID"
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#9C0B13] focus:outline-none"
            />
        </div>
        
        <button
            onClick={handlePaymentComplete}
            disabled={!upiTransactionId.trim()}
            className="w-full mt-6 bg-green-600 text-white py-3 px-6 rounded-xl font-bold text-xl hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
            Confirm Payment Completion
        </button>
    </div>
)}
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!finalAmount || !formData.name || !formData.email || !formData.phone}
                  className="w-full bg-gradient-to-r from-[#9C0B13] to-red-600 text-white py-4 px-8 rounded-xl font-bold text-xl hover:from-red-600 hover:to-[#9C0B13] transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                >
                  <Heart className="w-6 h-6" />
                  <span>Complete</span>
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </button>

                {/* Security Notice */}
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4 text-[#9C0B13]" />
                  <span>Your information is secure and will be used only for Support Us processing</span>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* How Your Support Us Helps */}
        <section className="py-16 bg-gradient-to-br from-[#9C0B13] to-red-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">How Your Support Creates Impact</h2>
              <p className="text-xl opacity-90">Every contribution helps us fulfill our sacred mission</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#FEF7D7] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-8 h-8 text-[#9C0B13]" />
                </div>
                <h3 className="text-xl font-bold mb-3">Free Consultations</h3>
                <p className="opacity-90">Supporting those who cannot afford spiritual guidance</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#FEF7D7] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Gift className="w-8 h-8 text-[#9C0B13]" />
                </div>
                <h3 className="text-xl font-bold mb-3">Sacred Product Distribution</h3>
                <p className="opacity-90">Providing blessed items to devotees in need</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#FEF7D7] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-[#9C0B13]" />
                </div>
                <h3 className="text-xl font-bold mb-3">Temple & Ritual Support</h3>
                <p className="opacity-90">Maintaining sacred spaces and traditional ceremonies</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  };

  export default Donation;