import React from 'react';
import { Dumbbell, Target, Users, Award, Clock, TrendingUp } from 'lucide-react';
import Link from 'next/link';
export default function GymLandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Dumbbell className="w-8 h-8 text-purple-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              FitZone
            </span>
          </div>
          <Link href="/login"> 
          <button className="px-6 cursor-pointer py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
            Login
          </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-6xl font-bold mb-6 leading-tight">
                Transform Your
                <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Body & Mind
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Join the ultimate fitness experience with state-of-the-art equipment, expert trainers, and a community that motivates you every step of the way.
              </p>
              <div className="flex gap-4">
                <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300">
                  Start Free Trial
                </button>
                <button className="px-8 py-4 border-2 border-purple-600 text-purple-600 rounded-full font-semibold hover:bg-purple-50 transition-all duration-300">
                  View Plans
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl blur-3xl opacity-20"></div>
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=800&fit=crop"
                alt="Fitness training"
                className="relative rounded-3xl shadow-2xl w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Why Choose FitZone?</h2>
            <p className="text-xl text-gray-600">Everything you need to achieve your fitness goals</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: "Personal Training", desc: "One-on-one sessions with certified trainers" },
              { icon: Users, title: "Group Classes", desc: "Energizing classes for all fitness levels" },
              { icon: Clock, title: "24/7 Access", desc: "Work out on your schedule, anytime" },
              { icon: Award, title: "Expert Coaches", desc: "Learn from the best in the industry" },
              { icon: TrendingUp, title: "Track Progress", desc: "Monitor your gains with our app" },
              { icon: Dumbbell, title: "Modern Equipment", desc: "Latest machines and free weights" }
            ].map((feature, idx) => (
              <div key={idx} className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Our Facilities</h2>
            <p className="text-xl text-gray-600">State-of-the-art gym with everything you need</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <img
              src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500&h=400&fit=crop"
              alt="Gym equipment"
              className="rounded-2xl shadow-lg h-64 w-full object-cover hover:scale-105 transition-transform duration-300"
            />
            <img
              src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=500&h=400&fit=crop"
              alt="Group training"
              className="rounded-2xl shadow-lg h-64 w-full object-cover hover:scale-105 transition-transform duration-300"
            />
            <img
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&h=400&fit=crop"
              alt="Cardio area"
              className="rounded-2xl shadow-lg h-64 w-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Choose Your Plan</h2>
            <p className="text-xl text-gray-600">Flexible membership options for every goal</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Basic", price: "29", features: ["Gym Access", "Locker Room", "Basic Equipment"] },
              { name: "Pro", price: "59", features: ["Everything in Basic", "Group Classes", "Nutrition Guide", "Mobile App"], popular: true },
              { name: "Elite", price: "99", features: ["Everything in Pro", "Personal Training", "Spa Access", "Priority Support"] }
            ].map((plan, idx) => (
              <div key={idx} className={`p-8 rounded-2xl ${plan.popular ? 'bg-gradient-to-b from-purple-600 to-pink-600 text-white scale-105' : 'bg-white'} shadow-xl hover:shadow-2xl transition-all duration-300`}>
                {plan.popular && (
                  <div className="text-center mb-4">
                    <span className="bg-white text-purple-600 px-4 py-1 rounded-full text-sm font-semibold">Most Popular</span>
                  </div>
                )}
                <h3 className={`text-3xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold">${plan.price}</span>
                  <span className={plan.popular ? 'text-white/80' : 'text-gray-600'}>/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded-full ${plan.popular ? 'bg-white/20' : 'bg-purple-100'} flex items-center justify-center`}>
                        <span className={plan.popular ? 'text-white' : 'text-purple-600'}>✓</span>
                      </div>
                      <span className={plan.popular ? 'text-white' : 'text-gray-600'}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-full font-semibold transition-all duration-300 ${plan.popular ? 'bg-white text-purple-600 hover:bg-gray-100' : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'}`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-16 shadow-2xl">
            <h2 className="text-5xl font-bold text-white mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl text-white/90 mb-8">Join thousands of members who transformed their lives with FitZone</p>
            <button className="px-12 py-4 bg-white text-purple-600 rounded-full font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              Claim Your Free Trial
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Dumbbell className="w-8 h-8 text-purple-400" />
                <span className="text-2xl font-bold">FitZone</span>
              </div>
              <p className="text-gray-400">Transform your body and mind with the ultimate fitness experience.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
                <li className="hover:text-white cursor-pointer transition-colors">Classes</li>
                <li className="hover:text-white cursor-pointer transition-colors">Trainers</li>
                <li className="hover:text-white cursor-pointer transition-colors">Blog</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
                <li className="hover:text-white cursor-pointer transition-colors">FAQ</li>
                <li className="hover:text-white cursor-pointer transition-colors">Membership</li>
                <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer transition-colors">Instagram</li>
                <li className="hover:text-white cursor-pointer transition-colors">Facebook</li>
                <li className="hover:text-white cursor-pointer transition-colors">Twitter</li>
                <li className="hover:text-white cursor-pointer transition-colors">YouTube</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FitZone. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
}