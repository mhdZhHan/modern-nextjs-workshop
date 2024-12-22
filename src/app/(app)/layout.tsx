import Header from "@/components/common/header"

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />

      <main>{children}</main>
    </>
  )
}
