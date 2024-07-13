import NominationForm from "@/app/(system)/events/[id]/nominations/components/nomination_form";
import { dbServer } from "@/lib/supabase";
import { cookies } from "next/headers";
import { Event } from "@/app/(system)/events/[id]/nominations/components/nomination_form";
import Image from "next/image";
const db = dbServer(cookies);
export default async function NominationView({ id }: { id: string }) {
  const { data, error } = (await db
    .from("events")
    .select("*, categories(category_name, id, event_id)")
    .eq("id", id)
    .single()) as {
    data: Event;
    error: any;
  };

  if (error) {
    console.error("Error fetching data:", error);
    return (
      <section className="flex min-h-[55dvh] p-4 flex-col items-center justify-center col-span-3">
        <Image
          src={"/images/no-docs.svg"}
          width={200}
          height={200}
          alt={"Empty notification inbox"}
        />
        <p className="text-xl text-gray-600 text-center">
          There was no data found, make sure the link is correct and try again.
        </p>
      </section>
    );
  }

  return (
    <div className="mb-36">
      <NominationForm event={data} />;
    </div>
  );
}
