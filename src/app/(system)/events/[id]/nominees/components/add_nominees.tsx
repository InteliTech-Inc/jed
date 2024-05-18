"use client";
import { Button } from "@/components/ui/button";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Rotating_Lines from "@/components/rotating_lines";
import { useCreateMutation } from "@/hooks/use_create_mutation";
import { nomineeFormShape } from "@/lib/validations";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ImageDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { checkConnection } from "@/lib/utils";

// Define the category type
type Category = {
  id: string;
  category_name: string;
  event_id: string;
};

export default function AddNominees({ data, user_id }: any) {
  const supabase = createClientComponentClient();

  const url = usePathname();
  const segments = url.split("/");
  const id = segments[segments.length - 2];

  const router = useRouter();

  const [isPending, setIsPending] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const form = useForm<z.infer<typeof nomineeFormShape>>({
    resolver: zodResolver(nomineeFormShape),
    defaultValues: {
      full_name: "",
      code: "",
      category: "",
    },
  });

  const inputValues = form.watch();

  // Generate a random code logic here
  const generateCode = () => {
    // Generate two random characters between a and z
    let char1 = String.fromCharCode(97 + Math.floor(Math.random() * 26));
    let char2 = String.fromCharCode(97 + Math.floor(Math.random() * 26));

    // Generate two random integers between 0 and 9
    let int1 = Math.floor(Math.random() * 10);
    let int2 = Math.floor(Math.random() * 10);

    // Combine the random characters and integers
    let randomCode = char1 + char2 + int1 + int2;

    form.setValue("code", randomCode.toString().toUpperCase());
  };

  const { mutateAsync: CreateNominees } = useCreateMutation({
    dbName: "nominees",
    key: "nominee",
    showSucessMsg: false,
  });

  function UploadImageToForm(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        const dataURL = reader.result;
        if (typeof dataURL === "string") {
          setPreview(dataURL);
        }
      };

      reader.readAsDataURL(file as File);
    } else {
      return;
    }
  }

  async function handleNomination(values: z.infer<typeof nomineeFormShape>) {
    checkConnection();

    // Using a random string to avoid conflicts with other files
    const randomString = Math.random().toString(36).substring(2, 15);
    5;

    // Getting the file extension
    const slicedName = selectedFile?.name.slice(
      selectedFile?.name.lastIndexOf(".")
    );

    // biome-ignore lint/style/noNonNullAssertion: <the users always upload a picture>
    const file = selectedFile!;

    if (file === null) {
      toast.error("Please upload an image");
      return;
    }

    try {
      setIsPending(true);

      const { data, error } = await supabase.storage
        .from("events")
        .upload(`nominees/jed-${randomString}${slicedName}`, file, {
          contentType: "image/*",
        });

      if (error) {
        console.log(error);
        toast.error("Something went wrong");
        return;
      }

      const payload = {
        full_name: values.full_name,
        code: values.code,
        category: values.category,
        event_id: id,
        img_url: data?.path,
        user_id,
      };
      await CreateNominees(payload)
        .then(() => {
          setIsPending(false);
          toast.success("Nominee added successfully");
          form.reset();
          setSelectedFile(null);
        })
        .catch((error) => {
          setIsPending(false);
          toast.error("An error occurred while adding nominee");
        });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    } finally {
      setIsPending(false);
    }
  }

  // Subscribing to the realtime changes
  useEffect(() => {
    const channel = supabase
      .channel("realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "nominees",
        },
        () => {
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Add Nominee</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Nominee</DialogTitle>
          <DialogDescription>
            Add the nominee for the event to be voted for by the users
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleNomination)}
            className="mx-auto font-sans md:w-full flex flex-col justify-center items-center overflow-auto"
          >
            <div className="flex flex-col w-full items-center justify-center my-3 space-y-4">
              <div className="relative w-full">
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <Label htmlFor="code">Nominees's Code</Label>
                      <FormControl>
                        <Input
                          id="code"
                          type="text"
                          autoComplete="off"
                          placeholder="Please generate a code for the nominee"
                          readOnly
                          disabled
                          className="border border-accent focus-visible:ring-1 focus-visible:ring-secondary focus-visible:ring-opacity-50 focus-visible:border-transparent"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage {...field} />
                    </FormItem>
                  )}
                />

                <div className="absolute top-[3.2rem] right-0">
                  <Button
                    variant={"outline"}
                    type="button"
                    onClick={generateCode}
                    className="absolute top-[50%] right-0 transform translate-y-[-50%]"
                  >
                    Generate Code
                  </Button>
                </div>
              </div>
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Label htmlFor="full_name">Nominees's Full Name</Label>
                    <FormControl>
                      <Input
                        id="full_name"
                        type="text"
                        autoComplete="off"
                        placeholder="Enter nominee's full name"
                        className="border border-accent focus:border-secondary focus-visible:ring-1 focus-visible:ring-secondary focus-visible:ring-opacity-50 focus-visible:border-transparent"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage {...field} />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Label>Category</Label>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select nominee's category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {data.map((categories: any) => {
                          return categories.categories.map(
                            (category: Category) => {
                              if (category.event_id === id) {
                                return (
                                  <SelectItem
                                    key={category.id}
                                    value={category.category_name}
                                  >
                                    {category.category_name}
                                  </SelectItem>
                                );
                              }
                            }
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <section className="border rounded-md shadow-sm w-full my-4">
                <Label
                  htmlFor="imageUpload"
                  className="w-auto gap-2 flex flex-row items-center justify-center text-sm rounded-[4px] hover:cursor-pointer hover:underline p-3"
                >
                  {selectedFile ? (
                    <span>Uploaded File: {selectedFile.name}</span>
                  ) : (
                    <div className="flex items-center gap-5">
                      <ImageDown />
                      <span>Upload Nominee's Image</span>
                    </div>
                  )}
                </Label>
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  onChange={(e) => UploadImageToForm(e)}
                  className="hidden relative h-[0.1px] -z-50"
                />
              </section>
            </div>
            <Button
              type="submit"
              className="w-full bg-secondary hover:bg-secondary hover:bg-opacity-80 focus:outline-none transition-colors duration-200 ease-in-out disabled:bg-secondary"
              disabled={
                inputValues.full_name.length === 0 ||
                inputValues.code.length === 0 ||
                inputValues.category.length === 0 ||
                isPending
              }
            >
              {isPending && <Rotating_Lines />}
              Create Nominee
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
