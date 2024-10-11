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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Spinner from "./spinner";
import { useQuery } from "@tanstack/react-query";
import { fetchEvent } from "@/actions/events";
import {
  createVotingRecord,
  getVotingRecord,
  updateVotingRecord,
  votesData,
} from "@/actions/voting";
import axios from "axios";

type referenceObj = {
  message: string;
  reference: string;
  status: "success" | "failure";
  trans: string;
  transaction: string;
  trxref: string;
};

interface FORM_DATA {
  full_name: string;
  email?: string;
  votes: string;
}

const formSchema = z.object({
  full_name: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters" }),
  email: z.string().optional(),
  votes: z.string().min(1, { message: "Number of votes must be at least 1" }),
});

export default function PaystackPayment() {
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

  const { data: nomineeData } = useQuery<Nominee>({
    queryKey: ["votingNominee"],
    refetchOnMount: "always",
  });

  const { data: eventData, isLoading } = useQuery({
    queryKey: ["event"],
    queryFn: async () => await fetchEvent(nomineeData?.event_id!),
    refetchOnMount: "always",
  });

  useEffect(() => {
    setSuccess(false);
    setRef("" + Math.floor(Math.random() * 1000000000 + 1));
  }, [success]);

  const FACTOR = 100;
  const amountPayable =
    Number(form.watch("votes")) * Number(eventData?.amount_per_vote);

  const final_amount = Number(amountPayable).toFixed(2);

  const config: PaystackProps = {
    reference: ref,
    email: form.watch("email") || "info.jedvotes@gmail.com",
    firstname: form.watch("full_name"),
    amount: Number(final_amount) * FACTOR,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string,
    currency: "GHS",
  };

  // Hit to database
  const onSuccess = (response: referenceObj) => {
    // Get the votes from the input
    const { votes: voting } = form.getValues();
    const { full_name } = form.getValues();

    async function submitVotes() {
      const votingRecord = await getVotingRecord();
      console.log("READING VOTES RECORD", votingRecord);
      if (
        votingRecord &&
        votingRecord.length > 0 &&
        votingRecord[0].nominee_id === nomineeData?.id
      ) {
        // Nominee already has counts, update their count with the new one
        const updatedVotes = Number(votingRecord[0].count) + Number(voting);
        const updatedAmount =
          Number(votingRecord[0].amount_payable) + Number(final_amount);

        const updatedVotingRecord = {
          id: votingRecord[0].id,
          count: Number(updatedVotes),
          amount_payable: String(updatedAmount),
        };

        const updated = await updateVotingRecord(updatedVotingRecord);
        console.log("UPDATED VOTE RECORD", updated);
      } else {
        const payload = {
          nominee_id: nomineeData?.id,
          count: Number(voting),
          event_id: eventData?.id,
          amount_payable: String(final_amount),
        };
        const posted = await createVotingRecord(payload);
        console.log("CREATED VOTE RECORD", posted);
      }
    }
    console.log("onSuccess", response);
    if (response.status === "success" && response.message === "Approved") {
      submitVotes();
      // Let's store the transaction information
      const body = {
        nominee_id: nomineeData?.id,
        event_id: eventData?.id,
        count: Number(voting),
        amount_payable: String(final_amount),
        trans_id: `${full_name.split(" ").join("_")}_${response.reference}`,
      };
      (async () => {
        try {
          const transaction = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/transactions`,
            body
          );

          if (transaction.data) {
            router.back();
            form.reset();
            toast.success("Voting Successful!");
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }
  };

  const handleVoting = (data: z.infer<typeof formSchema>) => {
    setFormData(data);
  };

  const onClose = () => {
    toast.error("Payment cancelled.");
    router.refresh();
  };

  const componentProps = {
    ...config,
    text: `${
      amountPayable ? `Pay GHS ${amountPayable.toFixed(2)}` : "Vote Now"
    }`,
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
              <FormLabel htmlFor="votes" className="flex gap-1">
                Number of Votes{" "}
                {isLoading ? (
                  <span className="ml-2">
                    <Spinner />
                  </span>
                ) : (
                  <span className="font-bold">
                    (GHS {eventData?.amount_per_vote} per Vote)
                  </span>
                )}
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
        inputValues.full_name.length < 2 ||
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
