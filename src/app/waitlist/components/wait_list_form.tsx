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
import Spinner from "@/components/spinner";
import { formSchema } from "@/lib/validations";
import Confetti from "react-confetti";
import { toast } from "sonner";
import axios from "axios";
import { AxiosError } from "axios";

export default function WaitListForm(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const [explode, setExpload] = useState(false);

  const inputEmail = form.watch("email", "");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const res = await axios.post("/api/waitlist", { email: values.email });
      toast.success(res.data.message);
      setExpload(true);
      form.reset(); //reset the form only when it has been submitted.
    } catch (err: any) {
      if (err instanceof AxiosError) {
        return toast.error(err.response?.data.message);
      }
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      {explode && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          gravity={0.5}
          recycle={false}
          onConfettiComplete={() => setExpload(false)}
        />
      )}
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
                  className=" w-full md:w-fit py-3 px-4 flex gap-2 rounded-md font-semibold hover:bg-secondary/80 hover:bg-opacity-80 focus:outline-none transition-colors duration-200 ease-in-out"
                  disabled={inputEmail.length < 1 || loading}
                  type="submit"
                >
                  {loading && <Spinner color="#fff" />}
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
