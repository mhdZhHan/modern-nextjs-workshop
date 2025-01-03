import { NuqsAdapter } from "nuqs/adapters/next/app"

import Header from "@/components/common/header"

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />

      <NuqsAdapter>{children}</NuqsAdapter>
    </>
  )
}
