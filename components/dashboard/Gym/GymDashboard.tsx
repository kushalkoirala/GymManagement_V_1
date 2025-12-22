"use client";

import { useState } from "react";
import {
  Users,
  UserPlus,
  ClipboardCheck,
} from "lucide-react";
import CreateUserModal from "./CreateUserModal";
import ViewUsersModal from "./ViewUserModal";
import { useParams } from "next/navigation";

export default function GymDashboard({ gym }: { gym: string }) {
  const [openCreateUser, setOpenCreateUser] = useState(false);
  const [openViewUsers, setOpenViewUsers] = useState(false);

  const params = useParams();
  const gymId = Number(params.gym); // matches your backend route

  return (
    <>
      <section className="min-h-screen bg-gradient-to-br from-white via-indigo-50 to-purple-50 px-6 py-12">
        <div className="max-w-7xl mx-auto mb-12">
          <h1 className="text-4xl font-bold text-gray-900">
            Gym Dashboard
          </h1>
          <p className="mt-2 text-gray-600 capitalize">{gym}</p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* USERS */}
          <DashboardCard
            title="Users"
            icon={<Users />}
            description="View gym members"
            onClick={() => setOpenViewUsers(true)}
          />

          {/* CREATE USERS */}
          <DashboardCard
            title="Create Users"
            icon={<UserPlus />}
            description="Add new gym members"
            onClick={() => setOpenCreateUser(true)}
          />

          {/* ATTENDANCE */}
          <DashboardCard
            title="Attendance"
            icon={<ClipboardCheck />}
            description="Track daily attendance"
          />
        </div>
      </section>

      {/* Modals */}
      <CreateUserModal
        open={openCreateUser}
        onClose={() => setOpenCreateUser(false)}
        gymId={gymId}
      />

      <ViewUsersModal
        open={openViewUsers}
        onClose={() => setOpenViewUsers(false)}
        gymId={gymId}
      />
    </>
  );
}

function DashboardCard({
  title,
  description,
  icon,
  onClick,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-2xl bg-white p-6 shadow-md hover:shadow-xl transition-all animate-slide-up"
    >
      <div className="w-14 h-14 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
        {icon}
      </div>

      <h3 className="mt-6 text-xl font-semibold text-gray-900">
        {title}
      </h3>
      <p className="mt-2 text-gray-600 text-sm">{description}</p>
    </div>
  );
}
