"use client"

import { startTransition, useActionState, useState } from "react"
import { Switch } from "@/components/ui/switch"

import { PostStatus } from "@/db/schema"
import { changePostStatus } from "@/actions/post-actions"

type PostStatusToggleProps = {
  currentStatus: PostStatus
  postId: string
}

const PostStatusToggle = ({ currentStatus, postId }: PostStatusToggleProps) => {
  const [isPublished, setIsPublished] = useState(currentStatus === "PUBLISHED")
  const [_, action, isPending] = useActionState(changePostStatus, undefined)

  const handleStatusToggle = () => {
    setIsPublished(!isPublished)
    const newStatus: PostStatus = !isPublished ? "PUBLISHED" : "DRAFT"
    startTransition(() => {
      action({ postId, status: newStatus })
    })
  }

  return (
    <div className="flex items-center space-x-2">
      <Switch
        checked={isPublished}
        onCheckedChange={handleStatusToggle}
        disabled={isPending}
        aria-label="Toggle publish status"
      />

      <span className="text-sm font-medium">
        {isPublished ? "Published" : "Draft"}
      </span>
    </div>
  )
}

export default PostStatusToggle
