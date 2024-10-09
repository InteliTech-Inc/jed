"use client";
import { getVotingPeriodMessage } from "@/lib/utils";
import SearchBar from "@/components/ui/search-bar";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Event } from "@/interfaces/event-interface";

type Props = {
  events: Event[];
};

export default function EventCards({ events }: Props) {
  const [query, setQuery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const searchParams = useSearchParams();

  const eventQuery = searchParams.get("event");

  useEffect(() => {
    Search(eventQuery as string);
  }, [eventQuery, events]);

  const Search = (query: string) => {
    if (query) {
      const filteredEvents = events.filter((event) =>
        event?.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredEvents(filteredEvents);
    } else {
      setFilteredEvents(events);
    }
  };

  return (
    <section>
      <div className="container mx-auto px-6 py-8">
        <SearchBar queryKey="event" placeholder="Search for events" />
        <>
          {filteredEvents.length === 0 && !query ? (
            <div className="flex items-center justify-center flex-col my-6">
              <div>
                <Image
                  src={"/images/no-docs.svg"}
                  alt="No-docs"
                  width={200}
                  height={200}
                />
                <p className="text-center">There are no published events</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-10 w-full">
              {filteredEvents?.map((event) => {
                const notice = getVotingPeriodMessage(event.voting_period);
                return (
                  <Link href={`/all-events/${event.id}`} key={event.id}>
                    <div className="transition-all  duration-150 hover:shadow-lg rounded-xl cursor-pointer border h-[350px]">
                      <div className="h-[15rem]">
                        <Image
                          className="h-full w-full rounded-lg rounded-b-none object-cover object-center"
                          src={event.img_url}
                          width={2000}
                          height={2000}
                          alt={event!.name}
                          priority
                        />
                      </div>
                      <div className="px-6 py-4">
                        <p className="font-bold text-md mb-1">{event.name}</p>
                        {notice && (
                          <small className=" py-1 px-2 text-[0.75rem] bg-green-200 rounded-lg">
                            {notice}
                          </small>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </>
        {filteredEvents.length === 0 && query && (
          <div className="flex items-center justify-center flex-col my-6">
            <div>
              <Image
                src={"/images/no-docs.svg"}
                alt="No-docs"
                width={200}
                height={200}
              />
            </div>
            <p className="text-center">No Search resuluts for "{query}"</p>
          </div>
        )}
        {/* {filteredEvents.length === 0 && (
         
        )} */}
      </div>
    </section>
  );
}
