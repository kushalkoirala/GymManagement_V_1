"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateGymPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-generate slug from name
  const handleNameChange = (value: string) => {
    setName(value);
    setSlug(
      value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "")
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/gym/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // important for cookies
        body: JSON.stringify({ name, slug }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // Redirect after success
      router.push(`/dashboard`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-neutral-950 border border-neutral-800 rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">
            Create Your Gym
          </h1>
          <p className="text-neutral-400 mt-2">
            Set up your gym profile and start managing it
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Gym Name */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Gym Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Iron Paradise"
              className="w-full rounded-xl bg-neutral-900 border border-neutral-800 px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              required
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Gym Slug
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="iron-paradise"
              className="w-full rounded-xl bg-neutral-900 border border-neutral-800 px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              required
            />
            <p className="text-xs text-neutral-500 mt-2">
              This will be used in your gym URL
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 text-sm">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 transition-all duration-200 shadow-lg shadow-indigo-600/30"
          >
            {loading ? "Creating Gym..." : "Create Gym"}
          </button>
        </form>
      </div>
    </div>
  );
}
