"use client";
import SearchBar from "@/components/ui/search-bar";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Event = {
  created_at: string;
  name: string;
  description: string;
  img_url: string | null;
  is_completed: boolean;
  user_id: string;
  id: string;
};

type Props = {
  events: Event[];
};

export default function EventCards({ events }: Props) {
  const [query, setQuery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const searchParams = useSearchParams()

  const eventQuery = searchParams.get("event")

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

  // Handle Query by Key Search
  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setQuery(event.target.value);
  // };

  // Handle Search by button click
  // const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  // };

  console.log(events);

  return (
    <section>
      <div className="container mx-auto px-6 py-8">
        {/* <form
          onSubmit={handleSearch}
          className="flex items-start justify-center md:w-[35rem] mx-auto relative"
        >
          <Input
            type="text"
            placeholder="Search for events"
            value={query.trim()}
            onChange={handleInputChange}
            className="mr-2 py-6 px-4 rounded-full bg-gra-300 focus:outline-none border-none bg-accent "
          />
          <Button type="submit" className="absolute top-1 right-3 rounded-full">
            Search
          </Button>
        </form> */}
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
                // const voting_period =
                //   event.voting_period &&
                //   Object.keys(event.voting_period).length > 0
                //     ? event.voting_period
                //     : null;

                // const nomination_period =
                //   event.nomination_period &&
                //   Object.keys(event.nomination_period).length > 0
                //     ? event.nomination_period
                //     : null;
                return (
                  <Link href={`/all-events/${event.id}`} key={event.id}>
                    <div className="transition-all  duration-150 hover:shadow-lg rounded-xl cursor-pointer border h-[400px]">
                      <div className="h-[20rem]">
                        <Image
                          className="h-full w-full rounded-lg rounded-b-none object-cover object-center"
                          src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${event.img_url}`}
                          width={2000}
                          height={2000}
                          alt={event!.name}
                          priority
                        />
                      </div>
                      <div className="px-6 py-4">
                        <p className="font-bold text-md mb-1">{event.name}</p>
                        {/* {event.voting_period && (
                          <small className=" py-1 px-2 text-[0.75rem] bg-green-200 rounded-lg">
                            Voting started{" "}
                            {formatDistance(
                              voting_period.start_date,
                              new Date()
                            )}{" "}
                            ago
                          </small>
                        )} */}
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
