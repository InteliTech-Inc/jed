import { dbServer } from "@/lib/supabase";
import { cookies } from "next/headers";
import Image from "next/image";
import AddCategoryModal from "./add_category_modal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EditIcon } from "lucide-react";

export default async function EventDetails({ id }: { id: string }) {
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
    <div className="break-words">
      <div className="flex items-center justify-end gap-x-4">
        <AddCategoryModal event_id={data} />
        <Button className=" gap-2">
          <EditIcon size={14} />
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
        <div className="px-6 break-words">
          <h1 className=" mb-5 text-3xl font-semibold text-neutral-700">
            {data.name}
          </h1>
          <div className="w-full">
            <p className=" break-words">{data.description}</p>
            <section className=" py-4">
              <h3 className="text-2xl my-2 font-semibold">
                Categories ({data.categories.length})
              </h3>
              <div className=" grid md:grid-cols-2 gap-4">
                {data.categories.map((category) => {
                  return (
                    <ul key={category.id}>
                      <li className=" w-full p-6 border  bg-gray-50 rounded-lg ">
                        {category.category_name}
                      </li>
                    </ul>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
