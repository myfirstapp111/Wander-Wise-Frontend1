import React from "react";
import { Link } from "react-router-dom";
import useApi from "@/hooks/useApi";
import { motion } from "framer-motion";

import Loading from "@/components/common/Loading";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ArrowUpRight, Calendar, MapPin, Luggage } from "lucide-react";

const ItineraryPage = () => {
  const { data, loading, error } = useApi("/trips");

  if (loading) return <Loading text="Loading itineraries..." />;
  if (error)
    return (
      <div className="p-10 text-center text-red-600">Failed to load trips</div>
    );

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <section className="bg-indigo-300 min-h-screen py-8 px-4 sm:px-6 md:px-10 lg:px-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4 sm:gap-0">
        <div className="flex items-center gap-3">
          <Luggage className="text-purple-700" size={28} />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Itineraries
          </h1>
        </div>
      </div>

      {/* No Trips */}
      {data.length === 0 ? (
        <div className="text-center text-gray-600 bg-white p-6 sm:p-10 rounded-xl shadow">
          No trips available. Create a trip first.
        </div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {data.map((trip) => (
            <motion.div
              key={trip._id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-full hover:shadow-xl transition rounded-2xl border-0 bg-white">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <MapPin className="text-purple-600" size={18} />
                    <CardTitle className="text-lg sm:text-xl md:text-2xl">
                      {trip.title}
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <CardDescription className="flex items-center gap-2 text-sm sm:text-base md:text-lg text-gray-600">
                    <Calendar size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
                    {formatDate(trip.startDate)} – {formatDate(trip.endDate)}
                  </CardDescription>

                  <Link to={`/itineraries/${trip._id}`}>
                    <div className="flex justify-between items-center bg-amber-100 p-3 sm:p-4 rounded-xl">
                      <div className="flex items-center gap-2 font-medium text-sm sm:text-base md:text-lg text-amber-800">
                        <Luggage size={16} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
                        Open Itinerary
                      </div>
                      <ArrowUpRight
                        className="text-amber-700"
                        size={16}
                        // Responsive icon
                      />
                    </div>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default ItineraryPage;
