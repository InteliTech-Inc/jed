"use client";
import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Nominee = {
  id: string;
  full_name: string;
  category: string;
  code: string;
  img_url: string;
};

export default function GetNominees({ nominees }: any) {
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const channel = supabase
      .channel("realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "nominees",
        },
        () => {
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router]);
  return (
    <div className="flex items-start justify-start ">
      <div className="grid grid-cols-1 md:flex items-start justify-start px-2  flex-wrap gap-4 mt-4">
        {nominees.length === 0 && (
          <h1 className="text-2xl font-bold">
            There are no nominees available at the moment.
          </h1>
        )}
        {nominees.map((nominee: Nominee) => (
          <div
            key={nominee.id}
            className="relative h-[25rem] w-full md:w-[18rem] rounded overflow-hidden hover:shadow transition-all duration-150 hover:border border-secondary bg-white group"
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${nominee.img_url}`}
              className="z-0 h-full object-cover w-full"
              width={2000}
              height={2000}
              alt={nominee.full_name}
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent opacity-50 h-1/2 z-10"></div>
            <div className="absolute bottom-0 left-0 p-4 text-white z-20">
              <h2 className="text-xl font-bold">{nominee.full_name}</h2>
              <p>{nominee.category}</p>
              <p>Nominee's code: {nominee.code}</p>
            </div>
            <Button
              onClick={() => router.push(`/nominees/edit/${nominee.id}`)}
              variant={"outline"}
              className="absolute top-0 right-0 m-4 font-bold py-2 px-4 rounded-full opacity-0 group-hover:opacity-100 z-30"
            >
              Edit
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
