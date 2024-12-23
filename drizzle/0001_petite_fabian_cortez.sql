ALTER TABLE "posts" ALTER COLUMN "content" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "banner" text NOT NULL;