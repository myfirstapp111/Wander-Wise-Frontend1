import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Pencil, Calendar, MapPin, Clock, AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import useApi from "@/hooks/useApi";

import { toast } from "sonner";
import api from "@/api/axios";
import { Trash2 } from "lucide-react";

import Loading from "@/components/common/Loading";

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.05, duration: 0.45, ease: "easeOut" },
  }),
};

const ItinerariesDetailsPage = () => {
  const [deletingId, setDeletingId] = useState(null);
  const { id } = useParams();

  const { data: tripData } = useApi(`/trips/${id}`);
  const { data, loading } = useApi(`/${id}/itineraries`);

  if (loading || !tripData) return <Loading text="Loading itineraries..." />;

  const totalDays = Math.ceil((new Date(tripData.endDate) - new Date(tripData.startDate)) / (1000 * 60 * 60 * 24)) + 1;
  const daysArray = new Array(totalDays).fill(0);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });

  const handleDelete = async (itineraryId) => {
    const confirmed = await new Promise((resolve) => {
      const toastId = toast(
        (t) => (
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-sm sm:text-base">Are you sure you want to delete this itinerary?</span>
            <div className="flex gap-2">
              <Button size="sm" variant="destructive" onClick={() => { toast.dismiss(toastId); resolve(true); }}>Yes</Button>
              <Button size="sm" variant="outline" onClick={() => { toast.dismiss(toastId); resolve(false); }}>No</Button>
            </div>
          </div>
        ),
        { duration: Infinity }
      );
    });

    if (!confirmed) return;

    try {
      setDeletingId(itineraryId);
      await api.delete(`/${id}/itineraries/${itineraryId}`);
      toast.success("Itinerary deleted successfully!");
      window.location.reload();
    } catch (err) {
      toast.error("Failed to delete itinerary");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="px-4 sm:px-6 md:px-10 lg:px-20 py-8 bg-indigo-300 min-h-screen space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">Your Itineraries</h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">Plan each day of your trip beautifully</p>
        </div>
        <Link to={`/itineraries/add/${id}`}>
          <Button className="gap-2 text-sm sm:text-base md:text-base">
            <Plus size={16} /> Add Itinerary
          </Button>
        </Link>
      </div>

      {/* Days */}
      <div className="space-y-4 sm:space-y-6">
        {daysArray.map((_, index) => {
          const dayDate = new Date(tripData.startDate);
          dayDate.setDate(dayDate.getDate() + index);
          const formattedDate = dayDate.toISOString().split("T")[0];
          const currentItinerary = data?.itineraries?.find(it => new Date(it.date).toDateString() === dayDate.toDateString());

          /* EMPTY DAY CARD */
          if (!currentItinerary) {
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                custom={index}
              >
                <Card className="border-dashed bg-gray-300 hover:bg-gray-200 transition">
                  <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
                    <div className="flex items-start gap-2 md:gap-3">
                      <Calendar className="text-indigo-500 mt-1" size={18} />
                      <div>
                        <AlertTriangle className="inline-block mr-2 text-red-500" size={16} />
                        <CardTitle className="text-base sm:text-lg md:text-xl">Day {index + 1}</CardTitle>
                        <CardDescription className="text-sm sm:text-base">{formatDate(dayDate)} · No plans yet</CardDescription>
                      </div>
                    </div>
                    <Link to={`/itineraries/add/${id}?date=${formattedDate}`}>
                      <Button size="sm" variant="outline" className="gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm md:text-base">
                        <Plus size={14} /> Add Itinerary
                      </Button>
                    </Link>
                  </CardHeader>
                </Card>
              </motion.div>
            );
          }

          /* FILLED DAY CARD */
          return (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              custom={index}
            >
              <Card className="bg-gray-300 hover:bg-gray-200 transition shadow-md">
                <CardHeader className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Calendar className="text-indigo-600" size={18} />
                      <div>
                        <CardTitle className="text-lg sm:text-xl md:text-2xl">
                          Day {index + 1}: {currentItinerary.title}
                        </CardTitle>
                        <CardDescription className="text-sm sm:text-base">
                          {formatDate(currentItinerary.date)}
                        </CardDescription>
                      </div>
                    </div>

                    <div className="flex gap-2 sm:gap-3 mt-2 sm:mt-0">
                      <Link to={`/itineraries/${id}/edit/${currentItinerary._id}`}>
                        <Button size="sm" variant="outline" className="gap-2 bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm md:text-base">
                          <Pencil size={14} /> Edit
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="gap-2 bg-red-600 hover:bg-red-500 text-white text-xs sm:text-sm md:text-base"
                        disabled={deletingId === currentItinerary._id}
                        onClick={() => handleDelete(currentItinerary._id)}
                      >
                        <Trash2 size={14} /> Delete
                      </Button>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-gray-600 mt-1">{currentItinerary.description}</p>
                </CardHeader>

                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                  {currentItinerary.activities?.length > 0 ? (
                    currentItinerary.activities.map((activity, idx) => (
                      <motion.div key={idx} whileHover={{ scale: 1.02 }} className="border rounded-xl p-3 sm:p-4 bg-muted">
                        <div className="flex items-center gap-2 mb-1 text-sm sm:text-base md:text-base">
                          <MapPin size={14} className="text-indigo-500" />
                          <h3 className="font-semibold">{activity.name}</h3>
                        </div>
                        <div className="flex items-center gap-2 text-xs sm:text-sm md:text-sm text-gray-600 mb-1">
                          <Clock size={12} /> Time: {activity.time}
                        </div>
                        {activity.notes?.length > 0 && (
                          <ul className="list-disc list-inside text-xs sm:text-sm md:text-sm text-gray-500">
                            {activity.notes.map((note, i) => (
                              <li key={i}>{note}</li>
                            ))}
                          </ul>
                        )}
                      </motion.div>
                    ))
                  ) : (
                    <div className="flex items-center gap-2 text-xs sm:text-sm md:text-sm text-gray-600 mt-2">
                      <AlertTriangle size={14} className="text-yellow-500" /> <span>No activities planned</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default ItinerariesDetailsPage;







// final 2













































































//final 3

// import React, { useEffect, useMemo, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import api from "@/api/axios";
// import { Button } from "@/components/ui/button";
// import {
//   Plus,
//   Calendar,
//   Pencil,
//   Trash2,
//   Loader2,
// } from "lucide-react";
// import { motion } from "framer-motion";
// import { toast } from "sonner";

// const MS_PER_DAY = 1000 * 60 * 60 * 24;

// const ItineraryDetailsPage = () => {
//   const { id: tripId } = useParams();

//   const [trip, setTrip] = useState(null);
//   const [itineraries, setItineraries] = useState([]);
//   const [page, setPage] = useState(1);
//   const limit = 2;

//   const [hasMore, setHasMore] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   /* ---------------- FETCH TRIP ---------------- */
//   const fetchTrip = async () => {
//     try {
//       const res = await api.get(`/trips/${tripId}`);
//       setTrip(res.data);
//     } catch {
//       setError("Failed to load trip details");
//       toast.error("Failed to load trip details");
//     }
//   };

//   /* ---------------- FETCH ITINERARIES ---------------- */
//   const fetchItineraries = async () => {
//     if (!hasMore) return;

//     setLoading(true);
//     try {
//       const res = await api.get(`/${tripId}/itineraries`, {
//         params: { page, limit },
//       });

//       const data = res.data.itineraries || [];

//       setItineraries((prev) => {
//         const ids = new Set(prev.map((i) => i._id));
//         const unique = data.filter((i) => !ids.has(i._id));
//         return [...prev, ...unique];
//       });

//       if (data.length < limit) setHasMore(false);
//     } catch (err) {
//       toast.error("Failed to fetch itineraries");
//       setError(err?.response?.data?.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ---------------- DELETE ITINERARY ---------------- */
//   const handleDelete = async (itineraryId) => {
//     const ok = window.confirm(
//       "Are you sure you want to delete this itinerary?"
//     );
//     if (!ok) return;

//     try {
//       await api.delete(`/${tripId}/itineraries/${itineraryId}`);
//       setItineraries((prev) =>
//         prev.filter((it) => it._id !== itineraryId)
//       );
//       toast.success("Itinerary deleted");
//     } catch {
//       toast.error("Failed to delete itinerary");
//     }
//   };

//   /* ---------------- EFFECTS ---------------- */
//   useEffect(() => {
//     fetchTrip();
//   }, [tripId]);

//   useEffect(() => {
//     fetchItineraries();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [page]);

//   /* ---------------- CALCULATE DAYS ---------------- */
//   const days = useMemo(() => {
//     if (!trip) return [];

//     const start = new Date(trip.startDate);
//     const end = new Date(trip.endDate);
//     const totalDays =
//       Math.floor((end - start) / MS_PER_DAY) + 1;

//     return Array.from({ length: totalDays }, (_, i) => {
//       const date = new Date(start);
//       date.setDate(start.getDate() + i);
//       return { dayNumber: i + 1, date };
//     });
//   }, [trip]);

//   /* ---------------- GROUP ITINERARIES ---------------- */
//   const itinerariesByDate = useMemo(() => {
//     const map = {};
//     itineraries.forEach((it) => {
//       const key = new Date(it.date).toDateString();
//       if (!map[key]) map[key] = [];
//       map[key].push(it);
//     });
//     return map;
//   }, [itineraries]);

//   /* ---------------- LOADING STATE ---------------- */
//   if (!trip) {
//     return (
//       <div className="p-10 text-center flex justify-center gap-2">
//         <Loader2 className="animate-spin" />
//         Loading trip...
//       </div>
//     );
//   }

//   return (
//     <section className="px-10 py-8 mx-auto bg-indigo-300 min-h-screen">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-8">
//         <h1 className="text-3xl font-bold tracking-tight">
//           {trip.title} — Itinerary
//         </h1>

//         <Link to={`/itineraries/add/${tripId}`}>
//           <Button className="bg-purple-600 hover:bg-purple-500">
//             <Plus className="mr-1" />
//             New Itinerary
//           </Button>
//         </Link>
//       </div>

//       {/* Days */}
//       <div className="space-y-8">
//         {days.map((day) => {
//           const key = day.date.toDateString();
//           const dayItineraries = itinerariesByDate[key] || [];

//           return (
//             <motion.div
//               key={key}
//               initial={{ opacity: 0, y: 30, scale: 0.97 }}
//               whileInView={{ opacity: 1, y: 0, scale: 1 }}
//               viewport={{ once: true, margin: "-80px" }}
//               transition={{
//                 duration: 0.5,
//                 ease: "easeOut",
//               }}
//               className="rounded-xl border bg-indigo-50 shadow-sm"
//             >
//               {/* Day Header */}
//               <div className="flex items-center gap-3 px-6 py-4 border-b bg-gray-300 rounded-t-xl">
//                 <Calendar className="text-purple-600" />
//                 <div>
//                   <h2 className="font-semibold text-lg">
//                     Day {day.dayNumber}
//                   </h2>
//                   <p className="text-sm text-gray-500">
//                     {day.date.toDateString()}
//                   </p>
//                 </div>
//               </div>

//               {/* Day Content */}
//               <div className="p-6 space-y-4">
//                 {dayItineraries.length === 0 ? (
//                   <p className="text-sm text-gray-400 italic">
//                     No itineraries for this day
//                   </p>
//                 ) : (
//                   dayItineraries.map((it) => (
//                     <div
//                       key={it._id}
//                       className="border bg-blue-300 rounded-lg p-4 hover:shadow transition"
//                     >
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <h3 className="font-semibold">
//                             {it.title}
//                           </h3>
//                           <p className="text-sm text-gray-600">
//                             {it.description}
//                           </p>
//                         </div>

//                         {/* Actions */}
//                         <div className="flex gap-2">
//                           <Link
//                             to={`/itineraries/${tripId}/edit/${it._id}`}
//                           >
//                             <Button
//                               size="icon"
//                               variant="outline"
//                               className="hover:bg-blue-400"
//                             >
//                               <Pencil size={16} />
//                             </Button>
//                           </Link>

//                           <Button
//                             size="icon"
//                             variant="destructive"
//                             className="hover:bg-red-400"
//                             onClick={() =>
//                               handleDelete(it._id)
//                             }
//                           >
//                             <Trash2 size={16} />
//                           </Button>
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </motion.div>
//           );
//         })}
//       </div>

//       {/* Pagination */}
//       {loading && (
//         <div className="flex justify-center mt-8 gap-2 text-gray-500">
//           <Loader2 className="animate-spin" />
//           Loading...
//         </div>
//       )}

//       {hasMore && !loading && (
//         <div className="flex justify-center mt-8">
//           <Button
//             variant="outline"
//             onClick={() => setPage((p) => p + 1)}
//           >
//             Load More
//           </Button>
//         </div>
//       )}

//       {error && (
//         <div className="text-red-500 mt-6 text-center">
//           {error}
//         </div>
//       )}
//     </section>
//   );
// };

// export default ItineraryDetailsPage;
