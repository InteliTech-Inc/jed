"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Button } from "./button";
import { Input } from "./input";

type SearchProps = {
  placeholder: string;
  queryKey: string;
};

export default function SearchBar({ placeholder, queryKey }: SearchProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set(`${queryKey}`, term);
    } else {
      params.delete(`${queryKey}`);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <form className="flex items-start justify-center md:w-[35rem] mx-auto relative">
      <Input
        type="text"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get(`${queryKey}`)?.toString()}
        className="mr-2 py-6 px-4 rounded-full bg-gra-300 focus:outline-none border-none bg-accent "
      />
      <Button type="submit" className="absolute top-1 right-3 rounded-full">
        Search
      </Button>
    </form>
  );
}
