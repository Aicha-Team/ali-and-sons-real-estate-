import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency: string = "AED") {
  return `${currency} ${price.toLocaleString("en-US", {
    maximumFractionDigits: 2,
  })}`;
}
