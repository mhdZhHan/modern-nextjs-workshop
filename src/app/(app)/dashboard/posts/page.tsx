import { Suspense } from "react"
import { auth } from "@clerk/nextjs/server"
import { Loader } from "lucide-react"
import { getUserPosts, getUserPostsCount } from "@/queries"

// components
import { DashboardBlogCard } from "@/components/dashboard/card/blog-card"

export default async function page() {
  const { userId } = await auth()

  if (!userId) return

  const [postsData, _] = await Promise.all([
    getUserPosts({ page: 0, limit: 10, userId }),
    getUserPostsCount(userId),
  ])

  return (
    <Suspense
      fallback={
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loader className="size-8 animate-spin" />
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        {postsData && postsData.length > 0 ? (
          postsData?.map((post) => (
            <DashboardBlogCard post={post} key={post.id} />
          ))
        ) : (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-500">
            No blogs found. Start writing your first post!
          </div>
        )}
      </div>
    </Suspense>
  )
}
