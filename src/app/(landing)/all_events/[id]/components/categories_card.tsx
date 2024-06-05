"use client";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

interface ICategory {
  category_name: string | null;
  event_id: string | null;
  id: string;
}

type Props = {
  categories: ICategory[] | undefined;
};

export default function CategoriesCard({ categories }: Props) {
  const [search, setSearch] = useState("");

  const filteredCategories = categories?.filter((category) =>
    category?.category_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="my-10 w-[25rem] md:w-full px-6">
      <div className="relative  md:w-[30rem] mx-auto">
        <Input
          type="text"
          placeholder="Search categories"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mr-2 py-6 px-4 rounded-full bg-gra-300 mb-8 focus:outline-none border-none bg-slate-100 focused:bg-transparent"
        />
        <Search
          className="absolute p-2 top-1 right-1 text-xl rounded-full bg-green-200 text-neutral-600"
          size={40}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full  my-10">
        {filteredCategories!.length > 0 ? (
          filteredCategories?.map((category) => (
            <Link
              href={`/all_events/${category.id}/nominees`}
              key={category.id}
              className=" p-4 bg-accent hover:bg-transparent transition-all duration-150 ease-in-out hover:border-accent border rounded-3xl text-neutral-600 w-full"
            >
              <div className="flex justify-between items-center">
                <span>{category.category_name}</span>
                <ArrowRight />
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center text-xl font-medium">
            Sorry, there is no category for your search
          </div>
        )}
      </div>
    </div>
  );
}
