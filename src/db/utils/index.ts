import { sql } from "drizzle-orm"
import { db } from ".."
import { usersTable } from "../schema"

export async function generateUniqueUsername(email: string): Promise<string> {
  // Extract base username from email (part before @)
  const baseUsername = email
    .split("@")[0]
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "") // Remove non-alphanumeric characters

  let username = baseUsername
  let counter = 1

  // Check if username exists and generate a unique variation
  while (true) {
    const existingUser = await db
      .select()
      .from(usersTable)
      .where(sql`${usersTable.username} = ${username}`)
      .limit(1)
      .execute()

    if (existingUser.length === 0) {
      return username
    }

    username = `${baseUsername}${counter}`
    counter++
  }
}

export * from "./executeAction"
export * from "./executeQuery"
