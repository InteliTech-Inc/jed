import { Suspense } from "react";
import EditEvent from "./components/edit_event";

type EditEventProps = {
  params: { id: string };
};
export default async function EditEventPage({
  params: { id },
}: EditEventProps) {
  return (
    <section className="p-4">
      <section className=" mb-4 max-w-screen-sm">
        <p className=" text-4xl text-neutral-700 mb-2 font-semibold">
          Edit Event
        </p>
      </section>
      <Suspense>
        <EditEvent id={id} />
      </Suspense>
    </section>
  );
}
