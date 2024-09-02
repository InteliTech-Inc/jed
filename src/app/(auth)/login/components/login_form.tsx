"use client";

import { db } from "@/lib/supabase";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { authShape } from "@/lib/validations";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Rotating_Lines from "@/components/spinner";
import Checkbox_Show_Password from "@/components/checkbox_show_password";
import Logo from "@/components/logo";
import { checkConnection } from "@/lib/utils";

export default function LoginForm() {
  const router = useRouter();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<z.infer<typeof authShape>>({
    resolver: zodResolver(authShape),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const inputValues = form.watch();

  async function handleLogin(values: z.infer<typeof authShape>) {
    checkConnection();
    const { email, password } = values;
    try {
      setIsPending(true);
      const {
        data: { user },
        error,
      } = await db.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        setIsPending(false);
        return;
      }

      if (user) {
        router.push("/dashboard");
        toast.success("Welcome to JED! 🎉");
        form.reset();
      }
      setIsPending(false);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    } finally {
      setIsPending(false);
    }
  }

  return (
    <main className="flex items-center justify-center h-screen ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)}>
          <Card className="mx-auto font-sans max-w-sm md:min-w-[30rem] md:h-[30rem] flex flex-col items-center justify-center pt-4">
            <Logo />
            <CardHeader className="w-full">
              <CardTitle className="text-2xl font-sans">Login</CardTitle>
              <CardDescription>
                Provide your credentials below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 w-full">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="email">Email</Label>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        className="border border-accent focus-visible:ring-1 focus-visible:ring-secondary focus-visible:ring-opacity-50 focus-visible:border-transparent"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage {...field} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center mb-4">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        href="/forgot-password"
                        className="text-sm font-medium underline visited:text-primary"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="border border-accent focus-visible:ring-1 focus-visible:ring-secondary focus-visible:ring-opacity-50 focus-visible:border-transparent"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage {...field} />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-secondary hover:bg-secondary hover:bg-opacity-80 focus:outline-none transition-colors duration-200 gap-2 ease-in-out disabled:bg-secondary"
                disabled={
                  (inputValues.email.length === 0 &&
                    inputValues.password.length === 0) ||
                  isPending
                }
              >
                {isPending && <Rotating_Lines color="#fff" />}
                Login
              </Button>
              <div className="text-center">
                <Link href="/signup" className="text-sm font-medium">
                  Don't have an account?{" "}
                  <span className="underline visited:text-primary">
                    {" "}
                    Sign Up
                  </span>
                </Link>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </main>
  );
}
