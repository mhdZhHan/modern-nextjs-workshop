"use client" // Error boundaries must be Client Components

import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function GlobalError() {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col items-center justify-center">
          <h2 className="mb-4 text-2xl font-bold">Something went wrong!</h2>

          <button
            onClick={() => {
              window.location.reload()
            }}
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Refresh
          </button>
        </div>
      </body>
    </html>
  )
}
