import React, { Suspense } from "react";
import CategoryNomineeCard from "./components/category_nominee";
import { Metadata } from "next";

import Loader from "@/app/(landing)/components/loader";
import Image from "next/image";
import { fetchCategory } from "@/composables/categories";
import { fetchEvent } from "@/composables/events";
import { fetchNomineesByCategory } from "@/composables/nominees";

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
  const category = await fetchCategory(id);

  const event = await fetchEvent(category.event_id);

  // fetchNominees(category.id);
  const nominees = await fetchNomineesByCategory(category.id);

  console.log("Category-Nominees", nominees);

  if (!category) {
    return (
      <p className=" text-center my-5">
        There was an error fetching the category data
      </p>
    );
  }

  return (
    <div>
      <div className="h-96 md:h-[20rem] relative mb-14">
        <Image
          className="h-full w-full object-cover object-center blur-sm"
          src={event?.img_url}
          width={2000}
          height={2000}
          alt={event?.name}
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center flex-col justify-center">
          <Image
            className="h-[10rem] w-[10rem] object-cover object-center rounded-full border-white border-2"
            src={event?.img_url}
            width={2000}
            height={2000}
            alt={event?.name}
            priority
          />
          <p className="text-white text-2xl md:text-4xl font-bold text-center my-4">
            {event?.name}
          </p>
          <p className=" text-slate-200  px-4">Nominees for {category.name}</p>
        </div>
      </div>
      <Suspense fallback={<Loader />}>
        <CategoryNomineeCard
          // nominees={categoryData.nominees}
          event={event}
        />
      </Suspense>
    </div>
  );
}
