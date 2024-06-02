import NominationsTable from "./components/nominations_table";
import { Suspense } from "react";
import Spinner from "@/components/spinner";
export default function NominationPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <section className="p-4">
      <section className=" mb-4 max-w-screen-sm">
        <p className=" text-4xl text-neutral-700 mb-2 font-semibold">
          Nominations
        </p>
        <p className=" text-neutral-600">
          View and manage nominations. You can copy the link of the nominations
          forms for this event and download the nominations results.
        </p>
      </section>

      <Suspense
        fallback={
          <div className=" w-full grid place-content-center">
            <Spinner />
          </div>
        }
      >
        <NominationsTable id={id} />
      </Suspense>
    </section>
  );
}
