"use client";

import { useEffect, useState } from "react";
import { X, Users } from "lucide-react";

type Client = {
  id: number;
  name: string;
  phone_number?: string;
  created_at: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  gymId: number;
};

export default function ViewUsersModal({ open, onClose, gymId }: Props) {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;

    const fetchClients = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/gym/clients/${gymId}`, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch clients");
        }

        setClients(data.clients);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, [open, gymId]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              Gym Users
            </h2>
          </div>

          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {/* Loading */}
          {loading && (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-14 rounded-xl bg-gray-100 animate-pulse"
                />
              ))}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-red-600">
              {error}
            </div>
          )}

          {/* Empty */}
          {!loading && !error && clients.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="text-5xl mb-4">👤</div>
              <h3 className="text-lg font-semibold text-gray-900">
                No users found
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                Create users to see them here
              </p>
            </div>
          )}

          {/* List */}
          {!loading && clients.length > 0 && (
            <div className="space-y-3">
              {clients.map((client) => (
                <div
                  key={client.id}
                  className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 hover:shadow-sm transition"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {client.name}
                    </p>
                    {client.phone_number && (
                      <p className="text-sm text-gray-500">
                        {client.phone_number}
                      </p>
                    )}
                  </div>

                  <span className="text-xs text-gray-400">
                    {new Date(client.created_at).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
