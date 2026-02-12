import React, { useState } from 'react'
import CustomButton from '../common/CustomButton'

const Contact = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = () => {
    console.log('Subscribed with email:', email)
  }

  return (
    <section
      id="contact"
      className="bg-purple-500 text-white py-14 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-20"
    >
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
        
        {/* Heading */}
        <div className="text-center">
          <h2 className="font-bold 
            text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
            mb-3 sm:mb-4">
            Contact Us
          </h2>

          <p className="
            text-base sm:text-lg md:text-xl 
            text-white/90
          ">
            Have questions or need assistance? Reach out to us anytime!
          </p>
        </div>

        {/* Input + Button */}
        <div className="
          flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-8 sm:mt-10
        ">
          <input
            type="email"
            placeholder="Your Email"
            className="
              w-full px-5 sm:px-6 py-2.5 sm:py-3
              rounded-2xl border border-gray-300
              bg-white text-blue-900
              text-sm sm:text-base md:text-lg
              focus:outline-none
            "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="w-full sm:w-auto">
            <CustomButton text="Subscribe" />
          </div>
        </div>

      </div>
    </section>
  )
}

export default Contact
