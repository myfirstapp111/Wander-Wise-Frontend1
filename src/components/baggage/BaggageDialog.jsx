import { useEffect, useState } from "react";
import api from "@/api/axios";
import { toast } from "sonner";

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

export default function BaggageDialog({
  open,
  setOpen,
  type = "add", // add | edit
  baggage,
  tripId,
  onSuccess,
}) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ When editing, fill form
  useEffect(() => {
    if (type === "edit" && baggage) {
      setName(baggage.name || "");
    } else {
      setName("");
    }
  }, [type, baggage]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.info("Baggage name is required");
      return;
    }

    try {
      setLoading(true);

      if (type === "add") {
        const res = await api.post(`/${tripId}/baggages`, { name });

        onSuccess?.(res.data);
        toast.success("Baggage added successfully");
      } else {
        const res = await api.put(`/${tripId}/baggages/${baggage._id}`, { name });

        onSuccess?.(res.data);
        toast.success("Baggage updated successfully");
      }

      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error(
        err?.response?.data?.message || "Failed to save baggage"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {type === "add" ? "Add Baggage" : "Edit Baggage"}
            </DialogTitle>
            <DialogDescription>
              {type === "add"
                ? "Add a new baggage item for this trip."
                : "Update baggage name."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Clothes, Documents, Camera"
                required
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" disabled={loading}>
              {loading
                ? "Saving..."
                : type === "add"
                ? "Add Baggage"
                : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
