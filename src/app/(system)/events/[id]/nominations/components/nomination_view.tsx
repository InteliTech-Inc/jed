"use client";
import { useSearchParams } from "next/navigation";
import NominationForm from "@/app/(system)/events/[id]/nominations/components/nomination_form";
import { useRouter } from "next/navigation";

export default function NominationView() {
  const search = useSearchParams();
  const router = useRouter();

  const eventId = search.get("id");

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
