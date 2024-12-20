import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"

export default function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 bg-background shadow-md">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-bold">
          Modern Blog
        </Link>

        <nav className="mt-4 flex w-full items-center space-x-4 md:mt-0 md:w-auto">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <Link href="/blogs" className="hover:text-primary">
            Blogs
          </Link>
          <Link href="/about" className="hover:text-primary">
            About
          </Link>
          <Button asChild variant="outline">
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
