import { NuqsAdapter } from "nuqs/adapters/next/app"
import Navbar from "@/components/common/nav/navbar"

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />

      <NuqsAdapter>{children}</NuqsAdapter>
    </>
  )
}
