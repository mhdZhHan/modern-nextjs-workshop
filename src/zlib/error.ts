import { AuthApiError, AuthError } from "@supabase/supabase-js"
import { DrizzleError } from "drizzle-orm"
import { ZodError } from "zod"

export function zError(error: unknown) {
  if (error instanceof ZodError) {
    let zodErrors: Record<string, string> = {}
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
  else if (error instanceof AuthError || error instanceof AuthApiError)
    return {
      success: false,
      message: error.message,
    }
  // Network or Other Errors
  else if (typeof error === "object" && error !== null) {
    if ("message" in error) {
      return {
        success: false,
        message: String(error.message),
      }
    }
  }

  console.error("Unhandled error:", error)
  return {
    success: false,
    message: "An unexpected server error occurred",
  }
}
