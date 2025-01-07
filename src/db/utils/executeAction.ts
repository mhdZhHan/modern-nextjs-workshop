import "server-only"

import { getErrorMessage } from "@/lib/utils"
import { auth } from "@clerk/nextjs/server"
import { isRedirectError } from "next/dist/client/components/redirect-error"

type Options<T> = {
  queryFn: {
    (): Promise<T>
  }
  isProtected?: boolean
  serverErrorMessage?: string
  clientSuccessMessage?: string
}

export async function executeAction<T>({
  queryFn,
  isProtected,
  serverErrorMessage = "Error executing action",
  clientSuccessMessage = "Operation was successful",
}: Options<T>): Promise<{ success: boolean; message: string }> {
  try {
    if (isProtected) {
      const { userId } = await auth()

      if (!userId) throw new Error("Not authorized")
    }

    await queryFn()
    return {
      success: true,
      message: clientSuccessMessage,
    }
  } catch (error) {
    console.error(serverErrorMessage, error)

    if (isRedirectError(error)) throw error

    return {
      success: false,
      message: getErrorMessage(error),
    }
  }
}
