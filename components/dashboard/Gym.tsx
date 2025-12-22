"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


type Gym = {
  id: number;
  name: string;
  slug: string;
  created_at: string;
};

export default function Gym() {
  const router = useRouter();
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGyms = async () => {
      try {
        const res = await fetch("/api/gym", {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch gyms");
        }

        setGyms(data.gyms);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGyms();
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-indigo-50 to-purple-50 px-6 py-12">
      {/* Header */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12 animate-fade-in">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Your Gyms</h1>
          <p className="mt-2 text-gray-600">
            Manage all your gyms from one place
          </p>
        </div>

        <button
          onClick={() => router.push("/gyms/create")}
          className="mt-6 sm:mt-0 inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 text-white font-semibold shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all"
        >
          + Create Gym
        </button>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto">
        {/* Loading Spinner */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="relative w-16 h-16">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-200 rounded-full"></div>
              <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <p className="mt-4 text-gray-600 font-medium">Loading gyms...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-24 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-6">
              <svg
                className="w-10 h-10 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-600 mb-6 text-center max-w-md">
              {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-xl bg-indigo-600 px-6 py-3 text-white font-semibold shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && gyms.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center mb-6">
              <span className="text-5xl">🏋️</span>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">
              No gyms created yet
            </h2>
            <p className="text-gray-600 mt-2 max-w-md">
              Get started by creating your first gym and begin managing your fitness business
            </p>

            <button
              onClick={() => router.push("/dashboard/create-gym")}
              className="mt-8 rounded-xl bg-indigo-600 px-8 py-3 text-white font-semibold shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all"
            >
              + Create Your First Gym
            </button>
          </div>
        )}

        {/* Gym Cards */}
        {!loading && !error && gyms.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {gyms.map((gym, index) => (
              <div
                key={gym.id}
                style={{ animationDelay: `${index * 80}ms` }}
                className="group rounded-2xl bg-white border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 p-6 cursor-pointer animate-slide-up"
                onClick={() => router.push(`/dashboard/${gym.id}`)}
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center text-xl font-bold shadow-lg">
                    {gym.name.charAt(0).toUpperCase()}
                  </div>
                </div>

                <h3 className="mt-6 text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {gym.name}
                </h3>

                <p className="mt-1 text-sm text-gray-500">{gym.slug}</p>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    Created on {new Date(gym.created_at).toLocaleDateString()}
                  </span>
               
                  <span className="text-sm font-semibold text-indigo-600 group-hover:text-indigo-500 transition">
                    Manage →
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}