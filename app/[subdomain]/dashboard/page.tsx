"use client"

import React, { useState } from 'react';
import { 
  Home, Calendar, Lock, Camera, TrendingUp, Apple, User, 
  LogOut, Menu, X, CheckCircle, Clock, Flame, Target,
  Upload, Zap, Activity, Award, Bell
} from 'lucide-react';

export default function ClientDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [nutritionImage, setNutritionImage] = useState(null);
  const [bodyImage, setBodyImage] = useState(null);
  const [analyzingNutrition, setAnalyzingNutrition] = useState(false);
  const [analyzingBody, setAnalyzingBody] = useState(false);

  // Mock data
  const userData = {
    name: "John Doe",
    membershipType: "Premium",
    lockerId: "A-127",
    memberSince: "Jan 2024",
    streak: 12
  };

  const attendanceData = [
    { date: "Dec 20, 2024", checkIn: "06:30 AM", checkOut: "08:15 AM", duration: "1h 45m" },
    { date: "Dec 19, 2024", checkIn: "06:45 AM", checkOut: "08:00 AM", duration: "1h 15m" },
    { date: "Dec 18, 2024", checkIn: "07:00 AM", checkOut: "08:30 AM", duration: "1h 30m" },
    { date: "Dec 17, 2024", checkIn: "06:30 AM", checkOut: "08:00 AM", duration: "1h 30m" },
  ];

  const stats = [
    { label: "This Month", value: "18 days", icon: Calendar, color: "from-blue-500 to-cyan-500" },
    { label: "Total Hours", value: "32.5 hrs", icon: Clock, color: "from-purple-500 to-pink-500" },
    { label: "Calories Burned", value: "12,450", icon: Flame, color: "from-orange-500 to-red-500" },
    { label: "Streak", value: `${userData.streak} days`, icon: Zap, color: "from-green-500 to-emerald-500" }
  ];

  const handleNutritionUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNutritionImage(event.target?.result);
        setAnalyzingNutrition(true);
        // Simulate AI analysis
        setTimeout(() => setAnalyzingNutrition(false), 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBodyUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setBodyImage(event.target?.result);
        setAnalyzingBody(true);
        // Simulate AI analysis
        setTimeout(() => setAnalyzingBody(false), 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  const nutritionResults = {
    calories: 450,
    protein: 32,
    carbs: 45,
    fats: 18,
    items: ["Grilled Chicken", "Brown Rice", "Mixed Vegetables", "Olive Oil"]
  };

  const bodyProgress = {
    weight: { current: 75, previous: 78, change: -3 },
    bodyFat: { current: 18, previous: 21, change: -3 },
    muscle: { current: 42, previous: 40, change: +2 },
    bmi: { current: 24.2, previous: 25.1, change: -0.9 }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'attendance', label: 'Attendance', icon: Calendar },
    { id: 'locker', label: 'Locker Info', icon: Lock },
    { id: 'nutrition', label: 'AI Nutrition', icon: Apple },
    { id: 'progress', label: 'Body Progress', icon: TrendingUp },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}>
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <Activity className="w-8 h-8 text-purple-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                FitZone
              </span>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 p-4">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg mb-2 transition-all ${
                activeTab === item.id 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button className="w-full flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 rounded-lg transition-all">
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-6 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {userData.name}!</h1>
              <p className="text-gray-600 mt-1">Let's crush your fitness goals today 💪</p>
            </div>
            <button className="p-3 hover:bg-gray-100 rounded-full relative">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </header>

        <div className="p-6">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Quick Info Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">Membership Info</h3>
                    <Award className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Plan</span>
                      <span className="font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {userData.membershipType}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Member Since</span>
                      <span className="font-semibold text-gray-900">{userData.memberSince}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Locker ID</span>
                      <span className="font-semibold text-gray-900">{userData.lockerId}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">Daily Streak</h3>
                    <Zap className="w-6 h-6" />
                  </div>
                  <div className="text-5xl font-bold mb-2">{userData.streak}</div>
                  <p className="text-white/80">consecutive days! Keep it up! 🔥</p>
                </div>
              </div>

              {/* Recent Attendance */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {attendanceData.slice(0, 3).map((record, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-4">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <div>
                          <p className="font-semibold text-gray-900">{record.date}</p>
                          <p className="text-sm text-gray-600">{record.checkIn} - {record.checkOut}</p>
                        </div>
                      </div>
                      <span className="text-purple-600 font-semibold">{record.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Attendance Tab */}
          {activeTab === 'attendance' && (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Attendance History</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Check In</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Check Out</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Duration</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceData.map((record, idx) => (
                      <tr key={idx} className="border-t border-gray-100">
                        <td className="px-6 py-4 text-gray-900">{record.date}</td>
                        <td className="px-6 py-4 text-gray-600">{record.checkIn}</td>
                        <td className="px-6 py-4 text-gray-600">{record.checkOut}</td>
                        <td className="px-6 py-4 font-semibold text-purple-600">{record.duration}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                            Completed
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Locker Tab */}
          {activeTab === 'locker' && (
            <div className="max-w-2xl">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Your Locker</h2>
                    <p className="text-gray-600">Secure storage for your belongings</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                    <p className="text-gray-600 mb-2">Locker Number</p>
                    <p className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {userData.lockerId}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <p className="text-gray-600 text-sm mb-1">Location</p>
                      <p className="font-semibold text-gray-900">Floor 1, Section A</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <p className="text-gray-600 text-sm mb-1">Size</p>
                      <p className="font-semibold text-gray-900">Standard</p>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <p className="text-blue-900 font-medium">💡 Tip: Always lock your locker after use!</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Nutrition Tab */}
          {activeTab === 'nutrition' && (
            <div className="max-w-4xl">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                    <Apple className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">AI Nutrition Analysis</h2>
                    <p className="text-gray-600">Upload a photo of your meal for instant nutrition info</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-purple-500 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleNutritionUpload}
                      className="hidden"
                      id="nutrition-upload"
                    />
                    <label htmlFor="nutrition-upload" className="cursor-pointer">
                      <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-900 font-semibold mb-2">Click to upload food photo</p>
                      <p className="text-gray-600 text-sm">Or drag and drop your image here</p>
                    </label>
                  </div>

                  {nutritionImage && (
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <img src={nutritionImage} alt="Food" className="w-full h-64 object-cover rounded-xl" />
                      </div>
                      <div>
                        {analyzingNutrition ? (
                          <div className="flex items-center justify-center h-64">
                            <div className="text-center">
                              <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                              <p className="text-gray-600">Analyzing nutrition...</p>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <h3 className="text-xl font-bold text-gray-900">Nutrition Facts</h3>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="p-4 bg-orange-50 rounded-xl">
                                <p className="text-orange-600 text-sm">Calories</p>
                                <p className="text-2xl font-bold text-gray-900">{nutritionResults.calories}</p>
                              </div>
                              <div className="p-4 bg-blue-50 rounded-xl">
                                <p className="text-blue-600 text-sm">Protein</p>
                                <p className="text-2xl font-bold text-gray-900">{nutritionResults.protein}g</p>
                              </div>
                              <div className="p-4 bg-green-50 rounded-xl">
                                <p className="text-green-600 text-sm">Carbs</p>
                                <p className="text-2xl font-bold text-gray-900">{nutritionResults.carbs}g</p>
                              </div>
                              <div className="p-4 bg-purple-50 rounded-xl">
                                <p className="text-purple-600 text-sm">Fats</p>
                                <p className="text-2xl font-bold text-gray-900">{nutritionResults.fats}g</p>
                              </div>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-xl">
                              <p className="text-gray-600 text-sm mb-2">Detected Items:</p>
                              <div className="flex flex-wrap gap-2">
                                {nutritionResults.items.map((item, idx) => (
                                  <span key={idx} className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 border border-gray-200">
                                    {item}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Progress Tab */}
          {activeTab === 'progress' && (
            <div className="max-w-4xl">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">AI Body Progress Tracking</h2>
                    <p className="text-gray-600">Track your transformation with AI-powered analysis</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-500 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleBodyUpload}
                      className="hidden"
                      id="body-upload"
                    />
                    <label htmlFor="body-upload" className="cursor-pointer">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-900 font-semibold mb-2">Upload progress photo</p>
                      <p className="text-gray-600 text-sm">Take a photo in consistent lighting for best results</p>
                    </label>
                  </div>

                  {bodyImage && (
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <img src={bodyImage} alt="Body Progress" className="w-full h-96 object-cover rounded-xl" />
                      </div>
                      <div>
                        {analyzingBody ? (
                          <div className="flex items-center justify-center h-96">
                            <div className="text-center">
                              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                              <p className="text-gray-600">Analyzing body composition...</p>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <h3 className="text-xl font-bold text-gray-900">Progress Analysis</h3>
                            {Object.entries(bodyProgress).map(([key, data]) => (
                              <div key={key} className="p-4 bg-gray-50 rounded-xl">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                    data.change > 0 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                  }`}>
                                    {data.change > 0 ? '+' : ''}{data.change}{key === 'weight' ? 'kg' : '%'}
                                  </span>
                                </div>
                                <div className="flex items-end gap-2">
                                  <span className="text-3xl font-bold text-gray-900">{data.current}</span>
                                  <span className="text-gray-400 mb-1">from {data.previous}</span>
                                </div>
                              </div>
                            ))}
                            <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                              <p className="text-green-900 font-medium">🎉 Great progress! Keep up the good work!</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="max-w-2xl">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                    {userData.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{userData.name}</h2>
                    <p className="text-gray-600">{userData.membershipType} Member</p>
                    <p className="text-sm text-gray-500 mt-1">Member since {userData.memberSince}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue="john.doe@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      defaultValue="+1 (555) 123-4567"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
                      <input
                        type="number"
                        defaultValue="175"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Weight Goal (kg)</label>
                      <input
                        type="number"
                        defaultValue="70"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}