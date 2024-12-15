import { NextResponse } from "next/server"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Error types
import { ZodError } from "zod"
import { DrizzleError } from "drizzle-orm"
import { AuthApiError, AuthError } from "@supabase/supabase-js"

import { zError } from "@/zlib"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function handleApiError(error: unknown): NextResponse {
  const errorResponse = zError(error)

  // prettier-ignore
  const status = 
    error instanceof ZodError ? 400 :        // Bad Request (Validation Error)
    error instanceof DrizzleError ? 422 :    // Unprocessable Entity (Database Error)
    error instanceof AuthError ? 401 :       // Unauthorized
    error instanceof AuthApiError ? 403 :    // Forbidden
    error instanceof Error ? 500 :           // Internal Server Error
    400; // Default to Bad Request

  return NextResponse.json(errorResponse, { status })
}
