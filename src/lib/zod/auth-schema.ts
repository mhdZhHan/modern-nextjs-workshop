import { z } from "zod"
import { userSchema } from "./user-schema"

export const signupSchema = z
  .object({
    username: userSchema.shape.username,
    email: userSchema.shape.email.regex(
      /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Invalid email format."
    ),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password must be at least 6 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "Password must include uppercase, lowercase, number, and special character"
      ),
    confirmPassword: z.string({
      required_error: "Confirm password is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  })

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email("Invalid email format."),
  password: z.string({ required_error: "Password is required" }),
})

export type SignupUser = z.infer<typeof signupSchema>
export type LoginUser = z.infer<typeof loginSchema>
