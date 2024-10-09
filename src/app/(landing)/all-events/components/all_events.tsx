import { EventResponse } from "@/interfaces/event-interface";
import EventCards from "./event_cards";
import { fetchAllEvent } from "@/composables/events";

export const revalidate = 30;

export default async function AllEvents() {
  const data: EventResponse = await fetchAllEvent();

  const liveEvents = data.result.filter((event) => event.is_completed == false);


  return <EventCards events={liveEvents || []} />;
}
