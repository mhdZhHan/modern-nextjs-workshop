"use client"

import { Loader, Lock, Mail } from "lucide-react"
import Link from "next/link"
import InputBox from "../(components)/InputBox"

const page = () => {
  const isLoading = false
  const error = false

  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl bg-gray-800 bg-opacity-50 shadow-xl backdrop-blur-xl backdrop-filter">
      <div className="p-8">
        <h2 className="mb-6 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-center text-3xl font-bold text-transparent">
          Welcome back
        </h2>

        <form>
          <InputBox type="email" icon={Mail} placeholder="Work Email" />
          <InputBox type="password" icon={Lock} placeholder="Password" />

          <div className="mb-6 flex items-center">
            <Link
              href="/forgot-password"
              className="text-sm text-green-400 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {error && <p className="mt-2 font-semibold text-red-500">{error}</p>}

          <button
            className="mt-5 w-full rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-3 font-bold text-white shadow-lg outline-none transition duration-200 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="mx-auto size-6 animate-spin text-center" />
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>

      <div className="flex justify-center bg-gray-900 bg-opacity-50 px-8 py-4">
        <p className="text-sm text-gray-400">
          Don't have an account?{" "}
          <Link href="/signup" className="text-green-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}
export default page
