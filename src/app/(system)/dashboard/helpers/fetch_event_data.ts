"use server";
import { dbServer } from "@/lib/supabase";
import { cookies } from "next/headers";

export async function fetchEventsData(userId: string) {
  const db = dbServer(cookies);

  // Fetch completed events here wai
  const { data: events, error: eventsError } = await db
    .from("events")
    .select("id, name, voting_period")
    .eq("user_id", userId)
    .eq("is_completed", true);

  if (eventsError) {
    console.error("Error fetching events:", eventsError);
    return;
  }

  // Fetch nominees, categories, and voting for each of the event
  const eventPromises = events.map(async (event: any) => {
    const { data: nominees, error: nomineesError } = await db
      .from("nominees")
      .select("id, full_name, code, category_id")
      .eq("event_id", event.id);

    if (nomineesError) {
      console.error("Error fetching nominees:", nomineesError);
      return null;
    }

    const { data: categories, error: categoriesError } = await db
      .from("categories")
      .select("id, category_name")
      .eq("event_id", event.id);

    if (categoriesError) {
      console.error("Error fetching categories:", categoriesError);
      return null;
    }

    const { data: voting, error: votingError } = await db
      .from("voting")
      .select("nominee_id,count")
      .eq("event_id", event.id);

    if (votingError) {
      console.error("Error fetching voting:", votingError);
      return null;
    }
    // Returning the structure you proposed @Diabeney
    return {
      id: event.id,
      name: event.name,
      voting_period: {
        start_date: event?.voting_period?.start_date as string,
        end_date: event?.voting_period?.end_date,
      },
      categories: categories.map((category) => ({
        id: category.id,
        category_name: category.category_name,
      })),

      nominees: nominees.map((nominee) => {
        const total_votes = voting.find(
          (vote) => vote.nominee_id === nominee.id
        )?.count;
        return {
          id: nominee.id,
          nominee_name: nominee.full_name,
          category_id: nominee.category_id,
          nominee_code: nominee.code,
          total_votes,
        };
      }),
    };
  });

  const formattedEvents = await Promise.all(eventPromises);
  return formattedEvents.filter((event) => event !== null);
}
