import { NextResponse } from "next/server"
import { HttpStatus, ZResponse } from "./types"

export async function zResponse<T>({
  success,
  message,
  status = success ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
  data,
}: ZResponse<T>): Promise<NextResponse> {
  return NextResponse.json({ success, message, data }, { status })
}

// export async function zResponse<T>({
//   success,
//   message,
//   data,
// }: {
//   success: boolean
//   message: string
//   data?: T
// }) {
//   return NextResponse.json({ success, message, data })
// }
