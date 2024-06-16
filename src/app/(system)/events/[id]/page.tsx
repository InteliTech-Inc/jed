import { Suspense } from "react";
import Spinner from "@/components/spinner";
import EventDetails from "./components/event_details";

type Props = {
  params: { id: string };
};

export default async function SingleEvent({ params: { id } }: Props) {
  return (
    <section className="p-4">
      <section className=" mb-4">
        <p className=" text-4xl text-neutral-700 mb-2 font-semibold">
          Event details
        </p>
        <p className=" text-neutral-600">
          View and edit the details of your event
        </p>
      </section>

      <Suspense
        fallback={
          <div className=" w-full grid place-content-center">
            <Spinner />
          </div>
        }
      >
        <EventDetails id={id} />
      </Suspense>
    </section>
  );
}
