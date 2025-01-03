"use client"

import { useState } from "react"
import { MessageSquareText } from "lucide-react"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import CommentSection from "./comment-section"

type CommentsSheetProps = {
  slug: string
}

const CommentsSheet = ({ slug }: CommentsSheetProps) => {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false)

  return (
    <TooltipProvider>
      <Sheet open={isCommentsOpen} onOpenChange={setIsCommentsOpen}>
        <Tooltip>
          <SheetTrigger asChild>
            <TooltipTrigger className="cursor-pointer">
              <MessageSquareText size={20} />
            </TooltipTrigger>
          </SheetTrigger>

          <TooltipContent>
            <p>Open Comments</p>
          </TooltipContent>
        </Tooltip>

        <SheetContent side="right" className="w-1/2 lg:min-w-[500px]">
          <SheetHeader>
            <SheetTitle>Comments</SheetTitle>
          </SheetHeader>

          <CommentSection postId={slug} />
        </SheetContent>
      </Sheet>
    </TooltipProvider>
  )
}
export default CommentsSheet
