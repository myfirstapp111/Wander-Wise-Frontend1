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

import { loginUser } from "@/api/auth";
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
const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function Login() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
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
      toast.info("Logging in...");
      const data = await loginUser(values);

      if (data.token) {
        toast.success("Login successful!");
        login(data.user, data.token);
        navigate("/dashboard");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (err) {
      toast.error("Login failed. Please check your credentials.");
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
                <CardTitle
                  className="
                    text-2xl sm:text-3xl
                    font-bold
                    text-purple-600
                  "
                >
                  Sign In
                </CardTitle>
              </div>
              <CardDescription className="text-sm sm:text-base">
                Sign in to your account
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
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
                      Password must be at least 8 characters.
                    </FormDescription>
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
                Don’t have an account?{" "}
                <a
                  href="/register1"
                  className="text-blue-500 hover:underline"
                >
                  Register
                </a>
              </p>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </section>
  );
}
