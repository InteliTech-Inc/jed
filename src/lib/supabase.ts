import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequestCookies } from "next/dist/server/api-utils";
import { cookies } from "next/headers";
const supabase = createClientComponentClient();

export function dbServer(cookies: any) {
  return createServerComponentClient({ cookies });
}

export { supabase as db };
