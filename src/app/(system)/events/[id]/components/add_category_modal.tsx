"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCreateMutation } from "@/hooks/use_create_mutation";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";
import { Trash2, Plus } from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { checkConnection } from "@/lib/utils";

type Props = {
  event_id: {
    id: string;
  };
};

export default function AddCategoryModal({ event_id: { id } }: Props) {
  const [categories, setCategories] = useState<Array<string>>([""]);
  const [open, setOpen] = useState(false);

  const { mutateAsync: CreateCategory } = useCreateMutation({
    dbName: "categories",
    key: "categories",
    showSucessMsg: false,
  });

  // Submit category form
  async function handleCategory(e: React.FormEvent<HTMLFormElement>) {
    checkConnection();

    e.preventDefault();
    checkConnection();

    for (const category of categories) {
      const payload = {
        category_name: category,
        event_id: id,
      };
      CreateCategory(payload)
        .then((_) => {
          toast.success("Category created successfully");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
    setCategories([""]);
  }
  // Add category additional field
  function handleAddCategory() {
    if (categories.length < 3) {
      setCategories([...categories, ""]);
    } else {
      toast.error("You can only add a maximum of 3 fields per request");
    }
  }

  // Remove category field
  function handleDeleteCategory(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    const index = Number(event.currentTarget.dataset.index);
    if (categories.length > 1) {
      const newCategories = [...categories];
      newCategories.splice(index, 1);
      setCategories(newCategories);
    } else {
      toast.error("You must have at least one field for a category");
    }
  }
  // Track category field changes
  function handleCategoryChange(index: number, value: string) {
    const newCategories = [...categories];
    newCategories[index] = value;
    setCategories(newCategories);
  }

  const supabase = createClientComponentClient();
  const router = useRouter();

  // RealTime for categories
  useEffect(() => {
    const category_channel = supabase
      .channel("realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "categories",
        },
        () => {
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(category_channel);
    };
  }, [supabase, router]);

  return (
    <div className="space-x-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="secondary" className=" gap-2">
            <PlusIcon size={14} />
            Add Category
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <p className="text-left text-xl font-semibold">
              Add Event Category{" "}
            </p>
            <DialogDescription className="text-left">
              Add a category to your event to help organize your nominations.
            </DialogDescription>
          </DialogHeader>

          <form action="" onSubmit={handleCategory}>
            <div className="grid gap-4 py-4">
              {categories.map((category, index) => (
                <div key={index} className="flex flex-col items-center gap-4">
                  <Input
                    id={`name${index}`}
                    type="text"
                    placeholder="Enter category name"
                    className="border border-accent focus-visible:ring-1 focus-visible:ring-secondary focus-visible:ring-opacity-50 focus-visible:border-transparent"
                    required
                    value={category}
                    onChange={(e) =>
                      handleCategoryChange(index, e.target.value)
                    }
                  />
                </div>
              ))}
              <div className="flex gap-4 ">
                <Button
                  type="button"
                  onClick={handleAddCategory}
                  variant={"outline"}
                  className="w-full space-x-1"
                >
                  <Plus size={16} />
                  <span>Add Field</span>
                </Button>
                <Button
                  type="button"
                  onClick={handleDeleteCategory}
                  variant={"destructive"}
                  className="w-full space-x-1"
                >
                  <Trash2 size={16} />
                  <span>Delete Field</span>
                </Button>
              </div>
              <Button type="submit">Save changes</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
