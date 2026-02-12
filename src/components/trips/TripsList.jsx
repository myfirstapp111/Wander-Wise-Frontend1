import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import api from "@/api/axios"
import TripsCard from "@/components/trips/TripsCard"
import { Button } from "@/components/ui/button"

import { AnimatePresence } from "framer-motion"

import Loading from "../common/Loading"

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
  const handleDeleteTrip = async (trip) => {
    if (!window.confirm("Are you sure you want to delete this trip?")) return

    try {
      await api.delete(`/trips/${trip._id}`)
      toast.success("Trip deleted successfully")
      setTrips(trips.filter((t) => t._id !== trip._id))
    } catch (err) {
      console.error(err)
      toast.error("Failed to delete trip")
    }
  }

  // Handle edit
  const handleEditTrip = (trip) => {
    navigate(`/trips/edit/${trip._id}`)
  }

  if (loading) return <Loading text="Loading trips..." />

  return (
    <div className="px-4 sm:px-6 md:px-10 py-4">
      {trips.length === 0 ? (
        <div className="text-center text-sm sm:text-base text-gray-700 py-10">
          No trips available
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {trips.map((trip) => (
            <TripsCard
              key={trip._id}
              trip={trip}
              onEdit={handleEditTrip}
              onDelete={handleDeleteTrip}
              className="text-sm sm:text-base" // text size responsive for each card
            />
          ))}
        </div>
      )}
    </div>
  )
}
