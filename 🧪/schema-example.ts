import { relations } from "drizzle-orm"
import {
	pgTable,
	serial,
	varchar,
	text,
	timestamp,
	uuid,
	integer,
	pgEnum,
	boolean,
	real,
	primaryKey,
} from "drizzle-orm/pg-core"

export const users = pgTable("users", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 50 }).notNull(),
	email: varchar("email", { length: 120 }).notNull().unique(),
	password: text("password").notNull(),
	createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: "string" }).notNull(),
})

// exploring schema
export const userRole = pgEnum("userRole", ["ADMIN", "BASIC"])
export const testUserTable = pgTable("test_users", {
	id: uuid("id").primaryKey().defaultRandom(),
	// id2: serial("id2").primaryKey(),
	name: varchar("name", { length: 255 }).notNull(),
	age: integer("age").notNull().$type<12 | 24>(), // age should either 12 or 24
	email: varchar("email", { length: 255 }).notNull().unique(),
	role: userRole("user_role").default("BASIC").notNull(),

	// favNumbers: integer("fav_numbers").notNull().array(),
	// randomNumber: integer("random_number").$default(() => Math.random())
})

export const userPreferencesTable = pgTable("user_preferences", {
	id: uuid("id").primaryKey().defaultRandom(),
	emailUpdates: boolean("email_updates").notNull().default(false),
	userId: uuid("user_id")
		.references(() => testUserTable.id)
		.notNull(),
})

export const postTable = pgTable("post", {
	id: uuid("id").primaryKey().defaultRandom(),
	title: varchar("title", { length: 255 }).notNull(),
	averageRating: real("average_rating").notNull().default(0),
	authorId: uuid("author_id")
		.references(() => testUserTable.id)
		.notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const categoryTable = pgTable("category", {
	id: uuid("id").primaryKey().defaultRandom(),
	name: varchar("name", { length: 255 }).notNull(),
})

export const postCategoryTable = pgTable(
	"post_category",
	{
		postId: uuid("post_id")
			.references(() => postTable.id)
			.notNull(),
		categoryId: uuid("category_id")
			.references(() => categoryTable.id)
			.notNull(),
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.postId, table.categoryId] }),
		}
	}
)

// RELATIONS
export const testUserTableRelations = relations(
	testUserTable,
	({ one, many }) => {
		return {
			preferences: one(userPreferencesTable),
			posts: many(postTable),
		}
	}
)

export const userPreferencesTableRelations = relations(
	userPreferencesTable,
	({ one }) => {
		return {
			user: one(testUserTable, {
				fields: [userPreferencesTable.userId],
				references: [testUserTable.id],
			}),
		}
	}
)

export const postTableRelations = relations(postTable, ({ one, many }) => {
	return {
		author: one(testUserTable, {
			fields: [postTable.authorId],
			references: [testUserTable.id],
		}),
		categories: many(categoryTable),
	}
})

export const categoryTableRelations = relations(categoryTable, ({ many }) => {
	return {
		postCategories: many(postCategoryTable),
	}
})

export const postCategoryTableRelations = relations(
	postCategoryTable,
	({ one }) => {
		return {
			post: one(postTable, {
				fields: [postCategoryTable.postId],
				references: [postTable.id],
			}),
			category: one(categoryTable, {
				fields: [postCategoryTable.categoryId],
				references: [categoryTable.id],
			}),
		}
	}
)
