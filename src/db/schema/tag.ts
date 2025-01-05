import { relations } from "drizzle-orm"
import { pgTable } from "drizzle-orm/pg-core"
import * as c from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

import { postsTable } from "."

// TABLE SCHEMAS
export const tagsTable = pgTable("tags", {
  id: c.uuid().primaryKey().defaultRandom(),
  name: c.varchar({ length: 50 }).notNull().unique(),
  createdAt: c.timestamp().notNull().defaultNow(),
})

export const postToTagsTable = pgTable(
  "post_to_tags",
  {
    postId: c
      .uuid()
      .notNull()
      .references(() => postsTable.id),
    tagId: c
      .uuid()
      .notNull()
      .references(() => tagsTable.id),
  },
  (t) => [c.primaryKey({ columns: [t.postId, t.tagId] })]
)

// RELATIONS
export const tagsTableRelations = relations(tagsTable, ({ many }) => ({
  postToTags: many(postToTagsTable),
}))

export const postToTagsTableRelations = relations(
  postToTagsTable,
  ({ one }) => ({
    tag: one(tagsTable, {
      fields: [postToTagsTable.tagId],
      references: [tagsTable.id],
    }),

    post: one(postsTable, {
      fields: [postToTagsTable.postId],
      references: [postsTable.id],
    }),
  })
)

// ZOD SCHEMAS
export const tagSchema = createSelectSchema(tagsTable)
export const newTagSchema = createInsertSchema(tagsTable)

export const postToTagSchema = createSelectSchema(postToTagsTable)
export const newPostToTagSchema = createInsertSchema(postToTagsTable)

// TYPES
export type Tag = typeof tagsTable.$inferSelect
export type NewTag = typeof tagsTable.$inferInsert

export type PostToTag = typeof postToTagsTable.$inferSelect
export type NewPostToTag = typeof postToTagsTable.$inferInsert
