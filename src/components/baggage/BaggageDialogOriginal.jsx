


import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import api from "@/api/axios";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogTrigger } from "@radix-ui/react-dialog";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "sonner";
import { Plus } from "lucide-react";





const formSchema = z.object({
  name: z
    .string()
    .min(3, "Baggage name must be at least 3 characters.")
    .max(32, "Baggage name must be at most 32 characters."),

})

export default function BaggageDialogOriginal({

  isOpen,
  setIsOpen,

  type = "add", // add | edit
  baggage,
  tripId,
  setDependency,
  onSuccess,
}) {



//form is created first and then reset in useEffect
console.log("BaggageDialogOriginal Rendered with type:", type, "and baggage:", baggage);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues:   {
      name: type === "edit" && baggage ? baggage.name : "",

    },
  })






useEffect(() => {
  if (type === "edit" && baggage) {
    form.reset({
      name: baggage.name,
    });
  } else {
    form.reset({
      name: "",
    });
  }
}, [type, baggage, form]);












  const onSubmit = async (data) => {
    console.log("Form Data:", data); // Log form data for debugging

    try {

      const response = await api.post(`/${tripId}/baggages`, data)
      if (response.data?._id) {
        toast.success("Baggage item added successfully!");
        setDependency(prev => prev + 1); // Trigger refetch in parent
        form.reset();
      }



    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create trip")
    }

  }






   const onUpdate = async (data) => {
    console.log("Form Data:", data); // Log form data for debugging

    try {

      const response = await api.put(`/${tripId}/baggages/${baggage._id}`, data)
      if (response.data?._id) {
        toast.success("Baggage item added successfully!");
        setDependency(prev => prev + 1); // Trigger refetch in parent
        form.reset();
        setIsOpen(false);
      }



    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create trip")
    }

  }








  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>

      <DialogTrigger asChild>


        <Button
          className="bg-purple-700
                text-white
                cursor-pointer
                hover:text-white
                hover:bg-purple-800"
          variant="outline"><Plus className="mr-2 h-4 w-4" /> Add Baggage</Button>


      </DialogTrigger>

      <DialogContent className="sm:max-w-lg bg-blue-200">

        <DialogHeader>
          <DialogTitle className="mb-4 flex justify-center text-2xl font-semibold">
           {type === "add" ? "Add Baggage Item" : "Edit Baggage Item"}
          </DialogTitle>



          <Form {...form}>
            <form onSubmit={form.handleSubmit(type === "add" ? onSubmit : onUpdate)} className="space-y-8 w-80 mx-auto">

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="e.g. Clothes, Documents, Camera" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg
                            cursor-pointer
                            hover:bg-purple-700 transition"
                type="submit">Submit
              </button>

            </form>

          </Form>

        </DialogHeader>

      </DialogContent>

    </Dialog>
  );
}



// import { useEffect } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import api from "@/api/axios";

// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";

// import { toast } from "sonner";
// import { Plus } from "lucide-react";

// const formSchema = z.object({
//   name: z
//     .string()
//     .min(3, "Baggage name must be at least 3 characters.")
//     .max(32, "Baggage name must be at most 32 characters."),
// });

// export default function BaggageDialogOriginal({
//   open,
//   setOpen,
//   type = "add", // add | edit
//   baggage,
//   tripId,
//   onSuccess,
// }) {
//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//     },
//   });

//   /**
//    * 👇 When switching to EDIT mode,
//    * populate the form with selected baggage
//    */
//   useEffect(() => {
//     if (type === "edit" && baggage) {
//       form.reset({
//         name: baggage.name,
//       });
//     }

//     if (type === "add") {
//       form.reset({ name: "" });
//     }
//   }, [type, baggage, form]);

//   const onSubmit = async (data) => {
//     try {
//       if (type === "add") {
//         await api.post(`/${tripId}/baggages`, data);
//         toast.success("Baggage item added!");
//       } else {
//         await api.put(`/${tripId}/baggages/${baggage._id}`, data);
//         toast.success("Baggage item updated!");
//       }

//       setOpen(false);
//       form.reset();
//       onSuccess?.();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       {type === "add" && (
//         <DialogTrigger asChild>
//           <Button variant="outline">
//             <Plus className="mr-2 h-4 w-4" />
//             Add Baggage
//           </Button>
//         </DialogTrigger>
//       )}

//       <DialogContent className="sm:max-w-lg bg-blue-200">
//         <DialogHeader>
//           <DialogTitle className="mb-4 text-center text-2xl font-semibold">
//             {type === "add" ? "Add Baggage Item" : "Edit Baggage Item"}
//           </DialogTitle>

//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(onSubmit)}
//               className="space-y-6 w-80 mx-auto"
//             >
//               <FormField
//                 control={form.control}
//                 name="name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Name</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="e.g. Clothes, Documents, Camera"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <button
//                 type="submit"
//                 className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
//               >
//                 {type === "add" ? "Add" : "Update"}
//               </button>
//             </form>
//           </Form>
//         </DialogHeader>
//       </DialogContent>
//     </Dialog>
//   );
// }
