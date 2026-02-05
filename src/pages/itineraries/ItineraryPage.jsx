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

const ItineraryPage = () => {
  const { data, loading, error } = useApi("/trips");

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (error) return <div className="p-10 text-center text-red-600">Failed to load trips</div>;

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <section className="bg-indigo-300 min-h-screen py-10 px-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Luggage className="text-purple-700" size={32} />
          <h1 className="text-3xl font-bold text-gray-900">
           Itineraries
          </h1>
        </div>
      </div>

      {/* No Trips */}
      {data.length === 0 ? (
        <div className="text-center text-gray-600 bg-white p-10 rounded-xl shadow">
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
                    <MapPin className="text-purple-600" size={20} />
                    <CardTitle className="text-xl">{trip.title}</CardTitle>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <CardDescription className="flex items-center gap-2 text-gray-600">
                    <Calendar size={16} />
                    {formatDate(trip.startDate)} – {formatDate(trip.endDate)}
                  </CardDescription>



                  <Link to={`/itineraries/${trip._id}`}>

                    <div className="flex justify-between items-center bg-amber-100 p-4 rounded-xl">
                      <div className="flex items-center gap-2 font-medium text-amber-800">
                        <Luggage size={18} />
                        Open Itinerary
                      </div>

                      <ArrowUpRight className="text-amber-700" />
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
