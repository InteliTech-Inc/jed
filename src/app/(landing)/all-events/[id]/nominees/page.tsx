import React, { Suspense } from "react";
import CategoryNomineeCard from "./components/category_nominee";
import { Metadata } from "next";
import Loader from "@/app/(landing)/components/loader";
import Image from "next/image";
import { fetchCategory } from "@/actions/categories";
import { fetchEvent } from "@/actions/events";
import { fetchNomineesByCategory } from "@/actions/nominees";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import Header from "./components/header";

type Props = {
  params: {
    id: string;
  };
};

export const metadata: Metadata = {
  title: "Nominees",
  description: "Nominees for the category",
};
export const revalidate = 30;

export default async function CategoryNominees({ params: { id } }: Props) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const category = await fetchCategory(id);
      return category;
    },
  });

  return (
    <div>
      <Suspense fallback={<Loader />}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Header id={id} />
          <CategoryNomineeCard />
        </HydrationBoundary>
      </Suspense>
    </div>
  );
}
