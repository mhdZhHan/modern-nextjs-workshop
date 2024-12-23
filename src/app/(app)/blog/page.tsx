import BlogGrid from "@/components/blogs/blogs-grid"
import Filters from "@/components/common/filter"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function page() {
  // await wait(2000)
  // if (Math.random() > 10) throw new Error("Random error occurred")

  return (
    <div className="container mx-auto pt-24">
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="w-full pl-4 lg:w-1/4">
          <Filters />
        </div>

        <ScrollArea className="h-[calc(100vh-100px)] w-full pr-4">
          <BlogGrid />
        </ScrollArea>
      </div>
    </div>
  )
}
