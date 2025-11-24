"use client";

import { FcGoogle } from 'react-icons/fc';

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
const REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!;

const Page = () => {
  const handleGoogleLogin = () => {
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=openid%20email%20profile`;
    window.location.href = googleAuthUrl;
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Illustration */}
        <div className="hidden lg:flex flex-col items-center justify-center p-8">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-0 bg-linear-to-r from-blue-400 to-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <svg
              viewBox="0 0 400 400"
              className="w-full h-auto relative z-10"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background circles */}
              <circle cx="200" cy="200" r="180" fill="#E0E7FF" opacity="0.5" />
              <circle cx="200" cy="200" r="140" fill="#C7D2FE" opacity="0.5" />
              
              {/* Monitor/Screen */}
              <rect x="100" y="120" width="200" height="140" rx="8" fill="#4F46E5" />
              <rect x="110" y="130" width="180" height="110" rx="4" fill="#FFFFFF" />
              
              {/* Lock icon on screen */}
              <rect x="180" y="160" width="40" height="45" rx="4" fill="#4F46E5" />
              <circle cx="200" cy="165" r="15" fill="none" stroke="#4F46E5" strokeWidth="4" />
              <circle cx="200" cy="185" r="4" fill="#FFFFFF" />
              <line x1="200" y1="185" x2="200" y2="195" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
              
              {/* Monitor stand */}
              <rect x="190" y="260" width="20" height="40" fill="#6366F1" />
              <rect x="160" y="300" width="80" height="8" rx="4" fill="#6366F1" />
              
              {/* Floating elements */}
              <circle cx="80" cy="100" r="20" fill="#818CF8" opacity="0.6">
                <animate attributeName="cy" values="100;90;100" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="320" cy="280" r="25" fill="#A78BFA" opacity="0.6">
                <animate attributeName="cy" values="280;270;280" dur="4s" repeatCount="indefinite" />
              </circle>
              <circle cx="340" cy="120" r="15" fill="#C4B5FD" opacity="0.6">
                <animate attributeName="cy" values="120;110;120" dur="3.5s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mt-8 text-center">
            Secure Access
          </h2>
          <p className="text-gray-600 mt-4 text-center max-w-md">
            Sign in securely with your Google account and access your personalized dashboard
          </p>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full flex items-center justify-center">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-600 text-sm md:text-base">
                Sign in to continue to your account
              </p>
            </div>

            <div className="space-y-6">
              <button
                onClick={handleGoogleLogin}
                className="w-full cursor-pointer flex items-center justify-center gap-3 bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:shadow-lg group"
              >
                <FcGoogle className="text-2xl group-hover:scale-110 transition-transform duration-300" />
                <span className="text-base md:text-lg">Sign in with Google</span>
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Quick & Secure</span>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-blue-600 mt-0.5 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-xs md:text-sm text-blue-800">
                    We use Google&apos;s secure authentication. Your credentials are never stored on our servers.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-xs text-gray-500">
                By signing in, you agree to our{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Illustration - Shows below form on mobile */}
        <div className="lg:hidden flex flex-col items-center justify-center p-4">
          <div className="relative w-full max-w-xs">
            <div className="absolute inset-0 bg-linear-to-r from-blue-400 to-purple-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
            <svg
              viewBox="0 0 300 300"
              className="w-full h-auto relative z-10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="150" cy="150" r="120" fill="#E0E7FF" opacity="0.5" />
              <circle cx="150" cy="150" r="90" fill="#C7D2FE" opacity="0.5" />
              
              <rect x="75" y="90" width="150" height="105" rx="6" fill="#4F46E5" />
              <rect x="82" y="97" width="136" height="83" rx="3" fill="#FFFFFF" />
              
              <rect x="135" y="120" width="30" height="34" rx="3" fill="#4F46E5" />
              <circle cx="150" cy="124" r="11" fill="none" stroke="#4F46E5" strokeWidth="3" />
              <circle cx="150" cy="139" r="3" fill="#FFFFFF" />
              <line x1="150" y1="139" x2="150" y2="147" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
              
              <rect x="142" y="195" width="16" height="30" fill="#6366F1" />
              <rect x="120" y="225" width="60" height="6" rx="3" fill="#6366F1" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;