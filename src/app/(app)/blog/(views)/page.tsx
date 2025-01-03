import { Suspense } from "react"
import { Loader } from "lucide-react"

import BlogGrid from "@/components/blogs/blogs-grid"

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const currentPage = Number(params?.["page"]) || 0

  return (
    <Suspense
      fallback={
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loader className="size-8 animate-spin" />
        </div>
      }
    >
      <BlogGrid currentPage={currentPage} />
    </Suspense>
  )
}
