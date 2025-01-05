"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"

import { PostStatus } from "@/db/schema"

type PostStatusToggleProps = {
  currentStatus: PostStatus
}

const PostStatusToggle = ({ currentStatus }: PostStatusToggleProps) => {
  const [isPublished, setIsPublished] = useState(currentStatus === "PUBLISHED")

  const handleStatusToggle = () => {
    setIsPublished(!isPublished)
  }

  return (
    <div className="flex items-center space-x-2">
      <Switch
        checked={isPublished}
        onCheckedChange={handleStatusToggle}
        aria-label="Toggle publish status"
      />

      <span className="text-sm font-medium">
        {isPublished ? "Published" : "Draft"}
      </span>
    </div>
  )
}

export default PostStatusToggle
