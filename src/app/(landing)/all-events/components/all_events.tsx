import EventCards from "./event_cards";
import { dbServer } from "@/lib/supabase";
import { cookies } from "next/headers";


export default async function AllEvents() {
  const db = dbServer(cookies);
  const { data: events } = await db.from("events").select("*");

  const liveEvents = events?.filter((event) => event.is_completed);


  return (
    <>
      <EventCards events={liveEvents || []} />
    </>
  );
}
