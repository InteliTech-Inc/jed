import { Metadata } from "next";
import React, { Suspense } from "react";
import SingleEvent from "./components/single_event";
import Loader from "../../components/loader";
import { Event, EventResponse } from "@/interfaces/event-interface";
import { fetchAllEvent, fetchEvent } from "@/composables/events";

type Props = {
  params: { id: string };
};

export async function generateStaticParams() {
  const events: EventResponse = await fetchAllEvent();

  const idRoutes = events.result ? events.result.map((event) => event.id) : [];

  return idRoutes?.map((event_id) => ({
    event_id,
  }));
}

export const revalidate = 10;

export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  const event: Event = await fetchEvent(id);
  return {
    title: event?.name,
    description: event?.description,
    openGraph: {
      images: [
        {
          url: `${event?.img_url}`,
          alt: `${event?.name}'s image`,
        },
      ],
    },
  };
}

export default async function SingleEventPage({ params: { id } }: Props) {
  return (
    <Suspense fallback={<Loader />}>
      <SingleEvent id={id!} />
    </Suspense>
  );
}
