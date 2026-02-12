import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { Plus, Trash2 } from "lucide-react"
import { useEffect } from "react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import api from "@/api/axios"

/* ---------------- SCHEMAS ---------------- */
const budgetSchema = z.object({
  total: z.coerce.number().min(0, "Total budget must be positive"),
  spent: z.coerce.number().min(0).default(0),
})

const tripSchema = z.object({
  title: z.string().min(5),
  description: z.string().min(10),
  startDate: z.string(),
  endDate: z.string(),
  destinations: z.array(z.string().min(1)).min(1),
  budget: budgetSchema,
}).refine(
  (data) => new Date(data.startDate) < new Date(data.endDate),
  { path: ["endDate"], message: "End date must be after start date" }
)

const formatDate = (date) =>
  date ? new Date(date).toISOString().split("T")[0] : ""

/* ---------------- COMPONENT ---------------- */
export default function TripsForm({ tripsInfo }) {
  const navigate = useNavigate()

  const form = useForm({
    resolver: zodResolver(tripSchema),
    defaultValues: tripsInfo || {
      title: "",
      description: "",
      startDate: formatDate(new Date()),
      endDate: formatDate(new Date()),
      destinations: [""],
      budget: { total: 0, spent: 0 },
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "destinations",
  })

  useEffect(() => {
    if (tripsInfo) {
      form.reset({
        title: tripsInfo.title,
        description: tripsInfo.description,
        startDate: formatDate(tripsInfo.startDate),
        endDate: formatDate(tripsInfo.endDate),
        destinations: tripsInfo.destinations,
        budget: {
          total: tripsInfo.budget?.total || 0,
          spent: tripsInfo.budget?.spent || 0,
        },
      })
    }
  }, [tripsInfo])

  const onSubmit = async (values) => {
    try {
      const payload = {
        title: values.title,
        description: values.description,
        startDate: values.startDate,
        endDate: values.endDate,
        destinations: values.destinations,
        budget: { total: values.budget.total },
      }

      if (tripsInfo?._id) {
        await api.patch(`/trips/${tripsInfo._id}`, payload)
        toast.success("Trip updated successfully!")
      } else {
        await api.post("/trips", payload)
        toast.success("Trip created successfully!")
      }

      navigate("/trips")
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong")
    }
  }

  return (
    /* 🔑 NO EXTRA WIDTH ON MOBILE */
    <section className="w-full sm:max-w-4xl sm:mx-auto px-0 sm:px-6 py-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 text-xs sm:text-sm md:text-base"
        >

          {/* -------- CARD 1 -------- */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <img
                  src="/logo.png"
                  alt="WanderWise"
                  className="w-6 h-6 sm:w-9 sm:h-9 rounded-full"
                />
                <span className="text-sm sm:text-xl font-semibold text-purple-600">
                  Trip Details
                </span>
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Basic information about your trip
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="bg-blue-200 border border-amber-600 rounded-lg p-3 sm:p-6 space-y-4">

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs sm:text-sm">Title</FormLabel>
                      <FormControl>
                         <Input
                          {...field}
                          className="text-sm sm:text-base"
                          placeholder="Trip to the Galaxy"
                        />
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
                      <FormLabel className="text-xs sm:text-sm">Description</FormLabel>
                      <FormControl>
                          <Input
                          {...field}
                          className="text-sm sm:text-base"
                          placeholder="Short trip description..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs sm:text-sm">Start Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs sm:text-sm">End Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* -------- CARD 2 -------- */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-sm sm:text-xl font-semibold text-purple-600">
                Destinations
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Places you’ll visit
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="bg-blue-200 border border-amber-300 rounded-lg p-3 sm:p-6 space-y-3">

                {fields.map((field, index) => (
                  <div key={field.id} className="flex flex-col sm:flex-row gap-2">
                    <FormField
                      control={form.control}
                      name={`destinations.${index}`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                             <Input
                              {...field}
                              className="text-sm sm:text-base"
                              placeholder="Destination"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => remove(index)}
                      className="text-xs sm:text-sm"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                <Button
                  type="button"
                  onClick={() => append("")}
                  className="w-full sm:w-auto text-xs sm:text-sm"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Destination
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* -------- CARD 3 -------- */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-sm sm:text-xl font-semibold text-purple-600">
                Budget
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Estimated total cost
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="bg-blue-200 border border-amber-600 rounded-lg p-3 sm:p-6">
                <FormField
                  control={form.control}
                  name="budget.total"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs sm:text-sm">
                        Total Budget
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          className="text-sm sm:text-base"
                          placeholder="Enter budget"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>

            <CardFooter>
              <Button
                type="submit"
                className="w-full sm:w-auto text-xs sm:text-sm md:text-base px-6 py-2"
              >
                {tripsInfo ? "Update Trip" : "Create Trip"}
              </Button>
            </CardFooter>
          </Card>

        </form>
      </Form>
    </section>
  )
}
