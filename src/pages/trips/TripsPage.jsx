import TripsList from '@/components/trips/TripsList'
import { Button } from '@/components/ui/button'

import { Plus } from 'lucide-react'
import React from 'react'

import { Link } from 'react-router-dom'

const TripsPage = () => {
    return (
        <section className='bg-indigo-300 py-6 px-4 sm:px-10 md:px-20 min-h-screen'>

            {/* Header */}
            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0'>

                <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-900'>
                    Your Trips
                </h1>

                <Link to="/trips/add" className='w-full sm:w-auto'>
                    <Button className="bg-purple-600 w-full sm:w-auto flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base hover:bg-purple-500">
                        <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="truncate">Create New Trip</span>
                    </Button>
                </Link>

            </div>

            {/* Trips List */}
            <div className='mt-6'>
                <TripsList />
            </div>
        </section>
    )
}

export default TripsPage
