"use client";
import React, { useEffect, useState } from "react";
import Spinner from "@/components/spinner";
import { Switch } from "@/components/ui/switch";
import { db } from "@/lib/supabase";
import { toast } from "sonner";

type Props = {
  id: string;
};

export default function EventSwitch({ id }: Props) {
  const [publishNomination, setPublishNomination] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch the current state from the database when the component mounts
  useEffect(() => {
    const fetchEventStatus = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await db
          .from("events")
          .select("is_completed")
          .eq("id", id)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          setPublishNomination(data.is_completed);
        }
      } catch (error) {
        toast.error(`Failed to fetch event status`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventStatus();
  }, [id]);

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

  if (isLoading) {
    return <Spinner />;
  }

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
