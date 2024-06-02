"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { db } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Rotating_Lines from "@/components/rotating_lines";
import { payoutShape } from "@/lib/validations";
import { toast } from "sonner";

type Props = {};

export default function WithdrawalForm({}: Props) {
  const router = useRouter();

  const { id: eventId } = useParams();

  const [isPending, setIsPending] = useState<boolean>(false);

  const form = useForm<z.infer<typeof payoutShape>>({
    resolver: zodResolver(payoutShape),
    defaultValues: {
      channel: "",
      amount: "",
      phone_number: "",
      network_provider: "",
      account_number: "",
      bank_name: "",
    },
  });

  async function handlePayout(data: z.infer<typeof payoutShape>) {
    const {
      channel,
      amount,
      phone_number,
      network_provider,
      account_number,
      bank_name,
    } = data;

    const payloads = {
      event_id: eventId as string,
      channel,
      amount,
      phone_number: phone_number?.length !== 0 ? phone_number : null,
      network_provider:
        network_provider?.length !== 0 ? network_provider : null,
      account_number: account_number?.length !== 0 ? account_number : null,
      bank_name: bank_name?.length !== 0 ? bank_name : null,
    };

    try {
      setIsPending(true);
      const { error } = await db.from("withdrawals").insert(payloads).select();

      if (error) {
        console.log(error.message);
        setIsPending(false);
        return;
      }

      setIsPending(false);
      router.refresh();
      form.reset();
      toast.success("Payouts submitted successfully!");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  const paymentChannel = form.watch("channel");

  useEffect(() => {
    const currentValues = form.getValues();

    if (paymentChannel === "mobile_money") {
      form.reset({
        ...currentValues, //Keeps the current values of all other fields
        channel: paymentChannel,
        bank_name: "",
        account_number: "",
      });
    } else if (paymentChannel === "bank_transfer") {
      form.reset({
        ...currentValues,
        channel: paymentChannel,
        phone_number: "",
        network_provider: "",
      });
    }
  }, [paymentChannel]);

  return (
    <div className="my-8 w-full lg:w-4/5 mx-auto px-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handlePayout)}>
          <div className=" flex flex-col-reverse md:flex-row gap-8">
            <section className=" w-full space-y-6">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel> Amount (e.g 500)</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter the Amount for payout"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="channel"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel> Select your payment Channel</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={"Select your payment Channel"}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={"mobile_money"}>
                          Mobile Money Transfer
                        </SelectItem>
                        <SelectItem value={"bank_transfer"}>
                          Bank Transfer Transfer
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {/* <FormMessage {...field} /> */}
                  </FormItem>
                )}
              />
              {paymentChannel === "mobile_money" ? (
                <div className=" flex flex-col md:flex-row gap-2">
                  <FormField
                    control={form.control}
                    name="phone_number"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel> Mobile Money Number</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter your mobile money number"
                            {...field}
                          />
                        </FormControl>
                        {/* <FormMessage {...field} /> */}
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="network_provider"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel> Network</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={"Select your network provider"}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value={"MTN"}>MTN</SelectItem>
                            <SelectItem value={"AirtelTigo"}>
                              AirtelTigo
                            </SelectItem>
                            <SelectItem value={"TelecelCash"}>
                              Telecel Cash
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        {/* <FormMessage {...field} /> */}
                      </FormItem>
                    )}
                  />
                </div>
              ) : paymentChannel === "bank_transfer" ? (
                <div className=" flex flex-col md:flex-row gap-2">
                  <FormField
                    control={form.control}
                    name="bank_name"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel> Bank Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter your bank name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage {...field} />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="account_number"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel> Account Number</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter your account number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage {...field} />
                      </FormItem>
                    )}
                  />
                </div>
              ) : null}

              <Button
                type="submit"
                className="tracking-wide uppercase w-full my-4"
                disabled={isPending}
              >
                {isPending ? <Rotating_Lines /> : "Request Payout"}
              </Button>
            </section>
          </div>
        </form>
      </Form>
    </div>
  );
}
