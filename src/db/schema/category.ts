import { relations } from "drizzle-orm"
import { pgTable } from "drizzle-orm/pg-core"
import * as c from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

import { postsTable } from "."

export const categoriesTable = pgTable("categories", {
  id: c.uuid().primaryKey().defaultRandom(),
  name: c.varchar({ length: 200 }).notNull().unique(),
  createdAt: c.timestamp().notNull().defaultNow(),
})

// RELATIONS
export const categoryTableRelations = relations(categoriesTable, ({ many }) => ({
  posts: many(postsTable),
}))

// ZOD SCHEMAS
export const categorySchema = createSelectSchema(categoriesTable)
export const newCategorySchema = createInsertSchema(categoriesTable)

// TYPES
export type Category = typeof categoriesTable.$inferSelect
export type NewCategory = typeof categoriesTable.$inferInsert
