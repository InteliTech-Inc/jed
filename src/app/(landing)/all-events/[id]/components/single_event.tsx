import CategoriesCard from "./categories_card";
import BackButton from "@/components/back";

import { DrawerDialogDemo } from "@/components/event_details_drawer";
import { fetchEvent } from "@/composables/events";
import { Event } from "@/interfaces/event-interface";

export default async function SingleEvent({ id }: { id: string }) {
  const event: Event = await fetchEvent(id);

  return (
    <section className="container mx-auto py-10 overflow-x-hidden ">
      <BackButton />
      <div className="text-center">
        <p className="text-neutral-700 mt-4 mb-4 text-2xl md:text-4xl font-semibold">
          {event.name}
        </p>
        <p className="text-neutral-600 leading-8 text-xl lg:text-3xl font-semibold  max-w-xl mx-auto">
          Categories
        </p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <DrawerDialogDemo
          event={{
            name: event.name,
            description: event.description,
            voting_period: event.voting_period,
            nomination_period: event.nomination_period,
          }}
        />
        <CategoriesCard categories={event?.Categories} />
      </div>
    </section>
  );
}
