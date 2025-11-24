"use client";

import React, { useState } from 'react';
import { FiHome, FiLink, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    slug: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });

    // Auto-generate slug from name if slug field is being updated
    if (name === 'name') {
      const generatedSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
        .trim();
      
      setFormData(prev => ({
        ...prev,
        name: value,
        slug: generatedSlug
      }));
    }

    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/create-gym', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          slug: formData.slug.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setSuccess('Gym created successfully!');
      
      // Redirect to gym dashboard or home page after 1.5 seconds
      setTimeout(() => {
        router.push('/dashboard'); // Change this to your desired route
      }, 1500);

    } catch (err: any) {
      setError(err.message || 'Failed to create gym. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Illustration */}
        <div className="hidden lg:flex flex-col items-center justify-center p-8">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <svg
              viewBox="0 0 400 400"
              className="w-full h-auto relative z-10"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background circles */}
              <circle cx="200" cy="200" r="180" fill="#D1FAE5" opacity="0.5" />
              <circle cx="200" cy="200" r="140" fill="#A7F3D0" opacity="0.5" />
              
              {/* Gym building */}
              <rect x="100" y="180" width="200" height="140" rx="8" fill="#059669" />
              <rect x="110" y="190" width="180" height="120" rx="6" fill="#FFFFFF" />
              
              {/* Gym door */}
              <rect x="170" y="250" width="60" height="60" rx="4" fill="#10B981" />
              <circle cx="215" cy="280" r="3" fill="#FFFFFF" />
              
              {/* Windows */}
              <rect x="125" y="205" width="35" height="30" rx="3" fill="#CCFBF1" />
              <rect x="240" y="205" width="35" height="30" rx="3" fill="#CCFBF1" />
              
              {/* Roof */}
              <path d="M 90 180 L 200 120 L 310 180 Z" fill="#047857" />
              
              {/* Dumbbell icon */}
              <circle cx="200" cy="160" r="20" fill="#FFFFFF" />
              <rect x="190" y="157" width="20" height="6" rx="3" fill="#059669" />
              <circle cx="188" cy="160" r="5" fill="#059669" />
              <circle cx="212" cy="160" r="5" fill="#059669" />
              
              {/* Floating elements */}
              <circle cx="70" cy="100" r="22" fill="#34D399" opacity="0.6">
                <animate attributeName="cy" values="100;90;100" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="330" cy="280" r="28" fill="#6EE7B7" opacity="0.6">
                <animate attributeName="cy" values="280;270;280" dur="4s" repeatCount="indefinite" />
              </circle>
              <circle cx="340" cy="110" r="18" fill="#A7F3D0" opacity="0.6">
                <animate attributeName="cy" values="110;100;110" dur="3.5s" repeatCount="indefinite" />
              </circle>
              
              {/* Plus sign */}
              <circle cx="80" cy="260" r="20" fill="#10B981" opacity="0.7">
                <animate attributeName="cy" values="260;250;260" dur="3.2s" repeatCount="indefinite" />
              </circle>
              <line x1="80" y1="252" x2="80" y2="268" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
              <line x1="72" y1="260" x2="88" y2="260" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mt-8 text-center">
            Start Your Fitness Journey
          </h2>
          <p className="text-gray-600 mt-4 text-center max-w-md">
            Create your gym profile and start managing memberships, classes, and more
          </p>
        </div>

        {/* Right Side - Form */}
        <div className="w-full flex items-center justify-center">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full mb-4">
                <FiHome className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                Create Your Gym
              </h1>
              <p className="text-gray-600 text-sm md:text-base">
                Set up your gym profile in seconds
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

              {/* Gym Name */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                  Gym Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiHome className="text-gray-400" size={20} />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isLoading}
                    maxLength={50}
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 outline-none text-gray-800 placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Enter your gym name"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 pl-1">This is your gym's display name</p>
              </div>

              {/* Gym Slug */}
              <div className="space-y-2">
                <label htmlFor="slug" className="block text-sm font-semibold text-gray-700">
                  Gym Slug (URL)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiLink className="text-gray-400" size={20} />
                  </div>
                  <input
                    type="text"
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    disabled={isLoading}
                    maxLength={50}
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 outline-none text-gray-800 placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="my-awesome-gym"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 pl-1">
                  Auto-generated from name. Used in your gym's URL
                </p>
              </div>

              {/* Preview URL */}
              {formData.slug && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                  <p className="text-xs font-semibold text-emerald-800 mb-1">Your gym URL will be:</p>
                  <p className="text-sm text-emerald-700 font-mono break-all">
                    yourdomain.com/gym/{formData.slug}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isLoading || !formData.name.trim() || !formData.slug.trim()}
                className="w-full cursor-pointer bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Creating...</span>
                  </>
                ) : (
                  'Create Gym'
                )}
              </button>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mt-6">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-xs md:text-sm text-emerald-800">
                    You can update your gym details anytime from the settings page.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Illustration - Shows below form on mobile */}
        <div className="lg:hidden flex flex-col items-center justify-center p-4">
          <div className="relative w-full max-w-xs">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
            <svg
              viewBox="0 0 300 300"
              className="w-full h-auto relative z-10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="150" cy="150" r="120" fill="#D1FAE5" opacity="0.5" />
              <circle cx="150" cy="150" r="90" fill="#A7F3D0" opacity="0.5" />
              
              <rect x="75" y="135" width="150" height="105" rx="6" fill="#059669" />
              <rect x="82" y="142" width="136" height="90" rx="5" fill="#FFFFFF" />
              
              <rect x="127" y="187" width="45" height="45" rx="3" fill="#10B981" />
              <circle cx="161" cy="210" r="2" fill="#FFFFFF" />
              
              <rect x="94" y="154" width="26" height="23" rx="2" fill="#CCFBF1" />
              <rect x="180" y="154" width="26" height="23" rx="2" fill="#CCFBF1" />
              
              <path d="M 67 135 L 150 90 L 233 135 Z" fill="#047857" />
              
              <circle cx="150" cy="120" r="15" fill="#FFFFFF" />
              <rect x="142" y="118" width="16" height="4" rx="2" fill="#059669" />
              <circle cx="141" cy="120" r="4" fill="#059669" />
              <circle cx="159" cy="120" r="4" fill="#059669" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}