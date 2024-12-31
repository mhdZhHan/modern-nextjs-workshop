"use client"

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Fragment } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface PaginationProps {
  currentPage: number
  totalPages: number
  maxVisiblePages?: number

  className?: string
}

export function Pagination({
  currentPage,
  totalPages,
  maxVisiblePages = 5,
  className,
}: PaginationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", page.toString())
    router.push(`${pathname}?${params.toString()}`)
  }

  const getPageNumbers = () => {
    const pageNumbers = []
    const halfVisible = Math.floor(maxVisiblePages / 2)
    let start = Math.max(1, currentPage - halfVisible)
    const end = Math.min(totalPages, start + maxVisiblePages - 1)

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1)
    }

    if (start > 1) {
      pageNumbers.push(1)
      if (start > 2) pageNumbers.push("...")
    }

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i)
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pageNumbers.push("...")
      pageNumbers.push(totalPages)
    }

    return pageNumbers
  }

  return (
    <nav
      className={cn("flex items-center justify-center space-x-2", className)}
      aria-label="Pagination"
    >
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="h-8 w-8 cursor-pointer rounded-full"
      >
        <span className="sr-only">Previous page</span>

        <ChevronLeft className="h-4 w-4" />
      </Button>

      {getPageNumbers().map((pageNumber, index) => (
        <Fragment key={index}>
          {pageNumber === "..." ? (
            <Button
              variant="ghost"
              size="icon"
              disabled
              className="h-8 w-8 rounded-full"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              variant={currentPage === pageNumber ? "default" : "outline"}
              size="icon"
              onClick={() => handlePageChange(pageNumber as number)}
              className={`h-8 w-8 rounded-full ${
                currentPage === pageNumber
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "hover:bg-muted"
              }`}
            >
              {pageNumber}
            </Button>
          )}
        </Fragment>
      ))}
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-8 w-8 cursor-pointer rounded-full"
      >
        <span className="sr-only">Next page</span>

        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  )
}
