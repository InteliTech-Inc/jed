"use client";
import { PaystackButton } from "react-paystack";
import { PaystackProps } from "react-paystack/dist/types";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { db } from "@/lib/supabase";
import { useParams, usePathname, useRouter } from "next/navigation";

type referenceObj = {
  message: string;
  reference: string;
  status: "success" | "failure";
  trans: string;
  transaction: string;
  trxref: string;
};

type FORM_DATA = {
  full_name: string;
  email?: string;
  votes: string;
};

const formSchema = z.object({
  full_name: z
    .string()
    .min(3, { message: "Full name must be at least 3 characters" }),
  email: z.string().optional(),
  votes: z.string().min(1, { message: "Number of votes must be at least 1" }),
});

export default function PaystackPayment(): JSX.Element {
  const url = usePathname();
  const segment = url.split("/");
  const id = segment[segment.length - 3];

  const router = useRouter();
  const [ref, setRef] = useState("");
  const [_, setFormData] = useState<FORM_DATA>();

  const [success, setSuccess] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      email: "",
      votes: "1",
    },
  });

  useEffect(() => {
    setSuccess(false);
    setRef("" + Math.floor(Math.random() * 1000000000 + 1));
  }, [success]);

  const config: PaystackProps = {
    reference: ref,
    email: form.watch("email") || "info.jedvotes@gmail.com",
    firstname: form.watch("full_name"),
    amount: Number(form.watch("votes")) * 100,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string,
    currency: "GHS",
  };

  const onSuccess = (response: referenceObj) => {
    if (response.status === "success" && response.message === "Approved") {
      // Check if the nominee has been voted for
      const toDatabase = async () => {
        const { votes: voting } = form.getValues();
        const { data: votes, error } = await db
          .from("voting")
          .select("*")
          .eq("nominee_id", id);

        console.log("From Votes", votes);

        if (error) {
          console.error("Error fetching votes:", error);
          return;
        }

        if (votes && votes.length > 0) {
          // If the nominee has been voted for, increment the vote count
          const { error: updateError } = await db
            .from("voting")
            .update({ count: votes[0].count! + Number(voting) })
            .eq("nominee_id", id);

          if (updateError) {
            console.error("Error updating vote count:", updateError);
          }
        } else {
          const { error: insertError } = await db
            .from("voting")
            .insert({ nominee_id: id, count: Number(voting) });

          if (insertError) {
            console.error("Error inserting new vote:", insertError);
          }
        }
      };
      toDatabase();
      router.back();
      form.reset();
    }
  };

  const handleVoting = async (data: z.infer<typeof formSchema>) => {
    setFormData(data);
  };

  const onClose = () => {
    alert("Payment cancelled.");
  };

  const componentProps = {
    ...config,
    text: `Vote Now`,
    onSuccess,
    onClose,
  };

  const inputValues = form.watch();
  return (
    <Form {...form}>
      <form
        className="mt-4 space-y-3"
        onSubmit={form.handleSubmit(handleVoting)}
      >
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="full_name">Your Full Name</FormLabel>
              <FormControl>
                <Input
                  id="full_name"
                  type="text"
                  placeholder="Enter your full name"
                  className="border border-accent focus-visible:ring-1 focus-visible:ring-secondary focus-visible:ring-opacity-50 focus-visible:border-transparent"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Your Email</FormLabel>
              <FormControl>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="border border-accent focus-visible:ring-1 focus-visible:ring-secondary focus-visible:ring-opacity-50 focus-visible:border-transparent"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="votes"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="votes">
                Number of Votes{" "}
                <span className="font-bold">(GHS 1.00 per Vote)</span>
              </FormLabel>
              <FormControl>
                <Input
                  id="votes"
                  type="number"
                  min="1"
                  placeholder="Enter number of votes"
                  className="border border-accent focus-visible:ring-1 focus-visible:ring-secondary focus-visible:ring-opacity-50 focus-visible:border-transparent"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {inputValues.full_name === "" ||
        inputValues.votes === "0" ||
        inputValues.votes === "" ? (
          <Button
            disabled
            className="bg-secondary text-white py-2 px-4 rounded-md w-full disabled:cursor-not-allowed"
          >
            Vote Now
          </Button>
        ) : (
          <PaystackButton
            {...componentProps}
            className="bg-secondary text-white py-2 px-4 rounded-md w-full disabled:cursor-not-allowed"
          />
        )}
      </form>
    </Form>
  );
}
