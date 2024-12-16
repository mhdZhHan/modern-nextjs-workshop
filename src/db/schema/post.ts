import { relations } from "drizzle-orm"
import { pgTable } from "drizzle-orm/pg-core"
import * as c from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

import { categoriesTable, postToTagsTable, usersTable } from "."
import { commentsTable } from "./comment"

export const statusEnum = c.pgEnum("status", ["DRAFT", "ARCHIVED", "PUBLISHED"])

export const postsTable = pgTable("posts", {
  id: c.uuid().primaryKey().defaultRandom(),
  title: c.varchar({ length: 255 }).notNull(),
  slug: c.varchar({ length: 255 }).notNull(),
  shortDescription: c.text(),
  content: c.text().notNull(),
  authorId: c
    .uuid()
    .notNull()
    .references(() => usersTable.id),
  categoryId: c
    .uuid()
    .notNull()
    .references(() => categoriesTable.id),

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
    references: [usersTable.id],
  }),

  category: one(categoriesTable, {
    fields: [postsTable.categoryId],
    references: [categoriesTable.id],
  }),

  tags: many(postToTagsTable),
  comments: many(commentsTable),
}))

// ZOD SCHEMAS
export const postSchema = createSelectSchema(postsTable)
export const newPostSchema = createInsertSchema(postsTable)

// TYPES
export type Post = typeof postsTable.$inferSelect
export type NewPost = typeof postsTable.$inferInsert
