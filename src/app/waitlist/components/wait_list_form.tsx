"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { useCreateMutation } from "@/hooks/use_create_mutation";
import { toast } from "sonner";
import Rotating_Lines from "@/components/rotating_lines";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export default function WaitListForm(): JSX.Element {
  const { mutateAsync: AddEmailToWaitlist, isPending } = useCreateMutation({
    dbName: "waitlist",
    key: "waitlist",
    showSucessMsg: false,
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const inputEmail = form.watch("email", "");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    AddEmailToWaitlist({ email: values.email }).then((_) =>
      toast.success("Your email has been successfully added to the waitlist!.")
    );

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
              <div className="flex flex-col md:flex-row items-center justify-center gap-x-4 gap-y-4">
                <FormControl>
                  <Input
                    className="w-[20rem] py-3 px-4 rounded-md border border-accent focus-visible:ring-1 focus-visible:ring-secondary focus-visible:ring-opacity-50 focus-visible:border-transparent"
                    placeholder="Your Email Address"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <Button
                  className=" w-full lg:w-fit py-3 px-4 flex gap-2 rounded-md bg-secondary text-white font-semibold hover:bg-secondary hover:bg-opacity-80 focus:outline-none transition-colors duration-200 ease-in-out disabled:bg-green-300 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={inputEmail.length < 1 || isPending}
                  type="submit"
                >
                  {isPending && <Rotating_Lines />}
                  Join Waitlist!
                </Button>
              </div>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <div className="hidden md:block absolute -right-24 -top-10 ">
          <Image alt="Arrow" height={70} src={Arrow} width={70} />
        </div>
      </form>
    </Form>
  );
}
