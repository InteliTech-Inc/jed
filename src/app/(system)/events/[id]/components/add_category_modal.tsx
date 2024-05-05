"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { db } from "@/lib/supabase";
import { useCreateMutation } from "@/hooks/use_create_mutation";
import Link from "next/link";

type Props = {
  event_id: {
    id: string;
  };
};

export default function AddCategoryModal({ event_id: { id } }: Props) {
  const [event, setEvent] = React.useState<string>("");

  const { mutateAsync: CreateCategory } = useCreateMutation({
    dbName: "categories",
    key: "categories",
    showSucessMsg: false,
  });

  async function handleCategory(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = {
      category_name: event,
      event_id: id,
    };
    CreateCategory(data)
      .then((_) => {
        console.log("Category created");
        setEvent("");
      })
      .catch((error) => {
        console.error("Error creating category", error);
      });
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
              <div className="flex flex-col items-center gap-4">
                <Input
                  id="name"
                  type="text"
                  autoComplete="off"
                  placeholder="Enter category name"
                  className="border border-accent focus-visible:ring-1 focus-visible:ring-secondary focus-visible:ring-opacity-50 focus-visible:border-transparent"
                  required
                  value={event}
                  onChange={(e) => setEvent(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Link href={`/events/${id}/nomination`}>
        <Button>Create Nomination</Button>
      </Link>
    </div>
  );
}
