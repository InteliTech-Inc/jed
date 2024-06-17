"use client";
import Spinner from "@/components/spinner";
import { Switch } from "@/components/ui/switch";
import { db } from "@/lib/supabase";
import React, { useState } from "react";
import { toast } from "sonner";

type Props = {
  id: string;
};

export default function EventSwitch({ id }: Props) {
  const [publishNomination, setPublishNomination] = useState<boolean>(false);

  const handleToggle = () => {
    toast.warning(
      `Are you sure you want to ${
        !publishNomination ? "publish" : "unpublish"
      } this event?`,
      {
        action: {
          label: "Yes",
          onClick: async () => {
            toast.promise(
              async () => {
                const { error } = await db
                  .from("events")
                  .update({ is_completed: !publishNomination })
                  .eq("id", id);
                if (!error) {
                  setPublishNomination(!publishNomination); // Update state only on successful DB update
                  toast.success(
                    `Event ${
                      !publishNomination ? "published" : "unpublished"
                    } successfully`
                  );
                  return;
                }
                toast.error(error.message);
              },
              {
                loading: <Spinner />,
              }
            );
          },
        },
      }
    );
  };

  return (
    <div className="flex items-center gap-x-3">
      <p className="hidden md:block">
        {!publishNomination ? "Publish Event" : "Unpublish Event"}
      </p>
      <Switch
        aria-readonly
        onCheckedChange={handleToggle}
        checked={publishNomination}
      />
    </div>
  );
}
