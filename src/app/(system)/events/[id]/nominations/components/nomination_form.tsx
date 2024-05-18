"use client";
import { db } from "@/lib/supabase";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Rotating_Lines from "@/components/rotating_lines";
import { nominationShape } from "@/lib/validations";
import { useCreateMutation } from "@/hooks/use_create_mutation";
import { checkConnection } from "@/lib/utils";

type Event = {
  id: string;
  name: string;
  img_url: string;
  categories: Category[];
  created_at: string;
  updated_at: string;
  description: string;
  user_id: string;
  is_completed: boolean;
};

type Category = {
  id: string;
  category_name: string | null;
  event_id: string | null;
};

export default function NominationForm() {
  const [event, setEvent] = useState<Event>({} as Event);
  const [isPending, setIsPending] = useState<boolean>(false);

  const url = usePathname();
  const segments = url.split("/");
  const eventId = segments[segments.length - 2];

  const router = useRouter();

  useEffect(() => {
    db.from("events")
      .select("*, categories(category_name, id, event_id)")
      .eq("id", eventId)
      .single()
      .then(({ data, error }) => {
        if (error) {
          toast.error("Error fetching data...");
        } else {
          setEvent(data as Event);
        }
      });
  }, [eventId]);

  const form = useForm<z.infer<typeof nominationShape>>({
    resolver: zodResolver(nominationShape),
    defaultValues: {
      full_name: "",
      email: "",
      telephone: "",
      reasons: "",
      category: "",
    },
  });

  const inputValues = form.watch();

  const { mutateAsync: CreateNomination } = useCreateMutation({
    dbName: "nominations",
    key: "nominations",
    showSucessMsg: false,
  });

  async function handleNomination(values: z.infer<typeof nominationShape>) {
    checkConnection();

    try {
      setIsPending(true);
      const payload = {
        full_name: values.full_name,
        email: values.email,
        phone: values.telephone,
        category_id: values.category,
        reasons: values.reasons,
        event_id: eventId,
      };
      CreateNomination(payload)
        .then((_) => {
          toast.success("Nomination submitted successfully..");
          form.reset();
          router.push(`/events/${eventId}`);
          setIsPending(false);
        })
        .catch((error) => {
          setIsPending(false);
          toast.error(error.message);
        });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    } finally {
      setIsPending(false);
    }
  }

  return (
    <section className="">
      <div className="relative flex flex-col justify-center h-40 overflow-auto mb-6">
        <div className="absolute inset-0">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${event?.img_url}`}
            alt="Banner image"
            className=" w-full h-full blur-sm object-cover object-top "
            width={2000}
            height={2000}
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-50 text-center flex flex-col items-center justify-center">
          <h1 className="text-4xl text-white font-bold uppercase tracking-wider">
            {event?.name}
          </h1>
          <p className="text-white text-2xl tracking-wider ">Nomination Form</p>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleNomination)}
          className="mx-auto font-sans md:w-[45rem] pb-4 flex flex-col justify-center items-center"
        >
          <div className="flex flex-col w-full items-center justify-center gap-x-6 my-4 space-y-3">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Label htmlFor="full_name">Nominees's Full Name</Label>
                  <FormControl>
                    <Input
                      id="full_name"
                      type="text"
                      placeholder="Enter nominee's full name"
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
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Label htmlFor="email">Email</Label>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
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
              name="telephone"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Label htmlFor="telephone">Nominee's Phone</Label>
                  <FormControl>
                    <Input
                      id="telephone"
                      type="text"
                      placeholder="Enter nominee's phone number"
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
              name="category"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Label>Category</Label>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {event.categories?.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.category_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reasons"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Label htmlFor="reasons">Reasons</Label>
                  <FormControl>
                    <Textarea
                      id="reasons"
                      placeholder="Enter your reasons for nomination"
                      className="border border-accent focus-visible:ring-1 focus-visible:ring-secondary focus-visible:ring-opacity-50 focus-visible:border-transparent"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage {...field} />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-secondary hover:bg-secondary hover:bg-opacity-80 focus:outline-none transition-colors duration-200 ease-in-out disabled:bg-secondary"
            disabled={
              inputValues.full_name.length === 0 ||
              inputValues.telephone.length === 0 ||
              inputValues.email.length === 0 ||
              inputValues.reasons.length === 0 ||
              inputValues.category.length === 0 ||
              isPending
            }
          >
            {isPending && <Rotating_Lines />}
            Submit Nomination
          </Button>
        </form>
      </Form>
    </section>
  );
}
