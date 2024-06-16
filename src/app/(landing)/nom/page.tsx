"use client";
import { useSearchParams } from "next/navigation";
import NominationForm from "@/app/(system)/events/[id]/nominations/components/nomination_form";
import { useRouter } from "next/navigation";

export default function NominationsPage() {
  const search = useSearchParams();
  const router = useRouter();

  const eventId = search.get("id");
  console.log(eventId);

  if (!eventId) {
    router.push("/");
    return;
  }
  return (
    <div className="mb-36">
      <NominationForm id={eventId} />;
    </div>
  );
}
