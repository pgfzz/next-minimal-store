import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function throttle<T extends any[]>(
  fn: (...args: T) => void,
  delay: number
) {
  let isThrottled = false;
  let lastArgs: T | null = null;

  return (...args: T) => {
    lastArgs = args;

    if (!isThrottled) {
      fn(...args);
      isThrottled = true;

      setTimeout(() => {
        isThrottled = false;
        if (lastArgs) {
          fn(...lastArgs);
          lastArgs = null;
        }
      }, delay);
    }
  };
}
