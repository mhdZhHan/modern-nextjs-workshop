import { notFound } from "next/navigation"

const page = ({ params }: { params: { slug: string } }) => {
  if (params.slug === "not-found") {
    notFound()
  }

  return <div>page</div>
}
export default page
