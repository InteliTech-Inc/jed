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
import Logo from "@/components/logo";
import { checkConnection } from "@/lib/utils";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [isPending, setIsPending] = useState<boolean>(false);

  const forgotPasswordShape = authShape.pick({ email: true });

  const form = useForm<z.infer<typeof forgotPasswordShape>>({
    resolver: zodResolver(forgotPasswordShape),
    defaultValues: {
      email: "",
    },
  });

  const inputValues = form.watch();

  async function handleForgotPassword(
    values: z.infer<typeof forgotPasswordShape>
  ) {
    checkConnection();

    const { email } = values;

    try {
      setIsPending(true);
      // Let's check if the email exists in the database
      const user = db.auth.getUser();
      if (!user) {
        toast.error("User does not exist");
        setIsPending(false);
        return;
      }

      const { error, data } = await db.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_LIVE_URL}/reset-password`,
      });

      if (error) {
        toast.error(error.message);
        setIsPending(false);
        return;
      }

      if (data) {
        toast.success("Password reset link sent to your email");
        router.push("/login");
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
    <main className="flex items-center justify-center h-screen">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleForgotPassword)}>
          <Card className="mx-auto font-sans max-w-sm md:min-w-[30rem] md:h-[30rem] flex flex-col justify-center items-center pt-4">
            <Logo />
            <CardHeader className="w-full">
              <CardTitle className="text-2xl font-sans">
                Forgot Password?
              </CardTitle>
              <CardDescription>
                Provide your email below to login to reset your password
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
                        className="w-full border border-accent focus-visible:ring-1 focus-visible:ring-secondary focus-visible:ring-opacity-50 focus-visible:border-transparent"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage {...field} />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-secondary hover:bg-secondary hover:bg-opacity-80 focus:outline-none transition-colors duration-200 ease-in-out disabled:bg-secondary  gap-2 "
                disabled={inputValues.email.length === 0 || isPending}
              >
                {isPending && <Rotating_Lines color="#fff" />}
                Send Reset Link
              </Button>
              <div className="text-center">
                <Link href="/login" className="text-sm font-medium">
                  Remember your password?{" "}
                  <span className="underline visited:text-primary">
                    {" "}
                    Log in
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
