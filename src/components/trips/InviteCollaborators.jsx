import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import api from "@/api/axios";



// ShadCN imports
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

// Lucide icons
import { Mail, Users, Loader2 } from "lucide-react";

// Zod schema for validation
const inviteSchema = z.object({
  collaboratorEmails: z
    .string()
    .min(1, "Please enter at least one email")
    .regex(
      /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,},?\s?)+$/,
      "Enter valid comma-separated email addresses"
    ),
});

const InviteCollaborators = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false); // ✅ loading state

  const form = useForm({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      collaboratorEmails: "",
    },
  });

 

  const onSubmit = async (values) => {
    try {
      setLoading(true); // start loading
      await api.post(`/trips/${id}/invite`, {
        collaboratorEmails: values.collaboratorEmails.split(",").map((e) => e.trim()),
      });
      toast.success("Collaborators invited successfully 🎉");
      form.reset();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to invite collaborators");
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <Card className="bg-blue-200 shadow-lg rounded-2xl border border-gray-200 max-w-md mx-auto">
      <CardHeader className="flex items-center gap-3 pb-2 border-b border-gray-100">
        <Users className="text-blue-600" size={24} />
        <CardTitle className="text-lg font-bold">Invite Collaborators</CardTitle>
      </CardHeader>
      <CardDescription className="px-6 pt-2 text-gray-600">
        Add collaborators to this trip by entering their emails.
      </CardDescription>

      <CardContent className="px-6 pt-4 pb-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="collaboratorEmails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    <Mail size={16} className="text-gray-500" /> Emails
                  </FormLabel>
                  <FormDescription className="text-gray-400 text-sm">
                    Enter comma-separated emails of people you want to invite.
                  </FormDescription>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="alice@example.com, bob@example.com"
                      className="pl-10"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={loading} // ✅ disable during API call
              className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4" /> Sending...
                </>
              ) : (
                <>
                  <Users size={16} /> Send Invitations
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default InviteCollaborators;
