import React from "react";

const FamousTripCard = ({ image, title, description }) => {
  return (
    <div className="rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition duration-300">
      
      {/* Image */}
      <div className="h-56 w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-110 transition duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-2xl font-semibold mb-2 text-gray-800">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>

    </div>
  );
};

export default FamousTripCard;
