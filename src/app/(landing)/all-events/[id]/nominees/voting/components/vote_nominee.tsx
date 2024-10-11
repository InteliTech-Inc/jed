"use client";
import Image from "next/image";
import PaystackPayment from "@/components/paystack_payment";
import BackButton from "@/components/back";

import { getVotingPeriodMessage } from "@/lib/utils";

import ShareLink from "./share_link";
import { useQuery } from "@tanstack/react-query";
import { fetchEvent } from "@/actions/events";
import { getVotingRecord } from "@/actions/voting";

export default function VoteNomineePage() {
  const { data: votingNominee } = useQuery<Nominee>({
    queryKey: ["votingNominee"],
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
  });

  const { data: votes } = useQuery({
    queryKey: ["votes"],
    queryFn: async () => await getVotingRecord(),
    refetchOnMount: "always",
  });

  const { data: event } = useQuery({
    queryKey: ["event"],
    queryFn: async () => await fetchEvent(votingNominee?.event_id!),
    refetchInterval: 60 * 1000,
  });

  const endingDate = event?.voting_period as {
    start_date: string;
    end_date: string;
  };

  const checks = getVotingPeriodMessage(endingDate);

  if (checks?.includes("Voting has ended")) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-2xl text-gray-600 text-center">Voting has ended.</p>
      </div>
    );
  }

  return (
    <section className="container mx-auto mb-8 p-6">
      <div className=" flex justify-between pb-4 items-center">
        <BackButton />
        <ShareLink />
      </div>

      <div className="flex flex-col md:flex-row items-start justify-center w-full gap-4">
        <div className="border rounded-lg p-3 w-full md:w-[25rem] md:h-[30rem]">
          <div className="h-full w-full mb-4">
            <Image
              className="h-full w-full object-cover object-top rounded-lg"
              src={votingNominee?.img_url || ""}
              width={2000}
              height={2000}
              alt={votingNominee?.full_name || "Event"}
              priority
            />
          </div>
        </div>
        <div className="my-8 w-full md:w-[40rem] px-4">
          <p className=" text-3xl lg:text-4xl font-bold mb-3">
            Vote for {votingNominee?.full_name}
          </p>
          <div className="flex gap-x-4 items-center">
            <p className="text-gray-700">
              Nominee's Code:{" "}
              <span className="font-bold text-lg">{votingNominee?.code}</span>{" "}
            </p>

            {votes &&
            votes.length > 0 &&
            votes[0].nominee_id === votingNominee?.id ? (
              <p className="text-gray-700">
                Current Votes:{" "}
                <span className="font-bold text-lg text-secondary">
                  {votes[0].count}
                </span>{" "}
              </p>
            ) : null}
          </div>
          <p className="text-neutral-600">
            You may directly vote offline using the USSD CODE{" "}
            <span className="text-black text-md font-bold">*928*121#</span> and
            Nominee Code
          </p>
          <PaystackPayment />
        </div>
      </div>
    </section>
  );
}
