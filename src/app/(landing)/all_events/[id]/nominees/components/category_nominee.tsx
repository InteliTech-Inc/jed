"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { db } from "@/lib/supabase";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

export default function CategoryNomineeCard() {
  const { id } = useParams();
  const [nominees, setNominees] = React.useState<Nominees[]>([]);
  const [event, setEvent] = React.useState<any>(null);
  useEffect(() => {
    async function fetchCategoryNominees() {
      const { data, error } = await db
        .from("nominees")
        .select("*")
        .eq("category_id", id);
      if (error) {
        console.error(error);
      }
      // console.log(data);
      setNominees(data || []);
      const ids = data?.find(
        (nominee) => nominee?.category_id === id
      )?.event_id;
      const { data: event } = await db
        .from("events")
        .select("*")
        .eq("id", ids!)
        .single();

      setEvent(event);
    }
    fetchCategoryNominees();
  }, [id]);

  return (
    <>
      <div className="h-96 md:h-[30rem] relative mb-14">
        <Image
          className="h-full w-full object-cover object-center blur-sm"
          src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${event?.img_url}`}
          width={2000}
          height={2000}
          alt={event?.name || "Event"}
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center flex-col justify-center">
          <Image
            className="h-[10rem] w-[10rem] object-cover object-center rounded-full border-white border-2"
            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${event?.img_url}`}
            width={2000}
            height={2000}
            alt={event?.name || "Event"}
            priority
          />
          <h1 className="text-white text-2xl md:text-4xl font-bold text-center mt-2">
            {event?.name}
          </h1>
        </div>
      </div>
      <section className="container mx-auto px-6">
        {/* Design a banner with an image that takes the whole with with blur */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-10">
          {nominees.length > 0 ? (
            nominees.map((nominee) => (
              <div
                className="transition-all duration-150 hover:shadow-lg rounded-xl cursor-pointer border"
                key={nominee?.id}
              >
                <div className="h-[25rem]">
                  <Image
                    className="h-full w-full rounded-lg object-cover object-bottom"
                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${nominee?.img_url}`}
                    width={2000}
                    height={2000}
                    alt={nominee?.full_name || "Nominee"}
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
                  <Link href={`/all_events/${nominee?.id}/nominees/voting`}>
                    <Button className="w-full">Vote Nominee</Button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-xl font-medium">
              Sorry, there are no nominees for this category
            </div>
          )}
        </div>
      </section>
    </>
  );
}
