import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";

const supabase = createClientComponentClient<Database>();

export function dbServer<T>(cookies: any) {
  return createServerComponentClient<Database>({ cookies });
}

export { supabase as db };
