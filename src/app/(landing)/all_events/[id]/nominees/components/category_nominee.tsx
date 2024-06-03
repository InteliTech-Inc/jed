"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { db } from "@/lib/supabase";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Nominees = {
  category_id: string | null;
  code: string | null;
  created_at: string;
  event_id: string | null;
  full_name: string | null;
  id: string;
  img_url: string | null;
  user_id: string;
} | null;

const fakeData = [
  {
    created_at: "2022-01-01T00:00:00Z",
    name: "Event 1",
    description: "This is a description for Event 1",
    img_url: "https://example.com/image1.jpg",
    is_completed: false,
    user_id: "user1",
    id: "event1",
    voting_period: {
      start_date: "2022-02-01T00:00:00Z",
      end_date: "2022-02-28T00:00:00Z",
    },
    nomination_period: {
      start_date: "2022-01-01T00:00:00Z",
      end_date: "2022-01-31T00:00:00Z",
    },
    categories: [
      {
        category_name: "Category 1",
        event_id: "event1",
        id: "category1",
      },
      {
        category_name: "Category 2",
        event_id: "event1",
        id: "category2",
      },
    ],
  },
  {
    created_at: "2022-01-01T00:00:00Z",
    name: "Event 2",
    description: "This is a description for Event 2",
    img_url: "https://example.com/image2.jpg",
    is_completed: true,
    user_id: "user2",
    id: "event2",
    voting_period: {
      start_date: "2022-02-01T00:00:00Z",
      end_date: "2022-02-28T00:00:00Z",
    },
    nomination_period: {
      start_date: "2022-01-01T00:00:00Z",
      end_date: "2022-01-31T00:00:00Z",
    },
    categories: [
      {
        category_name: "Category 1",
        event_id: "event2",
        id: "category3",
      },
      {
        category_name: "Category 2",
        event_id: "event2",
        id: "category4",
      },
    ],
  },
];

export default function CategoryNomineeCard() {
  const { id } = useParams();
  const [nominees, setNominees] = React.useState<Nominees[]>([]);
  useEffect(() => {
    async function fetchCategoryNominees() {
      const { data, error } = await db
        .from("nominees")
        .select("*")
        .eq("category_id", id);
      if (error) {
        console.error(error);
      }
      setNominees(data || []); // Provide an empty array as the default value for the nominees state variable
    }
    fetchCategoryNominees();
  }, [id]);

  return (
    <section className="container mx-auto px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-10">
        {nominees.length > 0 ? (
          nominees.map((nominee) => (
            <div
              className="transition-all duration-150 hover:shadow-lg rounded-xl cursor-pointer border"
              key={nominee?.id}
            >
              <div className="h-[25rem]">
                <Image
                  className="h-full w-full rounded-lg object-cover object-bottom"
                  src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${nominee?.img_url}`}
                  width={2000}
                  height={2000}
                  alt={nominee?.full_name || "Nominee"}
                  priority
                />
              </div>
              <div className="px-6 py-4">
                <h1 className="font-bold text-xl mb-1 text-center">
                  {nominee?.full_name}
                </h1>
                <h1 className="font-bold text-xl mb-1 text-center">
                  {nominee?.code}
                </h1>
                <Link href={`/all_events/${nominee?.id}/nominees/voting`}>
                  <Button className="w-full">Vote</Button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-xl font-medium">
            Sorry, there are no nominees for this category
          </div>
        )}
      </div>
    </section>
  );
}
