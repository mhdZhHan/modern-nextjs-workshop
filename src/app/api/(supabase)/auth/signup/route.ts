import { NextRequest } from "next/server"
import { db } from "@/db"
import { User, usersTable } from "@/db/schema"
import { HttpStatus, zError, zResponse } from "@/zlib"

import { createClient } from "@/lib/supabase/server"
import { signupSchema } from "@/lib/zod/auth-schema"
import { generateUniqueUsername } from "@/db/utils"

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()

    const body: unknown = await req.json()
    const { email, password, fullName } = signupSchema.parse(body)

    const username = await generateUniqueUsername(email)

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

    const { user } = data

    if (!user) throw new Error("Signup failed")

    const newUser = await db
      .insert(usersTable)
      .values({
        id: user.id,
        email,
        username,
        fullName,
        // *******
        clerkId: user.id,
      })
      .returning()

    return zResponse<User>({
      success: true,
      message: "User signup success",
      status: HttpStatus.OK,
      data: newUser[0],
    })
  } catch (error) {
    console.log("ERROR in SIGNUP", error)

    return zResponse(zError(error))
  }
}
