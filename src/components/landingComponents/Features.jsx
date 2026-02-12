import React from 'react'
import FeaturesCards from '../common/FeaturesCards'
import { BanknoteArrowDown, History, Map, NotebookPen } from 'lucide-react'

const featuresData = [
  {
    title: "Personalized Itineraries",
    description: "Create custom travel plans based on your preferences and interests.",
    icon: Map,
  },
  {
    title: "Real-time Updates",
    description: "Get live updates on weather, traffic, and local events.",
    icon: History,
  },
  {
    title: "Budget Optimization",
    description: "Discover authentic local experiences and hidden gems.",
    icon: BanknoteArrowDown,
  },
  {
    title: "Collaborative Planning",
    description: "Secure your trip with comprehensive travel insurance coverage.",
    icon: NotebookPen,
  },
]

const Features = () => {
  return (
    <section
      id="features"
      className="
        bg-gray-300
        px-4 sm:px-8 md:px-12 lg:px-20
        py-14 sm:py-16 lg:py-20
      "
    >
      {/* Section Header */}
      <div className="max-w-3xl mx-auto text-center">
        <h2
          className="
            font-bold
            text-2xl sm:text-3xl md:text-4xl lg:text-5xl
            mb-3 sm:mb-4
          "
        >
          Features
        </h2>

        <p
          className="
            text-sm sm:text-base md:text-lg
            text-gray-600
          "
        >
          Discover the best destinations, accommodations, and activities tailored just for you.
        </p>
      </div>

      {/* Features Grid */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-6 sm:gap-8
          mt-10 sm:mt-12
        "
      >
        {featuresData.map((feature, index) => (
          <FeaturesCards
            key={index}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
          />
        ))}
      </div>
    </section>
  )
}

export default Features
