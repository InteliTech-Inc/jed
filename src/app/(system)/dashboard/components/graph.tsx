"use client";

import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { events, EventType } from "./dummy_data";
import Image from "next/image";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import EventSchedules from "./schedule";

export default function AnalyticsGraph({ events }: { events: EventType[] }) {
  const [eventId, setEventId] = useState(events[0].id);
  const [category, setCategory] = useState(
    events.find((event) => event.id === eventId)?.categories[0].id ?? ""
  );

  const event = events.find((event) => event.id === eventId);

  const nominees = event?.nominees.filter(
    (nominee) => nominee.category_id === category
  );

  return (
    <div className="grid md:grid-cols-[70%_auto] gap-4 mt-6 h-fit">
      <div className="w-full p-4 bg-gray-50 rounded-lg">
        <div className=" flex flex-col lg:flex-row gap-2">
          <div>
            <p className=" text-sm my-2">Event Name</p>
            <Select value={eventId} onValueChange={(e) => setEventId(e)}>
              <SelectTrigger className=" w-full lg:w-96 ">
                <SelectValue placeholder="Select event's name" />
              </SelectTrigger>
              <SelectContent>
                {events.length &&
                  events.map((event) => (
                    <SelectItem key={event.id} value={event.id}>
                      {event.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <p className=" text-sm my-2">Filters</p>

            <Select value={category} onValueChange={(e) => setCategory(e)}>
              <SelectTrigger className="w-full lg:w-96 ">
                <SelectValue placeholder="Filter by category or nominees" />
              </SelectTrigger>
              <SelectContent>
                {event?.categories?.map((item) => {
                  return (
                    <SelectItem key={item?.id} value={item?.id}>
                      {item?.category_name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="w-full h-[20rem]">
          {nominees?.length ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                width={600}
                height={600}
                data={nominees}
                margin={{
                  top: 50,
                  right: 5,
                  left: 0,
                  bottom: 0,
                }}
              >
                <XAxis dataKey={"nominee_name"} className="text-sm" />
                <Tooltip labelClassName="text-sm" wrapperClassName="text-sm" />
                <Area
                  type="monotone"
                  dataKey={"total_votes"}
                  stroke="#1b4332"
                  fill="#d8f3dc"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className=" w-full h-full grid place-content-center">
              <Image
                src={"/images/no-docs.svg"}
                alt="No-docs"
                width={200}
                height={200}
              />
              <p className=" text-center">No data to display</p>
            </div>
          )}
        </div>
      </div>
      <div className=" bg-accent rounded-lg py-6">
        <EventSchedules Period={event?.voting_period!} />
      </div>
    </div>
  );
}
