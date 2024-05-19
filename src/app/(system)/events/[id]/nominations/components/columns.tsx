"use client";

import { ColumnDef } from "@tanstack/react-table";
import { NominationsResponse } from "@/types/types";
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
  },

  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const data = row.original;
      return <div>{data.email}</div>;
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
