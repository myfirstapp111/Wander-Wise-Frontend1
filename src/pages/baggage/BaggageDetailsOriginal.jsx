import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useApi from "@/hooks/useApi";
import BaggageDialogOriginal from "@/components/baggage/BaggageDialogOriginal";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Pen, Trash2 } from "lucide-react";

import { toast } from "sonner";
import api from "@/api/axios";


const BaggageDetailsOriginal = () => {
  const [type, setType] = useState("add"); // add | edit
  const [selectedBaggage, setSelectedBaggage] = useState(null);

  const [dependency, setDependency] = useState(null);

 const [isOpen, setIsOpen] = useState(false);

  const { id } = useParams();
  const { data, loading, error, refetch } = useApi(`/${id}/baggages`, {}, [dependency]);

  const baggages = data?.baggages || data || [];



const onDelete = async (baggage) => {
    try {



            const response = await api.delete(`/${id}/baggages/${baggage._id}`)
            if (response.data?._id) {
                toast.success("Baggage deleted successfully!");
                setDependency(prev => prev + 1); // Trigger refetch in parent
               
            }



        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to delete baggage")
        }
  };

  const oncheckedChange = async (baggage) => {
    try {


      const data = {
            ...baggage,
            completed: !baggage.completed,
        }

            const response = await api.put(`/${id}/baggages/${baggage._id}`, data)
            if (response.data?._id) {
                toast.success("Baggage packed successfully!");
                setDependency(prev => prev + 1); // Trigger refetch in parent
               
            }



        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to create trip")
        }
  };

  const onEdit = (baggage) => {
    setType("edit");
    setSelectedBaggage(baggage);
    setIsOpen(true);
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Failed to load baggage</div>;

  return (
    <div className="p-6 bg-indigo-300">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          Your Baggage List
        </h1>

        <BaggageDialogOriginal
          type={type}
          baggage={selectedBaggage}
          tripId={id}
          setDependency={setDependency}

          isOpen={isOpen}
          setIsOpen={setIsOpen}
        

        />

      </div>

      <div className="mt-6">
        {baggages.length === 0 ? (
          <div>No baggage items found for this trip.</div>
        ) : (
          baggages.map((baggage) => (
            <Card key={baggage._id} className=" md:grid-cols-3  mb-4 p-4 border rounded-lg bg-white shadow">
              <CardContent className=" flex items-center justify-between">
                <div className=" flex items-center gap-2 ">

                  <Checkbox
                  onCheckedChange={() => oncheckedChange(baggage)}
                  checked={baggage.completed} 
                  className=" text-black h-6 w-6 bg-amber-200 " >


                  </Checkbox>

                  <span className="text-lg font-semibold" >{baggage.name}</span>

                </div>

                <div className="flex items-center gap-2">

                  <button
                   onClick={() => onEdit(baggage)}
                    className=" flex items-center gap-3 px-3 py-1
                    hover:bg-blue-600 duration-300
                    cursor-pointer
                    bg-blue-500 text-white rounded"
                  >
                    <Pen className="w-4 h-4" />
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(baggage)}
                    className=" flex items-center gap-3 px-3 py-1
                    hover:bg-red-600 duration-300
                    cursor-pointer
                    bg-red-500 text-white rounded"
                  >
                    <Trash2 className=" hover:text-white w-4 h-4" />
                    Delete
                  </button>

                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>


    </div>
  );
};

export default BaggageDetailsOriginal;



// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import useApi from "@/hooks/useApi";
// import BaggageDialogOriginal from "@/components/baggage/BaggageDialogOriginal";

// const BaggageDetailsOriginal = () => {
//   const [type, setType] = useState("add");
//   const [selectedBaggage, setSelectedBaggage] = useState(null);
//   const [open, setOpen] = useState(false);

//   const { id } = useParams();
//   const { data, loading, error, refetch } = useApi(`/${id}/baggages`);

//   const baggages = data?.baggages || data || [];

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div className="text-red-500">Failed to load baggage</div>;

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold">Your Baggage List</h1>

//         <BaggageDialogOriginal
//           type="add"
//           tripId={id}
//           open={open}
//           setOpen={setOpen}
//           onSuccess={refetch}
//         />
//       </div>

//       <div className="mt-6">
//         {baggages.length === 0 ? (
//           <div>No baggage items found.</div>
//         ) : (
//           baggages.map((item) => (
//             <div
//               key={item._id}
//               className="mb-4 p-4 border rounded-lg bg-white shadow flex justify-between"
//             >
//               <div>
//                 <h2 className="text-xl font-semibold">{item.name}</h2>
//                 <p>Status: {item.completed ? "Completed" : "Pending"}</p>
//               </div>

//               <button
//                 onClick={() => {
//                   setType("edit");
//                   setSelectedBaggage(item);
//                   setOpen(true);
//                 }}
//                 className="px-3 py-1 bg-yellow-500 text-white rounded"
//               >
//                 Edit
//               </button>

//               {open && type === "edit" && (
//                 <BaggageDialogOriginal
//                   type="edit"
//                   baggage={selectedBaggage}
//                   tripId={id}
//                   open={open}
//                   setOpen={setOpen}
//                   onSuccess={refetch}
//                 />
//               )}
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default BaggageDetailsOriginal;
