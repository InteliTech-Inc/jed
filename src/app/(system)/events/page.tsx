import { Button } from "@/components/ui/button";
import { dbServer } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { cookies } from "next/headers";

async function EventsPage() {
  const db = dbServer(cookies);

  const { data: events } = await db.from("events").select("*");
  console.log("Events", events);

  return (
    <div>
      <div className="flex justify-between items-center gap-5">
        <div>
          <h3 className="text-2xl font-semibold leading-none tracking-tight">
            Events
          </h3>
        </div>
        <div>
          <Link href={"/events/create"}>
            <Button>Create Event</Button>
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
                <div className="border p-3 h-fit rounded-xl" key={event.id}>
                  <h5 className="font-semibold">{event.name}</h5>
                  <Image
                    src={`https://cbboxofzpwjfpihaoyhn.supabase.co/storage/v1/object/public/events/${event.img_url}`}
                    alt={`${event.name}`}
                    width={2000}
                    height={2000}
                    className="rounded-md w-full h-full my-4"
                    priority
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default EventsPage;
