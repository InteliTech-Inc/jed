import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";
import { isBefore, addDays, differenceInCalendarDays, isAfter } from "date-fns";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const checkConnection = () => {
  if (!navigator.onLine) {
    return toast.error("Please check your internet connection");
  }
};

export const exportToCSV = <T extends Record<string, string | number>>(
  data: T[],
  filename: string
): void => {
  // Extract headers from the first object
  const headers = Object.keys(data[0]);

  // Create CSV rows
  const csvRows = [
    headers.join(","),
    ...data.map((row) =>
      headers
        .map(
          (header) =>
            `"${(row[header] as string | number)
              .toString()
              .replace(/"/g, '""')}"`
        )
        .join(",")
    ),
  ];

  // Create a blob
  const blob = new Blob([csvRows.join("\n")], {
    type: "text/csv;charset=utf-8",
  });

  // Create a hidden anchor element
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.style.display = "none";

  // Append the link to the body and click it to trigger download
  document.body.appendChild(link);
  link.click();

  // Remove the temporary link
  document.body.removeChild(link);
};

export function isImageSizeValid(file: File) {
  const maxSizeInMB = 2;
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

  if (file.size <= maxSizeInBytes) {
    return true;
  } else {
    return false;
  }
}

export const generateFilePath = (file: File) => {
  const fileName = file.name;

  const randomString = Math.random().toString(36).substring(2, 15);
  const slicedExtension = fileName.slice(fileName.lastIndexOf("."));

  const filePath = `thumbnails/jed-${randomString}${slicedExtension}`;

  return { filePath };
};

export const getFormData = (obj: any) => {
  const formData = new FormData();
  for (const key of Object.keys(obj)) {
    let value = obj[key];
    if (typeof value === "object" && !(value instanceof File)) {
      value = JSON.stringify(value);
    }
    formData.append(key, value);
  }
  return formData;
};

export function formDataToObject(formData: FormData): Record<string, any> {
  const obj: Record<string, any> = {};

  for (const [key, value] of formData.entries()) {
    const keys = key.split(".");

    let ref = obj;

    for (let i = 0; i < keys.length; i++) {
      const subKey = keys[i];

      if (i === keys.length - 1) {
        ref[subKey] = value;
      } else {
        if (!ref[subKey]) {
          ref[subKey] = {};
        }
        ref = ref[subKey];
      }
    }
  }

  return obj;
}

export function isEventPeriodsValid({
  nomination,
  voting,
  isSwitchOn,
}: {
  nomination: {
    start_date?: string;
    end_date?: string;
  };
  voting: {
    start_date: string;
    end_date: string;
  };
  isSwitchOn: boolean;
}) {
  const nominationPeriodIsSet = Object.keys(nomination).every(
    (key) => nomination[key as keyof typeof nomination]
  );

  if (nominationPeriodIsSet) {
    const isValidNomination =
      isBefore(
        nomination.start_date as string,
        nomination.end_date as string
      ) && isBefore(nomination.end_date as string, voting.start_date);
    if (!isValidNomination) {
      toast.error(
        "There is a problem with the periods you've specified. Make sure the nomination period is before the voting period. If you don't want to set the nomination period, just uncheck the button."
      );
      return false;
    }
    return true;
  }

  const isValidVoting = isBefore(voting.start_date, voting.end_date);
  if (!isValidVoting) {
    toast.error("Voting period must be before the end date.");
    return false;
  }

  if (isSwitchOn) {
    // this is when the user checks the nomination button but with no dates
    toast.warning(
      "If you do not want to set the nomination period, uncheck the nomination period button."
    );
    return false;
  }

  return true;
}
