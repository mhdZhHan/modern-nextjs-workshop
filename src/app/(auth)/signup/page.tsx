"use client"

import { Suspense } from "react"
import SignupForm from "../_components/SignupForm"

const SignupPage = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <SignupForm />
    </Suspense>
  )
}
export default SignupPage
