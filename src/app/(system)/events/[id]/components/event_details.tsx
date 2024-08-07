import { dbServer } from "@/lib/supabase";
import { cookies } from "next/headers";
import Image from "next/image";
import AddCategoryModal from "./add_category_modal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EditIcon } from "lucide-react";
import DeleteButton from "./delete_button";
import EventSwitch from "./event_switch";
import { format } from "date-fns";
import BackButton from "@/components/back";

export type Data = {
  data: {
    id: string;
    name: string;
    description: string;
    img_url: string;
    user_id: string;
    nomination_period: {
      start_date: string;
      end_date: string;
    };
    amount_per_vote: string;
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
    return (
      <div>
        <BackButton />
        <div className="grid place-items-center">
          <div className="flex flex-col items-center justify-center  gap-4">
            <Image
              src={"/images/no-docs.svg"}
              alt="No-docs"
              width={200}
              height={200}
            />
            <p className="text-center">
              Sorry, there was an error fetching your events. Check your
              internet connection and refresh the page.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const voting_period =
    data.voting_period && Object.keys(data.voting_period).length > 0
      ? data.voting_period
      : null;

  const nomination_period =
    data.nomination_period && Object.keys(data.nomination_period).length > 0
      ? data.nomination_period
      : null;

  return (
    <div className="break-words">
      <div className="flex items-center justify-between">
        <BackButton />
        <EventSwitch id={id} className="md:hidden" />
      </div>
      <section className=" mb-8 flex flex-col md:flex-row ">
        <div className="flex-1">
          <p className=" text-4xl text-neutral-700 mb-2 font-semibold">
            Event details
          </p>
          <p className=" text-neutral-600">
            View and edit the details of your event
          </p>
        </div>
      </section>
      <div className="flex items-center justify-between">
        <EventSwitch id={id} className="hidden md:inline-flex" />
        <div className="flex items-center justify-end gap-x-4 w-full">
          <AddCategoryModal event_id={data} />
          <Button className=" gap-2">
            <EditIcon size={14} />
            <Link href={`/events/${id}/edit`}>Edit Event</Link>
          </Button>
        </div>
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
        <div className=" p-2 lg:px-6 break-words">
          <p className=" mb-5 text-3xl font-semibold text-neutral-700">
            {data.name}
          </p>
          <div className="w-full">
            <p className=" break-words">{data.description}</p>
            <section className=" py-4">
              <p className="text-2xl text-neutral-700 my-2 font-semibold">
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
              <p className="text-2xl my-2 font-semibold mt-6 text-neutral-700">
                Schedules
              </p>
              <div className="space-y-3">
                <div className=" grid md:grid-cols-2 gap-4">
                  <p className=" text-base">Nominations Period</p>
                  <p>
                    {nomination_period
                      ? format(
                          new Date(nomination_period.start_date),
                          "dd/MM/yyyy"
                        )
                      : "Not Set Yet"}{" "}
                    -{" "}
                    {nomination_period
                      ? format(
                          new Date(nomination_period.end_date),
                          "dd/MM/yyyy"
                        )
                      : "Not Set Yet"}
                  </p>
                </div>
                <div className=" grid md:grid-cols-2 gap-4">
                  <p className=" text-base">Voting Period</p>
                  <p>
                    {voting_period
                      ? format(new Date(voting_period.start_date), "dd/MM/yyyy")
                      : "Not Set Yet"}{" "}
                    -{" "}
                    {voting_period
                      ? format(new Date(voting_period.end_date), "dd/MM/yyyy")
                      : "Not Set Yet"}
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
