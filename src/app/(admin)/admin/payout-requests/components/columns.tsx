"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreVertical } from "lucide-react";
import { FilterFn } from "@tanstack/react-table";
import { PayoutResponse } from "@/types/types";
import { db } from "@/lib/supabase";
import { toast } from "sonner";
import { useState } from "react";
import Spinner from "@/components/spinner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
        <div className="text-green-500">
          {new Intl.NumberFormat("en-US", {}).format(Number(amount))}
        </div>
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
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { transaction_status } = row.original;

      return (
        <p
          className={`${
            transaction_status === true ? "text-green-500" : "text-red-500"
          }`}
        >
          {transaction_status === true ? "Settled" : "Unsettled"}
        </p>
      );
    },
  },
  {
    header: "",
    id: "actions",
    cell: ({ row }) => {
      const { amount, transaction_status } = row.original;

      const [paid, setPaid] = useState<boolean>(false);

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

                  setPaid(transaction_status as boolean);

                  // So if the withdrawal is successfull I would like to deduct the amount taken from the payout table's withdrawal column and update the db
                  const remaining = Number(data?.withdrawable) - Number(amount);

                  if (user) {
                    const { error } = await db
                      .from("payouts")
                      .update({
                        paid_out_amount: Number(amount),
                        withdrawable: remaining,
                        is_paid: !paid,
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
        <div className="">
          <Popover>
            <PopoverTrigger
              disabled={transaction_status === true}
              className="disabled:cursor-not-allowed disabled:opacity-50"
            >
              <MoreVertical size={16} className="ml-2" />
            </PopoverTrigger>
            <PopoverContent className="w-36 mr-10 py-2">
              <button
                className="text-left text-sm w-full"
                onClick={handleToggle}
              >
                Pay Now
              </button>
            </PopoverContent>
          </Popover>
        </div>
      );
    },
  },
];
