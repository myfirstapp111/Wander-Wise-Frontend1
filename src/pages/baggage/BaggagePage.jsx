import React from "react";
import { Link } from "react-router-dom";
import useApi from "@/hooks/useApi";
import { motion } from "framer-motion";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ArrowUpRight, Calendar, MapPin, Luggage } from "lucide-react";
import Loading from "@/components/common/Loading";

const BaggagePage = () => {
  const { data = [], loading, error } = useApi("/trips");

  if (loading) return <Loading text="Loading trips..." />;

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center px-4 text-center text-red-600 text-sm sm:text-base">
        Failed to load trips
      </div>
    );

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <section className="bg-indigo-300 min-h-screen py-8 sm:py-10 px-4 sm:px-8 lg:px-20">
      {/* ===== Header ===== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <Luggage
            className="text-purple-700 w-6 h-6 sm:w-8 sm:h-8"
          />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
            Select a Trip for Baggage
          </h1>
        </div>
      </div>

      {/* ===== No Trips ===== */}
      {data.length === 0 ? (
        <div className="text-center text-gray-600 bg-white p-6 sm:p-8 rounded-xl shadow text-sm sm:text-base">
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
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-full hover:shadow-xl transition rounded-2xl border-0 bg-white">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <MapPin
                      className="text-purple-600 w-4 h-4 sm:w-5 sm:h-5"
                    />
                    <CardTitle className="text-base sm:text-lg md:text-xl">
                      {trip.title}
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <CardDescription className="flex items-center gap-2 text-gray-600 text-xs sm:text-sm md:text-base">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    {formatDate(trip.startDate)} –{" "}
                    {formatDate(trip.endDate)}
                  </CardDescription>

                  <Link to={`/baggage/${trip._id}`}>
                    <div className="flex justify-between items-center bg-amber-100 p-3 sm:p-4 rounded-xl hover:bg-amber-200 transition">
                      <div className="flex items-center gap-2 font-medium text-amber-800 text-xs sm:text-sm md:text-base">
                        <Luggage className="w-4 h-4 sm:w-5 sm:h-5" />
                        Open Baggage Planner
                      </div>

                      <ArrowUpRight className="text-amber-700 w-4 h-4 sm:w-5 sm:h-5" />
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

export default BaggagePage;
