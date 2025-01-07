import { format } from "date-fns"
import { ArrowUpRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

import { Post, PostToTag, Tag, User } from "@/db/schema"
import { Separator } from "../../ui/separator"
import CardActionMenu from "./card-action-menu"
import PostStatusToggle from "./post-status-toggle"
import Link from "next/link"

type BlogCardProps = {
  post: Post & {
    author: User
    tags: (PostToTag & {
      tag: Tag
    })[]
  }
}

export function DashboardBlogCard({ post }: BlogCardProps) {
  return (
    <Card className="overflow-hidden p-4 transition-shadow hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0">
        <h3 className="font-semibold leading-none tracking-tight">
          {post.title}
        </h3>

        <CardActionMenu postId={post.id} />
      </CardHeader>

      <CardContent className="p-0 py-3">
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {post.shortDescription}
        </p>

        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <span>8 min read</span>
            <span>•</span>
            <span>2719 views</span>
            <span className="text-xs text-muted-foreground">
              {format(post.createdAt, "MMM d, yyyy")}
            </span>
          </div>
        </div>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-3">
            {post.tags.map((tag) => (
              <Badge key={tag.tagId} variant="secondary">
                {tag.tag.name}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <Separator />

      <CardFooter className="flex items-center justify-between p-0 pt-3">
        <PostStatusToggle postId={post.id} currentStatus={post.status} />

        <Button variant="outline" size="sm">
          <Link href={`/blog/${post.slug}`} className="flex gap-2">
            View Post
            <ArrowUpRight className="size-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
