import { NextRequest, NextResponse } from "next/server"

export type User = {
  id: number
  username: string
  createdAt?: Date
}

const users: User[] = [
  {
    id: 123443,
    username: "Hello",
  },
]

export async function GET(req: NextRequest) {
  return NextResponse.json({ success: true, data: users }, { status: 200 })
}

export async function POST(req: NextRequest) {
  const body = await req.json()

  const newUser = {
    id: Math.floor(Math.random() * (999999 - 100000 + 1)) + 1000000,
    createdAt: new Date(),
    ...body,
  }

  users.push(newUser)

  return NextResponse.json(
    {
      success: true,
      data: newUser,
    },
    { status: 201 }
  )
}
