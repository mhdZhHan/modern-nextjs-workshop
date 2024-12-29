import { Suspense } from "react"
import { Loader } from "lucide-react"

import { ScrollArea } from "@/components/ui/scroll-area"
import BlogGrid from "@/components/blogs/blogs-grid"
import Filters from "@/components/common/filter"

export default function page() {
  // await wait(2000)
  // if (Math.random() > 10) throw new Error("Random error occurred")

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <div className="w-full pl-4 lg:w-[28%]">
        <Filters />
      </div>

      <ScrollArea className="h-[calc(100vh-76.8px)] w-full pr-4">
        <Suspense fallback={<Loader className="size-8 animate-spin" />}>
          <BlogGrid />
        </Suspense>
      </ScrollArea>
    </div>
  )
}
