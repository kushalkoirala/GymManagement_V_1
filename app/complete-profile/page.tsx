"use client";

import React, { useState } from 'react';
import { FiUser, FiPhone, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/complete-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          phoneNumber: formData.phone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setSuccess('Profile completed successfully!');
      
      // Redirect to dashboard or home page after 1.5 seconds
      setTimeout(() => {
        router.push('/dashboard'); // Change this to your desired route
      }, 1500);

    } catch (err: any) {
      setError(err.message || 'Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Illustration */}
        <div className="hidden lg:flex flex-col items-center justify-center p-8">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <svg
              viewBox="0 0 400 400"
              className="w-full h-auto relative z-10"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background circles */}
              <circle cx="200" cy="200" r="180" fill="#EDE9FE" opacity="0.5" />
              <circle cx="200" cy="200" r="140" fill="#DDD6FE" opacity="0.5" />
              
              {/* User profile card */}
              <rect x="80" y="140" width="240" height="160" rx="12" fill="#8B5CF6" />
              <rect x="95" y="155" width="210" height="130" rx="8" fill="#FFFFFF" />
              
              {/* Avatar circle */}
              <circle cx="200" cy="190" r="25" fill="#A78BFA" />
              <circle cx="200" cy="185" r="8" fill="#FFFFFF" />
              <path d="M 185 200 Q 200 210 215 200" stroke="#FFFFFF" strokeWidth="3" fill="none" strokeLinecap="round" />
              
              {/* Form lines */}
              <line x1="120" y1="230" x2="280" y2="230" stroke="#E9D5FF" strokeWidth="8" strokeLinecap="round" />
              <line x1="120" y1="250" x2="280" y2="250" stroke="#E9D5FF" strokeWidth="8" strokeLinecap="round" />
              <line x1="120" y1="270" x2="220" y2="270" stroke="#E9D5FF" strokeWidth="8" strokeLinecap="round" />
              
              {/* Floating elements */}
              <circle cx="70" cy="90" r="22" fill="#A78BFA" opacity="0.6">
                <animate attributeName="cy" values="90;80;90" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="330" cy="290" r="28" fill="#C4B5FD" opacity="0.6">
                <animate attributeName="cy" values="290;280;290" dur="4s" repeatCount="indefinite" />
              </circle>
              <circle cx="340" cy="100" r="18" fill="#DDD6FE" opacity="0.6">
                <animate attributeName="cy" values="100;90;100" dur="3.5s" repeatCount="indefinite" />
              </circle>
              
              {/* Checkmark */}
              <circle cx="290" cy="170" r="20" fill="#10B981" />
              <path d="M 283 170 L 287 175 L 297 165" stroke="#FFFFFF" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mt-8 text-center">
            Almost There!
          </h2>
          <p className="text-gray-600 mt-4 text-center max-w-md">
            Complete your profile to personalize your experience and unlock all features
          </p>
        </div>

        {/* Right Side - Form */}
        <div className="w-full flex items-center justify-center">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full mb-4">
                <FiUser className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                Complete Profile
              </h1>
              <p className="text-gray-600 text-sm md:text-base">
                Let's get to know you better
              </p>
            </div>

            <div className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                  <FiAlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
                  <FiCheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-green-800">{success}</p>
                </div>
              )}

              {/* First Name */}
              <div className="space-y-2">
                <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700">
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiUser className="text-gray-400" size={20} />
                  </div>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 outline-none text-gray-800 placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Enter your first name"
                    required
                  />
                </div>
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700">
                  Last Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiUser className="text-gray-400" size={20} />
                  </div>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 outline-none text-gray-800 placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Enter your last name"
                    required
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiPhone className="text-gray-400" size={20} />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isLoading}
                    maxLength={10}
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 outline-none text-gray-800 placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="9876543210"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 pl-1">Enter 10-digit mobile number</p>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Updating...</span>
                  </>
                ) : (
                  'Complete Profile'
                )}
              </button>

              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mt-6">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-xs md:text-sm text-purple-800">
                    Your information is secure and will only be used to enhance your experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Illustration - Shows below form on mobile */}
        <div className="lg:hidden flex flex-col items-center justify-center p-4">
          <div className="relative w-full max-w-xs">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
            <svg
              viewBox="0 0 300 300"
              className="w-full h-auto relative z-10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="150" cy="150" r="120" fill="#EDE9FE" opacity="0.5" />
              <circle cx="150" cy="150" r="90" fill="#DDD6FE" opacity="0.5" />
              
              <rect x="60" y="105" width="180" height="120" rx="9" fill="#8B5CF6" />
              <rect x="71" y="116" width="158" height="98" rx="6" fill="#FFFFFF" />
              
              <circle cx="150" cy="143" r="19" fill="#A78BFA" />
              <circle cx="150" cy="139" r="6" fill="#FFFFFF" />
              <path d="M 139 152 Q 150 158 161 152" stroke="#FFFFFF" strokeWidth="2" fill="none" strokeLinecap="round" />
              
              <line x1="90" y1="173" x2="210" y2="173" stroke="#E9D5FF" strokeWidth="6" strokeLinecap="round" />
              <line x1="90" y1="188" x2="210" y2="188" stroke="#E9D5FF" strokeWidth="6" strokeLinecap="round" />
              <line x1="90" y1="203" x2="165" y2="203" stroke="#E9D5FF" strokeWidth="6" strokeLinecap="round" />
              
              <circle cx="218" cy="128" r="15" fill="#10B981" />
              <path d="M 213 128 L 216 132 L 223 124" stroke="#FFFFFF" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}