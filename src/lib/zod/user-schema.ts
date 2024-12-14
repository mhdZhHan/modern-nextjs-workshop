import { z } from "zod"

export const userSchema = z.object({
  id: z.string().min(1, "ID is required"),
  username: z
    .string({
      required_error: "Username is required",
    })
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be at most 20 characters long")
    .trim(),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email("Invalid email format."),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const safeUserSchema = userSchema
export const safeUsersArraySchema = z.array(safeUserSchema)

export type User = z.infer<typeof userSchema>
export type SafeUserData = z.infer<typeof safeUserSchema>
