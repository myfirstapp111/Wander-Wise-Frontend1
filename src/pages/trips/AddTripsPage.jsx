import TripsForm from '@/components/trips/TripsForm'
import React from 'react'

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"

const AddTripsPage = () => {
  return (
    <div className="min-h-screen bg-indigo-300 flex items-start md:items-center justify-center px-4 py-6">
      
      {/* Responsive container */}
      <section className="w-full sm:w-11/12 md:w-3/4 lg:w-2/5">
        
        <Card className="bg-white shadow-lg rounded-xl">
          <CardHeader className="text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              Create New Trip
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Fill in the details to plan your next adventure
            </p>
          </CardHeader>

          <CardContent className="px-4 sm:px-6">
            <TripsForm tripsInfo={null} />
          </CardContent>
        </Card>

      </section>
    </div>
  )
}

export default AddTripsPage
