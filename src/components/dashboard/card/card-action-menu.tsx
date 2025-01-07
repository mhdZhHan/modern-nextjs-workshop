"use client"

import { startTransition, useActionState, useState } from "react"
import { MoreHorizontal, Edit2, Trash2, Archive } from "lucide-react"

// components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import DynamicDialog from "@/components/common/dynamic-dilog"

import { changePostStatus, trashPostById } from "@/actions/post-actions"
import { toast } from "sonner"

type CardActionMenuProps = {
  postId: string
}

const CardActionMenu = ({ postId }: CardActionMenuProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [_, trashAction, isPending] = useActionState(trashPostById, undefined)

  const handleArchive = async () => {
    const result = await changePostStatus(undefined, {
      postId,
      status: "ARCHIVED",
    })

    if (result.success) {
      toast.success("Post Archived", { position: "top-center" })
    } else {
      toast.error("Archive failed", { position: "top-center" })
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />

            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => {}}>
            <Edit2 className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem onClick={handleArchive}>
            <Archive className="mr-2 h-4 w-4" />
            Archive
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => setShowDeleteDialog(true)}
            className="text-destructive"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* DIALOGS */}
      <DynamicDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        title="Move to trash"
        description="This post will be moved to the trash and can be restored anytime. Proceed?"
        icon={Trash2}
        iconStyles="text-red-500"
        confirmText="Delete"
        variant="destructive"
        loading={isPending}
        onConfirm={() =>
          startTransition(() => {
            trashAction(postId)
            setShowDeleteDialog(false)
          })
        }
      />
    </>
  )
}

export default CardActionMenu
