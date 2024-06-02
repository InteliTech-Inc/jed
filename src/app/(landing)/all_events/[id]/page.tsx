import { Metadata } from "next";
import React from "react";
import { db } from "@/lib/supabase";
import SingleEvent from "./components/single_event";

type Props = {
  params: { id: string };
};

export async function generateStaticParams() {
  const { data: events } = await db.from("events").select("id");

  const idRoutes = events && events.map((event) => event.id);

  return idRoutes?.map((id) => ({
    id,
  }));
}

export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  const { data: event } = await db
    .from("events")
    .select(`*, categories(category_name, event_id, id)`)
    .eq("id", id)
    .single();
  return {
    title: event?.name,
    description: event?.description,
    openGraph: {
      images: [
        {
          url: `/${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${event?.img_url}`,
          alt: `${event?.name}'s image`,
        },
      ],
    },
  };
}

export default async function SingleEventPage({ params: { id } }: Props) {
  const { data: event } = await db
    .from("events")
    .select(`*, categories(category_name, event_id, id)`)
    .eq("id", id)
    .single();

  return (
    <>
      <SingleEvent event={event} />
    </>
  );
}
