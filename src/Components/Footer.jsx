import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  Sparkles,
  CheckCircle,
  TrendingUp,
  BookOpen,
  HeartPulse,
  Droplets,
  MessageCircle,
  AwardIcon,
  TrendingUpIcon,
  GraduationCap,
  Activity,
  GemIcon,
  Pill,
  Infinity
} from 'lucide-react';
import { SiFacebook, SiInstagram, SiWhatsapp, SiYoutube } from 'react-icons/si';
import { BsTwitterX } from 'react-icons/bs';
// react-icons (best matching icons from FontAwesome & others)
import { FaAward, FaBusinessTime, FaBookReader, FaHeartbeat } from "react-icons/fa";
import { GiLotus, GiPrayerBeads } from "react-icons/gi"; // for Rudraksha (spiritual)



const Footer = () => {
  const navigate = useNavigate();
  // Navigation function for SPA routing
  const handleNavigation = (path) => {
    navigate(path);
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
    // { name: "Shipping Info", path: "/shipping-info" },
    { name: "Book a Consultation", path: "/booking" },
    { name: "Donation", path: "/donation" }
  ];

  // On click, handleNavigation is already used in the button below to redirect to the given path.
  // No further changes needed here, as the button's onClick calls handleNavigation(link.path).


const productCategories = [
  { 
    id: 1, 
    name: "Sarv Karya Siddhi", 
      icon: Infinity, // success / siddhi / accomplishment, // success / siddhi / accomplishment
    count: "150+ Remedies", 
    color: "from-red-500 to-pink-600", 
    path: "/products?category=sarv-karya-siddhi" 
  },
  { 
    id: 2, 
    name: "Vyapar Vriddhi", 
    icon: FaBusinessTime, // business growth / prosperity
    count: "80+ Solutions", 
    color: "from-amber-500 to-orange-600", 
    path: "/products?category=vyapar-vriddhi" 
  },
  { 
    id: 3, 
    name: "Vidhya Prapti", 
    icon: FaBookReader, // knowledge, learning, wisdom
    count: "120+ Practices", 
    color: "from-purple-500 to-indigo-600", 
    path: "/products?category=vidhya-prapti" 
  },
  { 
    id: 4, 
    name: "Sarv Rog Nivaran", 
    icon: Pill, // health, disease cure
    count: "60+ Treatments", 
    color: "from-emerald-500 to-teal-600", 
    path: "/products?category=sarv-rog-nivaran" 
  },
  { 
    id: 5, 
    name: "Rudraksha", 
    icon: GiPrayerBeads, // spirituality / meditation / beads
    count: "90+ Beads", 
    color: "from-yellow-500 to-amber-700", 
    path: "/products?category=rudraksha" 
  }
];

  const contactInfo = {
    phone: "+91 98765 43210",
    email: "astroanekant@gmail.com",
    whatsapp: "+91 98765 43210"
  };

const socialLinks = [
  { name: "Facebook", icon: SiFacebook, url: "https://facebook.com/AstroAnekant", color: "#1877F2" },
  { name: "Instagram", icon: SiInstagram, url: "https://instagram.com/AstroAnekant", color: "#E4405F" },
  { name: "Twitter", icon: BsTwitterX, url: "https://twitter.com/AstroAnekant", color: "#1DA1F2" },
  { name: "YouTube", icon: SiYoutube, url: "https://youtube.com/%40ASTROANEKANT", color: "#FF0000" },
  { name: "WhatsApp Community", icon: SiWhatsapp, url: "https://whatsapp.com/channel/0029VbBakTvFCCoa5ei2aZ0h", color: "#25D366" },
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
    weekdays: "Monday - Friday: 10:00 AM - 6:00 PM",
    saturday: "Saturday: 10:00 AM - 6:00 PM",
    sunday: "Sunday: 10:00 AM - 6:00 PM"
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
                Our Products Category
              </h3>
              <ul className="space-y-3">
                {productCategories.map((category, index) => (
                  <li key={index}>
                    <button
                      // onClick={() => handleNavigation(category.path)}
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
                  <Mail className="w-4 h-4 text-orange-600" />
                  <div>
                    <p className="text-amber-900 font-semibold text-sm">Email</p>
                    <p className="text-amber-800 text-sm">{contactInfo.email}</p>
                  </div>
                </div>
              </div>


              {/* Social Media */}
              <div>
                <h4 className="text-amber-900 font-semibold mb-3 text-sm">Follow Our Journey</h4>
                <div className="flex space-x-3">
{socialLinks.map(({ name, icon: Icon, url, color }) => (
  <a
    key={name}
    href={url}
    target="_blank"
    rel="noreferrer"  
    className="inline-flex items-center gap-2 p-2"
  >
    <Icon className="h-6 w-6" style={{ color }} />
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