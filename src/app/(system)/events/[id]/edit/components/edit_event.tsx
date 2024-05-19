import { dbServer } from "@/lib/supabase";
import { cookies } from "next/headers";
import EditEventForm from "./edit_event_forms";
type EditEventProps = {
  id: string;
};
export default async function EditEvent({ id }: EditEventProps) {
  const db = dbServer(cookies);
  const { data, error } = await db
    .from("events")
    .select("*, categories(category_name), nominations(*, categories(*))")
    .eq("id", id)
    .single();

  if (!data) {
    return <div>No event found</div>;
  }

  return <div className="">{/* <EditEventForm defaultValues={data} /> */}</div>;
}
