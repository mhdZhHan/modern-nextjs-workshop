import { NextRequest } from "next/server"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { usersTable } from "@/db/schema"

import { handleApiError } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import { loginSchema } from "@/lib/zod/auth-schema"

import { zResponse } from "@/zlib"

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()

    const body: unknown = await req.json()
    const { email, password } = loginSchema.parse(body)

    const existingUser = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
    })

    if (!existingUser) throw new Error("User not found")

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    return zResponse({
      success: true,
      message: "Logged in in successfully",
      data: existingUser,
    })
  } catch (error) {
    return handleApiError(error)
  }
}
