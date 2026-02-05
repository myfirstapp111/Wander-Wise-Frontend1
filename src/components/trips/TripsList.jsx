import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import api from "@/api/axios"
import TripsCard from "@/components/trips/TripsCard"
import { Button } from "@/components/ui/button"

import { AnimatePresence } from "framer-motion"

export default function TripsList() {
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Fetch trips from backend
  const fetchTrips = async () => {
    try {
      const res = await api.get("/trips")
      setTrips(res.data)
    } catch (err) {
      console.error(err)
      toast.error("Failed to load trips")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTrips()
  }, [])

  // Handle delete
  const handleDeleteTrip = async (tripId) => {
    if (!window.confirm("Are you sure you want to delete this trip?")) return

    try {
      await api.delete(`/trips/${tripId._id}`)
      toast.success("Trip deleted successfully")
      setTrips(trips.filter((t) => t._id !== tripId._id))
    } catch (err) {
      console.error(err)
      toast.error("Failed to delete trip")
    }
  }

  // Handle edit
  const handleEditTrip = (trip) => {
    navigate(`/trips/edit/${trip._id}`)
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        
        
      </div>

      {trips.length === 0 ? (
        <div>No trips available</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">



          {trips.map((trip) => (
            <TripsCard
              key={trip._id}
              trip={trip}
              onEdit={handleEditTrip}
              onDelete={handleDeleteTrip}
            />
          ))}


        </div>
      )}
    </div>
  )
}
