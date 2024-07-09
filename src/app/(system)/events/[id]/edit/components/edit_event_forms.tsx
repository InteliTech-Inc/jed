"use client";
import Rotating_Lines from "@/components/spinner";
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
import { cn, isEventPeriodsValid } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageDown, CalendarIcon, InfoIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { addDays, differenceInCalendarDays, format } from "date-fns";
import { z } from "zod";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { isImageSizeValid } from "@/lib/utils";
import { checkConnection } from "@/lib/utils";
import { getFormData } from "@/lib/utils";
import Spinner from "@/components/spinner";
import axios from "axios";

const formSchema = z.object({
  id: z.string(),
  name: z.string().min(1, {
    message: "This is a required field.",
  }),
  amount: z.string().min(1, {
    message: "This is a required field.",
  }),
  description: z
    .string()
    .min(100, {
      message: "This should not be less than 100 characters",
    })
    .max(150, {
      message: "This should not be more than 150 characters",
    }),
  voting_period: z.object({
    start_date: z.date(),
    end_date: z.date(),
  }),
  nominations_period: z
    .object({
      start_date: z.date().optional(),
      end_date: z.date().optional(),
    })
    .optional(),
  img_url: z.string().optional(),
  user_id: z.string().optional(),
  is_completed: z.boolean().optional(),
});

type EditEventProps = {
  defaultValues: z.infer<typeof formSchema>;
};

function EditEventForm({ defaultValues }: EditEventProps) {
  const router = useRouter();
  const imageLink = defaultValues.img_url
    ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${defaultValues.img_url}`
    : "";
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...defaultValues,
    },
  });
  const hasNomination =
    form.getValues("nominations_period") &&
    Object.keys(form.getValues("nominations_period") || {}).length
      ? true
      : false;

  const [addNomination, setAddNomination] = useState(hasNomination);
  const [preview, setPreview] = useState(imageLink);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // reset the nominations period field to null if the user unchecks the button

    if (!addNomination) {
      form.setValue("nominations_period", {
        start_date: undefined,
        end_date: undefined,
      });
    }
  }, [addNomination]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const file = selectedFile;

    if (file === null && !preview) {
      toast.error("Please upload an image");
      return;
    }

    checkConnection();

    const finalNominationPeriod = addNomination
      ? {
          start_date: values.nominations_period?.start_date?.toString(),
          end_date: values.nominations_period?.end_date?.toString(),
        }
      : {
          start_date: undefined,
          end_date: undefined,
        };

    const payload = {
      id: defaultValues?.id,
      user_id: defaultValues.user_id,
      name: values.name,
      description: values.description,
      amount_per_vote: values.amount,
      img_file: file,
      is_completed: defaultValues.is_completed,
      nomination_period: finalNominationPeriod,
      voting_period: {
        start_date: values.voting_period?.start_date.toString(),
        end_date: values.voting_period?.end_date.toString(),
      },
      img_url: defaultValues.img_url,
    };

    const periodIsValid = isEventPeriodsValid({
      nomination: payload.nomination_period,
      voting: payload.voting_period,
      isSwitchOn: addNomination,
    });

    if (!periodIsValid) return;
    let toastId;

    setLoading(true);
    try {
      const formData = getFormData(payload);

      toastId = toast.loading("Updating event details...");

      await axios.post(`/api/update-event/${payload.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // form.reset();
      toast.success("Event Updated Successfully", { id: toastId });
      router.push(`/events`);
      setSelectedFile(null);
    } catch (err) {
      toast.error("Couldn't update event details, try again.", { id: toastId });
    } finally {
      setLoading(false);
    }
  }

  function UploadImageToForm(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      if (!isImageSizeValid(file!))
        return toast.error("Upload an image smaller than 2MB");
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
      <BackButton />
      <div>
        <p className="text-3xl text-center mt-2 mb-8 font-bold text-neutral-700">
          Edit an existing event.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <div className=" flex flex-col-reverse md:flex-row  gap-8">
            <section className=" w-full">
              <div className="flex flex-col md:flex-row md:items-center gap-x-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className=" mb-4 flex-1 w-full">
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
                  name="amount"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>
                        Amount per vote{" "}
                        <span className="font-bold text-md">(GHS)</span>
                      </FormLabel>
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
              </div>
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
              <div className="flex flex-row items-center gap-6 mb-4 justify-between rounded-lg border p-4">
                <div className=" space-y-0.5">
                  <FormLabel className="text-base">
                    Set nomination period?
                  </FormLabel>
                  <FormDescription>
                    Set the period for nomination if you'll be using our
                    nominations forms. If you don't want to set it, just uncheck
                    the button.
                  </FormDescription>
                </div>
                <Switch
                  aria-readonly
                  onCheckedChange={() => {
                    return setAddNomination((isOpen) => !isOpen);
                  }}
                  checked={addNomination}
                />
              </div>
              {addNomination && (
                <>
                  <small className=" flex gap-1 items-center text-neutral-500">
                    <InfoIcon size={11} />
                    The nomination period should be before the voting period
                  </small>
                  <div className=" flex flex-col md:flex-row gap-2">
                    <FormField
                      control={form.control}
                      name={`nominations_period.start_date`}
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
                        </div>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`nominations_period.end_date`}
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
                                  disabled={{
                                    before: addDays(
                                      form.getValues(
                                        "nominations_period.start_date"
                                      ) as Date,
                                      1
                                    ),
                                  }}
                                  onSelect={field.onChange}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </FormItem>
                        </div>
                      )}
                    />
                  </div>
                </>
              )}
              <div className=" flex flex-col md:flex-row gap-2">
                <FormField
                  control={form.control}
                  name={`voting_period.start_date`}
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
                              disabled={{
                                before:
                                  form.getValues(
                                    "nominations_period.end_date"
                                  ) ?? new Date(),
                              }}
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`voting_period.end_date`}
                  render={({ field }) => {
                    return (
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
                                disabled={{
                                  before: addDays(
                                    form.getValues("voting_period.start_date"),
                                    1
                                  ),
                                }}
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </FormItem>
                      </div>
                    );
                  }}
                />
              </div>

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
              <section className="border bg-white grid place-content-center  w-full md:w-[90%] lg:w-[70%] mx-auto aspect-square rounded-md shadow-sm">
                {preview ? (
                  <Image
                    src={preview}
                    alt="preview_image"
                    width={2000}
                    height={2000}
                    className="object-center h-full w-full object-cover rounded-t-md"
                  />
                ) : (
                  <div className=" ">
                    <Image
                      src={"/images/no-images.svg"}
                      alt="preview_image"
                      width={2000}
                      height={2000}
                      className="object-center h-full object-contain rounded-t-md"
                    />
                  </div>
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

export default EditEventForm;
