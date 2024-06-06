"use client";

import { db } from "@/lib/supabase";

const uploadImage = async ({ file, path }: { file: File; path: string }) => {
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

type NomineePayload = {
  full_name: string;
  code: string;
  category_id?: string;
  category?: string;
  img_url: string;
  event_id: string;
  user_id?: string;
};

const UpdateNomineeDetails = async (
  payload: NomineePayload,
  user_id: string
) => {
  const { data, error } = await db
    .from("nominees")
    .update(payload)
    .eq("id", user_id)
    .single();

  if (error) return new Error(error.message);
  return data;
};

const addNominee = async (payload: NomineePayload) => {
  const { data, error } = await db
    .from("nominees")
    .insert({
      ...payload,
      user_id: payload.user_id || "",
    })
    .select("*");
  if (error) return new Error(error.message);
  return data;
};

export { uploadImage, createEvent, UpdateNomineeDetails, addNominee };
