import EventCards from "./event_cards";
import { dbServer } from "@/lib/supabase";
import { cookies } from "next/headers";

export type Data = {
  data: {
    id: string;
    name: string;
    description: string;
    img_url: string;
    created_at: string;
    user_id: string;
    is_completed: boolean;
    nomination_period: {
      start_date: string;
      end_date: string;
    };
    voting_period: {
      start_date: string;
      end_date: string;
    };
  }[];
  error: any;
};

export default async function AllEvents() {
  const db = dbServer(cookies);
  const { data } = (await db.from("events").select("*")) as Data;

  const liveEvents = data?.filter((event) => event.is_completed);

  return <EventCards events={liveEvents || []} />;
}
