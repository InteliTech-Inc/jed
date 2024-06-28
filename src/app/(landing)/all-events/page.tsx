import React, { Suspense } from "react";
import AllEvents from "./components/all_events";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { dbServer } from "@/lib/supabase";
import Loader from "../components/loader";

export const metadata: Metadata = {
  title: "Events",
  description: "Find all ongoing events and vote for preferred nominee",
};

export const revalidate = 10;

export default async function AllEventsPage() {
  const db = dbServer(cookies);
  const { data: events } = await db.from("events").select("*");

  const liveEvents = events?.filter((event) => !event.is_completed);

  return (
    <section>
      <div className="mt-8 space-y-3">
        <h2 className="text-4xl md:text-6xl text-neutral-600 text-center font-bold">
          All Events
        </h2>
        <p className="text-center text-lg text-gray-600">
          Find all ongoing events and vote for preferred nominee
        </p>
      </div>
      {liveEvents?.length === 0 ? (
        <div className="text-center my-10 text-2xl font-bold text-neutral-600">
          There are no Live Events
        </div>
      ) : (
        <Suspense fallback={<Loader />}>
          <AllEvents />
        </Suspense>
      )}
    </section>
  );
}
