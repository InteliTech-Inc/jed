import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const checkConnection = () => {
  if (!navigator.onLine) {
    return toast.error("Please check your internet connection");
  }
};
