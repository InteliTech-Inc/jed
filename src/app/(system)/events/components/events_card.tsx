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
        <div className="w-full grid place-content-center">
          <h3 className="text-2xl font-bold text-center">
            There are no published event yet!
          </h3>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {events?.map((event) => {
            return (
              <Link
                href={`/events/${event.id}`}
                key={event.id}
                className="border p-3 h-fit rounded-xl"
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
                <h5 className="font-semibold py-2">{event.name}</h5>
                <section className="py-4 w-full">
                  <span className=" ">
                    <p className="border w-fit text-sm bg-green-100 border-secondary rounded-full px-4 py-1">
                      {event.is_completed ? "Completed" : "In Progress"}
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
