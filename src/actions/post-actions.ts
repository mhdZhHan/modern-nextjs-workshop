"use server"

import { revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"

import { executeAction } from "@/db/utils"
import { db } from "@/db"
import {
  NewPost,
  newPostSchema,
  postToTagsTable,
  postsTable,
} from "@/db/schema"

export async function createNewPost(data: NewPost) {
  return executeAction({
    queryFn: async () => {
      const validatedData = newPostSchema.parse(data)

      const { postId } = (
        await db
          .insert(postsTable)
          .values(validatedData)
          .returning({ postId: postsTable.id })
      )[0]

      if (validatedData.tagIds.length > 0) {
        await db.insert(postToTagsTable).values(
          validatedData.tagIds.map((tagId) => ({
            postId,
            tagId,
          }))
        )
      }

      revalidatePath(`/dashboard`)
    },
    isProtected: true,
    clientSuccessMessage: "post created successfully",
    serverErrorMessage: "post creating",
  })
}

export async function updatePost(data: NewPost) {
  return executeAction({
    queryFn: async () => {
      const validatedData = newPostSchema.parse(data)
      await db
        .update(postsTable)
        .set(validatedData)
        .where(eq(postsTable.id, validatedData.id!))

      // delete tags
      await db
        .delete(postToTagsTable)
        .where(eq(postToTagsTable.postId, validatedData.id!))

      // and update with new tags or reinsert tags
      await db.insert(postToTagsTable).values(
        validatedData.tagIds.map((tagId) => ({
          postId: validatedData.id!,
          tagId,
        }))
      )
      revalidatePath(`/dashboard`)
    },
    isProtected: true,
    clientSuccessMessage: "post created successfully",
    serverErrorMessage: "post creating",
  })
}

export async function deletePostById(id: string) {
  return executeAction({
    queryFn: async () => {
      await db.delete(postToTagsTable).where(eq(postToTagsTable.postId, id))
      await db.delete(postsTable).where(eq(postsTable.id, id))
      revalidatePath(`/dashboard`)
    },
    isProtected: true,
    clientSuccessMessage: "post deleted successfully",
    serverErrorMessage: "post deleting",
  })
}
