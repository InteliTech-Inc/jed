import { Button } from "@/components/ui/button";
import React from "react";

type Props = {
  params: { id: string };
};

export default function SingleEvent({ params: { id } }: Props) {
  return (
    <section>
      <div className="flex items-center justify-between gap-x-4">
        <div>
          <h1 className="text-2xl font-semibold leading-none tracking-tight">
            Event Name
          </h1>
        </div>
        <div className="space-x-4">
          <Button variant={"secondary"}>Add Category</Button>
          <Button>Create Nomination</Button>
        </div>
      </div>
    </section>
  );
}
