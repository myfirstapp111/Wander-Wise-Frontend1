import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/common/StatCard";
import { MapPin, Clock, CheckCircle, Compass, Plus } from "lucide-react";
import useApi from "@/hooks/useApi";
import Loading from "@/components/common/Loading";

export default function Dashboard() {
  const { data: trips = [], loading } = useApi("/trips");

  if (loading) return <Loading text="Fetching trips" />;

  const today = new Date();

  let ongoing = 0;
  let upcoming = 0;
  let completed = 0;

  trips.forEach((trip) => {
    const startDate = new Date(trip.startDate);
    const endDate = new Date(trip.endDate);

    if (startDate <= today && endDate >= today) ongoing++;
    else if (startDate > today) upcoming++;
    else completed++;
  });

  return (
    <main className="min-h-screen bg-indigo-300">
      {/* ===== HEADER ===== */}
      <div className="bg-indigo-300 border-b border-gray-200 py-6 px-4 sm:px-8 lg:px-20">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Trip Dashboard
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2">
          Manage and track all your upcoming and completed trips
        </p>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="py-6 sm:py-8 px-4 sm:px-8 lg:px-20">
        {/* ===== STATS ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <StatCard
            label="Total Trips"
            value={trips.length}
            icon={<Compass className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />}
            className="bg-orange-50 border-orange-200"
          />
          <StatCard
            label="Upcoming Trips"
            value={upcoming}
            icon={<Clock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />}
            className="bg-blue-50 border-blue-200"
          />
          <StatCard
            label="Completed Trips"
            value={completed}
            icon={<CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />}
            className="bg-green-50 border-green-200"
          />
          <StatCard
            label="Ongoing Trips"
            value={ongoing}
            icon={<MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />}
            className="bg-purple-50 border-purple-200"
          />
        </div>

        {/* ===== CTA SECTION ===== */}
        <div
          className="relative rounded-xl overflow-hidden h-56 sm:h-72 lg:h-96 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://plus.unsplash.com/premium_photo-1672116453000-c31b150f48ef?q=80&w=1170&auto=format&fit=crop)",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Content */}
          <div className="relative h-full flex flex-col items-center justify-center text-center px-4 sm:px-6">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
              Ready for your next adventure?
            </h2>
            <p className="text-sm sm:text-lg text-slate-100 mb-6 max-w-xl">
              Plan and book your next trip with ease
            </p>

            <a href="/trips/add">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/80 text-white font-semibold
                px-6 sm:px-8 py-2 sm:py-3 rounded-lg flex items-center gap-2"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                Create Trip
              </Button>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
