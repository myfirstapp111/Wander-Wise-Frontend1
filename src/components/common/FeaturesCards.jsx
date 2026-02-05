
import React from 'react'




const FeaturesCards = ({ title, description, icon: Icon }) => {
  return (
    <div className='bg-gray-400 border border-purple-600 rounded-4xl p-4 shadow-neutral-900 cursor-pointer
    hover:bg-gray-300 hover:scale-105 transition-all duration-300
    '>

      <Icon className=' h-10 w-10 text-purple-600 my-4 ' />

      <h3 className='text-2xl font-semibold mb-2'>{title}</h3>
      <p className='text-gray-600'>{description}</p>

    </div>
  )
}   

export default FeaturesCards