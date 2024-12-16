"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { startTransition } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()
  function handleReset() {
    startTransition(() => {
      reset()
      router.refresh()
    })
  }

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h2 className="mb-4 text-2xl font-bold">Error loading page!</h2>
      <button
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        onClick={handleReset}
      >
        Try again
      </button>
    </div>
  )
}
