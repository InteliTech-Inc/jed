"use client";

import { ColumnDef } from "@tanstack/react-table";
import { VotingDataResponse } from "@/types/types";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

import { FilterFn } from "@tanstack/react-table";

// Custom filter function for multi-column searching
const multiColumnFilterFn: FilterFn<VotingDataResponse> = (
  row,
  columnId,
  filterValue
) => {
  const searchableRowContent = `${row.original?.full_name} ${row.original?.category}`;

  return searchableRowContent.toLowerCase().includes(filterValue.toLowerCase());
};

// import { MoreHorizontal } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";

export const columns: ColumnDef<VotingDataResponse>[] = [
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
    filterFn: multiColumnFilterFn,
  },

  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=" pl-0"
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "number_of_votes",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=" pl-2"
        >
          Number of Votes
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { number_of_votes } = row?.original;
      return (
        <p className=" font-semibold text-secondary text-center">
          {number_of_votes}
        </p>
      );
    },
  },

  // {
  //   header: "",
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const reference = row.original;
  //     return (
  //       <div>
  //         {/* <Dialog>
  //           <DropdownMenu>
  //             <DropdownMenuTrigger asChild>
  //               <Button variant="outline" className="h-8 w-8 p-0">
  //                 <span className="sr-only">Open menu</span>
  //                 <MoreHorizontal className="h-4 w-4" />
  //               </Button>
  //             </DropdownMenuTrigger>
  //             <DropdownMenuContent align="end">
  //               <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //               <DropdownMenuSeparator />
  //               <DropdownMenuItem>
  //                 <Dialog>
  //                   <DialogTrigger>View Reasons</DialogTrigger>
  //                   <DialogContent>
  //                     <DialogHeader>
  //                       <DialogTitle>View Reasons</DialogTitle>
  //                     </DialogHeader>
  //                     <p>{reference.reasons}</p>
  //                   </DialogContent>
  //                 </Dialog>
  //               </DropdownMenuItem>
  //             </DropdownMenuContent>
  //           </DropdownMenu>
  //         </Dialog> */}
  //       </div>
  //     );
  //   },
  // },
];
