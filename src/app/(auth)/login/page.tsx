"use client"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader, Lock, Mail } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

// components
import InputBox from "../(components)/InputBox"

// 
import { loginSchema, type LoginUser } from "@/lib/zod/auth-schema"
import { zFetch, ZResponse } from "@/zlib"
import { User } from "@/db/schema"

const page = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<LoginUser>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { mutate: onSubmit, isPending } = useMutation({
    onMutate: () => {
      // A callback triggered before the mutation function runs
      const toastId = toast.loading("Signing in...")
      return { toastId }
    },
    mutationFn: async (signInData: LoginUser) => {
      const data = await zFetch<ZResponse<User>>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(signInData),
      })

      if (!data.success) throw new Error(data.message)

      return data.data!
    },
    onSuccess: (data, __, { toastId }) => {
      const redirectPath = searchParams.get('redirectedFrom') || '/protected/dashboard'
      router.push(redirectPath)

      reset()
    },
    onError: (error, _, ctx) => {
      toast.error(error.message, {
        id: ctx?.toastId,
      })
    },
  })

  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl bg-gray-800 bg-opacity-50 shadow-xl backdrop-blur-xl backdrop-filter">
      <div className="p-8">
        <h2 className="mb-6 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-center text-3xl font-bold text-transparent">
          Welcome back
        </h2>

        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
          <InputBox
            {...register("email")}
            type="email"
            icon={Mail}
            placeholder="Work Email"
          />
          {errors.email && (
            <p className="mb-2 font-semibold text-red-500">
              {errors.email.message}
            </p>
          )}

          <InputBox
            {...register("password")}
            type="password"
            icon={Lock}
            placeholder="Password"
            autoComplete="current-password"
          />
          {errors.password && (
            <p className="mb-2 font-semibold text-red-500">
              {errors.password.message}
            </p>
          )}

          <div className="mb-6 flex items-center">
            <Link
              href="/forgot-password"
              className="text-sm text-green-400 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            className="mt-5 w-full rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-3 font-bold text-white shadow-lg outline-none transition duration-200 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            type="submit"
            disabled={isSubmitting || isPending}
          >
            {isSubmitting || isPending ? (
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
