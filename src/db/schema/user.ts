import { relations, sql } from "drizzle-orm"
import { pgTable } from "drizzle-orm/pg-core"
import * as c from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

import { postsTable } from "."
import { commentsTable } from "./comment"

// TABLE SCHEMAS
export const usersTable = pgTable(
  "users",
  {
    id: c.uuid().primaryKey().defaultRandom(),
    userId: c
      .text()
      .notNull()
      .default(sql`requesting_user_id()`),
    clerkId: c.text().notNull(),
    fullName: c.text().notNull(),
    email: c.text().notNull().unique(),
    username: c.text().notNull().unique(),
    profileImg: c.text(),

    createdAt: c.timestamp().notNull().defaultNow(),
    updatedAt: c
      .timestamp()
      .notNull()
      .defaultNow()
      .$onUpdateFn(() => new Date()),
  },
  () => [
    c.pgPolicy("INSERT", {
      as: "permissive",
      for: "insert",
      to: ["authenticated"],
      withCheck: sql`(requesting_user_id() = user_id)`,
    }),
    c.pgPolicy("SELECT", {
      as: "permissive",
      for: "select",
      to: ["authenticated"],
    }),
  ]
)

// RELATIONS
export const usersTableRelations = relations(usersTable, ({ many }) => ({
  posts: many(postsTable),
  comments: many(commentsTable),
}))

// ZOD SCHEMAS
export const userSchema = createSelectSchema(usersTable)
export const newUserSchema = createInsertSchema(usersTable)

// TYPES
export type User = typeof usersTable.$inferSelect
export type NewUser = typeof usersTable.$inferInsert
