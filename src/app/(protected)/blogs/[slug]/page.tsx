// import { notFound } from "next/navigation"

// const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
//   const slug = (await params).slug

//   if (slug === "not-found") {
//     notFound()
//   }

//   return <div>page</div>
// }
// export default page

"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import CommentSection from "@/components/comment/comment-section"

// Mock data for a single blog post
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

export default function BlogPost() {
  const { slug } = useParams()
  const [isCommentsOpen, setIsCommentsOpen] = useState(false)

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="prose lg:prose-xl mx-auto">
        <h1 className="mb-4 text-4xl font-bold">{blogPost.title}</h1>
        <div className="mb-6 flex items-center space-x-4">
          <p className="text-gray-600">{blogPost.date}</p>
          <p className="text-gray-600">By {blogPost.author}</p>
          <Badge>{blogPost.category}</Badge>
        </div>
        <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
        <div className="mt-6 flex flex-wrap gap-2">
          {blogPost.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </article>

      <div className="mt-8 text-center">
        <Sheet open={isCommentsOpen} onOpenChange={setIsCommentsOpen}>
          <SheetTrigger asChild>
            <Button>View Comments</Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[90vw] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>Comments</SheetTitle>
            </SheetHeader>
            <CommentSection postId={slug as string} />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
