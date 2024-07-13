import React, { Suspense } from "react";
import CategoryNomineeCard from "./components/category_nominee";
import { Metadata } from "next";
import { dbServer } from "@/lib/supabase";
import { cookies } from "next/headers";
import Loader from "@/app/(landing)/components/loader";
import BackButton from "@/components/back";
import Image from "next/image";
import { Event } from "@/app/(system)/events/[id]/nominations/components/nomination_form";

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
  const db = dbServer(cookies);

  const { data, error: caterror } = await db
    .from("categories")
    .select("category_name")
    .eq("id", id)
    .single();

  if (caterror) {
    return (
      <p className=" text-center my-5">
        There was an error fetching the category data
      </p>
    );
  }

  const { data: nomineeData, error } = await db
    .from("nominees")
    .select("*, categories(category_name)")
    .eq("category_id", id);

  if (error) {
    return (
      <p className="text-center my-5">There was an error fetching the data</p>
    );
  }

  const ids = nomineeData?.find(
    (nominee) => nominee?.category_id === id
  )?.event_id;

  const { data: eventData, error: eventerror } = (await db
    .from("events")
    .select("*")
    .eq("id", ids!)
    .single()) as {
    data: Event;
    error: any;
  };

  return (
    <div>
      <div className="h-96 md:h-[20rem] relative mb-14">
        <Image
          className="h-full w-full object-cover object-center blur-sm"
          src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${eventData?.img_url}`}
          width={2000}
          height={2000}
          alt={eventData?.name!}
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center flex-col justify-center">
          <Image
            className="h-[10rem] w-[10rem] object-cover object-center rounded-full border-white border-2"
            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${eventData?.img_url}`}
            width={2000}
            height={2000}
            alt={eventData?.name!}
            priority
          />
          <p className="text-white text-2xl md:text-4xl font-bold text-center my-4">
            {eventData?.name}
          </p>
          <p className=" text-slate-200 text-xl">
            Nominees for {data.category_name}
          </p>
        </div>
      </div>
      <Suspense fallback={<Loader />}>
        <CategoryNomineeCard nominees={nomineeData} event={eventData} />
      </Suspense>
    </div>
  );
}
