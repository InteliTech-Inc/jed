"use client";
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
import { db } from "@/lib/supabase";
import { hasVotingEnded } from "@/lib/utils";
import { Vote } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Votes = {
  count: number | null;
  nominee_id: string | null;
};

type Nominees =
  | {
      full_name: string | null;
      id: string;
      img_url: string | null;
    }[]
  | null;

export default function VotingResults({ event }: { event: Event }) {
  const { id } = useParams();
  const [votes, setVotes] = useState<Votes[]>();
  const [nominees, setNominees] = useState<Nominees>();

  const router = useRouter();
  useEffect(() => {
    async function fetchVotes() {
      const { data: nominees } = await db
        .from("nominees")
        .select(
          `*, 
    categories:category_id(*)
    `
        )
        .eq("category_id", id);
      setNominees(nominees);

      const { data: votes } = await db.from("voting").select(`*, nominees(*)`);

      const votesCount = votes?.map((vote) => ({
        count: vote.count,
        nominee_id: vote.nominee_id,
      }));
      setVotes(votesCount);
    }

    fetchVotes();
  }, []);

  // Realtime for nominees fetch
  useEffect(() => {
    const nominee_channel = db
      .channel("realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "nominees",
        },
        () => {
          router.refresh();
          console.log("Nominee channel updated");
        }
      )
      .subscribe();

    return () => {
      db.removeChannel(nominee_channel);
    };
  }, [db, router]);

  useEffect(() => {
    const voting_channel = db
      .channel("realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "voting",
        },
        () => {
          router.refresh();
          console.log("Voting channel updated");
        }
      )
      .subscribe();

    return () => {
      db.removeChannel(voting_channel);
    };
  }, [db, router]);

  const votingHasEnded = hasVotingEnded(event.voting_period?.end_date ?? "");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className=" gap-2">
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
          {nominees?.map((nominee) => (
            <div
              className="flex w-full items-center justify-between px-2 bg-accent/10 border py-2 text-neutral-600 rounded-full"
              key={nominee.id}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${nominee?.img_url}`}
                alt={nominee?.full_name!}
                width={30}
                height={30}
                className="rounded-full object-cover object-bottom aspect-square"
              />
              <p className=" text-sm ">{nominee?.full_name}</p>
              <p className="font-medium text-sm mr-2">
                {votes?.find((vote: any) => vote.nominee_id === nominee.id)
                  ?.count || 0}
              </p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
