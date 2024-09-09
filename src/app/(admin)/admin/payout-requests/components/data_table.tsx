"use client";

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table";
import Image from "next/image";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import TopButtons from "./top_buttons";
import { PayoutResponse } from "@/types/types";

interface DataTableProps<TValue> {
  columns: ColumnDef<PayoutResponse, TValue>[];
  data: PayoutResponse[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    initialState: { pagination: { pageSize: 4 } },
  });

  const filterValue =
    (table.getColumn("event_name")?.getFilterValue() as string) ?? "";

  return (
    <div>
      <div className="flex flex-col-reverse md:flex-row items-end gap-4 justify-between py-4">
        <Input
          placeholder="Search by event name"
          value={filterValue}
          onChange={(event) => {
            return table
              .getColumn("event_name")
              ?.setFilterValue(event.target.value);
          }}
          className="max-w-sm w-full"
        />
        <TopButtons results={data} />
      </div>
      <div className="rounded-md border mt-6 bg-white ">
        <Table className="">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className=" border-y ">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-y "
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className=" hover:bg-none">
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <section className="flex min-h-[55dvh] flex-col items-center justify-center">
                    <Image
                      src={"/images/no-docs.svg"}
                      width={200}
                      height={200}
                      alt={"Empty notification inbox"}
                    />
                    {filterValue ? (
                      <p>
                        {" "}
                        Sorry, there are no results available for your search "
                        {filterValue}"
                      </p>
                    ) : (
                      <p className="mt-5 text-center text-gray-600">
                        Sorry, there are no nominations available.
                      </p>
                    )}
                  </section>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between my-4">
        <p className="text-sm text-black/80 font-normal">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </p>
        <div className="space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
