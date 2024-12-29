import Header from "@/components/common/header"
// import Footer from "@/components/common/footer"

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />

      <main>{children}</main>

      {/* <Footer /> */}
    </>
  )
}
