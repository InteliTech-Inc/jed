import { Metadata } from "next";
import { db } from "@/lib/supabase";
import NominationView from "@/app/(system)/events/[id]/nominations/components/nomination_view";
import { redirect } from "next/navigation";
export async function generateStaticParams() {
  const { data: events } = await db.from("events").select("id");

  const idRoutes = events ? events.map((event) => event.id) : [];

  return idRoutes?.map((id) => ({
    id,
  }));
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
  const id = searchParams.id;
  const { data: event } = await db
    .from("events")
    .select(`*`)
    .eq("id", id!)
    .single();
  return {
    title: event?.name,
    description: event?.description,
    openGraph: {
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${event?.img_url}`,
          alt: `${event?.name}'s image`,
        },
      ],
    },
  };
}
export default async function NominationsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const eventId = searchParams?.id;

  if (!eventId) {
    redirect("/");
  }

  return (
    <div className="mb-36">
      <NominationView id={eventId} />;
    </div>
  );
}
