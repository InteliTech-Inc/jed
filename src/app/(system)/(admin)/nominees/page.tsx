import React from "react";
import AddNominees from "./components/add_nominees";
import { cookies } from "next/headers";
import { dbServer } from "@/lib/supabase";
import GetNominees from "./components/get_nominees";

export default async function AdminNominee() {
  const db = dbServer(cookies);
  const {
    data: { user },
  } = await db.auth.getUser();

  const { data: categories } = await db
    .from("events")
    .select(`*, categories(category_name, event_id, id)`)
    .eq("user_id", user?.id!);

  // Get Nominees
  const { data: nominees } = await db.from("nominees").select("*");

  return (
    <section className="p-8 ">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">NOMINEES</h1>
        <AddNominees data={categories} />
      </div>
      <GetNominees nominees={nominees} />
    </section>
  );
}
