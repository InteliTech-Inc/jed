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

export default function ResetPasswordPage() {
  const router = useRouter();

  // const { searchParams } = new URL(window.location.href);
  // const code = searchParams.get("code");
  // console.log(code);

  const form = useForm<z.infer<typeof resetPasswordShape>>({
    resolver: zodResolver(resetPasswordShape),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  async function ResetPassword(formData: z.infer<typeof resetPasswordShape>) {
    const { password } = formData;

    const { error, data } = await db.auth.updateUser({
      password,
    });

    if (error) {
      return toast.error(error.message);
    }

    if (data) {
      toast.success("Password reset successful");
      router.push("/login");
    }
  }
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(ResetPassword)}>
          <Card className="mx-auto font-sans max-w-sm md:min-w-[30rem] md:h-[30rem] flex flex-col justify-center">
            <CardHeader>
              <CardTitle className="text-4xl font-sans">
                Reset Password
              </CardTitle>
              <CardDescription>
                Use the form below to reset your password
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="password">Enter New Password </Label>
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        autoComplete="off"
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
                        type="password"
                        autoComplete="off"
                        placeholder="Confirm your new password"
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
