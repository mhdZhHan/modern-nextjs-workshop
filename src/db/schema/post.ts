import { relations } from "drizzle-orm"
import { pgTable } from "drizzle-orm/pg-core"
import * as c from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"

import { bookmarksTable, postToTagsTable, usersTable, commentsTable } from "."

export const statusEnum = c.pgEnum("status", ["DRAFT", "ARCHIVED", "PUBLISHED"])

export const postsTable = pgTable("posts", {
  id: c.uuid().primaryKey().defaultRandom(),
  title: c.varchar({ length: 255 }).notNull(),
  slug: c.varchar({ length: 255 }).notNull(),
  banner: c.text().notNull(),
  shortDescription: c.text(),
  content: c.jsonb().notNull(),
  authorId: c
    .text()
    .notNull()
    .references(() => usersTable.clerkId),
  status: statusEnum("status").default("DRAFT").notNull(),

  isDeleted: c.boolean().default(false),
  createdAt: c.timestamp().defaultNow().notNull(),
  updatedAt: c
    .timestamp()
    .defaultNow()
    .$onUpdateFn(() => new Date())
    .notNull(),
})

// RELATIONS
export const postsTableRelations = relations(postsTable, ({ one, many }) => ({
  author: one(usersTable, {
    fields: [postsTable.authorId],
    references: [usersTable.clerkId],
  }),

  tags: many(postToTagsTable),
  comments: many(commentsTable),
  bookmarks: many(bookmarksTable),
}))

// ZOD SCHEMAS
export const basePostSchema = createSelectSchema(postsTable)
export const baseNewPostSchema = createInsertSchema(postsTable)

export const postSchema = basePostSchema.extend({
  tags: z.array(z.string()),
})

export const newPostSchema = baseNewPostSchema.extend({
  tags: z.array(z.string()),
})

// TYPES
export type PostStatus = "DRAFT" | "ARCHIVED" | "PUBLISHED"
export type NewPost = z.infer<typeof newPostSchema>
export type Post = typeof postsTable.$inferSelect

// export type Post = z.infer<typeof postSchema>
// export type NewPost = typeof postsTable.$inferInsert
