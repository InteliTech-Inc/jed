"use client";
import Rotating_Lines from "@/components/rotating_lines";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";
import BackButton from "@/components/back";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateMutation } from "@/hooks/use_create_mutation";
import { db } from "@/lib/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ImageDown, CalendarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { differenceInCalendarDays, format } from "date-fns";
import { z } from "zod";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "This is a required field.",
  }),
  description: z.string().min(1, {
    message: "This is a required field.",
  }),
  voting: z.object({
    start_date: z.date(),
    end_date: z.date(),
  }),
  nominations: z
    .object({
      start_date: z.date(),
      end_date: z.date(),
    })
    .optional(),
});

type CreateEventProps = {
  defaultValues?: z.infer<typeof formSchema>
};

function CreateEventForm({ defaultValues }: CreateEventProps) {
  const router = useRouter();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [addNomination, setAddNomination] = useState(false);
  const [preview, setPreview] = useState<string>("");

  const { mutateAsync: CreateEvent, isPending } = useCreateMutation({
    dbName: "events",
    key: "events",
    showSucessMsg: false,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...defaultValues,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const supabase = createClientComponentClient();
    const {
      data: { user },
    } = await db.auth.getUser();
    const randomString = Math.random().toString(36).substring(2, 15);
    5;
    const slicedName = selectedFile?.name.slice(
      selectedFile?.name.lastIndexOf(".")
    );
    const file = selectedFile!;

    // const { data, error } = await supabase.storage
    //   .from("events")
    //   .upload(`thumbnails/jed-${randomString}${slicedName}`, file, {
    //     contentType: "image/*",
    //   });

    // if (error) {
    //   console.log(error);
    //   toast.error("Something went wrong");
    //   return;
    // }

    

    const payload = {
      name: values.name,
      description: values.description,
      // img_url: data?.path,
      user_id: user?.id,
      isCompleted: false,
    };

    console.log(values);

    // CreateEvent(payload).then((_) => {
    //   toast.success("Your event has been successfully created!");
    //   form.reset();
    //   router.push("/events");
    // });
  }

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

  return (
    <div className="my-8 w-full lg:w-4/5 mx-auto h-full">
      <BackButton />
      <div>
        <h3 className="text-3xl text-center mt-2 mb-8 font-bold text-neutral-700">
          Create a new event
        </h3>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <div className=" flex flex-col-reverse md:flex-row  gap-8">
            <section className=" w-full">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className=" mb-4">
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
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="mb-4">
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
              <div className=" flex flex-col md:flex-row gap-2">
                <FormField
                  control={form.control}
                  name={`voting.start_date`}
                  render={({ field }) => (
                    <div className=" w-full">
                      <FormItem className="w-full">
                        <FormLabel>Voting start date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl className=" relative z-10">
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start relative z-10 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto p-0 relative z-10"
                            align="start"
                          >
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                      <div className=" hidden">
                        {field.value &&
                          differenceInCalendarDays(field.value, new Date()) <
                            0 &&
                          toast.error(
                            "The start date should be later than today's date."
                          )}
                      </div>
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`voting.end_date`}
                  render={({ field }) => (
                    <div className=" w-full mb-4">
                      <FormItem className="w-full">
                        <FormLabel>Voting end date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl className=" relative z-10">
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start relative z-10 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto p-0 relative z-10"
                            align="start"
                          >
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                      <div className=" hidden">
                        {field.value &&
                          differenceInCalendarDays(field.value, new Date()) <
                            0 &&
                          toast.error(
                            "The start date should be later than today's date."
                          )}
                        {field.value &&
                          differenceInCalendarDays(
                            form.getValues("voting.start_date"),
                            field.value
                          ) >= 0 &&
                          toast.error(
                            "The start date should be earlier than the end date."
                          )}
                      </div>
                    </div>
                  )}
                />
              </div>
              <div className="flex flex-row items-center gap-6 mb-4 justify-between rounded-lg border p-4">
                <div className=" space-y-0.5">
                  <FormLabel className="text-base">
                    Set nomination period?
                  </FormLabel>
                  <FormDescription>
                    Set the period for nomination if you'll be using our
                    nominations forms.
                  </FormDescription>
                </div>
                <Switch
                  aria-readonly
                  onCheckedChange={() => setAddNomination((prev) => !prev)}
                  checked={addNomination}
                />
              </div>
              {addNomination && (
                <div className=" flex flex-col md:flex-row gap-2">
                  <FormField
                    control={form.control}
                    name={`nominations.start_date`}
                    render={({ field }) => (
                      <div className=" w-full">
                        <FormItem className="w-full">
                          <FormLabel>Nominations start date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl className=" relative z-10">
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full justify-start relative z-10 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0 relative z-10"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </FormItem>
                        <div className=" hidden">
                          {field.value &&
                            differenceInCalendarDays(field.value, new Date()) <
                              0 &&
                            toast.error(
                              "The start date should be later than today's date."
                            )}
                        </div>
                      </div>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`nominations.end_date`}
                    render={({ field }) => (
                      <div className=" w-full mb-4">
                        <FormItem className="w-full">
                          <FormLabel>Nominations end date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl className=" relative z-10">
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full justify-start relative z-10 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0 relative z-10"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </FormItem>
                        <div className=" hidden">
                          {field.value &&
                            differenceInCalendarDays(field.value, new Date()) <
                              0 &&
                            toast.error(
                              "The start date should be later than today's date."
                            )}
                          {field.value &&
                            differenceInCalendarDays(
                              form.getValues("nominations.start_date"),
                              field.value
                            ) >= 0 &&
                            toast.error(
                              "The start date should be earlier than the end date."
                            )}
                        </div>
                      </div>
                    )}
                  />
                </div>
              )}
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
              <section className="border bg-white  w-full md:w-[90%] lg:w-[70%] mx-auto aspect-square rounded-md shadow-sm">
                {preview ? (
                  <Image
                    src={preview}
                    alt="preview_image"
                    width={2000}
                    height={2000}
                    className="object-center h-full object-cover rounded-t-md"
                  />
                ) : (
                  <div />
                )}
              </section>
              <div className="">
                <Label
                  htmlFor="imageUpload"
                  className="w-auto gap-2 flex flex-row items-center justify-center text-sm rounded-[4px] hover:cursor-pointer hover:underline p-3"
                >
                  <div className="">
                    <ImageDown className=" text-gray-700" />
                  </div>
                  <span>Choose Event Image</span>
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

export default CreateEventForm;
