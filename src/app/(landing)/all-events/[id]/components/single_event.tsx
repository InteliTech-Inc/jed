"use client";
import CategoriesCard from "./categories_card";
import BackButton from "@/components/back";

import { DrawerDialogDemo } from "@/components/event_details_drawer";
import { fetchEvent } from "@/actions/events";
import { useQuery } from "@tanstack/react-query";

export default function SingleEvent({ id }: { id: string }) {
  const { data: event } = useQuery({
    queryKey: ["event"],
    queryFn: async () => await fetchEvent(id),
  });

  return (
    <section className="container mx-auto py-10 overflow-x-hidden ">
      <BackButton />
      <div className="text-center">
        <p className="text-neutral-700 mt-4 mb-4 text-2xl md:text-4xl font-semibold">
          {event?.name}
        </p>
        <p className="text-neutral-600 leading-8 text-xl lg:text-3xl font-semibold  max-w-xl mx-auto">
          Categories
        </p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <DrawerDialogDemo id={id} />
        <CategoriesCard id={id} />
      </div>
    </section>
  );
}
