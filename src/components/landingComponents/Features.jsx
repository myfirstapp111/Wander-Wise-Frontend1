import React from 'react'
import FeaturesCards from '../common/FeaturesCards'
import { BanknoteArrowDown, History, Map, NotebookPen } from 'lucide-react';


const featuresData = [
    {
        title: "Personalized Itineraries",
        description: "Create custom travel plans based on your preferences and interests.",
        icon: Map
    },
    {
        title: "Real-time Updates",
        description: "Get live updates on weather, traffic, and local events.",
        icon: History
    },
    {
        title: "Budget Optimization",
        description: "Discover authentic local experiences and hidden gems.",
        icon: BanknoteArrowDown
    },
    {
        title: "Collaborative Planning",
        description: "Secure your trip with comprehensive travel insurance coverage.",
        icon: NotebookPen
    }
];

const Features = () => {
    return (

        <section id='features' className='px-20 py-20 bg-gray-300'>

            {/* Section Header */}

            <div>

                <h2 className='text-4xl font-bold text-center mb-4'>Features</h2>
                <p className='text-center text-gray-600 '>Discover the best destinations, accommodations, and activities tailored just for you. </p>

            </div>

            {/* Features Grid */}

            <div className='grid grid-cols-4 gap-6 mt-10'>

               {
                featuresData.map((feature, index) => (
                    <FeaturesCards 
                    key={index} 
                    title={feature.title}
                    description={feature.description}
                    icon={feature.icon}
                    />
                ))
               }

            </div>


        </section>
    )
}

export default Features