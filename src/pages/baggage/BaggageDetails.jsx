import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useApi from "@/hooks/useApi";
import api from "@/api/axios";
import BaggageDialog from "@/components/baggage/BaggageDialog";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  Circle,
  Luggage,
} from "lucide-react";
import Loading from "@/components/common/Loading";

const BaggageDetails = () => {
  const [type, setType] = useState("add");
  const [selectedBaggage, setSelectedBaggage] = useState(null);
  const [open, setOpen] = useState(false);
  const [baggages, setBaggages] = useState([]);

  const { id } = useParams();
  const { data, loading, error } = useApi(`/${id}/baggages`);

  useEffect(() => {
    if (data) {
      setBaggages(data?.baggages || data || []);
    }
  }, [data]);

  const toggleCompleted = async (item) => {
    try {
      const res = await api.put(`/${id}/baggages/${item._id}`, {
        name: item.name,
        completed: !item.completed,
      });

      setBaggages((prev) =>
        prev.map((b) => (b._id === item._id ? res.data : b))
      );

      toast.success(
        res.data.completed ? "Marked as completed" : "Marked as not completed"
      );
    } catch {
      toast.error("Failed to update baggage status");
    }
  };

  const deleteBaggage = async (itemId) => {
    const ok = confirm("Delete this baggage item?");
    if (!ok) return toast.info("Delete cancelled");

    try {
      await api.delete(`/${id}/baggages/${itemId}`);
      setBaggages((prev) => prev.filter((b) => b._id !== itemId));
      toast.success("Baggage deleted");
    } catch {
      toast.error("Failed to delete baggage");
    }
  };

  if (loading) return <Loading text="Loading baggage..." />;

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center px-4 text-red-500 text-sm sm:text-base">
        Failed to load baggage
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-indigo-300 px-4 sm:px-8 lg:px-20 py-6 sm:py-10"
    >
      {/* ===== Header ===== */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Luggage className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
            Baggage List
          </h1>
        </div>

        <button
          onClick={() => {
            setType("add");
            setSelectedBaggage(null);
            setOpen(true);
          }}
          className="flex items-center justify-center gap-2 
          px-4 sm:px-5 py-2 sm:py-3 
          text-sm sm:text-base 
          bg-blue-600 hover:bg-blue-700 
          text-white rounded-lg shadow transition"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          Add Baggage
        </button>
      </div>

      {/* ===== List ===== */}
      <div className="space-y-3 sm:space-y-4">
        {baggages.length === 0 ? (
          <div className="text-gray-500 text-center py-10 text-sm sm:text-base">
            No baggage items yet.
          </div>
        ) : (
          <AnimatePresence>
            {baggages.map((item) => (
              <motion.div
                key={item._id}
                layout
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="p-4 sm:p-5 border rounded-xl bg-white shadow-sm hover:shadow-md transition 
                flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                {/* Left */}
                <div
                  className="flex items-center gap-3 sm:gap-4 cursor-pointer"
                  onClick={() => toggleCompleted(item)}
                >
                  {item.completed ? (
                    <CheckCircle2 className="text-green-600 w-5 h-5 sm:w-6 sm:h-6" />
                  ) : (
                    <Circle className="text-gray-400 w-5 h-5 sm:w-6 sm:h-6" />
                  )}

                  <span
                    className={`text-base sm:text-lg md:text-xl font-semibold ${
                      item.completed
                        ? "line-through text-gray-400"
                        : "text-gray-800"
                    }`}
                  >
                    {item.name}
                  </span>
                </div>

                {/* Right */}
                <div className="flex gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => {
                      setType("edit");
                      setSelectedBaggage(item);
                      setOpen(true);
                    }}
                    className="p-2 sm:p-3 rounded-lg bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition"
                    title="Edit"
                  >
                    <Edit3 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>

                  <button
                    onClick={() => deleteBaggage(item._id)}
                    className="p-2 sm:p-3 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* ===== Dialog ===== */}
      <BaggageDialog
        open={open}
        setOpen={setOpen}
        type={type}
        baggage={selectedBaggage}
        tripId={id}
        onSuccess={(savedItem) => {
          if (!savedItem) return;

          if (type === "add") {
            setBaggages((prev) => [savedItem, ...prev]);
            toast.success("Baggage added");
          } else {
            setBaggages((prev) =>
              prev.map((b) => (b._id === savedItem._id ? savedItem : b))
            );
            toast.success("Baggage updated");
          }
        }}
      />
    </motion.div>
  );
};

export default BaggageDetails;
