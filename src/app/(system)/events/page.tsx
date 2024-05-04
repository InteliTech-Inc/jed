"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Event {
  id: string;
  name: string;
  img_url: string;
}

function EventsPage() {
  const [events, setEvents] = useState<null | Event[]>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchEvents() {
      try {
        setIsLoading(true);
        const { data: events, error } = await db.from("events").select("*");
        if (events) {
          setEvents(events);
          setIsLoading(false);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.stack);
        }
      }
    }
    fetchEvents();
  }, []);

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
            {isLoading ? (
              <h1>Fetching Data...</h1>
            ) : (
              events?.map((event) => {
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
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default EventsPage;
