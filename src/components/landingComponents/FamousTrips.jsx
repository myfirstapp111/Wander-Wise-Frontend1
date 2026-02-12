import React from "react";
import FamousTripCard from "../common/FamousTripCard";

const famousTripsData = [
  {
    title: "Moon Expedition",
    description:
      "Walk on the lunar surface and experience Earthrise like never before.",
    image:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa",
  },
  {
    title: "Mars Colony Tour",
    description:
      "Visit the red planet and explore humanity’s future home.",
    image:
      "https://plus.unsplash.com/premium_photo-1677038264196-10bb7eb50def?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Saturn Rings Flyby",
    description:
      "Glide through Saturn’s iconic rings in a once-in-a-lifetime journey.",
    image:
      "https://images.unsplash.com/photo-1711989328736-aa109fbb388b?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const FamousTrips = () => {
  return (
    <section
      id="famous"
      className="
        px-5 sm:px-10 lg:px-20
        py-14 sm:py-16 lg:py-20
        bg-gray-500
      "
    >
      {/* Header */}
      <div className="text-center mb-10 sm:mb-12 lg:mb-14">
        <h2
          className="
            text-2xl sm:text-3xl lg:text-4xl
            font-bold
            mb-3 sm:mb-4
            text-gray-800
          "
        >
          Famous Trips
        </h2>

        <p
          className="
            text-sm sm:text-base lg:text-lg
            text-gray-600
            max-w-2xl
            mx-auto
          "
        >
          Iconic journeys loved by travelers across the universe.
        </p>
      </div>

      {/* Cards */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-6 sm:gap-7 lg:gap-8
        "
      >
        {famousTripsData.map((trip, index) => (
          <FamousTripCard
            key={index}
            image={trip.image}
            title={trip.title}
            description={trip.description}
          />
        ))}
      </div>
    </section>
  );
};

export default FamousTrips;
