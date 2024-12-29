import Link from "next/link"
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"

const NAV_LINKS = [
  { href: "/", text: "Home" },
  { href: "/blog", text: "Blogs" },
]

const BUTTONS = [
  { href: "/editor", text: "Editor" },
  { href: "/dashboard", text: "Dashboard" },
]

export default function Header() {
  return (
    <header className="flex flex-wrap items-center justify-between border-b bg-background px-4 py-2">
      <Link href="/blog" className="flex items-center gap-1 text-2xl">
        <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 bg-clip-text text-transparent">
          Inkspire
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          className={`h-11 w-11 text-teal-500`}
          stroke="currentColor"
          fill="none"
        >
          <path
            d="M20 80 
         C20 80, 30 30, 80 20
         C80 20, 60 40, 50 60
         C40 80, 20 80, 20 80
         Z"
            strokeWidth="3"
            strokeLinecap="round"
          />

          <path
            d="M30 70
         C30 70, 40 40, 70 25"
            strokeWidth="2"
            strokeLinecap="round"
          />

          <path
            d="M35 65
         C35 65, 45 45, 60 35"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </Link>

      <nav className="mt-4 flex w-full items-center space-x-4 md:mt-0 md:w-auto">
        {NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className="hover:text-primary">
            {link.text}
          </Link>
        ))}

        {BUTTONS.map((button, index) => (
          <Button
            key={button.href}
            asChild
            variant={index === BUTTONS.length - 1 ? "default" : "outline"}
          >
            <Link href={button.href}>{button.text}</Link>
          </Button>
        ))}

        <SignedOut>
          <SignInButton />
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>

        <ThemeToggle />
      </nav>
    </header>
  )
}
