import React from "react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import ItinerariesForm from "@/components/itineraries/ItinerariesForm";

const AddItineraries = () => {
  return (
    <div className="min-h-screen bg-indigo-300 px-4 py-10">
      <section className="max-w-3xl mx-auto w-full">
        <Card className="bg-blue-300 shadow-xl rounded-2xl">
          <CardHeader className="space-y-2">
            <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-center">
              Add New Itinerary
            </CardTitle>

            <CardDescription className="text-sm sm:text-base text-center text-gray-700">
              Fill in the details below to create a new itinerary.
            </CardDescription>

            <CardAction />
          </CardHeader>

          <CardContent className="pt-4">
            <ItinerariesForm type="add" />
          </CardContent>

          <CardFooter className="text-center text-xs sm:text-sm text-gray-600 justify-center">
            <p>Make sure all required fields are filled correctly.</p>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
};

export default AddItineraries;
