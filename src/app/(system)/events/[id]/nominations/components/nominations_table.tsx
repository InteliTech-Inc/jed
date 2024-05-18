import { DataTable } from "./data_table";
import { columns } from "./columns";
import TopButtons from "./top_buttons";
import { dbServer } from "@/lib/supabase";
import { cookies } from "next/headers";

type NominationsTableProps = {
  id: string;
};
export default async function NominationsTable({ id }: NominationsTableProps) {
  const db = dbServer(cookies);
  const { data: data_nominations, error } = await db
    .from("nominations")
    .select("*, categories(category_name)")
    .eq("event_id", id);

  if (!data_nominations) return [];

  const url =
    "https://jed.vercel.app/comps/nomination/?id=58bd9-38ab30-3uan3r3-aenlajf";

  return (
    <div>
      <TopButtons url={url} results={data_nominations} />
      <DataTable data={data_nominations} columns={columns} />
    </div>
  );
}
