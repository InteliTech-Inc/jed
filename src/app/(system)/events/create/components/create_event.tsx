"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageDown } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  event_name: z.string().min(1, {
    message: "This is a required field.",
  }),
  event_description: z.string().min(1, {
    message: "This is a required field.",
  }),
});

function CreateEventForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      event_name: "",
      event_description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  function UploadImageToForm(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];
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

  return (
    <div className="my-8 w-full h-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="event_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="placeholder:text-neutral-500"
                    autoFocus
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <section className="border rounded-md shadow-sm">
            <section>
              {preview ? (
                <Image
                  src={preview}
                  alt="preview_image"
                  width={1000}
                  height={1000}
                  className="h-[350px] object-cover rounded-t-md"
                />
              ) : (
                <div></div>
              )}
            </section>
            <Label
              htmlFor="imageUpload"
              className="w-auto gap-2 flex flex-row items-center justify-center text-sm rounded-[4px] hover:cursor-pointer hover:underline p-3"
            >
              <div className="">
                <ImageDown />
              </div>
              <span>Choose Event Image</span>
            </Label>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={(e) => UploadImageToForm(e)}
              className="hidden relative h-[0.1px] -z-50"
            />
          </section>
          <FormField
            control={form.control}
            name="event_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="placeholder:text-neutral-500 resize-none"
                    rows={5}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="tracking-wide uppercase w-full my-4">
            Create Event
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default CreateEventForm;
