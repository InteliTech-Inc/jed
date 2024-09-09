import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { db } from "@/lib/supabase";
import { toast } from "sonner";
import { QueryError } from "@supabase/supabase-js";
import { Json } from "@/types/supabase";

type TableName =
  | "events"
  | "categories"
  | "nominees"
  | "nomination_period"
  | "nominations"
  | "schedules"
  | "voting"
  | "voting_period"
  | "waitlist"
  | "withdrawals";

type Payload =
  | {
      category_name?: string | null | undefined;
      created_at?: string | undefined;
      event_id?: string | null | undefined;
      id?: string | undefined;
    }
  | {
      created_at?: string | undefined;
      // ... 7 more properties ...
      voting_period?: Json | undefined;
    }
  | {
      // ... 7 more objects ...
      // add any additional properties here
    };

/**
 * This function is responsible for creating a mutation (i.e POST, DELETE, & PATCH).
 * @param {string} dbName The name of the database
 * @param {string} key A unique key for react-query to do data invalidation etc.
 * @param {string} [method] The mutation method
 * @param {boolean} [showSucessMsg] if you want to show a custom success message, set this to false
 */
function useCreateRequest({
  dbName,
  key,
  method = "post",
  showSucessMsg = true,
}: {
  dbName: TableName;
  key: string;
  method?: "post" | "patch" | "delete";
  showSucessMsg?: boolean;
}) {
  const queryClient = useQueryClient();
  const { mutateAsync, status, isError, isSuccess, isPending } = useMutation({
    mutationFn: async (payload: Payload) => {
      if (method === "patch") {
        const { data, error } = await db.from(dbName as any).update(payload);

        if (error) throw error;

        if (data) return data;
      }

      const { data, error } = await db
        .from(dbName as any)
        .insert(payload || {})
        .select();

      if (error) throw error; //supabase does not throw error when there is an error. We are throwing an error here so we can handle the error in the onError callback from react-query

      if (data) return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [key] });

      if (showSucessMsg) {
        toast.success("Your action was successful!");
      }
      return data;
    },
    onError: (error: QueryError) => {
      return toast.error(error.details);
    },
  });

  return {
    status,
    isError,
    isSuccess,
    isPending,
    mutateAsync,
  };
}

export { useCreateRequest as useCreateMutation };
