"use client"

import { useRef } from "react"
import { useMutation } from "@tanstack/react-query"

// components
import { Button } from "@/components/ui/button"

const CreateUser = () => {
  const formRef = useRef<HTMLFormElement | null>(null)

  const { mutate: createUser, isPending } = useMutation({
    mutationFn: async ({ username }: { username: string }) => {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(username),
      })

      const data = await res.json()
      return data.data
    },
    onSuccess: () => {
      alert("User created")
    },
    onError: (error) => {
      alert("Error creating user" + error.message)
    },
    onSettled: () => {
      formRef.current?.reset()
    },
  })

  return (
    <div>
      <h1>Create User</h1>
      <form
        ref={formRef}
        onSubmit={(evt) => {
          evt.preventDefault()
          const username = evt.currentTarget.username.value
          createUser({ username })
        }}
      >
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" placeholder="Username" id="username" />
        </div>

        <Button type="submit" disabled={isPending}>
          Submit
        </Button>
      </form>
    </div>
  )
}

export default CreateUser
