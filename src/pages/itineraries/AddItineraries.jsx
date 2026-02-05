
import React from 'react'

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import ItinerariesForm from '@/components/itineraries/ItinerariesForm'

const AddItineraries = () => {



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

                        <ItinerariesForm type="add" />


                    </CardContent>
                    <CardFooter>
                        <p></p>
                    </CardFooter>
                </Card>




            </section>

        </div>
    )
}

export default AddItineraries