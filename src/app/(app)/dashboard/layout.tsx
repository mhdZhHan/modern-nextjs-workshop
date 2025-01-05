import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

import Sidebar from "@/components/dashboard/sidebar"
import SearchBox from "@/components/dashboard/search-box"
import { ScrollArea } from "@/components/ui/scroll-area"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-[calc(100vh-44.8px)]"
      style={{ height: "calc(100vh-44.8px)" }}
    >
      <ResizablePanel defaultSize={20} minSize={20} maxSize={20}>
        <Sidebar />
      </ResizablePanel>

      <ResizableHandle disabled />

      <ResizablePanel defaultSize={80} minSize={80} maxSize={80}>
        <div className="p-4 pb-2">
          <SearchBox />
        </div>

        <ScrollArea className="relative h-auto w-full lg:h-[calc(100vh-104.8px)]">
          <main className="p-4">{children}</main>
        </ScrollArea>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
