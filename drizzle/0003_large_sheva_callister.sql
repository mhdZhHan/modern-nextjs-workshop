ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "user_id" text DEFAULT requesting_user_id() NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "clerk_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "profile_img" text;--> statement-breakpoint
CREATE POLICY "INSERT" ON "users" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK ((requesting_user_id() = user_id));--> statement-breakpoint
CREATE POLICY "SELECT" ON "users" AS PERMISSIVE FOR SELECT TO "authenticated";