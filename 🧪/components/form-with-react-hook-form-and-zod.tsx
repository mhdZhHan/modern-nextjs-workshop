"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

// validation schema
import {
	type TLoginSchema,
	loginSchema,
} from "@/lib/shared/validation-schemas/login-schema"

const FormWithReactHookFormAndZod = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
		setError,
	} = useForm<TLoginSchema>({
		resolver: zodResolver(loginSchema), // resolve with schema
	})

	const onSubmit = async (data: TLoginSchema) => {
		console.log(data)

		// server func
		const response = await fetch("/api/login", {
			method: "POST",
			// body: JSON.stringify(data),
			body: JSON.stringify({
				email: data.email,
				password: data.password,
				confirmPassword: 8888899999,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		})

		const responseData = await response.json()

		if (!response.ok) {
			// res status is not 2xx
			alert("Form submission failed")
			return
		}

		if (!responseData.success || responseData.errors) {
			const errors = responseData.errors

			if (errors.email) {
				setError("email", {
					type: "server",
					message: errors.email,
				})
			} else if (errors.password) {
				setError("password", {
					type: "server",
					message: errors.password,
				})
			} else if (errors.confirmPassword) {
				setError("confirmPassword", {
					type: "server",
					message: errors.confirmPassword,
				})
			} else {
				alert("Something went wrong")
			}

			return
			// NOTE: loop errors and setError (best practice)
		}

		// rest form
		reset() // pretty simple
	}

	return (
		<div className="w-full h-full flex items-center justify-center">
			<form onSubmit={handleSubmit(onSubmit)} className="border p-5">

				<input {...register("email")} type="email" placeholder="Email" />
				{errors.email && <p className="error">{`${errors.email?.message}`}</p>}

				<input
					{...register("password")}
					type="password"
					placeholder="Password"
				/>
				{errors.password && (
					<p className="error">{`${errors.password?.message}`}</p>
				)}

				<input
					{...register("confirmPassword")}
					type="password"
					placeholder="Confirm password"
				/>
				{errors.confirmPassword && (
					<p className="error">{`${errors.confirmPassword?.message}`}</p>
				)}

				<button type="submit" disabled={isSubmitting}>
					Submit
				</button>
			</form>
		</div>
	)
}
export default FormWithReactHookFormAndZod
