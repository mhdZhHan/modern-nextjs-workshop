import { relations } from "drizzle-orm"
import { pgTable } from "drizzle-orm/pg-core"
import * as c from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

import { postsTable, usersTable } from "."

export const commentsTable = pgTable("comments", {
  id: c.uuid().primaryKey().defaultRandom(),
  content: c.text().notNull(),
  postId: c
    .uuid()
    .notNull()
    .references(() => postsTable.id),
  isReply: c.boolean().default(false),

  parentId: c
    .uuid()
    .notNull()
    .references((): c.AnyPgColumn => commentsTable.id),
  authorId: c
    .uuid()
    .notNull()
    .references(() => usersTable.id),

  createdAt: c.timestamp().defaultNow().notNull(),
  updatedAt: c
    .timestamp()
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
})

// RELATIONS
export const commentsTableRelations = relations(commentsTable, ({ one }) => ({
  author: one(usersTable, {
    fields: [commentsTable.authorId],
    references: [usersTable.id],
  }),

  post: one(postsTable, {
    fields: [commentsTable.postId],
    references: [postsTable.id],
  }),
}))

// ZOD SCHEMAS
export const commentSchema = createSelectSchema(commentsTable)
export const newCommentSchema = createInsertSchema(commentsTable)

// TYPES
export type Comment = typeof commentsTable.$inferSelect
export type NewComment = typeof commentsTable.$inferInsert
