import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
const supabase = createClientComponentClient<Database>();
import { Database } from "@/types/supabase";
import { NextRequest } from "next/server";

export function dbServer<T>(cookies: any) {
  return createServerComponentClient<Database>({ cookies });
}

export { supabase as db };
