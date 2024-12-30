import {
  ArrowRightIcon,
  BookmarkIcon,
  MessageCircleIcon,
  ShareIcon,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "../ui/separator"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

import { Post } from "@/db/schema"
import { simplifyDate } from "@/utils"

type BlogCardProps = {
  post: Post
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <Card className="flex h-full flex-col overflow-hidden bg-card transition-shadow hover:shadow-lg">
      <CardContent className="flex flex-1 flex-col p-4">
        <div className="mb-3 flex items-start justify-between">
          <Badge
            variant="secondary"
            className="bg-primary/10 text-xs font-medium text-primary"
          >
            Technology
          </Badge>

          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <BookmarkIcon className="h-2.5 w-2.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <ShareIcon className="h-2.5 w-2.5" />
            </Button>
          </div>
        </div>

        <div className="flex-1">
          <h3 className="mb-2 text-lg font-medium leading-tight tracking-wide">
            {post.title}
          </h3>

          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
            {post.shortDescription}
          </p>

          <div className="mb-4 flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs font-medium">
              React js
            </Badge>
          </div>
        </div>

        <div>
          <Separator className="mb-4" />

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Avatar className="h-7 w-7">
                <AvatarImage src={"/avatar.jpg"} alt={"Mohammed"} />
                <AvatarFallback>{"Mohammed".charAt(0)}</AvatarFallback>
              </Avatar>

              <div>
                <p className="text-xs font-medium">{"Mohammed"}</p>
                <p className="text-xs text-muted-foreground">
                  {simplifyDate(post.createdAt).simplifiedDate} · 8 min read
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-1.5 text-muted-foreground"
              >
                <MessageCircleIcon className="mr-1 h-2.5 w-2.5" />
                <span className="text-[10px]">21</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-6 px-1.5">
                Read More
                <ArrowRightIcon className="ml-1 h-2.5 w-2.5" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
export default BlogCard
