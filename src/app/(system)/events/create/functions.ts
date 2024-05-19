"use client";

import { db } from "@/lib/supabase";

const uploadEventImage = async ({
  file,
  path,
}: {
  file: File;
  path: string;
}) => {
  const { data, error } = await db.storage.from("events").upload(path, file, {
    contentType: "image/*",
  });

  if (error) return new Error(error.message);
  return data;
};

type EventPayload = {
  name: string;
  description: string;
  user_id: string;
  img_url: string;
  is_completed: boolean;
};

const createEvent = async (payload: EventPayload) => {
  const { data, error } = await db.from("events").insert(payload).select("*");

  if (error) return new Error(error.message);
  return data;
};

export { uploadEventImage, createEvent };
