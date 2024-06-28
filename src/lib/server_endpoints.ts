import { dbServer } from "./supabase";
import { cookies } from "next/headers";
import { db } from "./supabase";

export const getServerUser = async () => {
  const db = dbServer(cookies);
  const {
    data: { user },
  } = await db.auth.getUser();
  return user;
};

export const uploadImage = async ({
  file,
  path,
}: {
  file: File;
  path: string;
}) => {
  const db = dbServer(cookies);
  const { data, error } = await db.storage.from("events").upload(path, file, {
    contentType: "image/*",
  });

  if (error) throw new Error(error.message);
  return data;
};

export const createEvent = async (eventPayload: any) => {
  const db = dbServer(cookies);
  const { data, error } = await db
    .from("events")
    .insert([eventPayload])
    .select();
  if (error) throw new Error(error.details);
  return data;
};

export const addEmailToWaitlist = async (email: string) => {
  const { data, error } = await db.from("waitlist").insert({ email }).select();
  if (error) {
    throw new Error(error.details);
  }
  return data;
};
