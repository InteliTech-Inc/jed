"use client";
import { Button } from "@/components/ui/button";
import React, { ChangeEvent, useEffect, useState } from "react";
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
import { nomineeFormShape } from "@/lib/validations";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { ImageDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { Category_sup as Category } from "@/types/types";
import { checkConnection } from "@/lib/utils";
import {
  UpdateNomineeDetails,
  uploadImage,
} from "@/app/(system)/events/create/functions";

export default function UpdateNomineeForm({ data, categories }: any) {
  const supabase = createClientComponentClient();

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

  useEffect(() => {
    form.setValue("code", data.code);
    form.setValue("full_name", data.full_name);
    form.setValue("category", data.categories.category_name);
  }, []);

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

  async function handleUpdate(values: z.infer<typeof nomineeFormShape>) {
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

    try {
      setIsPending(true);

      const filePath =
        file !== null
          ? `nominees/jed-${randomString}${slicedName}`
          : data.img_url;

      const payload = {
        full_name: values.full_name,
        code: values.code,
        category_id: values.category,
        img_url: filePath,
        event_id: data.event_id,
      };

      const [_, updateRecords] = await Promise.all([
        uploadImage({ file, path: filePath }),
        UpdateNomineeDetails(payload, data.id),
      ]);

      if (updateRecords instanceof Error) {
        toast.error("There's an error updating the records");
        return;
      }
      toast.success("Nominee records updated successfully");
      form.reset();
      setSelectedFile(null);
      setIsPending(false);
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsPending(false);
    }
  }

  useEffect(() => {
    const channels = supabase
      .channel("updates_realtime")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "nominees" },
        (payload) => {
          if (payload) {
            router.refresh();
            console.log("Changes received");
            setTimeout(() => {
              router.back();
            }, 1000);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channels);
    };
  }, [supabase, router]);
  return (
    <div className="my-8 w-full lg:w-4/5 mx-auto h-full px-4">
      <Button variant={"outline"} onClick={() => router.back()}>
        Go Back
      </Button>
      <div>
        <h3 className="text-3xl text-center mt-2 mb-8  font-bold text-neutral-700">
          Update Nominee's Details
        </h3>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleUpdate)} className="">
          <div className=" flex flex-col-reverse md:flex-row gap-8">
            <section className=" w-full space-y-6">
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
                    onClick={() => toast.error("Code generated already")}
                    className="absolute top-[50%] right-0 transform translate-y-[-50%]"
                  >
                    Generate Code
                  </Button>
                </div>
              </div>
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Label> Nominee's Category</Label>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              form.getValues("category") ||
                              "Select nominee's category"
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories[0].categories?.map((category: Category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.category_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className=" flex flex-col md:flex-row gap-2"></div>

              <Button
                type="submit"
                className="tracking-wide uppercase w-full my-4"
                disabled={isPending}
              >
                {isPending && <Rotating_Lines />}
                Submit
              </Button>
            </section>
            <div className=" w-full md:mt-8">
              <section className="border bg-white md:h-[18rem] w-full md:w-[90%] lg:w-[70%] mx-auto aspect-square rounded-md shadow-sm">
                <div className="relative h-full w-full rounded overflow-hidden hover:shadow transition-all duration-150 hover:border border-secondary bg-white group">
                  <Image
                    src={
                      preview
                        ? preview
                        : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${data.img_url}`
                    }
                    layout="fill"
                    sizes="100%"
                    objectFit="cover"
                    className="z-0"
                    alt={inputValues.full_name}
                  />
                </div>
              </section>
              <div className="">
                <Label
                  htmlFor="imageUpload"
                  className="w-auto gap-2 flex flex-row items-center justify-center text-sm rounded-[4px] hover:cursor-pointer hover:underline p-3"
                >
                  <div className="">
                    <ImageDown className=" text-gray-700" />
                  </div>
                  <span>Choose Nominee Image</span>
                </Label>
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  onChange={(e) => UploadImageToForm(e)}
                  className="hidden relative -z-50"
                />
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
