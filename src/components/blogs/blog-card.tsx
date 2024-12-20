import Link from "next/link"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import { BlogPost } from "@/types"

type BlogCardProps = {
  post: BlogPost
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <Link href={`/blogs/${post.id}`} key={post.id}>
      <Card className="h-full transition-shadow duration-200 hover:shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg">{post.title}</CardTitle>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>{post.date}</span>
            <span>•</span>
            <Badge variant="secondary">{post.category}</Badge>
          </div>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-gray-600">{post.excerpt}</p>
        </CardContent>

        <CardFooter className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </CardFooter>
      </Card>
    </Link>
  )
}
export default BlogCard
