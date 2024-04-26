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
import Image from "next/image";
import Logo from "@/app/assets/logo.png";

export default function SignupForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof signupShape>>({
    resolver: zodResolver(signupShape),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  async function handleSignup(values: z.infer<typeof signupShape>) {
    const { firstName, lastName, email, password } = values;
    console.log(values);
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
        },
      },
    });

    if (error) {
      toast.error(error.message);
    }

    if (user?.role === "authenticated") {
      toast.success("Verification email sent! Please verify your email.");
      router.push("/");

      // Reset form inputs after successful signup
      form.reset();
    }
  }

  async function handleSignOut() {
    await db.auth.signOut();
    router.push("/login");
  }

  return (
    <main className="flex items-center justify-center h-screen">
      <Button onClick={handleSignOut}>sign out</Button>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSignup)}>
          <Card className="mx-auto font-sans max-w-sm md:min-w-[30rem] flex flex-col justify-center">
            <CardHeader>
              <CardTitle className="text-4xl font-sans">Sign Up</CardTitle>
              <CardDescription>
                Enter your information to create an account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center gap-x-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
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
                    <FormItem>
                      <Label htmlFor="lastName">Last Name</Label>
                      <FormControl>
                        <Input
                          id="lastName"
                          type="text"
                          autoComplete="off"
                          placeholder="Enter your last name"
                          className="border border-accent focus-visible:ring-1 focus-visible:ring-secondary focus-visible:ring-opacity-50 focus-visible:border-transparent"
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="password">Password</Label>

                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        autoComplete="off"
                        placeholder="Enter your password"
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
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="confirm_password">Confirm Password</Label>

                    <FormControl>
                      <Input
                        id="confirm_password"
                        type="password"
                        autoComplete="off"
                        placeholder="Confirm your password"
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
                className="w-full bg-secondary hover:bg-primary"
              >
                Login
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
