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
import { signupShape } from "@/lib/validations";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Rotating_Lines from "@/components/rotating_lines";
import Checkbox_Show_Password from "@/components/checkbox_show_password";
import Logo from "@/components/logo";

export default function SignupForm() {
  const router = useRouter();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<z.infer<typeof signupShape>>({
    resolver: zodResolver(signupShape),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirm_password: "",
    },
  });

  const inputValues = form.watch();

  async function handleSignup(values: z.infer<typeof signupShape>) {
    const { firstName, lastName, email, phone, password } = values;

    try {
      setIsPending(true);
      const {
        data: { user },
        error,
      } = await db.auth.signUp({
        email,
        password,
        options: {
          data: {
            firstName,
            lastName,
            phone,
          },
        },
      });

      // Let's check if we got a user created
      if (user?.identities && user?.identities.length > 0) {
        if (user?.role === "authenticated") {
          toast.success("Verification email sent! Please verify your email.");
          router.push("/");

          // Reset form inputs after successful signup
          form.reset();
        }
        setIsPending(false);
      } else {
        const { error } = await db.auth.signInWithPassword({
          email,
          password,
        });
        if (error) {
          toast.error("Email is already in use! Reset your password.");
          setIsPending(false);
          return;
        }
        toast.success("Successfully signed in! Redirecting...");
        router.push("/dashboard");
      }
      if (error) {
        toast.error(error.message);
        setIsPending(false);
        return;
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  return (
    <main className="flex items-center justify-center p-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSignup)}>
          <Card className="mx-auto font-sans w-[23rem] md:min-w-[30rem] flex flex-col justify-center items-center pt-4">
            <Logo />
            <CardHeader className="w-full">
              <CardTitle className="text-2xl font-sans">Sign Up</CardTitle>
              <CardDescription>
                Provide your valid details to create an account with us
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 w-full">
              <div className="flex flex-col md:flex-row items-center justify-center gap-x-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <Label htmlFor="firstName">First Name</Label>
                      <FormControl>
                        <Input
                          id="firstName"
                          type="text"
                          autoComplete="off"
                          placeholder="Enter your first name"
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
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <Label htmlFor="lastName">Last Name</Label>
                      <FormControl>
                        <Input
                          id="lastName"
                          type="text"
                          autoComplete="off"
                          placeholder="Enter your last name"
                          className="  border border-accent focus-visible:ring-1 focus-visible:ring-secondary focus-visible:ring-opacity-50 focus-visible:border-transparent"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage {...field} />
                    </FormItem>
                  )}
                />
              </div>
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
                        autoComplete="off"
                        placeholder="Enter a valid email address"
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="phone">Phone</Label>
                    <FormControl>
                      <Input
                        id="phone"
                        type="text"
                        autoComplete="off"
                        placeholder="Enter your phone number (+233)"
                        className="border border-accent focus-visible:ring-1 focus-visible:ring-secondary focus-visible:ring-opacity-50 focus-visible:border-transparent"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage {...field} />
                  </FormItem>
                )}
              />
              <div className="flex flex-col md:flex-row items-center justify-center gap-x-6">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <Label htmlFor="password">Password</Label>
                      <FormControl>
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          autoComplete="off"
                          placeholder="Enter your password"
                          className=" border border-accent focus-visible:ring-1 focus-visible:ring-secondary focus-visible:ring-opacity-50 focus-visible:border-transparent"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage {...field} />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirm_password"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <Label htmlFor="confirm_password">Confirm Password</Label>

                      <FormControl>
                        <Input
                          id="confirm_password"
                          type={showPassword ? "text" : "password"}
                          autoComplete="off"
                          placeholder="Confirm your password"
                          className=" border border-accent focus-visible:ring-1 focus-visible:ring-secondary focus-visible:ring-opacity-50 focus-visible:border-transparent"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage {...field} />
                    </FormItem>
                  )}
                />
              </div>
              <Checkbox_Show_Password
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
              <Button
                type="submit"
                className="w-full bg-secondary hover:bg-secondary hover:bg-opacity-80 focus:outline-none transition-colors duration-200 ease-in-out disabled:bg-green-300 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={
                  (inputValues.password.length &&
                    inputValues.confirm_password.length &&
                    inputValues.email.length &&
                    inputValues.firstName.length < 1) ||
                  isPending
                }
              >
                {isPending && <Rotating_Lines />}
                Sign Up
              </Button>
              <div className="text-center">
                <Link href="/login" className="text-sm font-medium">
                  Already have an account?{" "}
                  <span className="underline visited:text-primary"> Login</span>
                </Link>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </main>
  );
}
