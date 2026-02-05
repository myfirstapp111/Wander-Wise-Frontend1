import { Button } from '@/components/ui/button'
import { StatCard } from '@/components/common/StatCard'
import { MapPin, Clock, CheckCircle, Compass, Plus } from 'lucide-react'
import useApi from '@/hooks/useApi'
import Loading from '@/components/common/Loading';

export default function Dashboard() {

  const {data:trips, loading, error} = useApi("/trips");

  if(loading) return <Loading text='Fetching trips'/>

  const today = new Date();

  let ongoing = 0;
  let upcoming = 0;
  let completed = 0;

  trips.forEach(trip => {
    const startDate = new Date(trip.startDate);
    const endDate = new Date(trip.endDate);

    if (startDate <= today && endDate >= today) {
      ongoing++;
    } else if (startDate > today) {
      upcoming++;
    } else if (endDate < today) {
      completed++;
    }
  });

  return (
    <main className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-8 px-20">
          <h1 className="text-3xl font-bold text-gray-900">Trip Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage and track all your upcoming and completed trips</p>
      </div>

      {/* Stats Section */}
      <div className="py-8 px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            label="Total Trips" 
            value={trips.length}
            icon={<Compass />}
            className="bg-orange-50 border-orange-200"
          />
          <StatCard 
            label="Upcoming Trips" 
            value={upcoming}
            icon={<Clock />}
            className="bg-blue-50 border-blue-200"
          />
          <StatCard 
            label="Completed Trips" 
            value={completed}
            icon={<CheckCircle />}
            className="bg-green-50 border-green-200"
          />
          <StatCard 
            label="Ongoing Trips" 
            value={ongoing}
            icon={<MapPin />}
            className="bg-purple-50 border-purple-200"
          />
        </div>

        {/* Info Section with Background Image */}
        <div 
          className="relative rounded-lg overflow-hidden h-64 md:h-80 lg:h-96 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://plus.unsplash.com/premium_photo-1672116453000-c31b150f48ef?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
          }}
        >
          {/* Dim overlay */}
          <div className="absolute inset-0 bg-black/50"></div>
          
          {/* Content */}
          <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ready for your next adventure?
            </h2>
            <p className="text-lg text-slate-100 mb-8 max-w-2xl">
              Plan and book your next trip with ease
            </p>
            <a href="/trips/add">
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/70 text-white font-semibold px-8 py-3 rounded-lg flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Trip
            </Button>
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
