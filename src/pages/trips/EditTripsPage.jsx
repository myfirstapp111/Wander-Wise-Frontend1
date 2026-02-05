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

  if (loading) return <div>Loading...</div>
  if (!tripsInfo) return <div>Trip not found</div>

  return (
  <div className='bg-gray-300'>AddTripsPage
              <section className='w-2/5 mx-auto my-3 '>
  
  
                  <Card className="bg-blue-300">
                      <CardHeader>
                          <CardTitle></CardTitle>
                          <CardDescription></CardDescription>
                          <CardAction></CardAction>
                      </CardHeader>
                      <CardContent>
                          <TripsForm tripsInfo={tripsInfo} />
                      </CardContent>
                      <CardFooter>
                          <p></p>
                      </CardFooter>
                  </Card>
  
  
  
                  
              </section>
  
          </div>
  )
}

export default EditTripsPage
