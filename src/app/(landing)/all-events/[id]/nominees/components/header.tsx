"use client";
import { fetchCategory } from "@/actions/categories";
import { fetchEvent } from "@/actions/events";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

export default function Header({ id }: { id: string }) {
  const { data } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const category = await fetchCategory(id);
      const event = await fetchEvent(category.event_id);
      return event;
    },
  });

  return (
    <div className="h-96 md:h-[20rem] relative mb-14">
      {data && (
        <>
          <Image
            className="h-full w-full object-cover object-center blur-sm"
            src={data?.img_url}
            width={2000}
            height={2000}
            alt={data?.name}
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center flex-col justify-center">
            <Image
              className="h-[10rem] w-[10rem] object-cover object-center rounded-full border-white border-2"
              src={data?.img_url}
              width={2000}
              height={2000}
              alt={data?.name}
              priority
            />
            <p className="text-white text-2xl md:text-4xl font-bold text-center my-4">
              {data?.name}
            </p>
            <p className=" text-slate-200  px-4">
              Nominees for {data?.Categories[0].name}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
