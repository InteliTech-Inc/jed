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
import { resetPasswordShape } from "@/lib/validations";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Rotating_Lines from "@/components/rotating_lines";
import { useState } from "react";
import Checkbox_Show_Password from "@/components/checkbox_show_password";
import Logo from "@/components/logo";
import { checkConnection } from "@/lib/utils";

export default function ResetPasswordForm() {
  const router = useRouter();

  const [isPending, setIsPending] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<z.infer<typeof resetPasswordShape>>({
    resolver: zodResolver(resetPasswordShape),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  const inputValues = form.watch();

  async function ResetPassword(formData: z.infer<typeof resetPasswordShape>) {
    checkConnection();
    const { password } = formData;

    try {
      setIsPending(true);
      const { error, data } = await db.auth.updateUser({
        password,
      });

      if (error) {
        toast.error(error.message);
        setIsPending(false);
        return;
      }

      if (data) {
        toast.success("Password reset successful");
        router.push("/login");
      }
      setIsPending(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsPending(false);
    }
  }
  return (
    <main className="flex items-center justify-center h-screen">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(ResetPassword)}>
          <Card className="mx-auto font-sans max-w-sm md:min-w-[30rem] md:h-[30rem] flex flex-col items-center justify-center pt-4">
            <Logo />
            <CardHeader className="w-full">
              <CardTitle className="text-2xl font-sans">
                Reset Password
              </CardTitle>
              <CardDescription>
                Use the form provided below to reset your password
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 w-full">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="password">Enter New Password </Label>
                    <FormControl>
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your new password"
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
                    <Label htmlFor="confirm_password">
                      Confirm New Password
                    </Label>
                    <FormControl>
                      <Input
                        id="confirm_password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm your new password"
                        className="border border-accent focus-visible:ring-1 focus-visible:ring-secondary focus-visible:ring-opacity-50 focus-visible:border-transparent"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage {...field} />
                  </FormItem>
                )}
              />
              <Checkbox_Show_Password
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
              <Button
                type="submit"
                className="w-full bg-secondary gap-2 hover:bg-secondary hover:bg-opacity-80 focus:outline-none transition-colors duration-200 ease-in-out disabled:bg-secondary"
                disabled={
                  (inputValues.password.length === 0 &&
                    inputValues.confirm_password.length < 1) ||
                  isPending
                }
              >
                {isPending && <Rotating_Lines color="#fff" />}
                Reset Password
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
