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
      .select("count")
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
      nominees: nominees.map((nominee) => ({
        id: nominee.id,
        nominee_name: nominee.full_name,
        category_id: nominee.category_id,
        nominee_code: nominee.code,
      })),
      total_votes: voting.reduce((sum, vote: any) => sum + vote.count, 0),
    };
  });

  const formattedEvents = await Promise.all(eventPromises);
  return formattedEvents.filter((event) => event !== null);
}

// [
//   {
//     id: "6ef2835a-670d-47a9-b13a-3af98326e9eb",
//     name: "Evans Event",
//     voting_period: {},
//     categories: [
//       {
//         id: "cc62eca6-5edb-4c91-bf20-2726ff9426d6",
//         category_name: "realtime_loaded",
//       },
//       {
//         id: "338c0533-3ca0-47df-9d48-b3ea78ca2414",
//         category_name: "Charlie",
//       },
//       {
//         id: "1b7bca97-f7b4-45a7-aba7-3f38034fe7f9",
//         category_name: "yah man",
//       },
//     ],
//     nominees: [
//       {
//         id: "f520ce8b-8cb6-4264-b6b9-ae77c438aca2",
//         nominee_name: "Jack Ryan",
//         category_id: "cc62eca6-5edb-4c91-bf20-2726ff9426d6",
//         nominee_code: "TN26",
//       },
//       {
//         id: "b69c2f98-b6fa-44a4-9949-75a65f0dcea6",
//         nominee_name: "Kwamena",
//         category_id: "338c0533-3ca0-47df-9d48-b3ea78ca2414",
//         nominee_code: "VU10",
//       },
//     ],
//     total_votes: 0,
//   },
// ];
