import { Suspense } from "react"
import { auth } from "@clerk/nextjs/server"
import { Loader } from "lucide-react"

// components
import { DashboardBlogCard } from "@/components/dashboard/card/blog-card"

import { getUserPosts } from "@/queries"

export default async function page() {
  const { userId } = await auth()

  if (!userId) return

  const posts = await getUserPosts({
    page: 0,
    limit: 10,
    userId: userId,
    status: ["DRAFT"],
  })

  return (
    <Suspense
      fallback={
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loader className="size-8 animate-spin" />
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        {posts && posts?.length > 0 ? (
          posts?.map((post) => <DashboardBlogCard post={post} key={post.id} />)
        ) : (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-500">
            No drafts saved. Start drafting your ideas!
          </div>
        )}
      </div>
    </Suspense>
  )
}
