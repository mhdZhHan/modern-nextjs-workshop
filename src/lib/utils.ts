import { NextResponse } from "next/server"
import { ZodError } from "zod"
import { DrizzleError } from "drizzle-orm"
import { AuthApiError, AuthError } from "@supabase/supabase-js"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { ZResponse } from "./zod/z-schema"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getErrorMessage(error: unknown) {
  if (error instanceof ZodError) {
    let zodErrors = {}
    error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message }
    })
    return {
      success: false,
      message: error.issues.map((issue) => issue.message).join(", "),
      zodErrors,
    }
  } else if (error instanceof DrizzleError)
    return {
      success: false,
      message: error.message,
    }
  else if (error instanceof Error)
    return {
      success: false,
      message: error.message,
    }
  if (error instanceof AuthError || error instanceof AuthApiError)
    return {
      success: false,
      message: error.message,
    }

  console.error("Unhandled error:", error)
  return {
    success: false,
    message: "An unexpected server error occurred",
  }
}

export function handleApiError(error: unknown): NextResponse {
  const errorResponse = getErrorMessage(error)

  const status =
    error instanceof ZodError || DrizzleError
      ? 400
      : error instanceof AuthError
        ? 401
        : error instanceof AuthApiError
          ? 403
          : 500

  return NextResponse.json(errorResponse, { status })
}

export async function zFetch<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(url, options)
    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}

export async function zResponse<T>({
  success,
  message,
  data,
}: ZResponse<T>): Promise<NextResponse> {
  return NextResponse.json({ success, message, data })
}

// export async function zResponse<T>({
//   success,
//   message,
//   data,
// }: {
//   success: boolean
//   message: string
//   data?: T
// }) {
//   return NextResponse.json({ success, message, data })
// }
