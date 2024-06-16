"use client";
import { Trash2 } from "lucide-react";
import React, { useEffect } from "react";
import { db } from "@/lib/supabase";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Spinner from "@/components/spinner";

type Props = {
  id: string;
};

export default function DeleteButton({ id }: Props) {
  const router = useRouter();

  const handleDelete = async () => {
    toast.error("Are you sure you want to delete this category?", {
      action: {
        label: "Yes",
        onClick: async () => {
          toast.promise(
            async () => {
              const { error } = await db
                .from("categories")
                .delete()
                .eq("id", id);
              if (!error) {
                toast.success("Category deleted successfully");
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
    });
  };

  useEffect(() => {
    const channels = db
      .channel("category_deleting")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "categories" },
        (payload) => {
          console.log("Change received!", payload);
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      db.removeChannel(channels);
    };
  }, [router, db]);
  return (
    <Trash2
      size={16}
      className="text-secondary cursor-pointer"
      onClick={handleDelete}
    />
  );
}
