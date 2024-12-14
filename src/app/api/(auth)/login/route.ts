import { db } from "@/db"
import { usersTable } from "@/db/schema"
import { createClient } from "@/lib/supabase/client"
import { handleApiError } from "@/lib/utils"
import { loginSchema } from "@/lib/zod/auth-schema"
import { eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()

    const body = await req.json()
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

    return NextResponse.json({
      success: true,
      message: "Logged in successfully",
      existingUser,
    })
  } catch (error) {
    return handleApiError(error)
  }
}
