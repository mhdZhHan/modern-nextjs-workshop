ALTER TABLE "posts" DROP CONSTRAINT "posts_category_id_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "posts" DROP COLUMN "category_id";