import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

// components
import Header from "@/components/common/header"

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect("/login")
  }

  return (
    <>
      <Header />

      <main>{children}</main>
    </>
  )
}
