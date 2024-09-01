"use client";

import { ColumnDef } from "@tanstack/react-table";
import { NominationsResponse } from "@/types/types";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { FilterFn } from "@tanstack/react-table";
import { Switch } from "@/components/ui/switch";
import { PayoutResponse } from "./data_table";
import { db } from "@/lib/supabase";
import { toast } from "sonner";
import { useState } from "react";
import Spinner from "@/components/spinner";

const multiColumnFilterFn: FilterFn<PayoutResponse> = (
  row,
  columnId,
  filterValue
) => {
  // Concatenate the values from multiple columns into a single string
  const searchableRowContent = `${row.original.event_name}`;

  // Perform a case-insensitive comparison
  return searchableRowContent.toLowerCase().includes(filterValue.toLowerCase());
};

export const columns: ColumnDef<PayoutResponse>[] = [
  {
    accessorKey: "event_name",
    header: "Event Name",
    filterFn: multiColumnFilterFn,
  },

  {
    accessorKey: "amount",
    header: "Amount (GHC)",
    cell: ({ row }) => {
      const { amount } = row.original;
      return (
        <div> {new Intl.NumberFormat("en-US", {}).format(Number(amount))}</div>
      );
    },
  },
  {
    accessorKey: "payment_method",
    header: "Payment Method",
    cell: ({ row }) => {
      const data = row.original;
      return <div>{data.payment_method}</div>;
    },
  },
  {
    accessorKey: "account_number",
    header: "Accont Number",
    cell: ({ row }) => {
      const data = row.original;
      return <div>{data.account_number}</div>;
    },
  },
  {
    accessorKey: "account_name",
    header: "Accont Name",
    cell: ({ row }) => {
      const data = row.original;
      return <div>{data.account_name}</div>;
    },
  },
  {
    accessorKey: "provider",
    header: "Provider",
    cell: ({ row }) => {
      const data = row.original;
      return <div>{data.provider}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=" pl-2"
        >
          Transaction Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { amount, transaction_status } = row.original;

      const [publishNomination, setPublishNomination] =
        useState<boolean>(false);

      const handleToggle = () => {
        toast.warning(`Are you sure you want to pay this event?`, {
          action: {
            label: "Yes",
            onClick: async () => {
              toast.promise(
                async () => {
                  const {
                    data: { user },
                  } = await db.auth.getUser();

                  //  Fetch withdrawable from the payouts table
                  const { data } = await db
                    .from("payouts")
                    .select("withdrawable, is_paid")
                    .single();

                  setPublishNomination(transaction_status as boolean);

                  // So if the withdrawal is successfull I would like to deduct the amount taken from the payout table's withdrawal column and update the db
                  const remaining = Number(data?.withdrawable) - Number(amount);

                  if (user) {
                    const { error } = await db
                      .from("payouts")
                      .update({
                        paid_out_amount: Number(amount),
                        withdrawable: remaining,
                        is_paid: !publishNomination,
                      })
                      .eq("user_id", user?.id as string);

                    if (!error) {
                      toast.success("Transaction updated successfully!");
                      window.location.reload();
                    }
                  }
                },
                {
                  loading: <Spinner />,
                }
              );
            },
          },
        });
      };

      return (
        <div className="flex items-center justify-start gap-x-3">
          <p>{!publishNomination === true ? "Paid" : "Unpaid"}</p>
          <Switch
            aria-readonly
            onCheckedChange={handleToggle}
            checked={transaction_status}
            disabled={transaction_status}
          />
        </div>
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
