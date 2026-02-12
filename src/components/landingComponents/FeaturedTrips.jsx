import React from "react";
import FeaturedTripCard from "../common/FeaturedTripCard";

const featuredTripsData = [
  {
    title: "Milky Way Expedition",
    description:
      "Journey through billions of stars, nebulae, and cosmic wonders in our home galaxy.",
    image:
      "https://plus.unsplash.com/premium_photo-1676607445719-ac329296a85a?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Andromeda Adventure",
    description:
      "Explore the nearest spiral galaxy and witness breathtaking interstellar views.",
    image:
      "https://images.unsplash.com/photo-1625736410948-a984d181b8e0?q=80&w=1086&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Nebula Dreamscape",
    description:
      "Float through colorful nebula clouds where stars are born in cosmic beauty.",
    image:
      "https://images.unsplash.com/photo-1636255520934-0ac5f0361cd9?q=80&w=1101&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const FeaturedTrips = () => {
  return (
    <section
      className="
        px-5 sm:px-10 lg:px-20
        py-14 sm:py-16 lg:py-20
        bg-gray-600
      "
    >
      {/* Section Header */}
      <div className="text-center mb-10 sm:mb-12 lg:mb-14">
        <h2
          className="
            text-2xl sm:text-3xl lg:text-4xl
            font-bold
            mb-3 sm:mb-4
            text-gray-800
          "
        >
          Featured Trips
        </h2>

        <p
          className="
            text-sm sm:text-base lg:text-lg
            text-gray-600
            max-w-2xl
            mx-auto
          "
        >
          Handpicked destinations to inspire your next adventure.
        </p>
      </div>

      {/* Cards Grid */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-6 sm:gap-7 lg:gap-8
        "
      >
        {featuredTripsData.map((trip, index) => (
          <FeaturedTripCard
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

export default FeaturedTrips;
