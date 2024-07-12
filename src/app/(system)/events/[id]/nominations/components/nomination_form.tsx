"use client";
import { db } from "@/lib/supabase";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import Rotating_Lines from "@/components/spinner";
import { nominationShape } from "@/lib/validations";
import { useCreateMutation } from "@/hooks/use_create_mutation";
import { checkConnection } from "@/lib/utils";
import Spinner from "@/components/spinner";
import { isToday } from "date-fns";
import { hasValidNominationPeriod } from "@/lib/utils";

export type Event = {
  id: string;
  name: string;
  img_url: string;
  categories: Category[];
  created_at: string;
  updated_at: string;
  description: string;
  user_id: string;
  is_completed: boolean;
  voting_period?: {
    start_date?: string;
    end_date?: string;
  };
  nomination_period?: {
    start_date?: string;
    end_date?: string;
  };
};

type Category = {
  id: string;
  category_name: string | null;
  event_id: string | null;
};

export default function NominationForm({ id }: { id: string }) {
  const [event, setEvent] = useState<Event>({} as Event);
  const { mutateAsync: CreateNomination, isPending } = useCreateMutation({
    dbName: "nominations",
    key: "nominations",
    showSucessMsg: false,
  });

  const router = useRouter();

  useEffect(() => {
    db.from("events")
      .select("*, categories(category_name, id, event_id)")
      .eq("id", id)
      .single()
      .then(({ data, error }) => {
        if (error) {
          toast.error("Error fetching data...");
        } else {
          const eventData = data as unknown as Event;
          setEvent(eventData);
        }
      });
  }, [id]);

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

  async function handleNomination(values: z.infer<typeof nominationShape>) {
    checkConnection();

    try {
      const payload = {
        full_name: values.full_name,
        email: values.email,
        phone: values.telephone,
        category_id: values.category,
        reasons: values.reasons,
        event_id: id,
      };
      CreateNomination(payload)
        .then((_) => {
          toast.success("Nomination submitted successfully..");
          form.reset();
          router.refresh();
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  if (!hasValidNominationPeriod(event.nomination_period)) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-2xl text-gray-600">
          There is no nomination for this event.
        </p>
      </div>
    );
  }

  if (isToday(event.nomination_period?.end_date || "")) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-2xl text-gray-600">Nomination period has ended.</p>
      </div>
    );
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
          <p className=" text-xl lg:text-4xl text-white font-bold capitalize tracking-wider">
            {event?.name}
          </p>
          <p className="text-white lg:text-2xl tracking-wider ">
            Nomination Form
          </p>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleNomination)}
          className="mx-auto font-sans md:w-[45rem] pb-4 flex flex-col justify-center items-center px-4 md:px-10"
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
                      placeholder="Enter nominee's email address"
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
                  <Label htmlFor="reasons">Reasons (Optional)</Label>
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
              inputValues.category.length === 0 ||
              isPending
            }
          >
            {isPending && <Spinner />}
            Submit Nomination
          </Button>
        </form>
      </Form>
    </section>
  );
}
