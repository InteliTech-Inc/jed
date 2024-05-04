import { Button } from "@/components/ui/button";
import React from "react";
import { dbServer } from "@/lib/supabase";
import { cookies } from "next/headers";
import BackButton from "@/components/back";
import Image from "next/image";
type Props = {
  params: { id: string };
};

export default async function SingleEvent({ params: { id } }: Props) {
  const db = dbServer(cookies);
  const { data, error } = await db
    .from("events")
    .select("*, categories(category_name)")
    .eq("id", id)
    .single();

  if (!data) {
    return <div>No event found</div>;
  }

  return (
    <section className="p-6">
      <div className="flex items-center">
        <BackButton />
        <div className="space-x-4 w-fit ml-auto">
          <Button variant={"secondary"}>Add Category</Button>
          <Button>Edit Event</Button>
        </div>
      </div>
      <div>
        <h1 className="font-semibold leading-none text-3xl py-4 tracking-tight">
          {data.name}
        </h1>
        <p>{data.description}</p>
      </div>
      <section className=" grid grid-cols-[30%_1fr] py-4 gap-4">
        <div className=" h-96 rounded-lg sticky top-28 overflow-hidden">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${data.img_url}`}
            alt="event image"
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
