import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import TripsForm from "@/components/trips/TripsForm"
import api from "@/api/axios"

import Loading from "@/components/common/Loading"

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const EditTripsPage = () => {
  const { id } = useParams()   // /trips/edit/:id
  const [tripsInfo, setTripsInfo] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await api.get(`/trips/${id}`)
        console.log("Fetched Trip:", res.data)
        setTripsInfo(res.data)
      } catch (err) {
        console.error("Failed to load trip", err)
      } finally {
        setLoading(false)
      }
    }

    fetchTrip()
  }, [id])

  if (loading) return <Loading text="Loading trip details..." />
  if (!tripsInfo) return <div className="text-center text-gray-700 py-10">Trip not found</div>

  return (
    <div className="bg-gray-300 min-h-screen py-4">
      <section className="mx-auto my-3 w-full sm:w-3/4 md:w-2/5 px-3">
        <Card className="bg-blue-300">
          <CardHeader>
            <CardTitle className="text-sm sm:text-base md:text-lg">Edit Trip</CardTitle>
            <CardDescription className="text-xs sm:text-sm md:text-base">
              Update your trip details below
            </CardDescription>
          </CardHeader>

          <CardContent>
            <TripsForm tripsInfo={tripsInfo} />
          </CardContent>

          <CardFooter>
            <p className="text-xs sm:text-sm md:text-base text-gray-700">Make sure all information is correct before saving.</p>
          </CardFooter>
        </Card>
      </section>
    </div>
  )
}

export default EditTripsPage
