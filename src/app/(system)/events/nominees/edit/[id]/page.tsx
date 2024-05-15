import { dbServer } from "@/lib/supabase";
import UpdateNomineeForm from "./components/update_form";
import { cookies } from "next/headers";

// Define the category type
type Props = {
  params: {
    id: string;
  };
};
export default async function EditNominee({ params: { id } }: Props) {
  const db = dbServer(cookies);
  // Fetch the nominee data
  const { data } = await db.from("nominees").select("*").eq("id", id).single();

  //   GEt user first
  const {
    data: { user },
  } = await db.auth.getUser();
  const { data: categories } = await db
    .from("events")
    .select(`*, categories(category_name, event_id, id)`)
    .eq("user_id", user?.id!);
  return <UpdateNomineeForm data={data} categories={categories} />;
}
