import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MoreHorizontalIcon, Calendar, Wallet, Globe, MapPin, FileText, Edit, Trash2, EyeIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuGroup,
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
      viewport={{ amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="border rounded-xl p-4 sm:p-5 shadow-md bg-gray-300
        hover:scale-105 hover:shadow-xl transition
        w-full sm:w-auto"
    >
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <MapPin className="text-purple-600" size={20} />
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">{trip.title}</h2>
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
      <div className="flex flex-wrap gap-2 mt-3 text-xs sm:text-sm md:text-base">
        <div className="flex items-center gap-1 sm:gap-2 bg-gray-100 px-2 py-1 rounded-full">
          <Calendar size={14} className="text-blue-600" />
          <span>
            {new Date(trip.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}{" "}
            -{" "}
            {new Date(trip.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </span>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 bg-green-100 px-2 py-1 rounded-full">
          <Wallet size={14} className="text-green-700" />
          <span className="font-semibold text-xs sm:text-sm">₹{trip.budget?.total || 0}</span>
        </div>
      </div>

      {/* Description */}
      {trip.description && (
        <div className="mt-3 bg-gray-50 p-2 sm:p-3 rounded-lg text-xs sm:text-sm md:text-base text-gray-700">
          <div className="flex items-center gap-1 sm:gap-2 mb-1 text-gray-600 font-medium text-xs sm:text-sm">
            <FileText size={14} />
            Description
          </div>
          {trip.description}
        </div>
      )}

      {/* Destinations */}
      {trip.destinations?.length > 0 && (
        <div className="mt-3">
          <div className="flex items-center gap-1 sm:gap-2 mb-1 text-gray-700 font-medium text-xs sm:text-sm">
            <Globe size={14} />
            Destinations
          </div>

          <div className="flex flex-wrap gap-1 sm:gap-2">
            {trip.destinations.map((place, i) => (
              <span
                key={i}
                className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-[10px] sm:text-xs md:text-sm font-semibold"
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
          bg-purple-600 w-full hover:bg-purple-500 text-white mt-4 py-2 rounded-lg text-xs sm:text-sm md:text-base transition"
        >
          <EyeIcon className="inline mr-2 w-4 h-4 sm:w-5 sm:h-5" /> View Details
        </button>
      </Link>
    </motion.div>
  );
}
