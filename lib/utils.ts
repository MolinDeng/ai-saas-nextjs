import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import * as z from 'zod';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: 'Prompt is required.',
  }),
});

export const mediaFormSchema = z.object({
  prompt: z.string().min(1, {
    message: 'Prompt is required.',
  }),
  amount: z.string().min(1),
  resolution: z.string().min(1),
});
