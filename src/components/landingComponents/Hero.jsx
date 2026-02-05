import React from 'react'
import CustomButton from '../common/CustomButton'
import Typewriter from 'typewriter-effect'

import { Link } from 'react-router-dom'

import { Button } from "@/components/ui/button"

const Hero = () => {
    return (
        <section className='flex  h-125 items-center justify-center text-center px-20 py-40 relative overflow-hidden'>

            {/* Hero content */}

            <div className='max-w-3xl text-white'>
                <h1 className='text-5xl font-bold mb-6'>Plan your trip with wanderwise</h1>
                <p className='text-lg mb-8 text-white'>


                    <Typewriter
                        options={{
                            strings: ['Discover the best destinations, accommodations, and activities tailored just for you.',
                                      'Start your adventure today!'],
                            autoStart: true,
                            loop: true,
                        }}
                    />

                    {/*Discover the best destinations, accommodations, and activities tailored just for you.
                    Start your adventure today!*/}


                </p>
                <Link to="/register1"> <CustomButton text="Get Started" /></Link>
                {/*<Button variant="outline">Button</Button>*/}

            </div>

            {/* Background image */}
            <div className='ml-10 absolute -z-10 right-0 top-0 h-full w-full overflow-hidden'>
                <img
                    src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa"
                    alt="Galaxy Travel" className='w-full h-auto rounded-lg shadow-lg' />
            </div>

            {/* Overlay */}
            <div className='absolute -z-5 left-0 top-0 w-full h-full bg-black opacity-60'></div>

        </section>
    )
}

export default Hero