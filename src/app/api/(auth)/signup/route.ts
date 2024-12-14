import { db } from "@/db"
import { usersTable } from "@/db/schema"
import { createClient } from "@/lib/supabase/server"
import { handleApiError } from "@/lib/utils"
import { signupSchema } from "@/lib/zod/auth-schema"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient()

    const body = await req.json()
    const { email, password, username } = signupSchema.parse(body)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    })

    if (error) throw error

    const { user, session } = data

    if (!user || !session) throw new Error("Signup failed")

    const newUser = await db
      .insert(usersTable)
      .values({
        id: user.id,
        email,
        username,
      })
      .returning()

    return NextResponse.json(
      {
        success: true,
        message: "User signup success",
        data: newUser,
      },
      { status: 201 }
    )
  } catch (error) {
    return handleApiError(error)
  }
}
