"use client";
import {
  CheckIcon,
  MoreHorizontal,
  ViewIcon,
  CheckCheckIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { XIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Row } from "@tanstack/react-table";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Spinner from "@/components/spinner";
import { EventsResponse } from "./columns";
import { format } from "date-fns";

export default function AdminEventsTableRowActions({
  row,
}: {
  row: Row<EventsResponse>;
}) {
  const [status, setStatus] = useState<"pending" | "error" | "success" | null>(
    null
  );
  const [action, setAction] = useState<
    "accept" | "decline" | "submit" | "view" | null
  >(null);
  const axiosAuth = "hele";
  const router = useRouter();
  const reference = row.original;

  const handleResponse = async (response: boolean) => {
    // setStatus("pending");
    // try {
    //   const res = await axiosAuth.post(
    //     ``
    //   );
    //   if (res.status === 200) {
    //     setStatus("success");
    //     toast({
    //       title: "Successfull ✅",
    //       description: ``,
    //     });
    //   }
    // } catch (err) {
    //   setStatus("error");
    //   return toast({
    //     variant: "destructive",
    //     title: "Something went wrong",
    //     description: ``,
    //   });
    // } finally {
    //   router.refresh();
    // }
  };

  const handleSubmit = async (response: boolean) => {
    // setStatus("pending");
    // try {
    //   const res = await axiosAuth.post(
    //     ``
    //   );
    //   if (res.status === 200) {
    //     setStatus("success");
    //     return toast({
    //       title: "Successfull ✅",
    //       description: ``,
    //     });
    //   }
    // } catch (err) {
    //   setStatus("error");
    //   return toast({
    //     variant: "destructive",
    //     title: "Something went wrong",
    //     description: ``,
    //   });
    // } finally {
    //   router.refresh();
    // }
  };

  const handleDialogConfirmation = async () => {
    if (action === "submit") {
      await handleSubmit(true);
      return;
    }

    if (action === "decline") {
      handleResponse(false);
      return;
    }

    handleResponse(true);
    return;
  };

  if (!reference) return <p>No data provided</p>;

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            {status === "pending" ? (
              <Spinner />
            ) : (
              <MoreHorizontal className="h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DialogTrigger asChild onClick={() => setAction("view")}>
              <DropdownMenuItem className="gap-2">
                <p>
                  <ViewIcon size={14} />
                </p>
                View event details
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuGroup>

          {reference.status === "pending" && (
            <DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Respond action</DropdownMenuLabel>
              <DialogTrigger asChild onClick={() => setAction("accept")}>
                <DropdownMenuItem className="gap-2">
                  <p>
                    <CheckIcon size={14} />
                  </p>
                  <span>Accept</span>
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogTrigger asChild onClick={() => setAction("decline")}>
                <DropdownMenuItem className="gap-2">
                  <p>
                    <XIcon size={14} />
                  </p>
                  <span>Decline</span>
                </DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuGroup>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent onInteractOutside={(_) => setAction(null)}>
        {action === "view" ? (
          <div>
            <DialogHeader>
              <DialogTitle>{reference.name}</DialogTitle>
              <DialogDescription className=" py-4 text-neutral-800 dark:text-neutral-200">
                {reference.description}
              </DialogDescription>
            </DialogHeader>
            <div>
              <p className=" my-2">GHS {reference.amount_per_vote} per vote.</p>
              <div className=" mb-5 flex gap-2 lg:gap-4 flex-col lg:flex-row  text-center md:text-left">
                {reference?.voting_period && (
                  <div className="border border-secondary bg-accent/30 p-2 rounded-lg">
                    <div>
                      <p className="text-secondary font-semibold">
                        Voting Period
                      </p>
                      <p className="text-neutral-700 text-sm">
                        {format(reference.voting_period.start_date, "PPP")} -{" "}
                        {format(reference.voting_period.end_date, "PPP")}
                      </p>
                    </div>
                  </div>
                )}
                {reference.nomination_period &&
                  Object.keys(reference?.nomination_period).length !== 0 && (
                    <div className="border border-secondary bg-accent/30 p-2 rounded-lg">
                      <div>
                        <p className="text-secondary font-semibold">
                          Nomination Period
                        </p>
                        <p className="text-neutral-700 text-sm">
                          {format(
                            reference.nomination_period.start_date || "",
                            "PPP"
                          )}{" "}
                          -{" "}
                          {format(
                            reference.nomination_period.end_date || "",
                            "PPP"
                          )}
                        </p>
                      </div>
                    </div>
                  )}
              </div>
            </div>
            <DialogFooter className=" gap-2">
              <DialogClose asChild>
                <Button
                  onClick={() => setAction(null)}
                  variant={"destructive"}
                  type="button"
                >
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </div>
        ) : (
          <div>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription className=" py-4 text-neutral-800 dark:text-neutral-200">
                {`Are you sure you want to ${action?.toLocaleUpperCase()} the
            request? This action cannot be reversed`}
                .
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className=" gap-2">
              <DialogClose asChild>
                <Button
                  type="button"
                  onClick={() => handleDialogConfirmation()}
                >
                  Yes, confirm
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  onClick={() => setAction(null)}
                  variant={"destructive"}
                  type="button"
                >
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
