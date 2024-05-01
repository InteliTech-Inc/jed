import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function EventsPage() {
  return (
    <div>
      <div className="flex justify-between items-center gap-5">
        <div>
          <h3 className="text-2xl font-semibold leading-none tracking-tight">
            Events
          </h3>
        </div>
        <div>
          <Link href={"/events/create"}>
            <Button>Create Event</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EventsPage;
