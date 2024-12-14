"use client"

import {  signUp } from "@/actions/auth-actions"

const SupabaseAuth = () => {
	const handleLogin = async () => {
		try {
			const result = await signUp({
				email: "liyana@example.com",
				password: "Hello123",
			})

			if (result.success) {

			}
		} catch (error) {
			console.error("Error during sign-up:", error)
		}
	}

	return (
		<div>
			<button onClick={handleLogin}>Login</button>
		</div>
	)
}

export default SupabaseAuth
