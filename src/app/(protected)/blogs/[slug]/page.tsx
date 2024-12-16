import { notFound } from "next/navigation"

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug

  if (slug === "not-found") {
    notFound()
  }

  return <div>page</div>
}
export default page
