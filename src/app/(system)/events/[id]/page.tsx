import { Suspense } from "react";
import Spinner from "@/components/spinner";
import EventDetails from "./components/event_details";

type Props = {
  params: { id: string };
};

export default async function SingleEvent({ params: { id } }: Props) {
  return (
    <section className="p-4">
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
