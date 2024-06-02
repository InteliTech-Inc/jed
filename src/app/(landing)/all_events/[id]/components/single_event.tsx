"use client";
import { Button } from "@/components/ui/button";
import { Json } from "@/types/supabase";
import { useRouter } from "next/navigation";
import React from "react";

type Event = {
  created_at: string;
  name: string;
  description: string;
  img_url: string | null;
  is_completed: boolean;
  user_id: string;
  id: string;
  voting_period: Json;
  nomination_period: Json;
  categories: {
    category_name: string | null;
    event_id: string | null;
    id: string;
  }[];
} | null;

type Props = {
  event: Event;
};

export default function SingleEvent({ event }: Props) {
  const router = useRouter();
  return (
    <div className="text-2xl font-bold text-neutral-600">
      <Button onClick={() => router.back()}>Go Back</Button>
      SingleEvent - {event?.name}
    </div>
  );
}
