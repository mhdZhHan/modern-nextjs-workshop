import { relations } from "drizzle-orm"
import { pgTable } from "drizzle-orm/pg-core"
import * as c from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

import { usersTable, postsTable } from "."

export const bookmarksTable = pgTable("bookmarks", {
  id: c.uuid().primaryKey().defaultRandom(),
  userId: c
    .uuid()
    .notNull()
    .references(() => usersTable.clerkId, { onDelete: "cascade" }),
  postId: c
    .uuid()
    .notNull()
    .references(() => postsTable.id, { onDelete: "cascade" }),

  createdAt: c.timestamp().notNull().defaultNow(),
})

// RELATIONS
export const bookmarksRelations = relations(bookmarksTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [bookmarksTable.userId],
    references: [usersTable.clerkId],
  }),
  post: one(postsTable, {
    fields: [bookmarksTable.postId],
    references: [postsTable.id],
  }),
}))

// ZOD SCHEMAS
export const bookmarkSchema = createSelectSchema(bookmarksTable)
export const newBookmarkSchema = createInsertSchema(bookmarksTable)

// TYPES
export type Bookmark = typeof bookmarksTable.$inferSelect
export type NewBookmark = typeof bookmarksTable.$inferInsert
