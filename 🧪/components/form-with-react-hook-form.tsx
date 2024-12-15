"use client"

import { useForm } from "react-hook-form"
import type { FieldValues } from "react-hook-form"

const FormWithReactHookForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
		getValues,
	} = useForm()

	const onSubmit = async (data: FieldValues) => {
		console.log(data)

		// server func

		// rest form

		reset() // pretty simple
	}

	return (
		<div className="w-full h-full flex items-center justify-center">
			<form onSubmit={handleSubmit(onSubmit)} className="border p-5">
				<input
					{...register("email", {
						required: "Email is required",
					})}
					type="email"
					placeholder="Email"
				/>
				{errors.email && <p className="error">{`${errors.email?.message}`}</p>}

				<input
					{...register("password", {
						required: "Password is required",
						minLength: {
							value: 8,
							message: "Password must at least 8 characters",
						},
					})}
					type="password"
					placeholder="Password"
				/>
				{errors.password && (
					<p className="error">{`${errors.password?.message}`}</p>
				)}

				<input
					{...register("confirmPassword", {
						required: "Confirm password is required",
						minLength: {
							value: 8,
							message: "Confirm password must at least 8 characters long",
						},
						validate: (value) =>
							value === getValues("password") || "Password must match",
					})}
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
export default FormWithReactHookForm
