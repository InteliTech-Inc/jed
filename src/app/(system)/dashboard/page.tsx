import { Copy, CreditCard, MoreVertical, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

export default async function Dashboard() {
  return (
    <div className="flex min-h-screen w-full p-4 flex-col gap-4 relative z-10 bg-muted/40">
      <div className="py-6">
        <div className="flex gap-y-4 gap-4 flex-wrap">
          <Link
            href={"/app/admin/students"}
            className="w-full md:w-[20rem] flex flex-col p-8 bg-white hover:shadow-md transition-all border duration-500 ease-in-out hover:-translate-y-2 border-neutral-100 hover:border-neutral-300 rounded-md gap-3"
          >
            <h1 className=" text-5xl">{23}</h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-200 duration-150">
              {/* {item.description} */}
              Active student account(s)
            </p>
          </Link>
          <Link
            href={"/app/admin/lecturers"}
            className="w-full md:w-[20rem] flex flex-col p-8 bg-white hover:shadow-md transition-all border duration-500 ease-in-out hover:-translate-y-2 border-neutral-100 hover:border-neutral-300 rounded-md gap-3"
          >
            <h1 className=" text-5xl">{20}</h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-200 duration-150">
              {/* {item.description} */}
              Active lecturers account(s)
            </p>
          </Link>
          <article className="w-full md:w-[20rem] flex flex-col p-8 bg-white hover:shadow-md transition-all border duration-500 ease-in-out hover:-translate-y-2 border-neutral-100 hover:border-neutral-300 rounded-md gap-3">
            <h1 className=" text-5xl">{4832}</h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-200 duration-150">
              {/* {item.description} */}
              Revenue generated (GHS)
            </p>
          </article>
        </div>
      </div>
    </div>
  );
}
