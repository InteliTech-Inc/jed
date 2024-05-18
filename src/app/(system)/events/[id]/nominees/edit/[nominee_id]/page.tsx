import { dbServer } from "@/lib/supabase";
import UpdateNomineeForm from "./components/update_form";
import { cookies } from "next/headers";

type EditNomineeProps = {
  params: { nominee_id: string };
};

export default async function EditNominee({
  params: { nominee_id },
}: EditNomineeProps) {
  const db = dbServer(cookies);
  // Fetch the nominee data
  const { data } = await db
    .from("nominees")
    .select("*")
    .eq("id", nominee_id)
    .single();

  //   GEt user first
  const {
    data: { user },
  } = await db.auth.getUser();
  const { data: categories } = await db
    .from("events")
    .select(`*, categories(category_name, event_id, id)`)
    .eq("user_id", user?.id!);
  return <UpdateNomineeForm data={data} categories={categories || []} />;
}
