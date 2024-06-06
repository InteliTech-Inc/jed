import React, { Suspense } from "react";
import VoteNomineePage from "./components/vote_nominee";
import { Metadata } from "next";
import { dbServer } from "@/lib/supabase";
import { cookies } from "next/headers";
import Loader from "@/app/(landing)/components/loader";

type Props = {
  params: {
    id: string;
  };
};

export const metadata: Metadata = {
  title: "Voting",
  description: "Vote for your favourite nominee",
};

export default async function Voting({ params: { id } }: Props) {
  const db = dbServer(cookies);

  const { data, error } = await db
    .from("nominees")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return (
    <Suspense fallback={<Loader />}>
      <VoteNomineePage votingNominee={data} />;
    </Suspense>
  );
}
