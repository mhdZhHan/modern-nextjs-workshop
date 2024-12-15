import { env } from "@env"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schema"

const client = postgres(env.DATABASE_URL)
export const db = drizzle({
  client,
  schema,
  casing: "snake_case",
  logger: process.env.NODE_ENV === "development",
})
