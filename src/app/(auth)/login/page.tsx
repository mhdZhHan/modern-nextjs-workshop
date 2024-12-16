"use client"
import { Suspense } from "react"
import LoginForm from "../(components)/LoginForm"

const LoginPage = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <LoginForm />
    </Suspense>
  )
}
export default LoginPage
