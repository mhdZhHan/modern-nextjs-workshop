import Link from "next/link"
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"

const NAV_LINKS = [{ href: "/blog", text: "Blogs" }]

const BUTTONS = [
  { href: "/editor", text: "Editor" },
  { href: "/dashboard", text: "Dashboard" },
]

export default function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 bg-background shadow-md">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-bold">
          Modern Blog
        </Link>

        <nav className="mt-4 flex w-full items-center space-x-4 md:mt-0 md:w-auto">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-primary"
            >
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
      </div>
    </header>
  )
}
