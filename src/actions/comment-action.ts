"use server"
import { revalidatePath } from "next/cache"

import { executeAction } from "@/db/utils"
import { db } from "@/db"
import {
  NewComment,
  commentsTable,
  newCommentSchema,
} from "@/db/schema/comment"

export async function createNewComment(data: NewComment, slug?: string) {
  return executeAction({
    queryFn: async () => {
      const validatedData = newCommentSchema.parse(data)
      await db.insert(commentsTable).values(validatedData)
      revalidatePath(`/posts/${slug}`)
    },
    isProtected: true,
    clientSuccessMessage: "Commented successfully",
    serverErrorMessage: "Comment creating",
  })
}
