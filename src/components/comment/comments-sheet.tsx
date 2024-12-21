"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import CommentSection from "./comment-section"

type CommentsSheetProps = {
  slug: string
}

const CommentsSheet = ({ slug }: CommentsSheetProps) => {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false)

  return (
    <Sheet open={isCommentsOpen} onOpenChange={setIsCommentsOpen}>
      <SheetTrigger asChild>
        <Button>View Comments</Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[90vw] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Comments</SheetTitle>
        </SheetHeader>

        <CommentSection postId={slug} />
      </SheetContent>
    </Sheet>
  )
}
export default CommentsSheet
