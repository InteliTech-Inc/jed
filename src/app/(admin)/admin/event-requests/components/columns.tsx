"use client";

import { ColumnDef } from "@tanstack/react-table";
import { NominationsResponse } from "@/types/types";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { FilterFn } from "@tanstack/react-table";
import { Json } from "@/types/supabase";
import AdminEventsTableRowActions from "./row_actions";

export type EventsResponse = {
  amount_per_vote: string | null;
  created_at: string;
  description: string;
  id: string;
  full_name: string;
  img_url: string | null;
  is_completed: boolean;
  name: string;
  status: "approved" | "pending" | "declined";
  nomination_period: {
    start_date?: string;
    end_date?: string;
  } | null;
  user_id: string;
  voting_period: {
    start_date: string;
    end_date: string;
  } | null;
} | null;

const multiColumnFilterFn: FilterFn<NominationsResponse> = (
  row,
  columnId,
  filterValue
) => {
  // Concatenate the values from multiple columns into a single string
  const searchableRowContent = `${row.original.full_name} ${row.original.categories?.category_name}`;

  // Perform a case-insensitive comparison
  return searchableRowContent.toLowerCase().includes(filterValue.toLowerCase());
};

import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const columns: ColumnDef<EventsResponse>[] = [
  {
    accessorKey: "name",
    header: "Event Name",
    // filterFn: multiColumnFilterFn,
  },

  {
    accessorKey: "full_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=" pl-2"
        >
          Full Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div
          className={` capitalize ${
            data?.status === "pending"
              ? " text-gray-500"
              : data?.status === "approved"
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {data?.status}
        </div>
      );
    },
  },
  {
    header: "",
    id: "actions",
    cell: ({ row }) => {
      return <AdminEventsTableRowActions row={row} />;
    },
  },
];
