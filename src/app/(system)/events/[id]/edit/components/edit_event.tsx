import { dbServer } from "@/lib/supabase";
import { cookies } from "next/headers";
import EditEventForm from "./edit_event_forms";
import { Data } from "../../components/event_details";
type EditEventProps = {
  id: string;
};
export default async function EditEvent({ id }: EditEventProps) {
  const db = dbServer(cookies);
  const { data, error } = (await db
    .from("events")
    .select("*, categories(category_name), nominations(*, categories(*))")
    .eq("id", id)
    .single()) as Data;

  if (!data) {
    return <div>No event found</div>;
  }

  const updatedData = {
    ...data,
    amount: data.amount_per_vote,
    voting_period: {
      start_date: new Date(data.voting_period?.start_date || ""),
      end_date: new Date(data.voting_period?.end_date || ""),
    },
    nomination_period: data.nomination_period && {
      start_date: new Date(data.nomination_period.start_date || ""),
      end_date: new Date(data.nomination_period.end_date || ""),
    },
  };

  return (
    <div className="">
      <EditEventForm defaultValues={updatedData} />
    </div>
  );
}
