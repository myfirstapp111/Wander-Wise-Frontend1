import React from 'react'
import CustomButton from '../common/CustomButton'
import Typewriter from 'typewriter-effect'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className="relative flex items-center justify-center text-center px-4 sm:px-8 md:px-16 lg:px-20 py-20 sm:py-32 md:py-40 h-auto md:h-[600px] lg:h-[700px] overflow-hidden">

      {/* Background Image */}
      <div className="absolute inset-0 -z-10 w-full h-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa"
          alt="Galaxy Travel"
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* Hero content */}
      <div className="relative max-w-3xl text-white">
        <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6">
          Plan your trip with WanderWise
        </h1>

        <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8">
          <Typewriter
            options={{
              strings: [
                'Discover the best destinations, accommodations, and activities tailored just for you.',
                'Start your adventure today!',
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </p>

        <Link to="/register1">
          <CustomButton text="Get Started" />
        </Link>
      </div>
    </section>
  )
}

export default Hero
