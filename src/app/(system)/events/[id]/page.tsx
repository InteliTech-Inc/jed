import React from "react";
import AddCategoryModal from "./components/add_category_modal";
import { dbServer } from "@/lib/supabase";
import { cookies } from "next/headers";
import Image from "next/image";

type Props = {
  params: { id: string };
};

export default async function SingleEvent({ params: { id } }: Props) {
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
    <section className="p-4">
      <div className="flex items-center justify-between gap-x-4">
        <AddCategoryModal event_id={data} />
      </div>
      <section className=" grid lg:grid-cols-[30%_1fr] py-4 gap-4">
        <div className=" h-96 rounded-lg lg:sticky top-28 overflow-hidden">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${data.img_url}`}
            alt={`${data.name}'s image`}
            width={2000}
            height={2000}
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className=" border border-blue-500">
          <h3>Bring me more problems</h3>
          <div className=" min-h-screen">
            <h2>Hlelo</h2>
          </div>
          <div className=" min-h-screen">
            <h2>second</h2>
          </div>
        </div>
      </section>
    </section>
  );
}
