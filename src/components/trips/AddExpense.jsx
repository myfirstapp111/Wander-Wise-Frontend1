import React, { useState } from "react";
import { Card, CardTitle, CardDescription, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import api from "@/api/axios";
import { Wallet, Calendar, IndianRupee, LayersPlus, Loader2 } from "lucide-react";

const AddExpense = ({ trip, onAdded }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !amount) {
      toast.error("Expense name and amount are required");
      return;
    }

    try {
      setLoading(true);

      await api.post(`/trips/${trip._id}/expenses`, {
        name,
        amount,
        date,
      });

      toast.success("Expense added successfully 💸");

      // Reset form
      setName("");
      setAmount("");
      setDate("");

      // Tell parent to refresh trip data
      

      // ✅ THIS REFRESHES TripDetailsPage
      onAdded?.();

    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-blue-200 border border-blue-300 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="text-blue-700" />
          Add Expense
        </CardTitle>
        <CardDescription>
          Record a new expense for this trip
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Expense Name */}
        <div>
          <label className="text-sm font-medium flex items-center gap-1 mb-1">
            <Wallet size={16} /> Expense Name
          </label>
          <Input
            placeholder="Hotel, Food, Taxi..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Amount */}
        <div>
          <label className="text-sm font-medium flex items-center gap-1 mb-1">
            <IndianRupee size={16} /> Amount
          </label>
          <Input
            type="number"
            placeholder="1000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        {/* Date */}
        <div>
          <label className="text-sm font-medium flex items-center gap-1 mb-1">
            <Calendar size={16} /> Date (optional)
          </label>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* Button */}
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
           {loading ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4" /> Adding...
                </>
              ) : (
                <>
                  <LayersPlus size={16} /> Add Expense
                </>
              )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AddExpense;
