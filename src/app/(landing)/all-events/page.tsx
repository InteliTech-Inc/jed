import React, { Suspense } from "react";
import AllEvents from "./components/all_events";
import { Metadata } from "next";
import Loader from "../components/loader";
import { EventResponse } from "@/interfaces/event-interface";
import { fetchAllEvent } from "@/actions/events";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import EventCards from "./components/event_cards";

export const metadata: Metadata = {
  title: "Events",
  description: "Find all ongoing events and vote for preferred nominee",
};

export const revalidate = 10;

export default async function AllEventsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["events"],
    queryFn: fetchAllEvent,
  });

  return (
    <section>
      <div className="mt-8 space-y-3">
        <p className="text-2xl md:text-5xl text-neutral-600 text-center font-bold">
          All Events
        </p>
        <p className="text-center text-lg text-gray-600">
          Find all ongoing events and vote for preferred nominee
        </p>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<Loader />}>
          <EventCards />
        </Suspense>
      </HydrationBoundary>
    </section>
  );
}
