import { dbServer } from "@/lib/supabase";
import { cookies } from "next/headers";
import CreateEventForm from "../../create/components/create_event";
type EditEventProps = {
  params: { id: string };
};
export default async function EditEventPage({
  params: { id },
}: EditEventProps) {
  const db = dbServer(cookies);
  const { data, error } = await db
    .from("events")
    .select("*, categories(category_name), nominations(*, categories(*))")
    .eq("id", id)
    .single();

  if (!data) {
    return <div>No event found</div>;
  }

  return (
    <div>
      <CreateEventForm defaultValues={data} />
    </div>
  );
}
