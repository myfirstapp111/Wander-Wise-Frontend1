import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";

import { toast } from "sonner";
import api from "@/api/axios";

// ShadCN
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
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";

// Icons
import { Mail, Users, Loader2, Plus, Trash } from "lucide-react";

/* ------------------ ZOD SCHEMA ------------------ */
const inviteSchema = z.object({
    collaboratorEmails: z
        .array(z.string().email("Enter a valid email"))
        .min(1, "Please add at least one email"),
});

const InviteCollaborators1 = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);

    /* ---------- FORM ---------- */
    const form = useForm({
        resolver: zodResolver(inviteSchema),
        defaultValues: {
            collaboratorEmails: [""],
        },
    });

    /* ---------- FIELD ARRAY ---------- */
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "collaboratorEmails",
    });

    /* ---------- SUBMIT ---------- */
    const onSubmit = async (values) => {
        try {
            setLoading(true);

            await api.post(`/trips/${id}/invite`, {
                collaboratorEmails: values.collaboratorEmails,
            });

            toast.success("Collaborators invited successfully 🎉");
            form.reset({ collaboratorEmails: [""] });
        } catch (err) {
            toast.error(
                err.response?.data?.message || "Failed to invite collaborators"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="bg-blue-200 shadow-lg rounded-2xl border w-full max-w-md mx-auto px-2 sm:px-4">
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-2 pb-2">
                <Users className="text-blue-600" size={24} />
                <CardTitle className="text-base sm:text-lg md:text-xl font-bold">
                    Invite Collaborators
                </CardTitle>
            </CardHeader>

            <CardDescription className="px-0 sm:px-0 text-gray-600 text-xs sm:text-sm md:text-base">
                Add collaborators to this trip.
            </CardDescription>

            <CardContent className="px-0 sm:px-0 pt-4 pb-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
                        {/* EMAIL FIELDS */}
                        {fields.map((item, index) => (
                            <FormField
                                key={item.id}
                                control={form.control}
                                name={`collaboratorEmails.${index}`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-1 text-xs sm:text-sm md:text-base">
                                            <Mail size={16} /> Email {index + 1}
                                        </FormLabel>

                                        <div className="flex flex-col sm:flex-row gap-2">
                                            <FormControl className="flex-1">
                                                <Input
                                                    {...field}
                                                    placeholder="alice@example.com"
                                                    className="text-xs sm:text-sm md:text-base"
                                                />
                                            </FormControl>

                                            {fields.length > 1 && (
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() => remove(index)}
                                                >
                                                    <Trash size={16} />
                                                </Button>
                                            )}
                                        </div>

                                        <FormMessage className="text-xs sm:text-sm md:text-base" />
                                    </FormItem>
                                )}
                            />
                        ))}

                        <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-2">
                            {/* ADD EMAIL */}
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full sm:w-1/2 flex gap-2 justify-center text-xs sm:text-sm md:text-base"
                                onClick={() => append("")}
                            >
                                <Plus size={16} /> Add another email
                            </Button>

                            {/* SUBMIT */}
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full sm:w-1/2 bg-blue-600 hover:bg-blue-700 text-white flex justify-center items-center gap-2 text-xs sm:text-sm md:text-base"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin h-4 w-4" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Users size={16} />
                                        Send Invitations
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default InviteCollaborators1;
