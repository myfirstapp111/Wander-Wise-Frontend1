import React from 'react'
import api from '@/api/axios'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useEffect } from 'react'
import { useRef } from 'react'

const AcceptInvitation1 = () => {
   
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get("token");

  const acceptInvitation = async () => {
     try {
            const res = await api.get(`/trips/${id}/invite/accept?token=${token}`);
            if(res.data?.success) {
                toast.success("🎉 You joined the trip!");
            }else {
                toast.info(res.data?.message || "Couldn't accept the invitation.");
            }
        } catch (error) {
            toast.info("User already exists or something went wrong.");
        }finally {
           navigate("/trips");
        }
    }

    

  useEffect(  () => {
    console.log("Trip ID:", id);
    console.log("Token:", token);

   



    if(id && token) {
       acceptInvitation();
    }
  }, [id, token]);

  return (
    <div>AcceptInvitation1


    </div>
  )
}

export default AcceptInvitation1