import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { registerUser } from "@/api/auth";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { toast } from "sonner";
import { useEffect } from "react";

// Zod schema
const formSchema = z
  .object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmpassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords do not match",
    path: ["confirmpassword"],
  });

export default function Register() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
  });

  const { login, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  const onSubmit = async (values) => {
    try {
      toast.info("Registering user...");
      const data = await registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
      });

      if (data.token) {
        toast.success("Registration successful!");
        login(data.user, data.token);
        navigate("/dashboard");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <section
      className="
        min-h-dvh
        bg-gray-300
        flex
        items-center
        justify-center
        px-4
      "
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-sm sm:max-w-md"
        >
          <Card className="w-full shadow-lg">
            <CardHeader className="text-center space-y-2">
              <div className="flex items-center justify-center gap-3">
                <img
                  src="/logo.png"
                  alt="WanderWise Logo"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
                />
                <CardTitle className="text-2xl sm:text-3xl font-bold text-purple-600">
                  Register
                </CardTitle>
              </div>
              <CardDescription className="text-sm sm:text-base">
                Create your new account
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm sm:text-base">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm sm:text-base">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter email"
                        {...field}
                      />
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
                    <FormLabel className="text-sm sm:text-base">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs sm:text-sm">
                      Must be at least 8 characters.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmpassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm sm:text-base">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <Button className="w-full text-sm sm:text-base" type="submit">
                Submit
              </Button>

              <p className="text-xs sm:text-sm text-gray-500 text-center">
                Already have an account?{" "}
                <a
                  href="/login1"
                  className="text-blue-500 hover:underline"
                >
                  Sign In
                </a>
              </p>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </section>
  );
}
