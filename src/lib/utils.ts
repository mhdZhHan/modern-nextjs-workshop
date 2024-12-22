import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ZodError } from "zod"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }

  if (error instanceof ZodError) {
    return error.errors.map((issue) => issue.message).join(", ")
  }

  if (error && typeof error === "object" && "message" in error) {
    return (error as { message: string }).message
  }

  if (typeof error === "string") {
    return error
  }

  return "An unknown error occurred."
}
