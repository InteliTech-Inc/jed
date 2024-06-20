import CategoriesCard from "./categories_card";
import { db } from "@/lib/supabase";
import BackButton from "@/components/back";

import { DrawerDialogDemo } from "@/components/event_details_drawer";
type Data = {
  data: {
    id: string;
    name: string;
    description: string;
    img_url: string;
    nomination_period: {
      start_date: string;
      end_date: string;
    };
    voting_period: {
      start_date: string;
      end_date: string;
    };
    categories: any[];
  };
  error: any;
};

export default async function SingleEvent({ id }: { id: string }) {
  const { data: event } = (await db
    .from("events")
    .select(`*, categories(*)`)
    .eq("id", id)
    .single()) as Data;

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
        <DrawerDialogDemo
          data={{
            name: event.name,
            description: event.description,
            voting_period: event.voting_period,
            nomination_period: event.nomination_period,
          }}
        />
        <CategoriesCard categories={event?.categories} />
      </div>
    </section>
  );
}
