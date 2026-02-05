import React from 'react'

import Typewriter from 'typewriter-effect'

const Footer1 = () => {
    return (
        <footer className='flex items-center justify-between px-20 py-20 bg-gray-400'>

            {/*left side*/}
            <div>

                <div className='mb-10'>
                    <div className='text-3xl font-bold mb-2'>


                        <Typewriter
                            options={{
                                strings: ['WanderWise', 'WanderWise', 'WanderWise'],
                                autoStart: true,
                                loop: true,
                            }}
                        />


                    </div>
                    <p className='text-xl text-gray-700'>WanderWise is a travel platform that helps you plan your perfect trip.</p>
                </div>

                <div className='text-lg'>
                    <h2>Clove I.T. Private Limited</h2>
                    <h2>Mahendra Chowk, Biratnagar, Nepal</h2>
                    <h2>+977-9800000001</h2>
                </div>


                <p>&copy; {new Date().getFullYear()} WanderWise. All rights reserved.</p>
            </div>


            {/*right side*/}
            <div className='flex items-center gap-20'>
                <div className='flex flex-col gap-2 text-lg font-medium text-gray-700'>
                    <h2 className='text-black text-xl'>Features</h2>
                    <a className='hover:underline hover:text-purple-600' href="@">Your Trips</a>
                    <a className='hover:underline hover:text-purple-600' href="@">Itineraries</a>
                    <a className='hover:underline hover:text-purple-600' href="@">Packages List</a>
                    <a className='hover:underline hover:text-purple-600' href="@">Collaborate</a>
                </div>
                <div className='flex flex-col gap-2 text-lg font-medium text-gray-700'>
                    <h2 className='text-black text-xl'>Useful Links</h2>
                    <a className='hover:underline hover:text-purple-600' href="@">About Us</a>
                    <a className='hover:underline hover:text-purple-600' href="@">Contact Us</a>
                    <a className='hover:underline hover:text-purple-600' href="@">Privacy Policy</a>
                    <a className='hover:underline hover:text-purple-600' href="@">Terms & Conditions</a>
                </div>
            </div>

        </footer>
    )
}

export default Footer1