// src/components/SingleTripCard.jsx
import React from "react";

const SingleTripCard = ({ destination }) => {
  return (
    <div className="border rounded-xl p-4 bg-white shadow hover:shadow-md transition">
      <h3 className="text-lg font-semibold text-gray-800">
        📍 {destination}
      </h3>
    </div>
  );
};

export default SingleTripCard;
