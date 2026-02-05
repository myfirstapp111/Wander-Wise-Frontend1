import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import TripsForm from "@/components/trips/TripsForm"
import api from "@/api/axios"

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import ItinerariesForm from "@/components/itineraries/ItinerariesForm"

const EditItenariries = () => {
  const { tripId, ItineraryId } = useParams()   // /trips/edit/:id
  const [itineraryInfo, setItineraryInfo] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await api.get(`/${tripId}/itineraries/${ItineraryId}`)
        console.log("Fetched Itinerary:", res.data)
        setItineraryInfo(res.data)
      } catch (err) {
        console.error("Failed to load itinerary", err)
      } finally {
        setLoading(false)
      }
    }

    fetchTrip()
  }, [tripId, ItineraryId])

  if (loading) return <div>Loading...</div>
  if (!itineraryInfo) return <div>Itinerary not found</div>

  return (
  <div className='bg-indigo-300'>
              <section className='w-2/5 mx-auto '>
  
  
                  <Card className="bg-blue-300">
                      <CardHeader>
                          <CardTitle></CardTitle>
                          <CardDescription></CardDescription>
                          <CardAction></CardAction>
                      </CardHeader>
                      <CardContent>
                          <ItinerariesForm type="edit" itineraryInfo={itineraryInfo} />
                      </CardContent>
                      <CardFooter>
                          <p></p>
                      </CardFooter>
                  </Card>
  
  
  
                  
              </section>
  
          </div>
  )
}

export default EditItenariries
