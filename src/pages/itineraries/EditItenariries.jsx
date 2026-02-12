import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/api/axios";
import ItinerariesForm from "@/components/itineraries/ItinerariesForm";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const EditItenariries = () => {
  const { tripId, ItineraryId } = useParams();
  const [itineraryInfo, setItineraryInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const res = await api.get(
          `/${tripId}/itineraries/${ItineraryId}`
        );
        setItineraryInfo(res.data);
      } catch (err) {
        console.error("Failed to load itinerary", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItinerary();
  }, [tripId, ItineraryId]);

  /* ---------------- LOADING STATE ---------------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-indigo-50 px-4">
        <p className="text-base sm:text-lg md:text-xl font-medium">
          Loading itinerary...
        </p>
      </div>
    );
  }

  /* ---------------- NOT FOUND ---------------- */
  if (!itineraryInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-indigo-50 px-4">
        <p className="text-base sm:text-lg md:text-xl font-medium text-red-600">
          Itinerary not found
        </p>
      </div>
    );
  }

  /* ---------------- MAIN PAGE ---------------- */
  return (
    <div className="min-h-screen bg-indigo-300 px-4 sm:px-6 lg:px-8 py-8">
      <section className="w-full max-w-5xl mx-auto">
        <Card className="shadow-lg rounded-2xl bg-blue-300 ">
          <CardHeader className="space-y-2">
            <CardTitle className="text-lg sm:text-xl md:text-2xl font-semibold">
              Edit Itinerary
            </CardTitle>

            <CardDescription className="text-sm sm:text-base text-gray-600">
              Update your itinerary details and activities
            </CardDescription>

            <CardAction />
          </CardHeader>

          <CardContent>
            <ItinerariesForm
              type="edit"
              itineraryInfo={itineraryInfo}
            />
          </CardContent>

          <CardFooter className="text-xs sm:text-sm text-gray-500">
            Make sure all information is accurate before saving.
          </CardFooter>
        </Card>
      </section>
    </div>
  );
};

export default EditItenariries;
