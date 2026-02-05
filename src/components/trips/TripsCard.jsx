import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { MoreHorizontalIcon, Calendar, Wallet, Globe, MapPin, FileText, Edit, Trash2, EyeIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { motion } from "framer-motion";

export default function TripsCard({ trip, onEdit, onDelete }) {
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);

  return (


    <motion.div
      layout
      initial={{ opacity: 0, y: 100, rotateX: 15 }}

      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ amount: 0.3 }}   // ❗ no "once: true"
      transition={{ duration: 0.6, ease: "easeOut" }}
      //whileHover={{ y: -6, scale: 1.02 }}
      className="border rounded-xl p-5 shadow-md bg-gray-300
  hover:scale-105
  hover:shadow-xl transition"
    >



      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <MapPin className="text-purple-600" size={22} />
          <h2 className="text-xl font-bold text-gray-800">{trip.title}</h2>
        </div>

        {/* Menu */}
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              className="bg-amber-300 cursor-pointer hover:bg-amber-200"
              variant="outline"
              size="icon"
            >
              <MoreHorizontalIcon />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-40" align="end">
            <DropdownMenuLabel>Trip Actions</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="text-blue-600 cursor-pointer"
                onSelect={() => onEdit(trip)}
              >
                <Edit size={16} className="mr-2" /> Edit Trip
              </DropdownMenuItem>

              <DropdownMenuItem
                className="text-red-600 cursor-pointer"
                onSelect={() => onDelete(trip)}
              >
                <Trash2 size={16} className="mr-2" /> Delete Trip
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Dates + Budget */}
      <div className="flex flex-wrap gap-3 mt-4 text-sm">

        <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
          <Calendar size={16} className="text-blue-600" />
          <span>
            {new Date(trip.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}{" "}
            -{" "}
            {new Date(trip.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </span>
        </div>

        <div className="flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full">
          <Wallet size={16} className="text-green-700" />
          <span className="font-semibold">₹{trip.budget?.total || 0}</span>
        </div>

      </div>

      {/* Description */}
      {trip.description && (
        <div className="mt-4 bg-gray-50 p-3 rounded-lg text-sm text-gray-700">
          <div className="flex items-center gap-2 mb-1 text-gray-600">
            <FileText size={16} />
            <span className="font-medium">Description</span>
          </div>
          {trip.description}
        </div>
      )}

      {/* Destinations */}
      {trip.destinations?.length > 0 && (
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-2 text-gray-700 font-medium">
            <Globe size={16} />
            Destinations
          </div>

          <div className="flex flex-wrap gap-2">
            {trip.destinations.map((place, i) => (
              <span
                key={i}
                className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold"
              >
                {place}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* View Details Button */}
      <Link to={`/trip-details/${trip._id}`}>
        <button className="flex justify-center items-center cursor-pointer
         bg-purple-600 w-full hover:bg-purple-500 text-white mt-5 py-2 rounded-lg transition">
          <EyeIcon className="inline mr-2" /> View Details
        </button>
      </Link>


    </motion.div>


  );

}
