import React, { useState, useEffect } from 'react';
import { Star, Award, MapPin, Clock, Phone, Mail, Eye, Heart, Shield, Sparkles, Users, Trophy } from 'lucide-react';

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const teamMembers = [
    {
      name: "Dr Hukumchand Jain",
      role: "Jyotishacharya and Vastu Expert",
      experience: "40+ Years Exp",
      specialization: "Vedic Astrology, Gemology",
      certifications: ["Certified Gemologist", "Vedic Astrology Master", "Vastu Expert"],
      image: "/api/placeholder/300/300"
    },
    {
      name: "Pro. Naleen.k.Shastri",
      role: "Philoshopher and Litterateur",
      experience: "38+ Years Exp",
      specialization: "Numerology, Crystal Healing",
      certifications: ["PhD in Astrology", "Crystal Healing Practitioner", "Reiki Master"],
      image: "/api/placeholder/300/300"
    },
    {
      name: "Ravi Jain Guruji",
      role: "Palmistry and kundli milan Expert",
      experience: "32+ Years Exp",
      specialization: "Yantra Consecration, Puja Rituals",
      certifications: ["Sanskrit Scholar", "Temple Priest", "Yantra Expert"],
      image: "/api/placeholder/300/300"
    }
  ];

  const values = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Authenticity Guarantee",
      description: "Every product is carefully sourced and authenticated by our expert team with 100% genuine guarantee."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Customer Satisfaction",
      description: "Your spiritual journey and satisfaction is our priority. We ensure personalized service for every customer."
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Spiritual Integrity",
      description: "We maintain the highest spiritual standards in sourcing, cleansing, and energizing all our products."
    }
  ];

  const awards = [
    { title: "Best Spiritual Store 2024", organization: "Spiritual Wellness Awards" },
    { title: "Excellence in Gemology", organization: "Indian Gem & Jewelry Council" },
    { title: "Customer Choice Award", organization: "E-commerce Excellence Awards" },
    { title: "Authentic Spiritual Products", organization: "Hindu Heritage Foundation" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEF7D7] to-white">
      {/* Navbar */}

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#9C0B13]/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-[#9C0B13] mb-6 animate-pulse">
              About Astro Anekant
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Bridging Ancient Wisdom with Modern Lives Through Authentic Spiritual Products
            </p>
            <div className="mt-8 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-[#9C0B13] to-red-600 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="absolute top-10 left-10 w-20 h-20 bg-[#FEF7D7] rounded-full opacity-60 animate-bounce"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-[#9C0B13]/20 rounded-full animate-pulse"></div>
      </section>

      {/* Our Story Section */}
      <section id="story" className={`py-20 transition-all duration-1000 ${isVisible.story ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-[#9C0B13] mb-8">Our Sacred Journey</h2>
              <div className="bg-white p-8 rounded-2xl shadow-xl border-l-4 border-[#9C0B13] hover:shadow-2xl transition-shadow duration-300">
                <h3 className="text-2xl font-semibold text-[#9C0B13] mb-4">Founded in Spiritual Heritage</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Established in 1986, Astro Anekant began as a small spiritual center in the heart of Rajasthan. Our founder, 
                  Pratisthacharya Pandit Surendra Kumar Jain, started this journey with a vision to make authentic spiritual products accessible to seekers worldwide.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  What started as a humble collection of sacred gems and yantras has grown into a trusted spiritual marketplace, 
                  serving thousands of devotees and spiritual practitioners across the globe.
                </p>
              </div>
              <div className="bg-gradient-to-r from-[#FEF7D7] to-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-semibold text-[#9C0B13] mb-4">Mission & Vision</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>Mission:</strong> To provide authentic, energized spiritual products that enhance spiritual growth, 
                  prosperity, and well-being of our customers through ancient Vedic wisdom.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <strong>Vision:</strong> To become the world's most trusted spiritual marketplace, preserving and sharing 
                  the sacred knowledge of our ancestors for future generations.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-[#9C0B13] to-red-600 p-8 rounded-2xl shadow-2xl text-white transform hover:scale-105 transition-transform duration-300">
                <Sparkles className="w-12 h-12 mb-6 animate-spin" />
                <h3 className="text-2xl font-bold mb-4">Our Spiritual Philosophy</h3>
                <p className="leading-relaxed mb-6">
                  We believe that every spiritual product carries divine energy that can transform lives. Our approach combines 
                  traditional Vedic principles with modern accessibility, ensuring that ancient wisdom reaches contemporary seekers.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold">35+</div>
                    <div className="text-sm opacity-90">Years of Service</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">50K+</div>
                    <div className="text-sm opacity-90">Happy Customers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">500+</div>
                    <div className="text-sm opacity-90">Products</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className={`py-20 bg-white transition-all duration-1000 ${isVisible.team ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#9C0B13] mb-4">Meet Our Spiritual Guides</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our team of experienced astrologers and spiritual advisors are here to guide you on your sacred journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="group">
                <div className="bg-gradient-to-br from-[#FEF7D7] to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2">
                  <div className="relative mb-6">
                    <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-[#9C0B13] to-red-600 p-1">
                      <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                        <Users className="w-16 h-16 text-[#9C0B13]" />
                      </div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#9C0B13] rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4 text-[#FEF7D7] animate-pulse" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#9C0B13] text-center mb-2">{member.name}</h3>
                  <p className="text-gray-600 text-center mb-3">{member.role}</p>
                  <div className="text-center mb-4">
                    <span className="bg-[#9C0B13] text-[#FEF7D7] px-3 py-1 rounded-full text-sm font-semibold">
                      {member.experience}
                    </span>
                  </div>
                  <p className="text-gray-700 text-center mb-4 text-sm">{member.specialization}</p>
                  <div className="space-y-2">
                    {member.certifications.map((cert, idx) => (
                      <div key={idx} className="bg-white p-2 rounded-lg shadow-sm text-center text-xs text-gray-600">
                        ✓ {cert}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section id="process" className={`py-20 bg-gradient-to-br from-[#FEF7D7] to-white transition-all duration-1000 ${isVisible.process ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#9C0B13] mb-4">Our Sacred Process</h2>
            <p className="text-xl text-gray-600">How we ensure authenticity and spiritual potency in every product</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105">
                <div className="w-20 h-20 bg-gradient-to-br from-[#9C0B13] to-red-600 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:animate-pulse">
                  <Shield className="w-10 h-10 text-[#FEF7D7]" />
                </div>
                <h3 className="text-2xl font-bold text-[#9C0B13] mb-4">Authentic Sourcing</h3>
                <p className="text-gray-700 leading-relaxed">
                  Direct sourcing from sacred mines and trusted artisans. Each gem and product is hand-selected 
                  based on astrological properties and natural formation.
                </p>
              </div>
            </div>

            <div className="text-center group">
              <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105">
                <div className="w-20 h-20 bg-gradient-to-br from-[#9C0B13] to-red-600 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:animate-pulse">
                  <Award className="w-10 h-10 text-[#FEF7D7]" />
                </div>
                <h3 className="text-2xl font-bold text-[#9C0B13] mb-4">Quality Assurance</h3>
                <p className="text-gray-700 leading-relaxed">
                  Rigorous testing and certification process. Each product undergoes gemological testing 
                  and spiritual evaluation before reaching our customers.
                </p>
              </div>
            </div>

            <div className="text-center group">
              <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105">
                <div className="w-20 h-20 bg-gradient-to-br from-[#9C0B13] to-red-600 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:animate-pulse">
                  <Sparkles className="w-10 h-10 text-[#FEF7D7]" />
                </div>
                <h3 className="text-2xl font-bold text-[#9C0B13] mb-4">Spiritual Energizing</h3>
                <p className="text-gray-700 leading-relaxed">
                  Sacred cleansing rituals and Vedic mantras are performed to enhance the spiritual energy 
                  of each product before delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values & Commitments */}
      <section id="values" className={`py-20 bg-white transition-all duration-1000 ${isVisible.values ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#9C0B13] mb-4">Our Sacred Commitments</h2>
            <p className="text-xl text-gray-600">Values that guide our spiritual mission</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="group">
                <div className="bg-gradient-to-br from-[#FEF7D7] to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1 border border-[#9C0B13]/10">
                  <div className="text-[#9C0B13] mb-6 group-hover:animate-bounce">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#9C0B13] mb-4">{value.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section id="awards" className={`py-20 bg-gradient-to-br from-[#FEF7D7] to-white transition-all duration-1000 ${isVisible.awards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#9C0B13] mb-4">Awards & Recognition</h2>
            <p className="text-xl text-gray-600">Honored for our commitment to spiritual excellence and authentic service</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {awards.map((award, index) => (
              <div key={index} className="group">
                <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-105 text-center border border-[#9C0B13]/10">
                  <Trophy className="w-12 h-12 text-[#9C0B13] mx-auto mb-4 group-hover:animate-bounce" />
                  <h3 className="font-bold text-[#9C0B13] mb-2 text-lg">{award.title}</h3>
                  <p className="text-gray-600 text-sm">{award.organization}</p>
                  <div className="mt-4 flex justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-[#9C0B13]/20 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-[#9C0B13] mb-4">Featured in Leading Publications</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Our expertise and authentic products have been recognized by major spiritual and lifestyle publications 
                including Spiritual Times, Astrology Today, and Divine Living Magazine.
              </p>
              <div className="flex justify-center space-x-8 opacity-60">
                <div className="text-sm font-semibold">Spiritual Times</div>
                <div className="text-sm font-semibold">Astrology Today</div>
                <div className="text-sm font-semibold">Divine Living</div>
                <div className="text-sm font-semibold">Sacred Gems Quarterly</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-[#9C0B13] to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Begin Your Spiritual Journey Today</h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Let our authentic products and expert guidance help you unlock your spiritual potential and transform your life
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#FEF7D7] text-[#9C0B13] px-8 py-4 rounded-xl font-bold text-lg hover:bg-white transition-colors duration-300 transform hover:scale-105">
              Explore Products
            </button>
            <button className="border-2 border-[#FEF7D7] text-[#FEF7D7] px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#FEF7D7] hover:text-[#9C0B13] transition-all duration-300 transform hover:scale-105">
              Book Consultation 
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;