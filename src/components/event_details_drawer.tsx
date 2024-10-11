"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useQuery } from "@tanstack/react-query";
import { fetchEvent } from "@/actions/events";
import Loader from "@/app/(landing)/components/loader";

export function DrawerDialogDemo({ id }: { id: string }) {
  const [open, setOpen] = React.useState(false);

  const { data: event } = useQuery({
    queryKey: ["event"],
    queryFn: async () => await fetchEvent(id),
    refetchInterval: 60 * 1000,
  });

  // Type Guarding to ensure that
  // event.nomination_period and
  // event.voting_period are strings before parsing them.
  const nom_per =
    event && typeof event.nomination_period === "string"
      ? (JSON.parse(event.nomination_period) as Period)
      : null;

  const vot_per = event?.voting_period;

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant={"link"} className=" font-light">
          View event Details
        </Button>
      </DrawerTrigger>
      <DrawerContent className=" pb-4">
        <div className=" w-full p-4  lg:w-3/5 mx-auto ">
          <div className="text-center mt-6">
            <p className=" text-3xl font-semibold">{event?.name}</p>
            <p className=" max-w-xl my-2 mx-auto">{event?.description}</p>
          </div>
          <div className=" flex items-center gap-2 lg:gap-4 flex-col lg:flex-row justify-center text-center md:text-left">
            {vot_per && (
              <div className="mt-5 border border-secondary bg-accent/30 p-2 rounded-lg">
                <div>
                  <p className="text-secondary font-semibold">Voting Period</p>
                  <p className="text-neutral-700 text-sm">
                    {format(vot_per?.start_date, "PPP")} -{" "}
                    {format(vot_per?.end_date, "PPP")}
                  </p>
                </div>
              </div>
            )}
            {nom_per && Object.keys(nom_per).length !== 0 && (
              <div className="mt-5  border border-secondary bg-accent/30 p-2 rounded-lg">
                <div>
                  <p className="text-secondary font-semibold">
                    Nomination Period
                  </p>
                  <p className="text-neutral-700 text-sm">
                    {format(nom_per.start_date, "PPP")} -{" "}
                    {format(nom_per.end_date, "PPP")}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
