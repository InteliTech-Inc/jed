"use client";

import Link from "next/link";
import React, { useState } from "react";
import SearchBar from "./search_bar";
import Image from "next/image";
import { Json } from "@/types/supabase";

type Event = {
  created_at: string;
  name: string;
  description: string;
  img_url: string | null;
  is_completed: boolean;
  user_id: string;
  id: string;
  voting_period: Json;
  nomination_period: Json;
};

type Props = {
  events: Event[];
};

export default function EventCards({ events: initialEvents }: Props) {
  const [events, setEvents] = useState(initialEvents);

  const handleSearch = (query: string) => {
    console.log(query);
    if (query) {
      const filteredEvents = initialEvents.filter((event) =>
        event?.name.toLowerCase().includes(query.toLowerCase())
      );
      setEvents(filteredEvents);
    } else {
      setEvents(initialEvents);
    }
  };
  return (
    <section>
      <div className="container mx-auto px-6 py-8">
        <SearchBar onSearch={handleSearch} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-10 ">
          {events.length > 0 ? (
            events.map((event) => (
              <Link href={`/all_events/${event.id}`} key={event.id}>
                <div className="transition-all  duration-150 hover:shadow-lg rounded-xl cursor-pointer border">
                  <div className="h-[20rem]">
                    <Image
                      className="h-full w-full rounded-lg object-cover object-center"
                      src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${event.img_url}`}
                      width={2000}
                      height={2000}
                      alt={event!.name}
                    />
                  </div>
                  <div className="px-6 py-4">
                    <h1 className="font-bold text-xl mb-1 text-center">
                      {event.name}
                    </h1>
                    <p className="text-gray-700 text-base">
                      {event?.voting_period?.toString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-lg text-gray-600">Item not found</p>
          )}
        </div>
      </div>
    </section>
  );
}
