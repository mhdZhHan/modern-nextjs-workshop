"use server"
import { revalidatePath } from "next/cache"

import { executeAction } from "@/db/utils"
import { db } from "@/db"
import { bookmarksTable, newBookmarkSchema } from "@/db/schema"
import { and, eq } from "drizzle-orm"

export async function addToBookmark({
  userId,
  postId,
}: {
  userId: string
  postId: string
}) {
  return executeAction({
    queryFn: async () => {
      const validatedData = newBookmarkSchema.parse({ userId, postId })

      await db.insert(bookmarksTable).values(validatedData)
      revalidatePath(`/blog/bookmarks`)
    },
    isProtected: true,
    clientSuccessMessage: "Bookmarked successfully",
    serverErrorMessage: "Adding new bookmark",
  })
}

export async function removeFromBookmark({
  userId,
  postId,
}: {
  userId: string
  postId: string
}) {
  return executeAction({
    queryFn: async () => {
      const validatedData = newBookmarkSchema.parse({ userId, postId })
      await db
        .delete(bookmarksTable)
        .where(
          and(
            eq(bookmarksTable.userId, validatedData.userId),
            eq(bookmarksTable.postId, validatedData.postId)
          )
        )
      revalidatePath(`/blog/bookmarks`)
    },
    isProtected: true,
    clientSuccessMessage: "Bookmarked removed successfully",
    serverErrorMessage: "Removing bookmark",
  })
}
