"use client";
import { fetchCategory } from "@/actions/categories";
import { fetchEvent } from "@/actions/events";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

export default function Header({ id }: { id: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const category = await fetchCategory(id);
      const event = await fetchEvent(category.event_id);
      return event;
    },
    refetchOnMount: "always",
    refetchInterval: 60000,
  });

  if (isLoading) {
    return (
      <div className="h-96 md:h-[20rem] relative mb-14 w-full">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-pulse flex flex-col space-y-4 w-full px-4">
            <div className="h-24 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }
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
