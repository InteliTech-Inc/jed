import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";
import {
  isBefore,
  addDays,
  parse,
  differenceInCalendarDays,
  isAfter,
  isWithinInterval,
} from "date-fns";
import { Event } from "@/app/(system)/events/[id]/nominations/components/nomination_form";
import { isValid, parseISO, isFuture, isPast, formatDistance } from "date-fns";

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
        "There is a problem with the periods you've specified. Make sure the nomination period ends before the voting period starts."
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

export function isValidDateString(dateString: string | undefined): boolean {
  if (!dateString) return false;
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

export function hasValidNominationPeriod(
  period: Event["nomination_period"]
): boolean {
  if (!period || !period.start_date || !period.end_date) {
    return false;
  }

  return (
    isValid(parseISO(period.start_date)) && isValid(parseISO(period.end_date))
  );
}

export function getVotingPeriodMessage(votingPeriod: Event["voting_period"]) {
  if (!votingPeriod || !votingPeriod.start_date || !votingPeriod.end_date) {
    return null;
  }

  const startDate = parseISO(new Date(votingPeriod.start_date).toISOString());
  const endDate = parseISO(new Date(votingPeriod.end_date).toISOString());

  const now = new Date();

  if (
    isWithinInterval(now, {
      start: startDate,
      end: endDate,
    })
  )
    return "Voting is ongoing";

  if (differenceInCalendarDays(startDate, now) === 1) {
    return "Voting starts tomorrow.";
  }

  if (isAfter(now, endDate)) return "Voting has ended";
  if (isFuture(startDate)) {
    return `Voting starts in ${formatDistance(startDate, now)}.`;
  } else if (isPast(startDate)) {
    return `Voting started ${formatDistance(startDate, now)} ago.`;
  }
  return null;
}
