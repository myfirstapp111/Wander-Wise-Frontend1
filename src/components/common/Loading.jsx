import React from "react"

const Loading = ({ text = "" }) => {
  return (
    <div className="bg-indigo-300 fixed inset-0 w-full min-h-screen flex items-center justify-center ">
      <div className="text-center px-4">

        {/* Animated Logo */}
        <div className="flex items-center justify-center mb-6 sm:mb-8">
          <div className="relative">

            {/* Ping */}
            <div className="absolute inset-0 rounded-full bg-blue-200 animate-ping"></div>

            {/* Logo */}
            <div className="relative rounded-full bg-white p-1">
              <img
                src="/logo.png"
                alt="WanderWise"
                className="
                  w-12 h-12
                  sm:w-16 sm:h-16
                  md:w-20 md:h-20
                  rounded-full
                "
              />
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <p className="
          text-base
          sm:text-lg
          md:text-xl
          font-medium
          text-gray-700
          mb-1
        ">
          {text || "Preparing your journey"}
        </p>

        <p className="
          text-xs
          sm:text-sm
          text-gray-500
        ">
          This won’t take long
        </p>

      </div>
    </div>
  )
}

export default Loading
