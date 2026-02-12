import React from "react";
import CustomButton from "../common/CustomButton";

const About = () => {
  return (
    <section
      id="about"
      className="
        px-6 sm:px-10 md:px-16 lg:px-20
        py-16 sm:py-20
        bg-gray-400
      "
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <h1
          className="
            font-bold mb-4 sm:mb-6 text-gray-800
            text-3xl sm:text-4xl md:text-5xl
          "
        >
          About WanderWise
        </h1>
        <p
          className="
            text-gray-600
            text-base sm:text-lg
          "
        >
          WanderWise is your smart travel companion, helping you plan
          unforgettable journeys with ease, confidence, and personalization.
        </p>
      </div>

      {/* Content */}
      <div
        className="
          grid grid-cols-1 lg:grid-cols-2
          gap-10 sm:gap-14 lg:gap-16
          items-center
        "
      >
        {/* Left Content */}
        <div>
          <h2
            className="
              font-semibold mb-3 sm:mb-4 text-gray-800
              text-2xl sm:text-3xl
            "
          >
            Our Mission
          </h2>
          <p
            className="
              text-gray-600 mb-5 sm:mb-6 leading-relaxed
              text-sm sm:text-base md:text-lg
            "
          >
            We aim to simplify travel planning by providing personalized
            itineraries, real-time insights, and access to authentic local
            experiences. Whether you're a solo traveler or planning a family
            vacation, WanderWise adapts to your needs.
          </p>

          <h2
            className="
              font-semibold mb-3 sm:mb-4 text-gray-800
              text-2xl sm:text-3xl
            "
          >
            Why Choose Us?
          </h2>
          <ul
            className="
              list-disc list-inside text-gray-600
              space-y-2 mb-6 sm:mb-8
              text-sm sm:text-base md:text-lg
            "
          >
            <li>Smart & personalized trip planning</li>
            <li>Real-time travel updates</li>
            <li>Trusted local experiences</li>
            <li>Simple, clean, and user-friendly design</li>
          </ul>

          <CustomButton text="Start Exploring" />
        </div>

        {/* Right Image */}
        {/* Right Image */}
        <div
          className="
    relative w-full
    h-64 sm:h-80 md:h-105 lg:h-120
    rounded-xl overflow-hidden
  "
        >
          <img
            src="https://images.unsplash.com/photo-1491598782524-8ebdb06fbc85?q=80&w=2070&auto=format&fit=crop"
            alt="Travel"
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-purple-600 opacity-10"></div>
        </div>

      </div>
    </section>
  );
};

export default About;
