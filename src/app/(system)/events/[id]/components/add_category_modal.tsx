"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
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
import Link from "next/link";
import { toast } from "sonner";
import { Trash2, Plus } from "lucide-react";

type Props = {
  event_id: {
    id: string;
  };
};

export default function AddCategoryModal({ event_id: { id } }: Props) {
  const [categories, setCategories] = useState<Array<string>>([""]);

  const { mutateAsync: CreateCategory } = useCreateMutation({
    dbName: "categories",
    key: "categories",
    showSucessMsg: false,
  });

  // Submit category form
  async function handleCategory(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
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

  return (
    <div className="space-x-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary">Add Category</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Event Category </DialogTitle>
            <DialogDescription>
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
      <Link href={`/events/${id}/nominations`}>
        <Button>Create Nomination</Button>
      </Link>
    </div>
  );
}
