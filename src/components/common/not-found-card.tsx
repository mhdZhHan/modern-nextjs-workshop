"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Ghost, Home, RefreshCw } from "lucide-react"

const NotFoundCard = () => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="mb-4 flex justify-center">
          <Ghost className="h-12 w-12 text-gray-400 dark:text-gray-600" />
        </div>

        <CardTitle className="text-center text-2xl font-bold">
          404 - Page Not Found
        </CardTitle>

        <CardDescription className="text-center text-sm">
          Oops! It seems you&apos;ve wandered into uncharted territory.
        </CardDescription>
      </CardHeader>

      <CardContent className="text-center">
        <p className="text-sm leading-snug text-gray-600 dark:text-gray-400">
          The page you&apos;re looking for might have been moved, deleted, or
          possibly never existed.
        </p>
      </CardContent>

      <CardFooter className="flex justify-center space-x-4">
        <Button asChild>
          <Link href="/" className="flex items-center">
            <Home className="mr-2 h-4 w-4" />
            Go Home
          </Link>
        </Button>

        <Button variant="outline" onClick={() => window.history.back()}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </CardFooter>
    </Card>
  )
}
export default NotFoundCard
