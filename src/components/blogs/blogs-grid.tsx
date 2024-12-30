import { getPosts, getPostsCount } from "@/queries"

import { Button } from "../ui/button"
import BlogCard from "./blog-card"

export default async function BlogGrid() {
  const limit = 9
  const page = 0

  const [postsCount, postsData] = await Promise.all([
    getPostsCount(),
    getPosts(page, limit),
  ])

  const pagesCount = Math.ceil((postsCount || 0) / limit)

  return (
    <>
      {postsData && postsData.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {postsData?.map((post) => <BlogCard key={post.id} post={post} />)}
          </div>

          <div className="mt-8 flex flex-wrap justify-center">
            {Array.from(
              {
                length: Math.ceil(["post1", "post2", "post3"].length / limit),
              },
              (_, i) => (
                <Button key={i} variant={"outline"} className="mx-1 mb-2">
                  {i + 1}
                </Button>
              )
            )}
          </div>
        </>
      ) : (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-500">
          No posts available. Check back later!
        </div>
      )}
    </>
  )
}
