"use client"

import { useQuery } from "@tanstack/react-query"
import type { User } from "../api/users/route"

const Users = () => {
  const {
    data: users,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch("/api/users")
      const data = await response.json()
      return data.data
    },
  })

  if (isPending) return <div>Loading...</div>

  if (isError) return <div>Error</div>

  return (
    <div>
      <h1>Users:</h1>
      <ul>
        {users.map((user: User) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  )
}

export default Users
