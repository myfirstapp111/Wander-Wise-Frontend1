import React from "react";
import CustomButton from "../common/CustomButton";



const About = () => {
  return (
    <section id="about" className="px-20 py-20 bg-gray-400">

    
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-5xl font-bold mb-6 text-gray-800">
          About WanderWise
        </h1>
        <p className="text-lg text-gray-600">
          WanderWise is your smart travel companion, helping you plan
          unforgettable journeys with ease, confidence, and personalization.
        </p>
      </div>

      {/* Content */}
      <div className="grid grid-cols-2 gap-16 items-center">
        
        {/* Left Content */}
        <div>
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">
            Our Mission
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            We aim to simplify travel planning by providing personalized
            itineraries, real-time insights, and access to authentic local
            experiences. Whether you're a solo traveler or planning a family
            vacation, WanderWise adapts to your needs.
          </p>

          <h2 className="text-3xl font-semibold mb-4 text-gray-800">
            Why Choose Us?
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-8">
            <li>Smart & personalized trip planning</li>
            <li>Real-time travel updates</li>
            <li>Trusted local experiences</li>
            <li>Simple, clean, and user-friendly design</li>
          </ul>

          <CustomButton text="Start Exploring" />
        </div>

        {/* Right Image */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1491598782524-8ebdb06fbc85?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Travel"
            className="rounded-lg shadow-lg"
          />
          <div className="absolute inset-0 bg-purple-600 opacity-10 rounded-lg"></div>
        </div>

      </div>
    </section>
  );
};

export default About;
