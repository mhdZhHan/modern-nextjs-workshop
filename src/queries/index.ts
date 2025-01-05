import { db } from "@/db"
import { postsTable, usersTable } from "@/db/schema"
import { executeQuery } from "@/db/utils"
import { count, desc, eq, ilike } from "drizzle-orm"

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
        where: ilike(postsTable.title, `%${searchTerm || ""}%`),
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
        .where(ilike(postsTable.title, `%${searchTerm || ""}%`))
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
    isProtected: false,
    serverErrorMessage: "Getting user posts count",
  })
}

export async function getUserPosts({
  page,
  limit,
  userId,
}: {
  page: number
  limit: number
  userId: string
}) {
  return executeQuery({
    queryFn: async () =>
      await db.query.postsTable.findMany({
        where: eq(postsTable.authorId, userId),
        limit,
        offset: limit * page,
        orderBy: [desc(postsTable.createdAt)],
        with: {
          author: true,
          tags: { with: { tag: true } },
        },
      }),
    isProtected: false,
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
    isProtected: false,
    serverErrorMessage: "Getting user",
  })
}

export async function getPostBySlug(slug: string) {
  return executeQuery({
    queryFn: async () =>
      await db.query.postsTable.findFirst({
        where: eq(postsTable.slug, slug),
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
    serverErrorMessage: "Comment creating",
  })
}
