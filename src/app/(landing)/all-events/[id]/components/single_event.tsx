import React from "react";
import CategoriesCard from "./categories_card";
import { db } from "@/lib/supabase";
import BackButton from "@/components/back";

const fakeData = {
  created_at: "2022-01-01T00:00:00Z",
  name: "Event 1",
  description: "This is a description for Event 1",
  img_url: "https://example.com/image1.jpg",
  is_completed: false,
  user_id: "user1",
  id: "event1",
  voting_period: {
    start_date: "2022-02-01T00:00:00Z",
    end_date: "2022-02-28T00:00:00Z",
  },
  nomination_period: {
    start_date: "2022-01-01T00:00:00Z",
    end_date: "2022-01-31T00:00:00Z",
  },
  categories: [
    {
      category_name: "Category 1",
      event_id: "event1",
      id: "category1",
    },
    {
      category_name: "Category 2",
      event_id: "event1",
      id: "category2",
    },
  ],
};

export default async function SingleEvent({ id }: { id: string }) {
  const { data: event } = await db
    .from("events")
    .select(`*, categories(*)`)
    .eq("id", id)
    .single();

  return (
    <section className="container mx-auto py-10 overflow-x-hidden ">
      <BackButton />
      <div className="text-center">
        <h1 className="text-neutral-600 text-3xl font-bold ">{event?.name}</h1>
        <p className="text-neutral-500 md:w-[40rem] mx-auto">
          {event?.description}
        </p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className=" flex items-center flex-col md:flex-row justify-center md:gap-28 text-center md:text-left">
          <div className="mt-5">
            {!event?.voting_period && (
              <>
                <h2 className="text-neutral-600 text-xl font-bold">
                  Voting Period
                </h2>
                <p className="text-neutral-500">
                  {new Date(
                    fakeData.voting_period.start_date
                  ).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}{" "}
                  -{" "}
                  {new Date(fakeData.voting_period.end_date).toLocaleDateString(
                    "en-US",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  )}
                </p>
              </>
            )}
          </div>
          <div className="mt-5">
            {!event?.nomination_period && (
              <>
                <h2 className="text-neutral-600 text-xl font-bold">
                  Nomination Period
                </h2>
                <p className="text-neutral-500">
                  {new Date(
                    fakeData.nomination_period.start_date
                  ).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}{" "}
                  -{" "}
                  {new Date(
                    fakeData.nomination_period.end_date
                  ).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </>
            )}
          </div>
        </div>

        <CategoriesCard categories={event?.categories} />
      </div>
    </section>
  );
}
