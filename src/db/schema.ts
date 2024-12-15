import { pgTable } from "drizzle-orm/pg-core"
import * as c from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

// TABLE SCHEMAS
export const usersTable = pgTable("users", {
  id: c.uuid().primaryKey().defaultRandom(),
  fullName: c.text().notNull(),
  email: c.text().notNull().unique(),
  username: c.text().notNull().unique(),

  createdAt: c.timestamp().notNull().defaultNow(),
  updatedAt: c
    .timestamp()
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
})

// TYPES
export type User = typeof usersTable.$inferSelect
export type NewUser = typeof usersTable.$inferInsert

// ZOD SCHEMAS
export const userSchema = createSelectSchema(usersTable)
export const newUserSchema = createInsertSchema(usersTable)
