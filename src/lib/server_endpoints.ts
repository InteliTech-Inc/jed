import { dbServer } from "./supabase";
import { cookies } from "next/headers";

const db = dbServer(cookies);

export const getServerUser = async () => {
  const {
    data: { user },
  } = await db.auth.getUser();
  return user;
};
