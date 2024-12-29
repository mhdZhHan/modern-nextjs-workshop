"use server"

import { revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"
import { auth } from "@clerk/nextjs/server"

import { executeAction } from "@/db/utils"
import { db } from "@/db"
import {
  NewPost,
  newPostSchema,
  postToTagsTable,
  postsTable,
} from "@/db/schema"

export async function createNewPost(data: Omit<NewPost, "authorId">) {
  const { userId } = await auth()

  return executeAction({
    queryFn: async () => {
      const validatedData = newPostSchema.omit({ authorId: true }).parse(data)

      const { postId } = (
        await db
          .insert(postsTable)
          .values({ ...validatedData, authorId: userId! })
          .returning({ postId: postsTable.id })
      )[0]

      console.log(postId)

      revalidatePath(`/dashboard`)
    },
    isProtected: true,
    clientSuccessMessage: "post created successfully",
    serverErrorMessage: "post creating",
  })
}

export async function updatePost(data: Omit<NewPost, "authorId">) {
  const { userId } = await auth()

  return executeAction({
    queryFn: async () => {
      const validatedData = newPostSchema.omit({ authorId: true }).parse(data)

      await db
        .update(postsTable)
        .set({...validatedData, authorId: userId!})
        .where(eq(postsTable.id, validatedData.id!))

      // delete tags
      await db
        .delete(postToTagsTable)
        .where(eq(postToTagsTable.postId, validatedData.id!))

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
