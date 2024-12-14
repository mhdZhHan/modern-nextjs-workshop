import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  client: {
    NEXT_PUBLIC_SUPABASE_URL: z.string(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  },

  server: {
    DATABASE_URL: z
      .string()
      .url("DATABASE url not provided")
      .regex(/postgres/),
  },

  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.DATABASE_URL,
  },
})
