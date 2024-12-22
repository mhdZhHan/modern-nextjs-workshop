import { NextRequest } from "next/server"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { User, usersTable } from "@/db/schema"

import { createClient } from "@/lib/supabase/client"
import { loginSchema } from "@/lib/zod/auth-schema"

import { zError, zResponse } from "@/zlib"

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()

    const body: unknown = await req.json()
    const { email, password } = loginSchema.parse(body)

    const existingUser = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
    })

    if (!existingUser) throw new Error("User not found")

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    return zResponse<User>({
      success: true,
      message: "Logged in in successfully",
      data: existingUser,
    })
  } catch (error) {
    return zResponse(zError(error))
  }
}
