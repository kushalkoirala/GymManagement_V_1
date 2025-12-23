import { headers } from "next/headers";
import { Dumbbell, Target, Users, Award, Clock, TrendingUp, MapPin, Phone, Mail } from 'lucide-react';
import Link from "next/link";

// Fetch gym data from database based on subdomain
async function getGymData(subdomain: string) {
  // TODO: Replace with your actual database query
  // Example with Prisma:
  // const gym = await prisma.gym.findUnique({
  //   where: { subdomain: subdomain }
  // });
  
  // Mock data for demonstration - this simulates a database response
  // In production, remove this mock data and use real database query
  const gymFromDb = {
    name: subdomain.charAt(0).toUpperCase() + subdomain.slice(1) + " Fitness", // e.g., "Gold Fitness"
    tagline: "Transform Your Body & Mind",
    description: "Join the ultimate fitness experience with cutting-edge facilities and a supportive community.",
    heroImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=800&fit=crop",
    primaryColor: "from-purple-600 to-pink-600",
    location: "Your City",
    phone: "+1 (555) 000-0000",
    email: `contact@${subdomain}.com`,
    // Add other fields from your database schema
  };

  // Return null if gym not found (handle this in your component)
  if (!gymFromDb) {
    return null;
  }

  return gymFromDb;
}

export default async function Page() {
  const headersList = await headers();
  const host = headersList.get("host"); // gold.localhost:3000
  
  // Extract subdomain
  const subdomain = host?.split(".")[0] || "default";
  
  // Fetch gym-specific data
  const gym = await getGymData(subdomain);

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Dumbbell className={`w-8 h-8 bg-gradient-to-r ${gym.primaryColor} bg-clip-text text-transparent`} />
            <span className={`text-2xl font-bold bg-gradient-to-r ${gym.primaryColor} bg-clip-text text-transparent`}>
              {gym.name}
            </span>
          </div>
          <Link href="/login"> 
          <button className={`px-6 py-2 bg-gradient-to-r ${gym.primaryColor} cursor-pointer text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300`}>
            Member Login
          </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-4">
                <span className={`inline-block px-4 py-2 bg-gradient-to-r ${gym.primaryColor} text-white rounded-full text-sm font-semibold`}>
                  {subdomain.toUpperCase()} FITNESS
                </span>
              </div>
              <h1 className="text-6xl font-bold mb-6 leading-tight">
                {gym.tagline.split(' ').slice(0, 2).join(' ')}
                <span className={`block bg-gradient-to-r ${gym.primaryColor} bg-clip-text text-transparent`}>
                  {gym.tagline.split(' ').slice(2).join(' ')}
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {gym.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <button className={`px-8 py-4 bg-gradient-to-r ${gym.primaryColor} text-white rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300`}>
                  Start Free Trial
                </button>
                <button className={`px-8 py-4 border-2 bg-gradient-to-r ${gym.primaryColor} border-transparent bg-clip-border rounded-full font-semibold hover:bg-gray-50 transition-all duration-300`}>
                  View Plans
                </button>
              </div>
              
              {/* Contact Info */}
              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span>{gym.location}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone className="w-5 h-5" />
                  <span>{gym.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="w-5 h-5" />
                  <span>{gym.email}</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className={`absolute inset-0 bg-gradient-to-r ${gym.primaryColor} rounded-3xl blur-3xl opacity-20`}></div>
              <img
                src={gym.heroImage}
                alt="Fitness training"
                className="relative rounded-3xl shadow-2xl w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Why Choose {gym.name}?</h2>
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
                <div className={`w-16 h-16 bg-gradient-to-r ${gym.primaryColor} rounded-2xl flex items-center justify-center mb-6`}>
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
      <section className="py-20 px-6 bg-gradient-to-b from-white to-gray-50">
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
              <div key={idx} className={`p-8 rounded-2xl ${plan.popular ? `bg-gradient-to-b ${gym.primaryColor} text-white scale-105` : 'bg-white'} shadow-xl hover:shadow-2xl transition-all duration-300`}>
                {plan.popular && (
                  <div className="text-center mb-4">
                    <span className="bg-white text-gray-900 px-4 py-1 rounded-full text-sm font-semibold">Most Popular</span>
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
                      <div className={`w-5 h-5 rounded-full ${plan.popular ? 'bg-white/20' : 'bg-gray-100'} flex items-center justify-center`}>
                        <span className={plan.popular ? 'text-white' : 'text-gray-900'}>✓</span>
                      </div>
                      <span className={plan.popular ? 'text-white' : 'text-gray-600'}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-full font-semibold transition-all duration-300 ${plan.popular ? 'bg-white text-gray-900 hover:bg-gray-100' : `bg-gradient-to-r ${gym.primaryColor} text-white hover:shadow-lg`}`}>
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
          <div className={`bg-gradient-to-r ${gym.primaryColor} rounded-3xl p-16 shadow-2xl`}>
            <h2 className="text-5xl font-bold text-white mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl text-white/90 mb-8">Join our community and transform your life at {gym.name}</p>
            <button className="px-12 py-4 bg-white text-gray-900 rounded-full font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
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
                <Dumbbell className={`w-8 h-8 bg-gradient-to-r ${gym.primaryColor} bg-clip-text`} style={{color: 'white'}} />
                <span className="text-2xl font-bold">{gym.name}</span>
              </div>
              <p className="text-gray-400">{gym.description}</p>
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
              <h4 className="font-bold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{gym.location}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">{gym.phone}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{gym.email}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 {gym.name}. All rights reserved. | Privacy Policy | Terms of Service</p>
            <p className="text-xs mt-2">Subdomain: {subdomain}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}