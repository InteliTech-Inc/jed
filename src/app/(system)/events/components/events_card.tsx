import { dbServer } from "@/lib/supabase";
import { Json } from "@/types/supabase";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function EventsCard({ id }: { id: string }) {
  const db = dbServer(cookies);
  const { data: events } = await db
    .from("events")
    .select("*")
    .eq("user_id", id);

  return (
    <>
      {events?.length === 0 ? (
        <section className="flex min-h-[55dvh] flex-col items-center justify-center">
          <Image
            src={"/images/no-docs.svg"}
            width={200}
            height={200}
            alt={"Empty notification inbox"}
          />
          <p className="mt-5 text-center font-medium text-gray-600">
            Sorry, you have not published any event yet!
          </p>
        </section>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3  gap-3">
          {events?.map((event) => {
            return (
              <Link
                href={`/events/${event.id}`}
                key={event.id}
                className="border bg-gray-50 p-3 h-fit rounded-xl"
              >
                <section className=" h-64">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${event.img_url}`}
                    alt={`${event.name}'s image`}
                    width={2000}
                    height={2000}
                    className="rounded-md  w-full h-full object-cover object-center"
                    priority
                  />
                </section>
                <p className=" font-semibold py-2">{event.name}</p>
                <section className="py-4 w-full">
                  <span className=" ">
                    <p
                      className={` ${
                        event.is_completed
                          ? "bg-green-100 border-secondary "
                          : "bg-yellow-50 border-yellow-500"
                      } border w-fit text-sm rounded-full px-4 py-1`}
                    >
                      {event.is_completed ? "Published" : "Not published"}
                    </p>
                  </span>
                </section>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
