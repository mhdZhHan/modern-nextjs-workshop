"use server"

import { revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"
import { auth } from "@clerk/nextjs/server"

import { executeAction } from "@/db/utils"
import { db } from "@/db"
import {
  NewPost,
  PostStatus,
  newPostSchema,
  postToTagsTable,
  postsTable,
  tagsTable,
} from "@/db/schema"

export async function createNewPost(data: Omit<NewPost, "authorId">) {
  const { userId } = await auth()

  return executeAction({
    queryFn: async () => {
      const validatedData = newPostSchema.omit({ authorId: true }).parse(data)

      await db.transaction(async (tx) => {
        // create post
        const { postId } = (
          await tx
            .insert(postsTable)
            .values({ ...validatedData, authorId: userId! })
            .returning({ postId: postsTable.id })
        )[0]

        // handle tags
        for (const tagName of data.tags) {
          let tag = await tx
            .select()
            .from(tagsTable)
            .where(eq(tagsTable.name, tagName.toLowerCase()))
            .then((rows) => rows[0])

          if (!tag) {
            ;[tag] = await tx
              .insert(tagsTable)
              .values({ name: tagName.toLowerCase() })
              .returning()
          }

          //  post-tag relationship
          await tx.insert(postToTagsTable).values({
            postId: postId,
            tagId: tag.id,
          })
        }
      })

      revalidatePath(`/dashboard`)
    },
    isProtected: true,
    clientSuccessMessage: "post created successfully",
    serverErrorMessage: "post creating",
  })
}

export async function updatePost(data: Omit<NewPost, "authorId">) {
  return executeAction({
    queryFn: async () => {
      const validatedData = newPostSchema.omit({ authorId: true }).parse(data)

      await db
        .update(postsTable)
        .set({ ...validatedData })
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

export async function trashPostById(_: unknown, postId: string) {
  return executeAction({
    queryFn: async () => {
      if (!postId) throw new Error("Post id is required")

      await db
        .update(postsTable)
        .set({ isDeleted: true })
        .where(eq(postsTable.id, postId))

      revalidatePath(`/dashboard`)
    },
    isProtected: true,
    clientSuccessMessage: "post trashed successfully",
    serverErrorMessage: "post trashing",
  })
}

export async function deletePostById(_: unknown, id: string) {
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

export async function changePostStatus(
  _: unknown,
  { postId, status }: { postId: string; status: PostStatus }
) {
  return executeAction({
    queryFn: async () => {
      if (!postId) throw new Error("Post id is required")

      await db
        .update(postsTable)
        .set({ status })
        .where(eq(postsTable.id, postId))

      revalidatePath(`/dashboard`)
    },
    isProtected: true,
    clientSuccessMessage: `Post ${status} successfully`,
    serverErrorMessage: "post trashing",
  })
}
