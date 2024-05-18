import AddCategoryModal from "./components/add_category_modal";
import { dbServer } from "@/lib/supabase";
import { cookies } from "next/headers";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CategoryCard from "./components/category_card";

type Props = {
  params: { id: string };
};

export default async function SingleEvent({ params: { id } }: Props) {
  const db = dbServer(cookies);
  const { data, error } = await db
    .from("events")
    .select("*, categories(id, category_name), nominations(*, categories(*))")
    .eq("id", id)
    .single();

  if (!data) {
    return <div>No event found</div>;
  }

  return (
    <section className="p-4">
      <div className="flex items-center justify-between gap-x-4">
        <AddCategoryModal event_id={data} />
        <Button>
          <Link href={`/events/${id}/edit`}>Edit Event</Link>
        </Button>
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
        <div className="px-6">
          <h1 className=" mb-5 text-3xl font-semibold text-neutral-700">
            {data.name}
          </h1>
          <div className="">
            <p>{data.description}</p>
            <CategoryCard categories={data.categories} />
          </div>
        </div>
      </section>
    </section>
  );
}
