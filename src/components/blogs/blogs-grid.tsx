import { getPosts, getPostsCount } from "@/queries"
import BlogCard from "./blog-card"
import { Pagination } from "./pagination"

export default async function BlogGrid({
  currentPage,
}: {
  currentPage: number
}) {
  const limit = 9

  const [postsCount, postsData] = await Promise.all([
    getPostsCount(),
    getPosts(currentPage, limit),
  ])

  const totalPages = Math.ceil((postsCount || 0) / limit)

  return (
    <>
      {postsData && postsData.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {postsData?.map((post) => <BlogCard key={post.id} post={post} />)}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              className="mt-4"
            />
          )}
        </>
      ) : (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-500">
          No posts available. Check back later!
        </div>
      )}
    </>
  )
}
