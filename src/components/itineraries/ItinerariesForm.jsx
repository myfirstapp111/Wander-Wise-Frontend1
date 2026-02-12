import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import api from "@/api/axios";
import { toast } from "sonner";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

/* ---------------- SCHEMA ---------------- */

const activitySchema = z.object({
  name: z.string().min(3, "Must be at least 3 characters"),
  time: z.string().min(3, "Must be at least 3 characters"),
  notes: z
    .array(z.string().min(3, "Must be at least 3 characters"))
    .min(1, "At least one note is required"),
});

const itinerariesSchema = z.object({
  title: z.string().min(3, "Must be at least 3 characters"),
  description: z.string().optional(),
  date: z.string(),
  activities: z
    .array(activitySchema)
    .min(1, "At least one activity is required"),
});

/* ---------------- COMPONENT ---------------- */

const ItinerariesForm = ({ type, itineraryInfo }) => {
  const [searchParams] = useSearchParams();
  const selectedDate = searchParams.get("date");

  const { tripId } = useParams();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(itinerariesSchema),
    defaultValues: {
      title: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
      activities: [
        {
          name: "",
          time: "",
          notes: [""],
        },
      ],
    },
  });

  /* RESET ON EDIT */
  useEffect(() => {
    if (type === "edit" && itineraryInfo) {
      form.reset({
        title: itineraryInfo.title || "",
        description: itineraryInfo.description || "",
        date: itineraryInfo.date?.split("T")[0],
        activities: itineraryInfo.activities.map((a) => ({
          name: a.name,
          time: a.time,
          notes: a.notes.length ? a.notes : [""],
        })),
      });
    }
  }, [type, itineraryInfo, form]);

  /* RESET ON DATE CHANGE */
  useEffect(() => {
    if (type !== "edit" && selectedDate) {
      form.reset({
        title: "",
        description: "",
        date: selectedDate,
        activities: [
          {
            name: "",
            time: "",
            notes: [""],
          },
        ],
      });
    }
  }, [selectedDate, type, form]);

  const {
    fields: activityFields,
    append: appendActivity,
    remove: removeActivity,
  } = useFieldArray({
    control: form.control,
    name: "activities",
  });

  const onAdd = async (data) => {
    try {
      await api.post(`/${tripId}/itineraries`, data);
      toast.success("Itinerary created successfully!");
      navigate(`/itineraries/${tripId}`);
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onEdit = async (data) => {
    try {
      await api.patch(
        `/${tripId}/itineraries/${itineraryInfo._id}`,
        data
      );
      toast.success("Itinerary updated successfully!");
      navigate(`/itineraries/${tripId}`);
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(type === "edit" ? onEdit : onAdd)}
        className="space-y-6 sm:space-y-8"
      >
        {/* ---------------- ITINERARY DETAILS ---------------- */}
        <Card className="shadow-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-lg sm:text-xl md:text-2xl">
              Itinerary Details
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Fill details about the itinerary
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 sm:space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base">
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter itinerary title" className="text-sm sm:text-base" />
                    
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter itinerary description" className="text-sm sm:text-base" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base">
                    Date
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      disabled={
                        selectedDate || type === "edit"
                      }
                      className="text-sm sm:text-base"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* ---------------- ACTIVITIES HEADER ---------------- */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">
            Activities
          </h3>

          <Button
            type="button"
            size="sm"
            variant="outline"
            className="flex items-center gap-2 text-sm sm:text-base"
            onClick={() =>
              appendActivity({ name: "", time: "", notes: [""] })
            }
          >
            <Plus size={16} />
            Add Activity
          </Button>
        </div>

        {/* ---------------- ACTIVITY LIST ---------------- */}
        {activityFields.map((activity, index) => (
          <ActivityCard
            key={activity.id}
            index={index}
            form={form}
            removeActivity={removeActivity}
          />
        ))}

        {/* ---------------- SUBMIT ---------------- */}
        <Button
          type="submit"
          className="w-full sm:w-auto text-sm sm:text-base"
        >
          {type === "edit"
            ? "Update Itinerary"
            : "Create Itinerary"}
        </Button>
      </form>
    </Form>
  );
};

export default ItinerariesForm;

/* ---------------- ACTIVITY CARD ---------------- */

const ActivityCard = ({ index, form, removeActivity }) => {
  const {
    fields: notesFields,
    append: appendNote,
    remove: removeNote,
  } = useFieldArray({
    control: form.control,
    name: `activities.${index}.notes`,
  });

  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <CardTitle className="text-base sm:text-lg md:text-xl">
          Activity {index + 1}
        </CardTitle>

        <CardAction className="flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="flex items-center gap-2 text-xs sm:text-sm"
            onClick={() => appendNote("")}
          >
            <Plus size={14} />
            Add Note
          </Button>

          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => removeActivity(index)}
            className="text-red-600 flex items-center gap-2 text-xs sm:text-sm"
          >
            <Trash2 size={14} />
            Delete
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name={`activities.${index}.name`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base">
                Activity Name
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter activity name" className="text-sm sm:text-base" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`activities.${index}.time`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base">
                Time
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter time (e.g., 10:00 AM)" className="text-sm sm:text-base" />
              </FormControl>
            </FormItem>
          )}
        />

        {notesFields.map((note, noteIndex) => (
          <div
            key={note.id}
            className="flex flex-col sm:flex-row gap-2 sm:items-end"
          >
            <FormField
              control={form.control}
              name={`activities.${index}.notes.${noteIndex}`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input {...field} placeholder="Enter note" className="text-sm sm:text-base" />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              type="button"
              size="icon"
              variant="outline"
              className="self-end sm:self-auto"
              onClick={() => removeNote(noteIndex)}
            >
              <Trash2 className="text-red-600 w-4 h-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};








// import React, { useEffect, useState } from "react"
// import { useForm, useFieldArray } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import * as z from "zod"
// import { useParams, useNavigate } from "react-router-dom"

// import {
//   PlusIcon,
//   Trash2,
//   Loader2,
//   Clock,
//   NotebookPen,
//   CalendarDays,
//   FileText,
// } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { Textarea } from "@/components/ui/textarea"

// import api from "@/api/axios"
// import { toast } from "sonner"

// /* ---------------- SCHEMA ---------------- */

// const activitySchema = z.object({
//   name: z.string().min(1, "Activity name required"),
//   time: z.string().min(1, "Time required"),
//   notes: z.array(z.string()),
// })

// const itinerariesSchema = z.object({
//   title: z.string().min(1, "Title required"),
//   description: z.string().optional(),
//   date: z.string(),
//   activities: z.array(activitySchema),
// })

// /* ---------------- ACTIVITY ITEM ---------------- */

// const ActivityItem = ({ control, index, removeActivity }) => {
//   const { fields: notes, append, remove } = useFieldArray({
//     control,
//     name: `activities.${index}.notes`,
//   })

//   return (
//     <Card className="border border-emerald-200 bg-emerald-50/50">
//       <CardHeader className="flex flex-row justify-between items-center">
//         <CardTitle className="flex items-center gap-2 text-emerald-700">
//           <NotebookPen size={18} />
//           Activity {index + 1}
//         </CardTitle>

//         <Button
//           type="button"
//           size="sm"
//           variant="secondary"
//           onClick={() => append("")}
//         >
//           <PlusIcon size={14} className="mr-1" />
//           Add Note
//         </Button>
//       </CardHeader>

//       <CardContent className="space-y-4">
//         <FormField
//           control={control}
//           name={`activities.${index}.name`}
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Activity Name</FormLabel>
//               <FormControl>
//                 <Input placeholder="Hiking, Sightseeing..." {...field} />
//               </FormControl>
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={control}
//           name={`activities.${index}.time`}
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel className="flex items-center gap-1">
//                 <Clock size={14} />
//                 Time
//               </FormLabel>
//               <FormControl>
//                 <Input placeholder="09:00 AM" {...field} />
//               </FormControl>
//             </FormItem>
//           )}
//         />

//         {notes.map((note, noteIndex) => (
//           <div key={note.id} className="flex gap-2 items-end">
//             <FormField
//               control={control}
//               name={`activities.${index}.notes.${noteIndex}`}
//               render={({ field }) => (
//                 <FormItem className="flex-1">
//                   <FormLabel>Note {noteIndex + 1}</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Optional detail..." {...field} />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />

//             <Button
//               type="button"
//               size="icon"
//               variant="destructive"
//               onClick={() => remove(noteIndex)}
//             >
//               <Trash2 size={16} />
//             </Button>
//           </div>
//         ))}

//         <Button
//           type="button"
//           variant="ghost"
//           className="text-red-600 hover:bg-red-50"
//           onClick={() => removeActivity(index)}
//         >
//           Remove Activity
//         </Button>
//       </CardContent>
//     </Card>
//   )
// }

// /* ---------------- MAIN FORM ---------------- */

// const ItinerariesForm = ({ type = "add", tripsInfo }) => {
//   const [loading, setLoading] = useState(false)

//   const form = useForm({
//     resolver: zodResolver(itinerariesSchema),
//     defaultValues: {
//       title: "",
//       description: "",
//       date: new Date().toISOString().split("T")[0],
//       activities: [],
//     },
//   })

//   useEffect(() => {
//     if (type === "edit" && tripsInfo) {
//       form.reset({
//         ...tripsInfo,
//         date: new Date(tripsInfo.date).toISOString().split("T")[0],
//       })
//     }
//   }, [type, tripsInfo, form])

//   const { fields: activities, append, remove } = useFieldArray({
//     control: form.control,
//     name: "activities",
//   })

//   const { tripId } = useParams()
//   const navigate = useNavigate()

//   /* ---------------- SUBMIT ---------------- */

//   const onSubmit = async (data) => {
//     try {
//       setLoading(true)

//       if (type === "edit") {
//         await api.patch(`/${tripId}/itineraries/${tripsInfo._id}`, data)
//         toast.success("Itinerary updated successfully")
//       } else {
//         await api.post(`/${tripId}/itineraries`, data)
//         toast.success("Itinerary created successfully")
//       }

//       navigate(`/itineraries/${tripId}`)
//     } catch (err) {
//       console.error(err)
//       toast.error(err?.response?.data?.message || "Action failed")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="space-y-8 max-w-3xl mx-auto"
//       >
//         {/* BASIC INFO */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-xl flex items-center gap-2">
//               <FileText size={20} />
//               {type === "edit" ? "Edit Itinerary" : "Create Itinerary"}
//             </CardTitle>
//           </CardHeader>

//           <CardContent className="space-y-5">
//             <FormField
//               control={form.control}
//               name="title"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Title</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Trip to Pokhara" {...field} />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="description"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Description</FormLabel>
//                   <FormControl>
//                     <Textarea
//                       rows={3}
//                       placeholder="Short trip overview..."
//                       {...field}
//                     />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="date"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="flex items-center gap-1">
//                     <CalendarDays size={14} />
//                     Date
//                   </FormLabel>
//                   <FormControl>
//                     <Input type="date" {...field} />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//           </CardContent>
//         </Card>

//         {/* ACTIVITIES */}
//         <Button
//           type="button"
//           variant="outline"
//           onClick={() => append({ name: "", time: "", notes: [] })}
//         >
//           <PlusIcon size={16} className="mr-2" />
//           Add Activity
//         </Button>

//         {activities.map((_, index) => (
//           <ActivityItem
//             key={activities[index].id}
//             control={form.control}
//             index={index}
//             removeActivity={remove}
//           />
//         ))}

//         {/* SUBMIT */}
//         <Button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700"
//           disabled={loading}
//         >
//           {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
//           {type === "edit" ? "Update Itinerary" : "Save Itinerary"}
//         </Button>
//       </form>
//     </Form>
//   )
// }

// export default ItinerariesForm
