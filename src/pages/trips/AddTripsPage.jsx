import TripsForm from '@/components/trips/TripsForm'
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

const AddTripsPage = () => {



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
                        <TripsForm tripsInfo={null} />
                    </CardContent>
                    <CardFooter>
                        <p></p>
                    </CardFooter>
                </Card>



                
            </section>

        </div>
    )
}

export default AddTripsPage