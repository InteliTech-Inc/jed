import React, { Suspense } from "react";
import CategoryNomineeCard from "./components/category_nominee";
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
  title: "Nominees",
  description: "Nominees for the category",
};

export default async function CategoryNominees({ params: { id } }: Props) {
  const db = dbServer(cookies);

  const { data: nomineeData, error } = await db
    .from("nominees")
    .select("*")
    .eq("category_id", id);

  if (error) {
    console.error(error.message);
  }

  const ids = nomineeData?.find(
    (nominee) => nominee?.category_id === id
  )?.event_id;

  const { data: eventData } = await db
    .from("events")
    .select("*")
    .eq("id", ids!)
    .single();

  return (
    <Suspense fallback={<Loader />}>
      <CategoryNomineeCard nominees={nomineeData} event={eventData} />;
    </Suspense>
  );
}
