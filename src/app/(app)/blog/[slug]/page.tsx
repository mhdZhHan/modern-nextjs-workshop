import { notFound } from "next/navigation"
import { JSONContent } from "novel"
import { Calendar, User2 } from "lucide-react"

// components
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { BlogRenderer } from "@/components/blogs/blog-renderer"
import CommentsSheet from "@/components/comment/comments-sheet"

import { getPostBySlug } from "@/queries"
import { simplifyDate } from "@/utils"

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug

  const blogPost = await getPostBySlug(slug)

  if (!blogPost) {
    return notFound()
  }

  const {
    banner,
    content,
    createdAt,
    title,
    author: { fullName: authorName, username: authorUsername },
  } = blogPost

  return (
    <ScrollArea className="relative h-auto w-full lg:h-[calc(100vh-60.8px)]">
      <article className="prose prose-zinc mx-auto max-w-[90ch] py-4 dark:prose-invert md:prose-sm lg:prose-base">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={banner || "/placeholder.jpg"}
          alt="blog-thumbnail"
          className="h-72 w-full object-cover"
        />

        <h1 className="text-3xl font-bold leading-relaxed tracking-wide">
          {title}
        </h1>

        <div className="mb-4 flex items-center gap-2">
          <Calendar className="size-4" />
          <span>{simplifyDate(createdAt).simplifiedDate}</span>

          <User2 className="size-4" />
          <span>By {authorName || authorUsername}</span>

          <CommentsSheet slug={slug} />
        </div>

        <Separator />

        <div>
          <BlogRenderer content={content as JSONContent} />
        </div>

        <Separator />
      </article>
    </ScrollArea>
  )
}
