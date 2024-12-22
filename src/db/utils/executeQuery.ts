import { auth } from "@clerk/nextjs/server"

type Options<T> = {
  queryFn: {
    (): Promise<T>
  }
  serverErrorMessage?: string
  isProtected?: boolean
}

export async function executeQuery<T>({
  queryFn,
  isProtected,
  serverErrorMessage,
}: Options<T>) {
  try {
    if (isProtected) {
      const { userId } = await auth()

      if (!userId) throw new Error("Not authorized")
    }

    return await queryFn()
  } catch (error) {
    console.error(serverErrorMessage, error)
    return null
  }
}
