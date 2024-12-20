"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Mock data for blog posts
const mockPosts = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `Blog Post ${i + 1}`,
  excerpt: `This is a short excerpt for blog post ${i + 1}...`,
  date: new Date(Date.now() - i * 86400000).toLocaleDateString(),
}))

export default function BlogList() {
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 10
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = mockPosts.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {currentPosts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{post.excerpt}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <span className="text-sm text-gray-500">{post.date}</span>
              <Button asChild>
                <Link href={`/blog/${post.id}`}>Read More</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        {Array.from(
          { length: Math.ceil(mockPosts.length / postsPerPage) },
          (_, i) => (
            <Button
              key={i}
              variant={currentPage === i + 1 ? "default" : "outline"}
              className="mx-1"
              onClick={() => paginate(i + 1)}
            >
              {i + 1}
            </Button>
          )
        )}
      </div>
    </div>
  )
}
