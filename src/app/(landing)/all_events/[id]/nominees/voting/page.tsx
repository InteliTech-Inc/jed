import React from "react";
import VoteNomineePage from "./components/vote_nominee";
import { Metadata } from "next";
import { dbServer } from "@/lib/supabase";
import { cookies } from "next/headers";

type Props = {};

export const metadata: Metadata = {
  title: "Voting",
  description: "Vote for your favourite nominee",
};

export default async function Voting({}: Props) {
  const db = dbServer(cookies);
  // Get Votes and its nominees
  const { data: votes } = await db.from("voting").select(`*, nominees(*)`);

  // Get only the count and nominee_id props
  const votesCount = votes?.map((vote) => ({
    count: vote.count,
    nominee_id: vote.nominee_id,
  }));

  console.log("Vote from Voting", votesCount);

  return <VoteNomineePage />;
}
