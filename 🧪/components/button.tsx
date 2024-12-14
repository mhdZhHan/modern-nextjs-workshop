"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({ className, ...rest }: ButtonProps) => {
	const [pending] = useState(true)

	return (
		<button
			className={cn(
				"bg-blue-500 text-white font-semibold py-2 px-4 rounded",
				className,
				// pending && "bg-amber-500",
				{
					"bg-green-500": pending,
				}
			)}
			{...rest}
		></button>
	)
}
export default Button
