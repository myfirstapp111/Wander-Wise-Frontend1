

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { loginUser } from "@/api/auth";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { toast } from "sonner";

import { useEffect } from "react";


//Adding zod schema for validation
const formSchema = z.object({

    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
})

export default function Login() {


    //Adding the logic for react hook form and zod for validation
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {

            email: "",
            password: "",

        },
    })




      const { login, token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate("/dashboard");
        }
    }, [token, navigate]);





    const onSubmit = async (values) => {
        console.log(values)

        try {

            toast.info("Logging in...");
            const data = await loginUser(values);

            console.log(data);

            if (data.token) {
                toast.success("Login successful!");
                login(data.user, data.token);
                navigate("/dashboard");
            } else {
                toast.error("Registration failed. Please try again.");
            }
        } catch (err) {
            console.error(err);
            toast.error("Login failed. Please check your credentials.");
        }
    }

    return (
        <>
            <section className="bg-gray-300 h-dvh border flex items-center justify-center rounded-4xl mx-4">
                {/* <div className="flex justify-center items-center space-x-11 bg-purple-600 mt-3">

                    <img src="/logo.png" alt="WanderWise Logo" className='w-12 h-12 rounded-full' />
                    <h2 className="text-3xl font-bold ml-3.5">Login</h2>

                </div> */}

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-80 mx-auto mt-20">


                        { /* Adding form fields for name, email and password
                        adding card */}


                        <Card className="w-100">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-21">
                                    <img src="/logo.png" alt="WanderWise Logo" className='w-12 h-12 rounded-full' />
                                    <h3 className="text-purple-600 font-bold text-3xl">Sign In</h3>
                                </CardTitle>
                                <CardDescription>Sign in to your account</CardDescription>
                                {/* <CardAction>Card Action</CardAction> */}
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="enter email" {...field} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="enter password" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                The password must be at least 8 characters long.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            </CardContent>
                            <CardFooter className="flex flex-col gap-4">
                                <Button className="w-full" type="submit">Submit</Button>
                                <p className="text-xs text-gray-500">Dont have an account? <a href="/register1" className="text-blue-500">Register</a></p>
                            </CardFooter>
                        </Card>










                    </form>
                </Form>

            </section>
        </>

    )

}