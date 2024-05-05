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

export default function NominationForm() {
  const [event, setEvent] = useState<any>();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const url = usePathname();
  const segments = url.split("/");
  const eventId = segments[segments.length - 2];

  const router = useRouter();

  useEffect(() => {
    db.from("events")
      .select(`*, categories(category_name, id, event_id)`)
      .eq("id", eventId)
      .single()
      .then(({ data, error }) => {
        if (error) {
          toast.error("Error fetching data...");
        } else {
          setEvent(data);
          setCategories(data.categories);
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
    },
  });

  const inputValues = form.watch();

  const { mutateAsync: CreateNomination } = useCreateMutation({
    dbName: "nominations",
    key: "nominations",
    showSucessMsg: false,
  });

  async function handleNomination(values: z.infer<typeof nominationShape>) {
    try {
      setIsPending(true);
      const payload = {
        full_name: values.full_name,
        email: values.email,
        phone: values.telephone,
        category_id: selectedCategory,
        reasons: values.reasons,
        event_id: eventId,
      };

      CreateNomination(payload)
        .then((_) => {
          toast.success("Nomination submitted successfully..");
          form.reset();
          router.push(`/events/${eventId}`);
          setSelectedCategory("");
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
    }
  }

  return (
    <section className="">
      <div className="relative flex flex-col justify-center h-40 -mt-2 overflow-auto mb-6">
        <div className="absolute inset-0 rounded-md">
          <Image
            src={`https://cbboxofzpwjfpihaoyhn.supabase.co/storage/v1/object/public/events/${event?.img_url}`}
            alt="Banner image"
            className="rounded-md w-full h-full blur-sm object-cover object-top "
            width={2000}
            height={2000}
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex flex-col items-center justify-center">
          <h1 className="text-4xl text-white font-bold uppercase tracking-wider">
            {event?.name}
          </h1>
          <p className="text-white text-2xl tracking-wider ">Nomination Form</p>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleNomination)}
          className="mx-auto font-sans md:w-[45rem] flex flex-col justify-center items-center"
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
                      autoComplete="off"
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
              name="telephone"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Label htmlFor="telephone">Nominee's Phone</Label>
                  <FormControl>
                    <Input
                      id="telephone"
                      type="text"
                      autoComplete="off"
                      placeholder="Enter nominee's phone number (+233)"
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
                  <Label htmlFor="telephone">Select a Category</Label>
                  <FormControl>
                    <Select
                      onValueChange={setSelectedCategory}
                      value={selectedCategory}
                      required
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category: any) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.category_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage {...field} />
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
