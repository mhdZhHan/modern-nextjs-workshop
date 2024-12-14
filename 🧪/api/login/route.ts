import { loginSchema } from "@/lib/shared/schemas/login-schema"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (request: NextRequest) => {
	const body: unknown = await request.json()

	const result = loginSchema.safeParse(body)

	let zodErrors = {}

	if (!result.success) {
		result.error.issues.forEach((issue) => {
			zodErrors = { ...zodErrors, [issue.path[0]]: issue.message }
		})
	}

	return NextResponse.json(
		Object.keys(zodErrors).length > 0
			? { errors: zodErrors }
			: { success: true }
	)
}
