"use client"

import { Loader2, LucideIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type DynamicDialogProps = {
  variant?: "default" | "destructive"
  title: string | React.ReactNode
  description: string | React.ReactNode
  confirmText?: string
  cancelText?: string

  icon?: LucideIcon
  iconStyles?: React.ComponentProps<"svg">["className"]

  loading: boolean
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

const DynamicDialog = ({
  isOpen,
  variant = "default",
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  icon: Icon,
  iconStyles,
  loading,
  onConfirm,
  onClose,
}: DynamicDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="mb-2 flex items-center gap-2">
            {Icon && <Icon className={cn("size-5", iconStyles)} />}

            {title}
          </DialogTitle>

          <DialogDescription className="font-normal leading-normal">
            {description}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-2 sm:justify-end">
          <Button
            type="button"
            variant="outline"
            disabled={loading}
            onClick={onClose}
          >
            {cancelText}
          </Button>

          <Button
            type="submit"
            variant={variant}
            disabled={loading}
            onClick={onConfirm}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DynamicDialog
