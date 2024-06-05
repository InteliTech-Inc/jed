"use client";
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
import { Vote } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
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

export default function VotingResults() {
  const { id } = useParams();
  const [votes, setVotes] = useState<Votes[]>();
  const [nominees, setNominees] = useState<Nominees>();
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
      // Get Votes and its nominees
      const { data: votes } = await db.from("voting").select(`*, nominees(*)`);

      const votesCount = votes?.map((vote) => ({
        count: vote.count,
        nominee_id: vote.nominee_id,
      }));
      setVotes(votesCount);
    }

    fetchVotes();
  }, []);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <span className="mr-1">View Voting Results</span>
          <Vote />
        </Button>
      </DialogTrigger>
      <DialogContent className="px-2">
        <DialogHeader className="px-4">
          <DialogTitle>Voting Results</DialogTitle>
          <DialogDescription>
            View the voting results for each nominee in this category
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2 items-center justify-between ">
          {nominees?.map((nominee: any) => (
            <div
              className="flex w-full items-center justify-between px-2 bg-accent/10 border py-2 text-neutral-600 rounded-full"
              key={nominee.id}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${nominee?.img_url}`}
                alt={nominee?.full_name}
                width={50}
                height={50}
                className="rounded-full object-cover object-bottom aspect-square"
              />
              <p className="font-bold text-xl ">{nominee?.full_name}</p>
              <p className="font-medium mr-2">
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
