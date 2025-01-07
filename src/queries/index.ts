import { db } from "@/db"
import { PostStatus, bookmarksTable, postsTable, usersTable } from "@/db/schema"
import { executeQuery } from "@/db/utils"
import { and, count, desc, eq, ilike, inArray } from "drizzle-orm"

export async function getCategories() {
  return executeQuery({
    queryFn: async () => await db.query.categoriesTable.findMany(),
    isProtected: false,
    serverErrorMessage: "Getting categories",
  })
}

export async function getTags() {
  return executeQuery({
    queryFn: async () => await db.query.tagsTable.findMany(),
    isProtected: false,
    serverErrorMessage: "Getting tags",
  })
}

export async function getPosts(
  page: number,
  limit: number,
  status: PostStatus = "PUBLISHED",
  searchTerm?: string
) {
  return executeQuery({
    queryFn: async () =>
      await db.query.postsTable.findMany({
        orderBy: [desc(postsTable.createdAt)],
        limit: limit,
        offset: page * limit,
        with: {
          author: true,
          tags: { with: { tag: true } },
        },
        where: and(
          eq(postsTable.status, status),
          ilike(postsTable.title, `%${searchTerm || ""}%`),
          eq(postsTable.isDeleted, false)
        ),
      }),
    isProtected: false,
    serverErrorMessage: "Getting posts",
  })
}

export async function getPostsCount(searchTerm?: string) {
  return executeQuery({
    queryFn: async () =>
      await db
        .select({ count: count() })
        .from(postsTable)
        .where(
          and(
            ilike(postsTable.title, `%${searchTerm || ""}%`),
            eq(postsTable.isDeleted, false)
          )
        )
        .then((res) => res[0].count),
    isProtected: false,
    serverErrorMessage: "Getting posts count",
  })
}

export async function getUserPostsCount(userId: string) {
  return executeQuery({
    queryFn: async () =>
      await db
        .select({ count: count() })
        .from(postsTable)
        .where(eq(postsTable.authorId, userId))
        .then((res) => res[0].count),
    isProtected: true,
    serverErrorMessage: "Getting user posts count",
  })
}

export async function getUserPosts({
  page,
  limit,
  userId,
  status,
}: {
  page: number
  limit: number
  userId: string
  status?: PostStatus[]
}) {
  return executeQuery({
    queryFn: async () =>
      await db.query.postsTable.findMany({
        where: and(
          eq(postsTable.authorId, userId),
          status
            ? inArray(postsTable.status, status)
            : inArray(postsTable.status, ["PUBLISHED", "DRAFT"]),
          eq(postsTable.isDeleted, false)
        ),
        limit,
        offset: limit * page,
        orderBy: [desc(postsTable.createdAt)],
        with: {
          author: true,
          tags: { with: { tag: true } },
        },
      }),
    isProtected: true,
    serverErrorMessage: "Getting user posts",
  })
}

export async function getUser(clerkId: string) {
  return executeQuery({
    queryFn: async () =>
      await db.query.usersTable.findFirst({
        columns: {
          fullName: true,
          email: true,
          profileImg: true,
          username: true,
          id: true,
        },
        where: eq(usersTable.clerkId, clerkId),
      }),
    isProtected: true,
    serverErrorMessage: "Getting user",
  })
}

export async function getPostBySlug(slug: string) {
  return executeQuery({
    queryFn: async () =>
      await db.query.postsTable.findFirst({
        where: and(eq(postsTable.slug, slug), eq(postsTable.isDeleted, false)),
        with: {
          tags: { with: { tag: true } },
          author: {
            columns: {
              id: true,
              fullName: true,
              profileImg: true,
              username: true,
            },
          },
        },
      }),
    isProtected: false,
    serverErrorMessage: "Getting blog by slug",
  })
}

export async function getUserBookmarks(userId: string) {
  return executeQuery({
    queryFn: async () =>
      await db.query.bookmarksTable.findMany({
        where: and(
          eq(bookmarksTable.userId, userId),
          eq(postsTable.isDeleted, false)
        ),
        with: {
          post: true,
        },
      }),
    isProtected: true,
    serverErrorMessage: "Getting user bookmarks",
  })
}

export async function isBookmarked({
  userId,
  postId,
}: {
  userId: string
  postId: string
}) {
  return executeQuery({
    queryFn: async () =>
      await db.query.bookmarksTable.findFirst({
        where: and(
          eq(bookmarksTable.userId, userId),
          eq(bookmarksTable.postId, postId)
        ),
      }),
    isProtected: true,
    serverErrorMessage: "Checking post is bookmarked by the current user",
  })
}

export async function gteUserTrashedPosts(userId: string) {
  return executeQuery({
    queryFn: async () =>
      await db.query.postsTable.findMany({
        orderBy: [desc(postsTable.createdAt)],
        with: {
          author: true,
          tags: { with: { tag: true } },
        },
        where: and(
          eq(postsTable.authorId, userId),
          eq(postsTable.isDeleted, true)
        ),
      }),
    isProtected: true,
    serverErrorMessage: "Getting trashed posts",
  })
}
