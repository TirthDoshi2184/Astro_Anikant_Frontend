import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Star, 
  ShoppingBag, 
  CreditCard, 
  Truck, 
  Heart, 
  Shield, 
  Scale, 
  Gavel,
  Users,
  AlertTriangle,
  Phone,
  Clock,
  CheckCircle,
  Info
} from 'lucide-react';

const TermsConditionsPage = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const sections = [
    { id: 'general-info', title: 'General Information', icon: <FileText className="w-5 h-5" /> },
    { id: 'astrology-services', title: 'Astrology Services', icon: <Star className="w-5 h-5" /> },
    { id: 'products', title: 'Products & Authenticity', icon: <ShoppingBag className="w-5 h-5" /> },
    { id: 'payment', title: 'Payment Terms', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'shipping', title: 'Shipping & Delivery', icon: <Truck className="w-5 h-5" /> },
    { id: 'donations', title: 'Donations & Charity', icon: <Heart className="w-5 h-5" /> },
    { id: 'liability', title: 'Limitation of Liability', icon: <Shield className="w-5 h-5" /> },
    { id: 'disputes', title: 'Dispute Resolution', icon: <Scale className="w-5 h-5" /> }
  ];

  const floatingIcons = [
    { icon: <Star className="w-6 h-6" />, delay: '0s' },
    { icon: <ShoppingBag className="w-5 h-5" />, delay: '1s' },
    { icon: <Heart className="w-4 h-4" />, delay: '2s' },
    { icon: <Shield className="w-5 h-5" />, delay: '3s' },
    { icon: <Gavel className="w-4 h-4" />, delay: '4s' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-red-50 relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingIcons.map((item, index) => (
          <div
            key={index}
            className="absolute text-red-900/10 animate-float"
            style={{
              left: `${10 + index * 20}%`,
              top: `${20 + index * 15}%`,
              animationDelay: item.delay,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          >
            {item.icon}
          </div>
        ))}
        <div className="absolute top-32 right-20 w-40 h-40 bg-gradient-to-br from-red-900/5 to-red-700/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 left-20 w-48 h-48 bg-gradient-to-br from-amber-400/5 to-yellow-300/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Hero Section */}
      <div className="relative pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-900 to-red-700 rounded-full mb-6 shadow-2xl">
              <Gavel className="w-10 h-10 text-amber-50" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-red-900 via-red-700 to-red-600 bg-clip-text text-transparent mb-6">
              Terms & Conditions
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Clear guidelines that govern our relationship and ensure a transparent, trustworthy experience for all our valued customers.
            </p>
            <div className="flex items-center justify-center mt-6 space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Last Updated: January 2025</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="sticky top-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-amber-200">
              <h3 className="text-lg font-semibold text-red-900 mb-4">Quick Navigation</h3>
              <nav className="space-y-2">
                {sections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(index)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 text-left ${
                      activeSection === index
                        ? 'bg-gradient-to-r from-red-900 to-red-700 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-amber-100/50'
                    }`}
                  >
                    {section.icon}
                    <span className="text-sm font-medium">{section.title}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-amber-200">

              {/* Section 1: General Information */}
              <div className={`transition-all duration-500 ${activeSection === 0 ? 'block' : 'hidden'}`}>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-900 to-red-700 rounded-full flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-red-900">General Information</h2>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4 border-blue-600">
                    <p className="text-gray-700 mb-4">
                      Welcome to <span className="font-semibold text-red-900">Astro Anekant</span>. By accessing or using our website, purchasing our products, or availing our services (online or offline), you agree to comply with and be bound by these Terms and Conditions.
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold text-red-900 mb-4">Our Services Include:</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        { icon: <Star className="w-5 h-5 text-amber-600" />, text: 'Astro-related products (yantras, gemstones, malas, pyramids, books, etc.)' },
                        { icon: <Users className="w-5 h-5 text-blue-600" />, text: 'Astrology consultations (online and offline)' },
                        { icon: <Heart className="w-5 h-5 text-red-600" />, text: 'Customized puja or ritual services' },
                        { icon: <Heart className="w-5 h-5 text-green-600" />, text: 'Donation-based services (temple contributions, charity, etc.)' }
                      ].map((service, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-white/50 rounded-lg">
                          {service.icon}
                          <span className="text-gray-700 text-sm">{service.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-xl border border-red-200">
                    <div className="flex items-center space-x-3 mb-3">
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                      <h3 className="text-lg font-semibold text-red-900">Age Requirement</h3>
                    </div>
                    <p className="text-gray-700">
                      All users must be at least <span className="font-bold text-red-900">18 years of age</span> to make a purchase or book a consultation.
                    </p>
                  </div>
                </div>
              </div>

           {/* Section 2: Astrology Services */}
<div className={`transition-all duration-500 ${activeSection === 1 ? 'block' : 'hidden'}`}>
  <div className="flex items-center space-x-4 mb-6">
    <div className="w-12 h-12 bg-gradient-to-br from-red-900 to-red-700 rounded-full flex items-center justify-center">
      <Star className="w-6 h-6 text-white" />
    </div>
    <h2 className="text-3xl font-bold text-red-900">Astrology Services & Consultations</h2>
  </div>

  <div className="space-y-6">
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
      <h3 className="text-xl font-semibold text-purple-900 mb-4">Purpose of Service</h3>
      <div className="space-y-3 text-gray-700">
        <p>All astrology consultations, predictions, remedies, and advice are intended for <span className="font-semibold text-purple-900">guidance only</span>.</p>
        <div className="bg-white/50 p-4 rounded-lg border-l-4 border-amber-500">
          <p className="text-sm">
            <strong>Important:</strong> We do not guarantee specific outcomes in personal, professional, financial, or health matters. 
            Any decisions taken by you based on our consultations are entirely your responsibility.
          </p>
        </div>
      </div>
    </div>

    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl">
      <h3 className="text-xl font-semibold text-green-900 mb-4">Online & Offline Consultations</h3>
      <div className="space-y-4">
        {[
          { icon: <CheckCircle className="w-5 h-5 text-green-600" />, text: 'Appointments must be booked in advance through our website, app, or designated contact details' },
          { icon: <AlertTriangle className="w-5 h-5 text-amber-600" />, text: 'Consultation fees are non-refundable once the session is confirmed' },
          { icon: <Shield className="w-5 h-5 text-blue-600" />, text: 'We reserve the right to reschedule or cancel appointments due to unforeseen circumstances' },
          { icon: <Info className="w-5 h-5 text-red-600" />, text: 'The ₹11 consultation fee is a nominal booking charge to prevent misuse of our services. Please note that this ₹11 payment does not constitute actual consultation services and is non-refundable' }
        ].map((item, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 bg-white/60 rounded-lg">
            {item.icon}
            <span className="text-gray-700">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>
              {/* Section 3: Products & Authenticity */}
              <div className={`transition-all duration-500 ${activeSection === 2 ? 'block' : 'hidden'}`}>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-900 to-red-700 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-red-900">Astro Products & Authenticity</h2>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-6 rounded-xl border border-emerald-200">
                    <h3 className="text-xl font-semibold text-emerald-900 mb-4">Genuine & Authentic Products</h3>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-emerald-600 mt-1" />
                        <span className="text-gray-700">All products (gemstones, yantras, malas, etc.) are sourced from trusted suppliers and undergo quality checks</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-emerald-600 mt-1" />
                        <span className="text-gray-700">Certificates of authenticity will be provided where applicable (e.g., natural gemstones)</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-xl border border-amber-200">
                    <h3 className="text-xl font-semibold text-amber-900 mb-4">Product Images & Variations</h3>
                    <div className="space-y-3">
                      <p className="text-gray-700">Product images are for reference only. Actual color, size, and shape may slightly vary due to natural properties.</p>
                      <div className="bg-white/60 p-4 rounded-lg border-l-4 border-red-500">
                        <p className="text-sm text-gray-700">
                          <strong>Disclaimer:</strong> We do not guarantee any specific results from the use of products, as outcomes may vary for each individual.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 4: Payment Terms */}
              <div className={`transition-all duration-500 ${activeSection === 3 ? 'block' : 'hidden'}`}>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-900 to-red-700 rounded-full flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-red-900">Payment Terms</h2>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">Accepted Payment Methods</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        'Credit/Debit Cards (Visa, MasterCard, Rupay, etc.)',
                        'UPI (Google Pay, PhonePe, Paytm, etc.)',
                        'Net Banking',
                        'Digital Wallets',
                        'International Payment Gateways',
                        'Offline Payments (Cash, UPI, Card)'
                      ].map((method, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-white/60 rounded-lg">
                          <CreditCard className="w-4 h-4 text-blue-600" />
                          <span className="text-gray-700 text-sm">{method}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-xl border border-amber-200">
                    <h3 className="text-xl font-semibold text-amber-900 mb-4">Payment Guidelines</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-amber-600 rounded-full mt-2"></div>
                        <span>All payments must be made in Indian Rupees (INR) unless otherwise specified</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-amber-600 rounded-full mt-2"></div>
                        <span>Prices are subject to change without prior notice</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 5: Shipping & Delivery */}
              <div className={`transition-all duration-500 ${activeSection === 4 ? 'block' : 'hidden'}`}>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-900 to-red-700 rounded-full flex items-center justify-center">
                    <Truck className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-red-900">Shipping & Delivery</h2>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                    <h3 className="text-xl font-semibold text-green-900 mb-4">Online Delivery</h3>
                    <div className="space-y-3">
                      {[
                        'We deliver products across India and selected international locations',
                        'Shipping charges, if applicable, will be displayed at checkout',
                        'Estimated delivery timelines will be mentioned at the time of purchase'
                      ].map((item, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <Truck className="w-5 h-5 text-green-600 mt-1" />
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-xl border border-red-200">
                    <h3 className="text-xl font-semibold text-red-900 mb-4">Important Notes</h3>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="w-5 h-5 text-red-600 mt-1" />
                        <span className="text-gray-700">We are not responsible for delays caused by courier services, natural calamities, strikes, or other unforeseen events</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="w-5 h-5 text-amber-600 mt-1" />
                        <span className="text-gray-700">International customers are responsible for any customs duties or taxes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 6: Donations & Charity */}
              <div className={`transition-all duration-500 ${activeSection === 5 ? 'block' : 'hidden'}`}>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-900 to-red-700 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-red-900">Donations & Charity Services</h2>
                </div>

                <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-6 rounded-xl border border-pink-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <Heart className="w-8 h-8 text-pink-600" />
                    <h3 className="text-xl font-semibold text-pink-900">Donation Policy</h3>
                  </div>
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      Donations made through our platform (e.g., for temple rituals or charitable activities) are voluntary and <span className="font-semibold text-red-900">non-refundable</span>.
                    </p>
                    <div className="bg-white/60 p-4 rounded-lg border-l-4 border-green-500">
                      <p className="text-gray-700">
                        <strong>Transparency Guarantee:</strong> We ensure that donated amounts are used for the stated purpose and maintain proper records for transparency.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 7: Limitation of Liability */}
              <div className={`transition-all duration-500 ${activeSection === 6 ? 'block' : 'hidden'}`}>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-900 to-red-700 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-red-900">Limitation of Liability</h2>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-xl border border-amber-200">
                    <h3 className="text-xl font-semibold text-amber-900 mb-4">We are not responsible for:</h3>
                    <div className="space-y-3">
                      {[
                        'Any losses, damages, or outcomes resulting from astrology predictions or remedies',
                        'Delay or non-performance caused by events beyond our control (natural disasters, technical failures, etc.)',
                        'Our maximum liability is limited to the amount paid by you for the specific service or product'
                      ].map((item, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-white/60 rounded-lg">
                          <AlertTriangle className="w-5 h-5 text-amber-600 mt-1" />
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 8: Dispute Resolution */}
              <div className={`transition-all duration-500 ${activeSection === 7 ? 'block' : 'hidden'}`}>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-900 to-red-700 rounded-full flex items-center justify-center">
                    <Scale className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-red-900">Dispute Resolution</h2>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <Scale className="w-8 h-8 text-blue-600" />
                      <h3 className="text-xl font-semibold text-blue-900">Legal Framework</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3 p-3 bg-white/60 rounded-lg">
                        <Gavel className="w-5 h-5 text-blue-600 mt-1" />
                        <span className="text-gray-700">Any disputes shall be governed by the <span className="font-semibold">laws of India</span></span>
                      </div>
                      <div className="flex items-start space-x-3 p-3 bg-white/60 rounded-lg">
                        <Scale className="w-5 h-5 text-blue-600 mt-1" />
                        <span className="text-gray-700">Jurisdiction shall lie exclusively with the courts of <span className="font-semibold">Salumbar/Udaipur</span></span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                    <h3 className="text-xl font-semibold text-green-900 mb-4">Modification of Terms</h3>
                    <p className="text-gray-700">
                      We reserve the right to update or modify these Terms & Conditions at any time. 
                      Continued use of our platform after changes implies your acceptance of the updated terms.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gradient-to-r from-red-900 to-red-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Phone className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Questions about our Terms?</h2>
          <p className="text-xl mb-6 text-red-100">
            We're here to help you understand our policies and answer any concerns.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="text-red-100">Email: astroanekantsup@gmail.com</span>
            </div>
            
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default TermsConditionsPage;