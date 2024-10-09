"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

type Props = {
  event: {
    name: string;
    description: string;
    voting_period: Period | any;
    nomination_period: Period | any;
  };
};

export function DrawerDialogDemo({ event }: Props) {
  const [open, setOpen] = React.useState(false);

  const nom_per = JSON.parse(event.nomination_period);
  const vot_per = JSON.parse(event.voting_period);

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
            <p className=" text-3xl font-semibold">{event.name}</p>
            <p className=" max-w-xl my-2 mx-auto">{event.description}</p>
          </div>
          <div className=" flex items-center gap-2 lg:gap-4 flex-col lg:flex-row justify-center text-center md:text-left">
            {event?.voting_period && (
              <div className="mt-5 border border-secondary bg-accent/30 p-2 rounded-lg">
                <div>
                  <p className="text-secondary font-semibold">Voting Period</p>
                  <p className="text-neutral-700 text-sm">
                    {format(vot_per.start_date, "PPP")} -{" "}
                    {format(vot_per.end_date, "PPP")}
                  </p>
                </div>
              </div>
            )}
            {event.nomination_period &&
              Object.keys(event?.nomination_period).length !== 0 && (
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
