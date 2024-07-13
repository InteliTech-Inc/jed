"use client";

import { ColumnDef } from "@tanstack/react-table";
import { NominationsResponse } from "@/types/types";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { FilterFn } from "@tanstack/react-table";
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

export const columns: ColumnDef<NominationsResponse>[] = [
  {
    accessorKey: "full_name",
    header: "Full Name",
    filterFn: multiColumnFilterFn,
  },

  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=" pl-2"
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "Phone Number",
    cell: ({ row }) => {
      const data = row.original;
      return <div>{data.phone}</div>;
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const data = row.original;
      return <div>{data.categories?.category_name}</div>;
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
