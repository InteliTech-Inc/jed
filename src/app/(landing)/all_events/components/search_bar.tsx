"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";

type Props = {
  onSearch: (query: string) => void;
};

export default function SearchBar({ onSearch }: Props) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    onSearch(query);
  }, [query]);

  // Handle Query by Key Search
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  // Handle Search by button click
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-start justify-center md:w-[35rem] mx-auto relative"
    >
      <Input
        type="text"
        placeholder="Search for events"
        value={query.trim()}
        onChange={handleInputChange}
        className="mr-2 py-6 px-4 rounded-full bg-gra-300 focus:outline-none border-none bg-accent "
      />
      <Button type="submit" className="absolute top-1 right-3 rounded-full">
        Search
      </Button>
    </form>
  );
}
