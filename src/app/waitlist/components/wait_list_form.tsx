"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Arrow from "@/app/assets/arrow.png";

//Form Schema
const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export default function WaitListForm(): JSX.Element {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const watch = form.watch("email", "");

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    toast.success("Thank you for joining the JED waitlist!");
    // Clear the form.
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col md:flex-row items-center justify-center gap-x-4 gap-y-4 z-10 relative"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  autoComplete="off"
                  className="w-[20rem] py-3 px-4 rounded-md border-green-300  focus:border-secondary text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 transition-colors duration-200 ease-in-out"
                  placeholder="Your Email Address"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Button
          className="w-full py-3 px-4 rounded-md bg-secondary text-white font-semibold hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-colors duration-200 ease-in-out disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={watch.length < 3}
          type="submit"
        >
          Join Waitlist!
        </Button>
        <div className="hidden md:block absolute -right-24 -top-7 rotate-90  transform scale-x-[-1] ">
          <Image alt="Arrow" height={70} src={Arrow} width={70} />
        </div>
      </form>
    </Form>
  );
}
