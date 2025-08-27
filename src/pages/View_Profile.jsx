import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Shield, Home, Star, Eye } from 'lucide-react';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get user data from localStorage
  const getStoredUserData = () => {
    try {
      const storedUser = localStorage.getItem('user');
      const authToken = localStorage.getItem('authToken');
      
      if (!authToken) {
        setError('No authentication token found. Please login again.');
        setLoading(false);
        return null;
      }
      
      if (storedUser) {
        return JSON.parse(storedUser);
      }
      return null;
    } catch (err) {
      console.error('Error parsing stored user data:', err);
      return null;
    }
  };

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const authToken = localStorage.getItem('authToken');
      const storedUser = getStoredUserData();
      
      if (!authToken) {
        setError('Authentication token not found. Please login again.');
        return;
      }
      
      if (!storedUser || !storedUser._id) {
        setError('User information not found in storage. Please login again.');
        return;
      }

      const userId = storedUser._id;
      
      // Make API call with authentication header
      const response = await fetch(`https://astroanikantbackend-2.onrender.com/user/getsingleuser/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });
      
      const result = await response.json();
      
      if (response.ok && result.data) {
        setUserData(result.data);
        localStorage.setItem('user', JSON.stringify(result.data));
      } else {
        if (response.status === 401) {
          setError('Session expired. Please login again.');
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
        } else {
          setError(result.message || 'Failed to fetch user data');
        }
      }
    } catch (err) {
      console.error('API Error:', err);
      setError('Network error occurred. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedUser = getStoredUserData();
    
    if (storedUser) {
      setUserData(storedUser);
      setLoading(false);
      fetchUserData();
    } else {
      fetchUserData();
    }
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FEF7D7] to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-20 h-20 border-4 border-[#9C0B13] border-t-transparent rounded-full mx-auto mb-6"></div>
          <p className="text-[#9C0B13] text-xl font-semibold">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FEF7D7] to-white flex items-center justify-center p-4">
        <div className="text-center bg-white p-10 rounded-3xl shadow-2xl border border-red-200 max-w-md w-full">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Unable to Load Profile</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">{error}</p>
          <button 
            onClick={fetchUserData}
            className="w-full bg-[#9C0B13] text-white px-6 py-3 rounded-xl hover:bg-red-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FEF7D7] to-white flex items-center justify-center p-4">
        <div className="text-center bg-white p-10 rounded-3xl shadow-2xl max-w-md w-full">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Profile Data</h2>
          <p className="text-gray-600 leading-relaxed">Unable to find your profile information</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEF7D7] via-white to-[#FEF7D7] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Profile Header */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-10">
          <div className="relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#9C0B13] via-red-700 to-[#9C0B13] opacity-90"></div>
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 30% 20%, rgba(255,255,255,0.1) 0%, transparent 50%), 
                               radial-gradient(circle at 70% 80%, rgba(255,255,255,0.05) 0%, transparent 50%)`
            }}></div>
            
            <div className="relative px-8 py-16">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm border-4 border-white border-opacity-40 shadow-2xl">
                    <User className="w-16 h-16" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-400 rounded-full border-4 border-white flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
                
                {/* User Info */}
                <div className="text-center md:text-left flex-1">
                  <h1 className="text-5xl font-bold mb-3 drop-shadow-lg">{userData.name}</h1>
                  <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-6 mb-4">
                    <span className="bg-white bg-opacity-25 px-4 py-2 rounded-full text-lg font-medium capitalize backdrop-blur-sm">
                      {userData.role} Account
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${userData.isActive ? 'bg-green-400' : 'bg-red-400'} shadow-lg`}></div>
                      <span className="text-lg font-medium">{userData.isActive ? 'Active Profile' : 'Inactive Profile'}</span>
                    </div>
                  </div>
                  <p className="text-white text-opacity-90 text-lg">
                    Member since {formatDate(userData.date)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          
          {/* Personal Information Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-[#9C0B13] bg-opacity-10 rounded-xl flex items-center justify-center mr-4">
                <Star className="w-6 h-6 text-[#9C0B13]" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Personal Information</h2>
            </div>
            
            <div className="space-y-6">
              <div className="group">
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-[#FEF7D7] to-yellow-50 rounded-xl group-hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 bg-[#9C0B13] bg-opacity-10 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-[#9C0B13]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500 mb-1">Full Name</p>
                    <p className="text-lg font-semibold text-gray-800">{userData.name}</p>
                  </div>
                </div>
              </div>
              
              <div className="group">
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-[#FEF7D7] to-yellow-50 rounded-xl group-hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 bg-[#9C0B13] bg-opacity-10 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#9C0B13]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500 mb-1">Email Address</p>
                    <p className="text-lg font-semibold text-gray-800 break-all">{userData.email}</p>
                  </div>
                </div>
              </div>
              
              <div className="group">
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-[#FEF7D7] to-yellow-50 rounded-xl group-hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 bg-[#9C0B13] bg-opacity-10 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#9C0B13]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500 mb-1">Phone Number</p>
                    <p className="text-lg font-semibold text-gray-800">{userData.phone}</p>
                  </div>
                </div>
              </div>
              
              <div className="group">
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-[#FEF7D7] to-yellow-50 rounded-xl group-hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 bg-[#9C0B13] bg-opacity-10 rounded-lg flex items-center justify-center">
                    <Eye className="w-5 h-5 text-[#9C0B13]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500 mb-1">Gender</p>
                    <p className="text-lg font-semibold text-gray-800">{userData.gender || 'Not specified'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Summary Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-[#9C0B13] bg-opacity-10 rounded-xl flex items-center justify-center mr-4">
                <Shield className="w-6 h-6 text-[#9C0B13]" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Account Summary</h2>
            </div>
            
            <div className="space-y-8">
              {/* Account Status */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border-l-4 border-green-400">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">Account Status</h3>
                  <span className={`px-4 py-2 rounded-full text-sm font-bold ${userData.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {userData.isActive ? 'ACTIVE' : 'INACTIVE'}
                  </span>
                </div>
                <p className="text-gray-600">Your account is currently {userData.isActive ? 'active and ready to use' : 'inactive'}</p>
              </div>
              
              {/* User Role */}
              <div className="bg-gradient-to-r from-[#FEF7D7] to-yellow-50 p-6 rounded-xl border-l-4 border-[#9C0B13]">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">User Role</h3>
                  <span className="bg-[#9C0B13] text-white px-4 py-2 rounded-full text-sm font-bold uppercase">
                    {userData.role}
                  </span>
                </div>
                <p className="text-gray-600">You have {userData.role} level access to our platform</p>
              </div>
              
              {/* Member Since */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4 border-blue-400">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Member Since</h3>
                <p className="text-2xl font-bold text-blue-700 mb-1">{formatDate(userData.date)}</p>
                <p className="text-gray-600">Thank you for being part of our community!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Address Information - Full Width */}
        <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-[#9C0B13] bg-opacity-10 rounded-xl flex items-center justify-center mr-4">
              <MapPin className="w-6 h-6 text-[#9C0B13]" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Delivery Addresses</h2>
          </div>
          
          {userData.address && userData.address.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {userData.address.map((addr, index) => (
                <div key={index} className="group relative">
                  <div className="bg-gradient-to-br from-[#FEF7D7] via-yellow-50 to-white p-6 rounded-xl border-2 border-[#9C0B13] border-opacity-20 hover:border-opacity-40 transition-all duration-300 hover:shadow-lg">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-[#9C0B13] bg-opacity-10 rounded-lg flex items-center justify-center">
                          <Home className="w-4 h-4 text-[#9C0B13]" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">{addr.societyName}</h3>
                      </div>
                      <span className="bg-[#9C0B13] text-white px-3 py-1 rounded-full text-xs font-bold">
                        #{index + 1}
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-gray-600">
                      <p className="font-medium">{addr.street}</p>
                      <p>{addr.city}, {addr.state}</p>
                      <p className="font-semibold">PIN: {addr.pincode}</p>
                      <p className="text-[#9C0B13] font-semibold">{addr.country}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-xl">
              <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Addresses Found</h3>
              <p className="text-gray-500">You haven't added any delivery addresses yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;