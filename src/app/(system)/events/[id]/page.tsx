import React from "react";
import AddCategoryModal from "./components/add_category_modal";
import { dbServer } from "@/lib/supabase";
import { cookies } from "next/headers";

type Props = {
  params: { id: string };
};

export default async function SingleEvent({ params: { id } }: Props) {
  const db = dbServer(cookies);
  const { data } = await db
    .from("events")
    .select(`*, nominations(*, categories(category_name))`)
    .eq("id", id)
    .single();

  return (
    <section>
      <div className="flex items-center justify-between gap-x-4">
        <div>{data && <h1 className="text-2xl font-bold">{data.name}</h1>}</div>
        <AddCategoryModal event_id={data} />
      </div>
      <div>
        {/* {data.categories.length === 0 ? (
          <div>No Category</div>
        ) : (
          data.categories.map((category: any) => (
            <div key={category.id}>
              <h1>{category.category_name}</h1>
              <h2>{category.event_id}</h2>
            </div>
          ))
        )} */}
        <h1 className="font-bold text-4xl my-4">Nominations Down Here</h1>
        {data.nominations.length === 0 ? (
          <div>No Nomination</div>
        ) : (
          data.nominations.map((nomination: any) => (
            <div
              key={nomination.id}
              className="my-2 border rounded-md bg-slate-200 p-4"
            >
              <div className="flex items-center gap-4 flex-wrap">
                <span className="font-bold text-xl ">Nominee's Name:</span>
                <span>{nomination.full_name}</span>
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                <span className="font-bold text-xl ">Email:</span>
                <span>{nomination.email}</span>
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                <span className="font-bold text-xl ">Phone:</span>
                <span>{nomination.phone}</span>
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                <span className="font-bold text-xl">Category:</span>
                <span>{nomination.categories.category_name}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
