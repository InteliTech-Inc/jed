"use client";
import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import BackButton from "@/components/back";
import { Input } from "@/components/ui/input";
import { checkConnection, cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageDown, CalendarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { User } from "@supabase/supabase-js";
import { differenceInCalendarDays, format } from "date-fns";
import { z } from "zod";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import axios from "axios";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { isImageSizeValid } from "@/lib/utils";
import { getFormData } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "This is a required field.",
  }),
  description: z.string().min(100, {
    message: "This should not be less than 100 characters",
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

const defaultValues = {
  name: "",
  description: "",
};

function CreateEventForm({ user }: { user: User | null }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [addNomination, setAddNomination] = useState(false);
  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...defaultValues,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const file = selectedFile;

    if (file === null) {
      toast.error("Please upload an image");
      return;
    }

    if (!isImageSizeValid(file)) {
      toast.error("Please upload an image smaller than 2MB");
      return;
    }

    try {
      checkConnection();
      setLoading(true);

      const payload = {
        name: values.name,
        description: values.description,
        user_id: user?.id!,
        img_file: file,
        is_completed: false,
        nomination_period: {
          start_date: values.nominations?.start_date.toString(),
          end_date: values.nominations?.end_date.toString(),
        },
        voting_period: {
          start_date: values.voting?.start_date.toString(),
          end_date: values.voting?.end_date.toString(),
        },
      };

      const formData = getFormData(payload);

      const data = await axios.post("/api/create-events", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      form.reset();
      toast.success("Event Created Successfully");
      router.push(`/events`);
      setSelectedFile(null);
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
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
                    <FormMessage />
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
                className="tracking-wide gap-2 uppercase w-full my-4"
                disabled={loading}
              >
                {loading && <Spinner color="#fff" />}
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
