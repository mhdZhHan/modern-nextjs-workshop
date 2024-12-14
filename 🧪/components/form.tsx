"use client"

import { addTodo } from "@/actions/todo-actions"
import { useFormStatus } from "react-dom"
import toast from "react-hot-toast"

// validation schemas
import { TodoSchema } from "@/lib/shared/validation-schemas/todo-schema"
import { cn } from "@/lib/utils"

const Form = () => {
	const { pending } = useFormStatus()
	// useOptimistic => future

	async function clientAction(formData: FormData) {
		// construct the new data object
		const newTodo = {
			content: formData.get("content"),
		}

		// client validation
		/**
		 * parse just parse the obj (safeParse => give the error if newTodd missed any field)
		 */
		const validatedData = TodoSchema.safeParse(newTodo)

		if (!validatedData.success) {
			console.log(validatedData)
			let errorMessage = ""

			validatedData.error.issues.forEach((issue) => {
				errorMessage =
					errorMessage + issue.path[0] + ": " + issue.message + ". "
			})

			toast.error(errorMessage)

			return // output error message
		}

		const result = await addTodo(validatedData.data)

		// success error
		if (result.success) {
			// reset form
		} else {
			//
		}
	}

	return (
		<div>
			<form action={clientAction}>
				<input
					type="text"
					name="content"
					placeholder="Write your todo..."
					required
				/>

				{/* button make as client */}
				<button
					type="submit"
					disabled={pending}
					className={cn("disabled:bg-gray-300")}
				>
					{pending ? "Adding..." : "Add"}
				</button>
			</form>
		</div>
	)
}
export default Form
