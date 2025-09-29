import React, { useState, useEffect } from 'react';
import { Shield, Eye, Lock, Users, FileText, Clock, Phone, Mail, Globe, Star } from 'lucide-react';

const PrivacyPolicyPage = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const sections = [
    { id: 'information-collect', title: 'Information We Collect', icon: <Eye className="w-5 h-5" /> },
    { id: 'how-we-use', title: 'How We Use Your Information', icon: <Users className="w-5 h-5" /> },
    { id: 'payment-security', title: 'Payment Security', icon: <Lock className="w-5 h-5" /> },
    { id: 'data-sharing', title: 'Data Sharing & Disclosure', icon: <Shield className="w-5 h-5" /> },
    { id: 'your-rights', title: 'Your Rights', icon: <FileText className="w-5 h-5" /> },
    { id: 'contact-us', title: 'Contact Us', icon: <Phone className="w-5 h-5" /> }
  ];

  const floatingElements = Array.from({ length: 8 }, (_, i) => (
    <div
      key={i}
      className={`absolute w-4 h-4 bg-gradient-to-r from-red-900 to-red-700 rounded-full opacity-20 animate-float`}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${i * 0.5}s`,
        animationDuration: `${3 + Math.random() * 2}s`
      }}
    />
  ));

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingElements}
        <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-red-900/10 to-red-700/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-br from-amber-400/10 to-yellow-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Hero Section */}
      <div className="relative pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-900 to-red-700 rounded-full mb-6 shadow-2xl">
              <Shield className="w-10 h-10 text-amber-50" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-red-900 via-red-700 to-red-600 bg-clip-text text-transparent mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Your privacy is sacred to us. Learn how we protect and handle your personal information with complete transparency.
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
            <div className="sticky top-8 bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-amber-200">
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
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-amber-200">
              
              {/* Section 1: Information We Collect */}
              <div className={`transition-all duration-500 ${activeSection === 0 ? 'block' : 'hidden'}`}>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-900 to-red-700 rounded-full flex items-center justify-center">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-red-900">Information We Collect</h2>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-xl border-l-4 border-red-700">
                    <h3 className="text-xl font-semibold text-red-900 mb-3">Personal Information</h3>
                    <p className="text-gray-700 mb-4">When you purchase products, book consultations, or make donations, we may collect:</p>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start space-x-2">
                        <Star className="w-4 h-4 text-red-700 mt-1 flex-shrink-0" />
                        <span>Name, email address, phone number, postal/billing address</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Star className="w-4 h-4 text-red-700 mt-1 flex-shrink-0" />
                        <span>Date of birth, time of birth, place of birth (for astrology services)</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Star className="w-4 h-4 text-red-700 mt-1 flex-shrink-0" />
                        <span>Gender and other details voluntarily shared during consultations</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Star className="w-4 h-4 text-red-700 mt-1 flex-shrink-0" />
                        <span>Payment details (processed securely through third-party gateways)</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-xl border-l-4 border-amber-600">
                    <h3 className="text-xl font-semibold text-red-900 mb-3">Non-Personal Information</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start space-x-2">
                        <Star className="w-4 h-4 text-amber-600 mt-1 flex-shrink-0" />
                        <span>Browser type, device type, IP address, operating system</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Star className="w-4 h-4 text-amber-600 mt-1 flex-shrink-0" />
                        <span>Pages visited, time spent on our website, and usage patterns</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 2: How We Use Your Information */}
              <div className={`transition-all duration-500 ${activeSection === 1 ? 'block' : 'hidden'}`}>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-900 to-red-700 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-red-900">How We Use Your Information</h2>
                </div>

                <p className="text-lg text-gray-700 mb-6">Your information is used only for legitimate business purposes, including:</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    'Processing orders, bookings, and donations',
                    'Providing astrology consultations and personalized remedies',
                    'Authenticating and delivering products/services',
                    'Sending appointment reminders, updates, and order confirmations',
                    'Improving our website, services, and customer experience',
                    'Fulfilling legal and regulatory requirements',
                    'Sending promotional offers (only if you have opted in)'
                  ].map((item, index) => (
                    <div key={index} className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-xl flex items-start space-x-3">
                      <div className="w-6 h-6 bg-red-700 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-xs font-bold">{index + 1}</span>
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 3: Payment Security */}
              <div className={`transition-all duration-500 ${activeSection === 2 ? 'block' : 'hidden'}`}>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-900 to-red-700 rounded-full flex items-center justify-center">
                    <Lock className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-red-900">Payment Security</h2>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <Lock className="w-8 h-8 text-green-600" />
                      <h3 className="text-xl font-semibold text-green-800">Secure Transactions</h3>
                    </div>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>We use secure third-party payment gateways for all online transactions</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>We do not store your complete payment details (card numbers, CVV, or net banking credentials)</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Transactions are encrypted using industry-standard SSL (Secure Socket Layer) technology</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 4: Data Sharing */}
              <div className={`transition-all duration-500 ${activeSection === 3 ? 'block' : 'hidden'}`}>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-900 to-red-700 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-red-900">Data Sharing & Disclosure</h2>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200 mb-6">
                  <p className="text-lg font-semibold text-blue-800 mb-3">
                    We respect your privacy and will never sell, rent, or trade your personal data.
                  </p>
                </div>

                <h3 className="text-xl font-semibold text-red-900 mb-4">We may share your information only in the following cases:</h3>
                <div className="space-y-4">
                  {[
                    {
                      title: 'Service Providers',
                      description: 'With trusted service providers (payment gateways, delivery partners, IT support) to fulfill orders and bookings',
                      color: 'amber'
                    },
                    {
                      title: 'Legal Requirements',
                      description: 'When required by law, government authorities, or legal processes',
                      color: 'red'
                    },
                    {
                      title: 'Safety & Protection',
                      description: 'To protect the rights, safety, and property of our business and customers',
                      color: 'green'
                    }
                  ].map((item, index) => (
                    <div key={index} className={`bg-gradient-to-r from-${item.color}-50 to-${item.color}-100 p-4 rounded-xl border-l-4 border-${item.color}-500`}>
                      <h4 className={`font-semibold text-${item.color}-800 mb-2`}>{item.title}</h4>
                      <p className="text-gray-700">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 5: Your Rights */}
              <div className={`transition-all duration-500 ${activeSection === 4 ? 'block' : 'hidden'}`}>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-900 to-red-700 rounded-full flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-red-900">Your Rights</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      title: 'Access & Update',
                      description: 'Access, update, or correct your personal information',
                      icon: <Eye className="w-6 h-6" />
                    },
                    {
                      title: 'Right to be Forgotten',
                      description: 'Request deletion of your data',
                      icon: <Shield className="w-6 h-6" />
                    },
                    {
                      title: 'Opt Out',
                      description: 'Opt out of promotional communications at any time',
                      icon: <Mail className="w-6 h-6" />
                    },
                    {
                      title: 'Withdraw Consent',
                      description: 'Withdraw consent for astrology-related predictions or data usage',
                      icon: <Lock className="w-6 h-6" />
                    }
                  ].map((right, index) => (
                    <div key={index} className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white">
                          {right.icon}
                        </div>
                        <h3 className="text-lg font-semibold text-purple-800">{right.title}</h3>
                      </div>
                      <p className="text-gray-700">{right.description}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-xl border border-amber-200">
                  <p className="text-gray-700">
                    For any privacy-related requests, contact us at: <span className="font-semibold text-red-900">astroanekantsup@gmail.com</span>
                  </p>
                </div>
              </div>

              {/* Section 6: Contact Us */}
              <div className={`transition-all duration-500 ${activeSection === 5 ? 'block' : 'hidden'}`}>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-900 to-red-700 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-red-900">Contact Us</h2>
                </div>

                <div className="bg-gradient-to-r from-red-50 to-pink-50 p-8 rounded-xl border border-red-200">
                  <p className="text-lg text-gray-700 mb-6">
                    If you have questions, concerns, or requests regarding this Privacy Policy, please contact us at:
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Globe className="w-5 h-5 text-red-700" />
                      <span className="text-gray-700">Website: <span className="font-semibold">www.astroanekant.com</span></span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-red-700" />
                      <span className="text-gray-700">Email: <span className="font-semibold">astroanekantsup@gmail.com</span></span>
                    </div>
                    
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default PrivacyPolicyPage;