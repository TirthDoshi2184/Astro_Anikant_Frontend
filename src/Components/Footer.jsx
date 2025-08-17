import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube,
  Gem,
  Crown,
  Heart,
  Shield,
  Star,
  Sparkles
} from 'lucide-react';

const Footer = () => {
  // Navigation function for SPA routing
  const handleNavigation = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new CustomEvent('navigate', { detail: path }));
  };

  const companyInfo = {
    name: "Astro Anekant",
    tagline: "Your Gateway to Cosmic Transformation",
    address: "123 Spiritual Street, Mystic Plaza, New Delhi, India - 110001",
    description: "Authentic astrological products blessed by expert astrologers for your spiritual journey and cosmic alignment."
  };

  const quickLinks = [
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Terms & Conditions", path: "/terms-conditions" },
    { name: "Shipping Info", path: "/shipping-info" },
    { name: "Returns Policy", path: "/returns-policy" },
    { name: "Book a Visit", path: "/book-visit" },
    { name: "Donation", path: "/donation" }
  ];

  const productCategories = [
    { name: "Precious Gems", icon: Gem, path: "/products?category=gems" },
    { name: "Sacred Yantras", icon: Crown, path: "/products?category=yantras" },
    { name: "Prayer Malas", icon: Heart, path: "/products?category=malas" },
    { name: "Pyramids", icon: Shield, path: "/products?category=pyramids" },
    { name: "Crystals", icon: Star, path: "/products?category=crystals" },
    { name: "Spiritual Items", icon: Sparkles, path: "/products?category=spiritual" }
  ];

  const contactInfo = {
    phone: "+91 98765 43210",
    email: "info@AstroAnekant.com",
    whatsapp: "+91 98765 43210"
  };

  const socialLinks = [
    { name: "Facebook", icon: Facebook, url: "https://facebook.com/AstroAnekant" },
    { name: "Instagram", icon: Instagram, url: "https://instagram.com/AstroAnekant" },
    { name: "Twitter", icon: Twitter, url: "https://twitter.com/AstroAnekant" },
    { name: "YouTube", icon: Youtube, url: "https://youtube.com/AstroAnekant" }
  ];

  const paymentMethods = [
    { name: "Visa", logo: "💳" },
    { name: "Mastercard", logo: "💳" },
    { name: "UPI", logo: "📱" },
    { name: "PayPal", logo: "💰" },
    { name: "Razorpay", logo: "⚡" },
    { name: "Net Banking", logo: "🏦" }
  ];

  const supportHours = {
    weekdays: "Monday - Friday: 9:00 AM - 8:00 PM",
    saturday: "Saturday: 10:00 AM - 6:00 PM",
    sunday: "Sunday: 11:00 AM - 5:00 PM"
  };

  return (
    <footer className="bg-gradient-to-br from-[#FEF7D7] via-amber-50 to-orange-100 border-t border-amber-200">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400"></div>
      
      {/* Main Footer Content */}
      <div className="py-16 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
            
            {/* Company Information */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-amber-900 mb-2 flex items-center gap-2">
                  <Star className="w-8 h-8 text-orange-500" />
                  {companyInfo.name}
                </h2>
                <p className="text-orange-600 font-semibold text-sm italic mb-3">
                  {companyInfo.tagline}
                </p>
                <p className="text-amber-800 leading-relaxed text-sm">
                  {companyInfo.description}
                </p>
              </div>
              
              {/* Address */}
              <div className="bg-white/60 p-4 rounded-lg border border-amber-200 shadow-sm">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-amber-900 text-sm mb-1">Our Location</h4>
                    <p className="text-amber-800 text-sm leading-relaxed">{companyInfo.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold text-amber-900 mb-6 flex items-center">
                <div className="w-6 h-6 bg-gradient-to-r from-orange-400 to-amber-400 rounded mr-3"></div>
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleNavigation(link.path)}
                      className="text-amber-700 hover:text-orange-600 transition-all duration-300 text-sm font-medium hover:translate-x-1 transform inline-flex items-center group"
                    >
                      <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3 group-hover:bg-orange-500 transition-colors"></div>
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Product Categories */}
            <div>
              <h3 className="text-xl font-bold text-amber-900 mb-6 flex items-center">
                <div className="w-6 h-6 bg-gradient-to-r from-orange-400 to-amber-400 rounded mr-3"></div>
                Our Products
              </h3>
              <ul className="space-y-3">
                {productCategories.map((category, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleNavigation(category.path)}
                      className="flex items-center space-x-3 text-amber-700 hover:text-orange-600 transition-all duration-300 text-sm font-medium hover:translate-x-1 transform group"
                    >
                      <category.icon className="w-4 h-4 text-orange-500 group-hover:text-orange-600" />
                      <span>{category.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Support */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-amber-900 mb-6 flex items-center">
                <div className="w-6 h-6 bg-gradient-to-r from-orange-400 to-amber-400 rounded mr-3"></div>
                Get In Touch
              </h3>
              
              {/* Contact Details */}
              <div className="bg-white/60 p-4 rounded-lg border border-amber-200 shadow-sm space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-orange-600" />
                  <div>
                    <p className="text-amber-900 font-semibold text-sm">Phone</p>
                    <p className="text-amber-800 text-sm">{contactInfo.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-orange-600" />
                  <div>
                    <p className="text-amber-900 font-semibold text-sm">Email</p>
                    <p className="text-amber-800 text-sm">{contactInfo.email}</p>
                  </div>
                </div>
              </div>

              {/* Support Hours */}
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <div className="flex items-start space-x-3">
                  <Clock className="w-4 h-4 text-orange-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-amber-900 text-sm mb-2">Support Hours</h4>
                    <div className="space-y-1 text-xs text-amber-800">
                      <p>{supportHours.weekdays}</p>
                      <p>{supportHours.saturday}</p>
                      <p>{supportHours.sunday}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h4 className="text-amber-900 font-semibold mb-3 text-sm">Follow Our Journey</h4>
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full flex items-center justify-center text-white hover:from-orange-500 hover:to-amber-500 transform hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg"
                      aria-label={social.name}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-amber-300 bg-gradient-to-r from-amber-100 to-orange-100 py-8">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
            
            {/* Payment Methods */}
            <div>
              <p className="text-amber-900 font-semibold text-sm mb-4">We Accept Payments Via:</p>
              <div className="flex flex-wrap gap-3">
                {paymentMethods.map((method, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg border border-amber-200 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <span className="text-lg">{method.logo}</span>
                    <span className="text-amber-800 text-xs font-medium">{method.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Copyright & Trust Badges */}
            <div className="text-center lg:text-right space-y-3">
              <p className="text-amber-800 font-semibold text-sm">
                © 2024 {companyInfo.name}. All Rights Reserved.
              </p>
              <div className="flex justify-center lg:justify-end gap-3">
                <div className="flex items-center space-x-2 px-3 py-1.5 bg-green-100 rounded-full border border-green-200">
                  <span className="text-green-600">🔒</span>
                  <span className="text-xs font-medium text-green-800">SSL Secured</span>
                </div>
                <div className="flex items-center space-x-2 px-3 py-1.5 bg-blue-100 rounded-full border border-blue-200">
                  <span className="text-blue-600">✓</span>
                  <span className="text-xs font-medium text-blue-800">Verified Store</span>
                </div>
                <div className="flex items-center space-x-2 px-3 py-1.5 bg-purple-100 rounded-full border border-purple-200">
                  <span className="text-purple-600">🚚</span>
                  <span className="text-xs font-medium text-purple-800">Shiprocket</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;