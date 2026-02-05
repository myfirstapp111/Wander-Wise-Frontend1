import React, { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import api from "@/api/axios";


import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { CheckCircle, XCircle, Loader2, Users } from "lucide-react";

const AcceptInvitation = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const calledRef = useRef(false); // 🔒 prevents double call

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {

    if (calledRef.current) return; // 🔥 BLOCK SECOND CALL
    calledRef.current = true;

    const acceptInvite = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Invalid invitation link.");
        return;
      }

      try {
        const res = await api.get(`/trips/${id}/invite/accept?token=${token}`);

        setStatus("success");
        setMessage(res.data.message || "Invitation accepted!");
        toast.success("🎉 You joined the trip!");

        setTimeout(() => {
          navigate(`/trip-details/${id}`);
        }, 1500);
      } catch (err) {
        const msg = err.response?.data?.message || "Failed to accept invitation";

        // ✅ If already collaborator, treat as success
        if (err.response?.status === 409) {
          setStatus("success");
          setMessage("You are already a collaborator. Redirecting...");
          setTimeout(() => {
            navigate(`/trip-details/${id}`);
          }, 1500);
          return;
        }

        setStatus("error");
        setMessage(msg);
        toast.error(msg);
      }
    };

    acceptInvite();
  }, [id, token, navigate]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center">
            {status === "loading" && (
              <Loader2 className="animate-spin text-blue-600" size={40} />
            )}
            {status === "success" && (
              <CheckCircle className="text-green-600" size={40} />
            )}
            {status === "error" && (
              <XCircle className="text-red-600" size={40} />
            )}
          </div>

          <CardTitle className="text-2xl font-bold">
            {status === "loading" && "Joining Trip..."}
            {status === "success" && "Success!"}
            {status === "error" && "Invitation Failed"}
          </CardTitle>

          <CardDescription>{message}</CardDescription>
        </CardHeader>

        <CardContent className="text-center space-y-4">
          {status === "success" && (
            <div className="flex items-center justify-center gap-2 text-green-700 font-medium">
              <Users size={18} />
              You are now a collaborator
            </div>
          )}

          {status === "error" && (
            <Button onClick={() => navigate("/")} variant="outline">
              Go Home
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AcceptInvitation;
