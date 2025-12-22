import GymDashboard from "@/components/dashboard/Gym/GymDashboard";

export default async function GymDashboardPage({
  params,
}: {
  params: Promise<{ gym: string }>;
}) {
  const { gym } = await params;
  return <GymDashboard gym={gym} />;
}
