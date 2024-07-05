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
    .select("*, categories(category_name), events(name)")
    .eq("event_id", id);

  const { data } = await db.from("events").select("name").single();

  if (!data_nominations) return [];


  const linkURL =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_LIVE_URL
      : process.env.NEXT_PUBLIC_DEV_URL;
  const url = `${linkURL}/nom?id=${id}`;


  return (
    <div>
      <DataTable
        data={data_nominations}
        columns={columns}
        url={url}
        event_name={data?.name}
      />
    </div>
  );
}
