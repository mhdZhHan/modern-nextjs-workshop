import { relations } from "drizzle-orm"
import {
	pgTable,
	serial,
	text,
	varchar,
	timestamp,
	integer,
	primaryKey,
} from "drizzle-orm/pg-core"

export const users = pgTable("users", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 50 }).notNull(),
	email: varchar("email", { length: 120 }).unique().notNull(),
	password: text("password").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.$onUpdate(() => new Date())
		.notNull(),
})

export const profiles = pgTable("profiles", {
	id: serial("id").primaryKey(),
	bio: varchar("bio", { length: 255 }),
	userId: integer("user_id")
		.notNull()
		.references(() => users.id),
})

export const posts = pgTable("posts", {
	id: serial("id").primaryKey(),
	title: varchar("title", { length: 255 }),
	body: text("body"),
	authorId: integer("author_id")
		.notNull()
		.references(() => users.id),
})

export const categories = pgTable("categories", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 255 }).notNull(),
})

export const postOnCategories = pgTable(
	"post_categories",
	{
		postId: integer("post_id")
			.notNull()
			.references(() => posts.id),
		categoryId: integer("category_id")
			.notNull()
			.references(() => categories.id),
	},
	(t) => ({
		pk: primaryKey(t.postId, t.categoryId),
	})
)

// user relations
export const userRelations = relations(users, ({ one, many }) => ({
	// one to one
	profile: one(profiles, {
		fields: [users.id],
		references: [profiles.userId],
	}),

	// one to many
	posts: many(posts),
}))

// post relations
export const postRelations = relations(posts, ({ one, many }) => ({
	author: one(users, {
		fields: [posts.authorId],
		references: [users.id],
	}),

	postOnCategories: many(postOnCategories),
}))

// category relations
export const categoryRelations = relations(categories, ({ many }) => ({
	posts: many(postOnCategories),
}))

export const postOnCategoriesRelations = relations(
	postOnCategories,
	({ one }) => ({
		post: one(posts, {
			fields: [postOnCategories.postId],
			references: [posts.id],
		}),

		category: one(categories, {
			fields: [postOnCategories.categoryId],
			references: [categories.id],
		}),
	})
)
