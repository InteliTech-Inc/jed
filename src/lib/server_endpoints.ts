import { dbServer } from "./supabase";
import { cookies } from "next/headers";

const db = dbServer(cookies);

export const getServerUser = async () => {
  const {
    data: { user },
  } = await db.auth.getUser();
  return user;
};

export const uploadImage = async ({ file, path }: { file: File; path: string }) => {
  const { data, error } = await db.storage.from("events").upload(path, file, {
    contentType: "image/*",
  });

  if (error) throw new Error(error.message);
  return data;
};

 export const createEvent = async (eventPayload: any) => {
    const { data, error } = await db
      .from("events")
      .insert([eventPayload])
      .select();
    if (error) throw new Error(error.message);
    return data;
  };