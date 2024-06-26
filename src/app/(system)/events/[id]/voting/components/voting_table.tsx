import { DataTable } from "./data_table";
import { columns } from "./columns";
import { dbServer } from "@/lib/supabase";
import { cookies } from "next/headers";

type VotingTableProps = {
  id: string;
};
export default async function VotingTable({ id }: VotingTableProps) {
  const db = dbServer(cookies);
  const { data: data_nominations, error } = await db
    .from("nominations")
    .select("*, categories(category_name)")
    .eq("event_id", id);

  if (!data_nominations) return [];

  const linkURL =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_LIVE_URL
      : process.env.NEXT_PUBLIC_DEV_URL;
  const url = `${linkURL}/nom?id=${id}`;

  return (
    <div>
      {/* <DataTable data={data_nominations} columns={columns} url={url} /> */}
    </div>
  );
}
