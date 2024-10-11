"use client";
import { fetchAllNominees } from "@/actions/nominees";
import { getVotingRecord } from "@/actions/voting";
import { Event } from "@/app/(system)/events/[id]/nominations/components/nomination_form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { hasVotingEnded } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Vote } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

type Votes = {
  count: number | null;
  nominee_id: string | null;
};

type Nominees = {
  result: Nominee[];
};
export default function VotingResults() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: results, refetch: refetchResults } = useQuery<Votes[]>({
    queryKey: ["voting_results"],
    queryFn: async () => await getVotingRecord(),
    refetchOnMount: "always",
  });

  // Get nominees data
  const { data: nominees, refetch: refetchNominees } = useQuery<Nominees>({
    queryKey: ["nominee"],
    queryFn: async () => await fetchAllNominees(),
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
  });

  // Get Event ending date
  const { data: event } = useQuery<Event>({
    queryKey: ["event"],
    refetchOnMount: "always",
  });

  const votingHasEnded = hasVotingEnded(event?.voting_period?.end_date ?? "");

  // Sort results by count in descending order
  const sortedResults = results?.sort((a, b) => b.count! - a.count!);

  const handleDialogOpenChange = (isOpen: boolean) => {
    setIsDialogOpen(isOpen);
    if (isOpen) {
      refetchResults();
      refetchNominees();
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <span className="mr-1">
            {votingHasEnded
              ? "View final voting results"
              : "View live voting results"}
          </span>
          <Vote size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="px-2 overflow-y-auto max-h-[80%]">
        <DialogHeader className="px-4">
          <DialogTitle className="font-bold">Voting Results</DialogTitle>
          <DialogDescription>
            View the voting results for each nominee in this category
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2 items-center justify-between ">
          {sortedResults?.map((vote, index) => {
            const nominee = nominees?.result?.find(
              (n) => n.id === vote.nominee_id
            );
            return (
              <div
                className="flex w-full items-center justify-between px-2 bg-accent/10 border py-2 text-neutral-600 rounded-full"
                key={vote.nominee_id}
              >
                <Image
                  src={nominee?.img_url || ""}
                  alt={nominee?.full_name!}
                  width={30}
                  height={30}
                  className="rounded-full object-cover object-top aspect-square"
                />
                <p className=" text-sm ">{nominee?.full_name}</p>
                <p className="font-medium text-sm space-x-2 mr-2">
                  <span>
                    {results?.find((vote) => vote.nominee_id === nominee?.id)
                      ?.count || 0}
                  </span>
                  {index === 0 && <span>🏆</span>}
                </p>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
