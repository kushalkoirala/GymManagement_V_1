 "use client";

import { FcGoogle } from 'react-icons/fc';

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
const REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI_CLIENT!;
const subdomain = window.location.hostname.split(".")[0];
 

const Page = () => {
  const handleGoogleLogin = () => {
    // const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=openid%20email%20profile`;
     const googleAuthUrl =
    `https://accounts.google.com/o/oauth2/v2/auth` +
    `?client_id=${GOOGLE_CLIENT_ID}` +
    `&redirect_uri=${REDIRECT_URI}` +
    `&response_type=code` +
    `&scope=openid%20email%20profile` +
    `&state=${encodeURIComponent(subdomain)}`;
    window.location.href = googleAuthUrl;
  };


  console.log(REDIRECT_URI)

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 flex flex-col">
      {/* Header Wave */}
      <div className="relative">
        <svg className="w-full h-32" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path 
            fill="#ffffff" 
            fillOpacity="0.3" 
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,101.3C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 pb-8 -mt-24">
        {/* Logo/Icon */}
        <div className="mb-6">
          <div className="w-20 h-20 bg-white rounded-3xl shadow-2xl flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
            <svg
              className="w-12 h-12 text-indigo-600"
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
        </div>

        {/* Welcome Text */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
            Welcome Back
          </h1>
          <p className="text-white/90 text-lg">
            Sign in to continue
          </p>
        </div>

        {/* Login Card */}
        <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6">
          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 hover:border-gray-300 active:scale-95 text-gray-700 font-semibold py-4 px-6 rounded-2xl transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <FcGoogle className="text-2xl" />
            <span className="text-base">Sign in with Google</span>
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-gray-500 font-medium">
                Fast & Secure
              </span>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-indigo-50 rounded-2xl p-4 border border-indigo-100">
            <div className="flex gap-3">
              <svg
                className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="text-sm text-indigo-900 font-medium mb-1">
                  Secure Authentication
                </p>
                <p className="text-xs text-indigo-700">
                  Your credentials are protected by Google&apos;s security
                </p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span>One-click access</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span>End-to-end encryption</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              <span>Trusted by millions</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center px-4">
          <p className="text-xs text-white/80">
            By continuing, you agree to our{' '}
            <a href="#" className="underline font-medium">
              Terms
            </a>{' '}
            and{' '}
            <a href="#" className="underline font-medium">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>

      {/* Bottom Decoration */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none opacity-20">
        <svg className="w-full h-24" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path 
            fill="#ffffff" 
            d="M0,48L48,56C96,64,192,80,288,80C384,80,480,64,576,58.7C672,53,768,59,864,69.3C960,80,1056,96,1152,96C1248,96,1344,80,1392,72L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Page;