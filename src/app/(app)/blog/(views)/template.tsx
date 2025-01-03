import { ScrollArea } from "@/components/ui/scroll-area"
import Filters from "@/components/common/filter"

export default async function BlogsTemplate({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-4 px-4 lg:flex-row lg:px-0">
      <div className="w-full pt-4 lg:w-[28%] lg:pl-4">
        <Filters />
      </div>

      <ScrollArea className="relative h-auto w-full lg:h-[calc(100vh-44.8px)] lg:pr-4">
        <main className="py-4">{children}</main>
      </ScrollArea>
    </div>
  )
}
