import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import VotingResults from "./voting_results";
import BackButton from "@/components/back";
import { Json } from "@/types/supabase";

type Nominees = {
  category_id: string | null;
  code: string | null;
  created_at: string;
  event_id: string | null;
  full_name: string | null;
  id: string;
  img_url: string | null;
  user_id: string;
} | null;

type Event = {
  created_at: string;
  description: string;
  id: string;
  img_url: string | null;
  is_completed: boolean;
  name: string;
  nomination_period: Json;
  user_id: string;
  voting_period: Json;
} | null;

export default async function CategoryNomineeCard({
  nominees,
  event,
}: {
  nominees: Nominees[] | null;
  event: Event;
}) {
  if (nominees?.length === 0) {
    return (
      <div className="p-10">
        <BackButton />
        <div className="grid place-items-center">
          <Image
            src={"/images/no-docs.svg"}
            alt="No-docs"
            width={200}
            height={200}
          />
          <p className="text-center">
            Sorry, there are no nominees for this category.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="h-96 md:h-[30rem] relative mb-14">
        <Image
          className="h-full w-full object-cover object-center blur-sm"
          src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${event?.img_url}`}
          width={2000}
          height={2000}
          alt={event?.name!}
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center flex-col justify-center">
          <Image
            className="h-[10rem] w-[10rem] object-cover object-center rounded-full border-white border-2"
            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${event?.img_url}`}
            width={2000}
            height={2000}
            alt={event?.name!}
            priority
          />
          <h1 className="text-white text-2xl md:text-4xl font-bold text-center my-4">
            {event?.name}
          </h1>
          <VotingResults />
        </div>
      </div>
      <section className="container mx-auto px-6">
        <BackButton />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-10">
          {nominees?.length! > 0 &&
            nominees?.map((nominee) => (
              <div
                className="transition-all duration-150 hover:shadow-lg rounded-xl cursor-pointer border"
                key={nominee?.id}
              >
                <div className="h-[25rem]">
                  <Image
                    className="h-full w-full rounded-lg object-cover object-center"
                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${nominee?.img_url}`}
                    width={2000}
                    height={2000}
                    alt={nominee?.full_name!}
                    priority
                  />
                </div>
                <div className="px-6 py-4">
                  <h1 className="font-bold text-md text-center">
                    {nominee?.full_name}
                  </h1>
                  <h1 className="font-normal text-neutral-600  mb-1 text-center">
                    Nominee's Code: {nominee?.code}
                  </h1>
                  <Link href={`/all-events/${nominee?.id}/nominees/voting`}>
                    <Button className="w-full">Vote Nominee</Button>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </section>
    </>
  );
}
