"use client"

import { useState } from "react"

// components
import { Button } from "../ui/button"
import BlogCard from "./blog-card"

// types
import { BlogPost } from "@/types"

const mockPosts: BlogPost[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `Blog Post ${i + 1}`,
  excerpt: `This is a short excerpt for blog post ${i + 1}. It gives a brief overview of the content.`,
  date: new Date(Date.now() - i * 86400000).toLocaleDateString(),
  category: ["Technology", "Travel", "Food", "Lifestyle", "Fashion"][
    Math.floor(Math.random() * 5)
  ],
  tags: ["JavaScript", "React", "Node.js", "CSS", "HTML", "Python"]
    .sort(() => 0.5 - Math.random())
    .slice(0, 3),
}))

export default function BlogGrid() {
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 9
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = mockPosts.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        {currentPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      <div className="mt-8 flex flex-wrap justify-center">
        {Array.from(
          { length: Math.ceil(mockPosts.length / postsPerPage) },
          (_, i) => (
            <Button
              key={i}
              variant={currentPage === i + 1 ? "default" : "outline"}
              className="mx-1 mb-2"
              onClick={() => paginate(i + 1)}
            >
              {i + 1}
            </Button>
          )
        )}
      </div>
    </>
  )
}
