import React, { Suspense } from "react";
import VoteNomineePage from "./components/vote_nominee";
import { Metadata } from "next";
import Loader from "@/app/(landing)/components/loader";
import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNominee } from "@/actions/nominees";

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
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["votingNominee"],
    queryFn: async () => await fetchNominee(id),
  });

  return (
    <Suspense fallback={<Loader />}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <VoteNomineePage />
      </HydrationBoundary>
    </Suspense>
  );
}
