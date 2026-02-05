import TripsList from '@/components/trips/TripsList'
import { Button } from '@/components/ui/button'

import { Plus } from 'lucide-react'
import React from 'react'

import { Link } from 'react-router-dom'

const TripsPage = () => {
    return (
        <section className='bg-indigo-300 py-6 px-20'>
            <div className='flex items-center justify-between'>


                <h1 className='text-3xl font-bold'>Your Trips</h1>



               <Link to="/trips/add">
                <Button className="bg-purple-600 cursor-pointer hover:bg-purple-400" variant="primary">
                    <Plus />
                    Create New Trip
                </Button>
                </Link>



            </div>
            <div className='mt-6'>
                
                <TripsList />
            </div>
        </section>
    )
}

export default TripsPage