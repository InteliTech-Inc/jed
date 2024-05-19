import { Button } from "@/components/ui/button";
import { dbServer } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { cookies } from "next/headers";

async function EventsPage() {
  const db = dbServer(cookies);

  const {
    data: { user },
  } = await db.auth.getUser();

  const { data: events } = await db
    .from("events")
    .select("*")
    .eq("user_id", user?.id!);

  console.log(events);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center gap-5">
        <div>
          <h3 className="text-2xl font-semibold leading-none tracking-tight">
            Your Events
          </h3>
        </div>
        <div>
          <Link href={"/events/create"}>
            <Button>Create new Event</Button>
          </Link>
        </div>
      </div>
      <br />
      <div>
        {events?.length === 0 ? (
          <div>No Events to show</div>
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
      </div>
    </div>
  );
}

export default EventsPage;
