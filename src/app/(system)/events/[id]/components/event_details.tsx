import { dbServer } from "@/lib/supabase";
import { cookies } from "next/headers";
import Image from "next/image";
import AddCategoryModal from "./add_category_modal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EditIcon } from "lucide-react";
import DeleteButton from "./delete_button";

type Data = {
  data: {
    id: string;
    name: string;
    description: string;
    img_url: string;
    nomination_period: {
      start_date: string;
      end_date: string;
    };
    voting_period: {
      start_date: string;
      end_date: string;
    };
    categories: {
      id: string;
      category_name: string;
    }[];
  };
  error: any;
};

export default async function EventDetails({ id }: { id: string }) {
  const db = dbServer(cookies);
  const { data, error } = (await db
    .from("events")
    .select("*, categories(id, category_name), nominations(*, categories(*))")
    .eq("id", id)
    .single()) as Data;

  if (!data) {
    return <div>No event found</div>;
  }
  return (
    <div className="break-words">
      <section className=" mb-8 flex ">
        <div className="flex-1">
          <p className=" text-4xl text-neutral-700 mb-2 font-semibold">
            Event details
          </p>
          <p className=" text-neutral-600">
            View and edit the details of your event
          </p>
        </div>
        <div className="flex items-center justify-end gap-x-4">
          <AddCategoryModal event_id={data} />
          <Button className=" gap-2">
            <EditIcon size={14} />
            <Link href={`/events/${id}/edit`}>Edit Event</Link>
          </Button>
        </div>
      </section>

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
          <p className=" mb-5 text-3xl font-semibold text-neutral-700">
            {data.name}
          </p>
          <div className="w-full">
            <p className=" break-words">{data.description}</p>
            <section className=" py-4">
              <p className="text-2xl my-2 font-semibold">
                Categories ({data.categories.length})
              </p>
              <div className=" grid md:grid-cols-2 gap-4">
                {data.categories.map((category) => {
                  return (
                    <ul key={category.id}>
                      <li className=" w-full p-6 border h-full bg-gray-50 rounded-lg flex gap-4 items-center ">
                        <span className="flex-1">{category.category_name}</span>
                        <span>
                          <DeleteButton id={category.id} />
                        </span>
                      </li>
                    </ul>
                  );
                })}
              </div>
              <p className="text-2xl my-2 font-semibold mt-6">Schedules</p>
              <div className="space-y-3">
                <div className=" grid md:grid-cols-2 gap-4">
                  <p className=" text-base">Nominations Period</p>
                  <p>
                    {new Date(
                      data.nomination_period?.start_date
                    ).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}{" "}
                    -{" "}
                    {new Date(
                      data.nomination_period?.end_date
                    ).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className=" grid md:grid-cols-2 gap-4">
                  <p className=" text-base">Voting Period</p>
                  <p>
                    {new Date(
                      data.voting_period?.start_date
                    ).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}{" "}
                    -{" "}
                    {new Date(data.voting_period?.end_date).toLocaleDateString(
                      "en-US",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
