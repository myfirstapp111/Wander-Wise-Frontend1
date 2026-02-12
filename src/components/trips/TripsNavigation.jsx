import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe2, Map, Backpack } from "lucide-react";

const TripsNavigation = ({ trip }) => {
  return (
    <Card className="bg-blue-200 shadow-lg rounded-2xl border border-blue-200 w-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm sm:text-base md:text-lg font-bold text-blue-900">
          <Globe2 className="text-blue-600" /> Trip Navigation
        </CardTitle>
        <CardDescription className="text-gray-700 text-xs sm:text-sm md:text-base">
          Manage trip-related options quickly and easily
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-2 sm:gap-3">
        {/* Itineraries */}
        <a href={`/itineraries/${trip._id}`}>
          <Button
            variant="outline"
            className="w-full flex items-center justify-start gap-2 text-xs sm:text-sm md:text-base hover:bg-blue-200 transition"
          >
            <Map className="text-blue-600" /> Manage Itineraries
          </Button>
        </a>

        {/* Baggage */}
        <a href={`/baggage/${trip._id}`}>
          <Button
            variant="outline"
            className="w-full flex items-center justify-start gap-2 text-xs sm:text-sm md:text-base hover:bg-blue-200 transition"
          >
            <Backpack className="text-blue-600" /> Manage Baggage
          </Button>
        </a>

        {/* Future buttons like Expenses can go here */}
      </CardContent>
    </Card>
  );
};

export default TripsNavigation;
