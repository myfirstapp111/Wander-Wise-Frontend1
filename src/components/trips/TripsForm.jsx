import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { Plus } from "lucide-react"
import { Cross } from "lucide-react"
import { Trash2 } from "lucide-react"


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
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import api from "@/api/axios"
import { useEffect } from "react"

// ---------------- SCHEMAS ----------------
const budgetSchema = z.object({
    total: z.coerce.number().min(0, "Total budget must be positive"),
    spent: z.coerce.number().min(0).default(0),
})

const tripSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    startDate: z.string(),
    endDate: z.string(),
    destinations: z.array(z.string().min(1)).min(1, "At least one destination required"),
    budget: budgetSchema,
}).refine((data) => new Date(data.startDate) < new Date(data.endDate), {
    message: "End date must be after start date",
    path: ["endDate"],
})


const formatDate = (date) => {
    if (!date) return ""
    return new Date(date).toISOString().split("T")[0]
}



// ---------------- COMPONENT ----------------
export default function TripsForm({ tripsInfo }) {
    const navigate = useNavigate()

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


    const form = useForm({
        resolver: zodResolver(tripSchema),
        defaultValues: tripsInfo || {
            title: "",
            description: "",
            startDate: new Date().toISOString().split("T")[0],
            endDate: new Date().toISOString().split("T")[0],
            destinations: [""],
            budget: {
                total: 0,
                spent: 0,
            },
        },
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "destinations",
    })

    // ----------- SUBMIT LOGIC -----------
    const onAdd = async (data) => {
        try {
            const payload = {
                title: data.title,
                description: data.description,
                startDate: data.startDate,
                endDate: data.endDate,
                destinations: data.destinations,
                budget: {
                    total: data.budget.total,
                },
            }

            await api.post("/trips", payload)

            toast.success("Trip created successfully!")
            navigate("/trips")
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to create trip")
        }
    }

    const onEdit = async (data) => {
        try {
            const payload = {
                title: data.title,
                description: data.description,
                startDate: data.startDate,
                endDate: data.endDate,
                destinations: data.destinations,
                budget: {
                    total: data.budget.total,
                },
            }

            await api.patch(`/trips/${tripsInfo._id}`, payload)

            toast.success("Trip updated successfully!")
            navigate("/trips")
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to update trip")
        }
    }


    const onSubmit = (values) => {
        console.log("SUBMIT DATA:", values)

        if (tripsInfo?._id) {
            onEdit(values)
        } else {
            onAdd(values)
        }
    }

    // ---------------- JSX ----------------
    return (
        <>
            <section className="">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">


                        {/* --------------- Card 1------------*/}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-21">
                                    <img src="/logo.png" alt="WanderWise Logo" className='w-9 h-9 rounded-full' />
                                    <h2 className="text-purple-600 font-semibold ">Trips Form</h2>
                                </CardTitle>
                                <CardDescription>Fill the form below</CardDescription>
                                {/* <CardAction>Card Action</CardAction> */}
                            </CardHeader>
                            <CardContent className="space-y-4">

                                <div className="border top-4 border-amber-600 p-4 rounded-lg bg-blue-200">

                                    {/* Title */}
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Title</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Trip to the Galaxy" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {/* Description */}
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Short trip description..." {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />


                                    {/* Start Date */}
                                    <FormField
                                        control={form.control}
                                        name="startDate"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Start Date</FormLabel>
                                                <FormControl>
                                                    <Input type="date" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* End Date */}
                                    <FormField
                                        control={form.control}
                                        name="endDate"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>End Date</FormLabel>
                                                <FormControl>
                                                    <Input type="date" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>




                            </CardContent>
                            <CardFooter className="flex flex-col gap-4">



                            </CardFooter>
                        </Card>



                        {/* --------------- Card 2------------*/}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-21">
                                    <img src="/logo.png" alt="WanderWise Logo" className='w-9 h-9 rounded-full' />
                                    <h1 className="text-purple-600 font-semibold">Trips Destinations</h1>
                                </CardTitle>
                                <CardDescription>Enter the destinations for your trip</CardDescription>
                                {/* <CardAction>Card Action</CardAction> */}
                            </CardHeader>
                            <CardContent className="space-y-4">





                                <div className="border top-4 border-amber-300 p-4 bg-blue-200 rounded-lg">



                                    {/* Destinations */}
                                    <div className="space-y-2">
                                        <FormLabel>Destinations</FormLabel>

                                        {fields.map((field, index) => (
                                            <div key={field.id} className="flex gap-2">
                                                <FormField
                                                    control={form.control}
                                                    name={`destinations.${index}`}
                                                    render={({ field }) => (
                                                        <FormItem className="flex-1">
                                                            <FormControl>
                                                                <Input placeholder="Destination" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <Button type="button" variant="destructive" onClick={() => remove(index)}>
                                                    <Trash2 className=" size-icon" />
                                                </Button>
                                            </div>
                                        ))}

                                        <Button className="cursor-pointer"
                                            type="button" onClick={() => append("")}>
                                            <Plus className="mr-2 h-4 w-4" />
                                            Add Destination
                                        </Button>
                                    </div>
                                </div>







                            </CardContent>
                            <CardFooter className="flex flex-col gap-4">




                            </CardFooter>
                        </Card>



                        {/* --------------- Card 3------------*/}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-21">
                                    <img src="/logo.png" alt="WanderWise Logo" className='w-9 h-9 rounded-full' />
                                    <h1 className="text-purple-600 font-semibold ">Budget Details</h1>
                                </CardTitle>
                                <CardDescription>F the total budget for your trip</CardDescription>
                                {/* <CardAction>Card Action</CardAction> */}
                            </CardHeader>
                            <CardContent className="space-y-4">


                                <div className="border top-4 border-amber-600 p-4 rounded-lg bg-blue-200">

                                    {/* Budget */}
                                    <FormField
                                        control={form.control}
                                        name="budget.total"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Total Budget</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="Enter total budget" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                </div>


                            </CardContent>
                            <CardFooter className="flex flex-col gap-4">

                                <div className="">
                                    <Button className="cursor-pointer"
                                        type="submit">
                                        {tripsInfo ? "Update Trip" : "Create Trip"}
                                    </Button>

                                </div>


                            </CardFooter>
                        </Card>









                    </form>
                </Form>

            </section >
        </>
    )
}