import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/api/axios";
import SingleTripCard from "./SingleTripCard";

const SingleTripList = () => {
  const { id } = useParams();

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await api.get(`/trips/${id}`);
        setTrip(res.data.trip || res.data.data || res.data);
      } catch (err) {
        console.error("Failed to load trip", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [id]);

  if (loading) return <div className="p-6">Loading trip...</div>;
  if (!trip) return <div className="p-6">Trip not found</div>;

  return (
    <div className="p-6 space-y-6">

      <div className="bg-white p-6 rounded-xl shadow border space-y-2">
        <h1 className="text-2xl font-bold text-gray-800">{trip.title}</h1>

        <p>📅 Start: <b>{formatDate(trip.startDate)}</b></p>
        <p>📅 End: <b>{formatDate(trip.endDate)}</b></p>

        <p>💰 Budget: <b>Rs. {trip.budget?.total}</b></p>
        <p>💰 Expense: <b>Rs. {trip.expense?.total}</b></p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Destinations</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {trip.destinations.map((dest, index) => (
            <SingleTripCard key={index} destination={dest} />
          ))}
        </div>
      </div>

    </div>
  );
};

export default SingleTripList;
