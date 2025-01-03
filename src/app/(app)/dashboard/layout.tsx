import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

import Sidebar from "@/components/dashboard/sidebar"

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
        <main className="p-4">{children}</main>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
