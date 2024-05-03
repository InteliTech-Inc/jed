import { Button } from "@/components/ui/button";
import { db } from "@/lib/supabase";
import Link from "next/link";
import React from "react";

async function EventsPage() {
  const { data, error } = await db.from("events").select();
  console.log("Events", data);
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
        {data?.length === 0 ? (
          <div>No Events to show</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {data?.map((event) => {
              return (
                <div className="border p-3 rounded-xl" key={event.id}>
                  <h5 className="font-semibold">{event.name}</h5>
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
