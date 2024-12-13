import { clsx, type ClassValue } from "clsx"
import { DrizzleError } from "drizzle-orm"
import { twMerge } from "tailwind-merge"
import { ZodError } from "zod"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getErrorMessage(error: unknown) {
  if (error instanceof ZodError)
    return {
      success: false,
      message: error.issues.map((issue) => issue.message).join(", "),
    }
  else if (error instanceof DrizzleError)
    return {
      success: false,
      message: error.message,
    }
  else if (error instanceof Error)
    return {
      success: false,
      message: error.message,
    }
  else {
    return {
      success: false,
      message: "Server error  ",
    }
  }
}

export async function zFetch<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(url, options)

    if (!response.ok) {
      const errorBody = await response.text()
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorBody}`
      )
    }

    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}

export async function zResponse<T>() {}
