import React from "react";
import CategoriesCard from "./categories_card";
import { db } from "@/lib/supabase";
import BackButton from "@/components/back";
import { format } from "date-fns";
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
        <p className="text-neutral-700 mt-4 mb-4 text-4xl font-semibold">
          {event?.name}
        </p>
        <p className="text-neutral-600  max-w-xl mx-auto">
          {event?.description}
        </p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className=" flex items-center flex-col md:flex-row justify-center md:gap-28 text-center md:text-left">
          <div className="mt-5">
            {event?.voting_period && (
              <div>
                <p className="text-neutral-600 font-bold">Voting Period</p>
                <p className="text-neutral-500">
                  {format(event.voting_period.start_date, "PPP")}-{" "}
                  {format(event.voting_period.end_date, "PPP")}
                </p>
              </div>
            )}
          </div>
          <div className="mt-5">
            {Object.keys(event?.nomination_period).length && (
              <div>
                <p className="text-neutral-600 font-bold">Voting Period</p>
                <p className="text-neutral-500">
                  {format(event.voting_period.start_date, "PPP")}-{" "}
                  {format(event.voting_period.end_date, "PPP")}
                </p>
              </div>
            )}
          </div>
          {/* <div className="mt-5">
            {event?.nomination_period && (
              <div>
                <p className="text-neutral-600 font-bold">Voting Period</p>
                <p className="text-neutral-500">
                  {format(event.nomination_period.start_date, "PPP")}-{" "}
                  {format(event.nomination_period.end_date, "PPP")}
                </p>
              </div>
            )}
          </div> */}
        </div>

        <CategoriesCard categories={event?.categories} />
      </div>
    </section>
  );
}
