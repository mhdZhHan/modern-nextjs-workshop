import { notFound } from "next/navigation"
import { Calendar, User2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import CommentsSheet from "@/components/comment/comments-sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

const blogPost = {
  id: 1,
  title: "Understanding the Basics of React Hooks",
  content: `
    <p>React Hooks have revolutionized the way we write React components. They allow us to use state and other React features without writing a class. This makes our code more readable and easier to understand.</p>
    <h2>What are Hooks?</h2>
    <p>Hooks are functions that let you "hook into" React state and lifecycle features from function components. They don't work inside classes — they let you use React without classes.</p>
    <h2>Why Hooks?</h2>
    <p>Hooks solve a wide variety of seemingly unconnected problems in React that we've encountered over five years of writing and maintaining tens of thousands of components. Whether you're learning React, use it daily, or even prefer a different library with a similar component model, you might recognize some of these problems.</p>
  `,
  date: "2023-06-15",
  author: "Jane Doe",
  category: "Technology",
  tags: ["React", "JavaScript", "Web Development"],
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug

  if (slug === "not-found") {
    notFound()
  }

  return (
    <ScrollArea className="relative h-[calc(100vh-76.8px)] w-full pr-4">
      <article className="prose prose-zinc mx-auto pb-4 dark:prose-invert md:prose-base lg:prose-lg">
        <h1 className="text-3xl font-bold">{blogPost.title}</h1>

        <div className="mb-4 flex items-center gap-2">
          <Calendar className="size-4" />
          <span>{blogPost.date}</span>

          <User2 className="size-4" />
          <span>By {blogPost.author}</span>

          <Badge>{blogPost.category}</Badge>

          <CommentsSheet slug={slug} />
        </div>

        <Separator />

        <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />

        <Separator />

        <h3>Tags</h3>
        <div className="flex flex-wrap gap-2">
          {blogPost.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </article>
    </ScrollArea>
  )
}
