import { Suspense } from "react"
import { Loader } from "lucide-react"

import { ScrollArea } from "@/components/ui/scroll-area"
import BlogGrid from "@/components/blogs/blogs-grid"
import Filters from "@/components/common/filter"

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  // await wait(2000)
  // if (Math.random() > 10) throw new Error("Random error occurred")

  const params = await searchParams
  const currentPage = Number(params?.["page"]) || 0

  return (
    <div className="flex flex-col gap-4 px-4 lg:flex-row lg:px-0">
      <div className="w-full lg:w-[28%] lg:pl-4">
        <Filters />
      </div>

      <ScrollArea className="relative h-auto w-full lg:h-[calc(100vh-76.8px)] lg:pr-4">
        <Suspense
          fallback={
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Loader className="size-8 animate-spin" />
            </div>
          }
        >
          <BlogGrid currentPage={currentPage} />
        </Suspense>
      </ScrollArea>
    </div>
  )
}
